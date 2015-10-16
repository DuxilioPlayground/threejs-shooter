var lockControlsHelper = {

	init: function(element, camera, controls){
		var controls = this._controls = new THREE.PointerLockControls(camera);
		this._element = element;
		this._bindEvents();
		return controls;
	},

	getEnabled: function(){
		return this._controls.enabled;
	},

	_bindEvents: function(){
		document.body.addEventListener('click', this._requestLock.bind(this));
		document.addEventListener('pointerlockchange', this._onLockChange.bind(this), false);
		document.addEventListener('mozpointerlockchange', this._onLockChange.bind(this), false);
		document.addEventListener('webkitpointerlockchange', this._onLockChange.bind(this), false);
	},

	_requestLock: function(){
		var element = this._element;
	    element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
	    element.requestPointerLock();
	},

	_onLockChange: function(){
		var element = this._element;
    	if (document.pointerLockElement === element ||
    		document.mozPointerLockElement === element ||
    		document.webkitPointerLockElement === element) {
    		console.log('Pointer locked');
    		this._controls.enabled = true;
		} else {
			console.log('Pointer lock removed');
			this._controls.enabled = false;
		}
	}

};

module.exports = lockControlsHelper;