var movementHelper = {

	init: function(controls, options){
		this._controls = controls;
		this._options = options;

		this._movement = {
			forward: false,
			backward: false,
			right: false,
			left: false,
			canJump: false
		};
		this._velocity = new THREE.Vector3();
		this._prevTime = performance.now();

		this._bindKeyEvents();
	},

	checkMovement: function(){
		var controls = this._controls,
			velocity = this._velocity,
			movement = this._movement,
			options = this._options;

		var time = performance.now(),
    		delta = (time - this._prevTime) / 1000;
    	
    	//update velocity
    	velocity.x -= velocity.x * 10.0 * delta;
    	velocity.z -= velocity.z * 10.0 * delta;
    	velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

    	//check directional movement
    	if(movement.forward) velocity.z -= options.movementSpeed * delta;
    	if(movement.backward) velocity.z += options.movementSpeed * delta;
    	if(movement.left) velocity.x -= options.movementSpeed * delta;
    	if(movement.right) velocity.x += options.movementSpeed * delta;

    	//update controls
    	controls.getObject().translateZ(velocity.z * delta);
    	controls.getObject().translateX(velocity.x * delta);
    	controls.getObject().translateY(velocity.y * delta);

    	//detect floor
    	if(controls.getObject().position.y < 10) {
			velocity.y = 0;
			controls.getObject().position.y = 10;
			this._movement.canJump = true;
		}

    	this._prevTime = time;
	},

	_bindKeyEvents: function(){
		var self = this;
		document.addEventListener('keydown', function(e){
			self._checkKeys.call(self, e.keyCode, true);
		}, false);
		document.addEventListener('keyup', function(e){
			self._checkKeys.call(self, e.keyCode, false);
		}, false);
	},

	_checkKeys: function(keyCode, setToVal){
		switch(keyCode){
			case 87: //w
				this._movement.forward = setToVal;
				break;
			case 83: //s
				this._movement.backward = setToVal;
				break;
			case 68: // d
				this._movement.right = setToVal;
				break;
			case 65: // a
				this._movement.left = setToVal;
				break;
			case 32: // space
				if(setToVal === true){ //keydown
					if(this._movement.canJump === true){
						this._velocity.y += 350;
					}
					this._movement.canJump = false;
				}
				break;
		}
	}

};

module.exports = movementHelper;