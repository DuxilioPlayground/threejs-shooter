/**
 * Classes to work with MD2 files (pre-converted to JSON)
 * http://oos.moxiecode.com/js_webgl/md2_converter/
 */
var AnimatedMD2Model = function(json, image, defaultAnimation, defaultAnimationTime) {
	if (json.constructor == THREE.Geometry) {
		// avoid needless re-init in clone() call
		THREE.MorphAnimMesh.call(this, json, image);

	} else {
		var texture = new THREE.Texture(image);
		texture.needsUpdate = true;

		var material = new THREE.MeshBasicMaterial({ map: texture, morphTargets: true });

		var loader = new THREE.JSONLoader();
		var model = loader.parse(json);
		var geometry = model.geometry;
		geometry.computeFaceNormals();
		geometry.computeVertexNormals();

		geometry.computeMorphNormals();
		THREE.MorphAnimMesh.call(this, geometry, material);

		//this.parseAnimations();
	}

	this.playingAnimation = null;
	this.defaultAnimation = defaultAnimation ? { animation: defaultAnimation, time: defaultAnimationTime, callback: null } : null;

	this.playOnce(this.defaultAnimation);
};

AnimatedMD2Model.prototype = Object.create(THREE.MorphAnimMesh.prototype);

AnimatedMD2Model.prototype.interpolateTargets = function(a, b, t) {
	for(var i = 0, n = this.morphTargetInfluences.length; i < n; i++) {
		this.morphTargetInfluences[i] = 0;
	}
	if(a > -1) this.morphTargetInfluences[a] = 1 - t;
	if(b > -1) this.morphTargetInfluences[b] = t;
};

AnimatedMD2Model.prototype.getVertexCoordinates = (function(){
	var temp = new THREE.Vector3();
	return function(index, vector3) {
		vector3 = vector3 || new THREE.Vector3();
		vector3.set(0, 0, 0);
		var targets = this.geometry.morphTargets;
		for (var i = 0, n = targets.length; i < n; i++) {
			vector3.add(temp.copy(targets[i].vertices[index]).multiplyScalar(this.morphTargetInfluences[i]));
		}
		return vector3;
	};
}) ();

AnimatedMD2Model.prototype.setDefaultAnimation = function(animation, time) {
	if (this.defaultAnimation && (this.defaultAnimation.animation != animation)) {
		var playingDefaultAnimation = this.playingAnimation && (
			this.playingAnimation.animation == this.defaultAnimation.animation
		);
		this.defaultAnimation.animation = animation;
		this.defaultAnimation.time = time;
		if (playingDefaultAnimation) {
			this.playOnce(this.defaultAnimation);
		}
	}
};

AnimatedMD2Model.prototype.playOnce = function(animation, time, callback) {
	var animationObject = (arguments.length > 1) ? { animation: animation, time: time, callback: callback } : animation;

	// finish current animation
	if(this.playingAnimation) {
		this.interpolateTargets(this.endKeyframe, -1, 0);
	}

	// set (or clear) playingAnimation
	this.playingAnimation = animationObject;

	if(animationObject) {
		// select requested animation
		this.playAnimation(animationObject.animation, 1);
		// fix duration, miscalculated in playAnimation() call above
		this.duration = animationObject.time;
		// store actual time in this.time
		this.time = Date.now();
		// show first frame of requested animation
		this.interpolateTargets(this.startKeyframe, -1, 0);
	}
};

AnimatedMD2Model.prototype.update = function() {
	if(this.playingAnimation) {
		// calculate current frame
		var frame = this.startKeyframe + (this.endKeyframe - this.startKeyframe) * (Date.now() - this.time) / this.duration

		// update the animation
		if(frame < this.endKeyframe) {
			// seek to frame
			this.interpolateTargets(Math.floor(frame), Math.ceil(frame), frame - Math.floor(frame));
		} else {
			// show last frame
			this.interpolateTargets(this.endKeyframe, -1, 0);
			// if there is callback, call it
			if(this.playingAnimation.callback) this.playingAnimation.callback();
			// set animation back to default
			this.playOnce(this.defaultAnimation);
		}
	}
};

AnimatedMD2Model.prototype.clone = function() {

	var a = this.defaultAnimation ? this.defaultAnimation.animation : undefined;
	var t = this.defaultAnimation ? this.defaultAnimation.time : undefined;
	var o = new AnimatedMD2Model(this.geometry, this.material, a, t);

	THREE.MorphAnimMesh.prototype.clone.call(this, o);

	return o;
};