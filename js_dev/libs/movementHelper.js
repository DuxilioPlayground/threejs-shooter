var movementHelper = {

	init: function(controls, collisionObjects, options){
		this._controls = controls;
		this._options = options;

		this._collisionObjects = collisionObjects;
		this._raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 10);

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

	getCurrMovement: function(){
		var movement = this._movement;

		for(var key in movement){
			if(movement[key]){
				if(['forward', 'backward', 'right', 'left'].indexOf(key) !== -1
					&& movement.canJump !== false){
					//walking and not jumping
					return 'walking';
				} else if(key === 'canJump'){
					//jumping
					return 'jumping'
				} else {
					//not walking, not jumping = idle
					return 'idle';
				}
			}
		}
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

    	//objects collision detection
    	var isOnObject = this._checkObjectsCollision();
    	if(isOnObject){
			velocity.y = Math.max(0, velocity.y);
			movement.canJump = true;
		}

    	//update controls
    	controls.getObject().translateZ(velocity.z * delta);
    	controls.getObject().translateY(velocity.y * delta);
    	controls.getObject().translateX(velocity.x * delta);

    	//detect floor
    	if(controls.getObject().position.y < 20) {
			velocity.y = 0;
			controls.getObject().position.y = 20;
			movement.canJump = true;
		}

    	this._prevTime = time;
	},

	_checkObjectsCollision: function(){
		var raycaster = this._raycaster,
			objects = this._collisionObjects,
			controls = this._controls;

    	raycaster.ray.origin.copy(controls.getObject().position);
		raycaster.ray.origin.y -= 10;

		var intersections = raycaster.intersectObjects(objects),
			isOnObject = intersections.length > 0;

    	return isOnObject;
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
		var options = this._options;
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
					if(this._movement.canJump || options.enableSuperJump){
						this._velocity.y += this._options.jumpHeight;
					}
					this._movement.canJump = false;
				}
				break;
		}
	}

};

module.exports = movementHelper;