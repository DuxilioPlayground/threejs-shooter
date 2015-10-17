var AnimMD2 = function(options){
	var loader = new THREE.MD2Loader(),
		self = this;

	this._options = options;
	this._clock = new THREE.Clock();

    loader.load(options.md2, function(geo){
        geo.computeBoundingBox();

       	var mesh = self._mesh = self._createMD2Part(geo, THREE.ImageUtils.loadTexture(options.skin));
        options.onCreate(mesh);
    });
};

AnimMD2.prototype._createMD2Part = function(geometry, skinMap){
    var materialWireframe = new THREE.MeshLambertMaterial( { color: 0xffaa00, wireframe: true, morphTargets: true, morphNormals: true } );
    var materialTexture = new THREE.MeshLambertMaterial( { color: 0xffffff, wireframe: false, map: skinMap, morphTargets: true, morphNormals: true } );

    var mesh = new THREE.Mesh(geometry, materialTexture);
    mesh.rotation.y = - Math.PI / 2;

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    mesh.materialTexture = materialTexture;
    mesh.materialWireframe = materialWireframe;

    this._playingAnimation = false;
    this._mixer = new THREE.AnimationMixer(mesh);
    this._mesh = mesh;

    if(this._options.animation){
    	this.playAnimation(this._options.animation);
    }

    return mesh;
};

AnimMD2.prototype.playAnimation = function(name, playOnce){
	if(this._playingAnimation){
		return;
	}

	var mixer = this._mixer = new THREE.AnimationMixer(mesh),
		mesh = this._mesh,
		self = this;

	if(mesh){
		var clip = THREE.AnimationClip.findByName(mesh.geometry.animations, name);
		if(clip){
			var action = new THREE.AnimationAction(clip, mixer.time).setLocalRoot(mesh);
			mixer.addAction(action);
			this._playingAnimation = true;

			if(playOnce){
				setTimeout(function(){
					mixer.removeAction(action);
					self._playingAnimation = false;
				}, clip.duration*1000);
			}
		}
	}
};

AnimMD2.prototype.update = function(){
	var delta = this._clock.getDelta();
	if(this._mixer) this._mixer.update(delta);
};

module.exports = AnimMD2;