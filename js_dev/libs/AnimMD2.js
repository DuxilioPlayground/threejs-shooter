import CONFIG from '../config';

export default class AnimMD2 {
	constructor(options) {
		const loader = new THREE.MD2Loader();

		//check animTimeScale option property
		options.animTimeScale = options.animTimeScale || 1;
		options.md2 = CONFIG.paths.models+options.md2;
		options.skin = CONFIG.paths.models+options.skin;

		//set class vars
		this._options = options;
		this._clock = new THREE.Clock();

		//preload md2 and mesh
		loader.load(options.md2, (geo) => {
			geo.computeBoundingBox();

			const mesh = this._mesh = this._createMD2Part(geo, THREE.ImageUtils.loadTexture(options.skin));
			options.onCreate(mesh);
		});
	}

	_createMD2Part(geometry, skinMap) {
		const materialWireframe = new THREE.MeshLambertMaterial( { color: 0xffaa00, wireframe: true, morphTargets: true, morphNormals: true } );
		const materialTexture = new THREE.MeshLambertMaterial( { color: 0xffffff, wireframe: false, map: skinMap, morphTargets: true, morphNormals: true } );

		const mesh = new THREE.Mesh(geometry, materialTexture);
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
	}

	playAnimation(name, playOnce) {
		if(this._playingAnimation){
			return;
		}

		const options = this._options;
		const mixer = this._mixer = new THREE.AnimationMixer(mesh);
		const mesh = this._mesh;
		const timeScale = options.animTimeScale;

		//speed animation up by <timeScale>
		//duration is now <duration>/<timeScale>
		mixer.timeScale = timeScale;

		if(!mesh){
			return;
		}

		const clip = THREE.AnimationClip.findByName(mesh.geometry.animations, name);

		if(!clip){
			return;
		}

		const action = new THREE.AnimationAction(clip, mixer.time).setLocalRoot(mesh);

		mixer.addAction(action);
		this._playingAnimation = true;

		if(!playOnce){
			return;
		}

		setTimeout(() => {
			mixer.removeAction(action);
			this._playingAnimation = false;
		}, (clip.duration/timeScale)*1000);
	}

	update() {
		const delta = this._clock.getDelta();
		if(this._mixer) this._mixer.update(delta);
	}
}
