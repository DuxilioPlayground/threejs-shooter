var AnimMD2 = require('../libs/AnimMD2'),
	movementHelper = require('../libs/movementHelper');

var playerWeapon = {
	
	init: function(camera){
		var self = this;

		this._weapon = new AnimMD2({
	        md2: '/shotgun/hud/Dreadus-Shotgun.md2',
	        skin: '/shotgun/hud/Dreadus-Shotgun.jpg',
	        animTimeScale: 2,
	        onCreate: function(mesh){
	        	self._mesh = mesh;

	            mesh.scale.set(.05,.05,.05);
	            mesh.rotation.y = Math.PI / 2;
	            mesh.position.x -= 1;

	            mesh.add(self._sounds.shotgunFired);

			    // var playerMesh = new Physijs.BoxMesh(
			    //     new THREE.BoxGeometry(20, 20, 20),
			    //     new THREE.MeshBasicMaterial({ color: 0xff0000 }),
			    //     200
			    // );
			    // playerMesh.position.z -= 0;
			    // playerMesh.add(mesh);

			    // playerMesh.addEventListener('collision', function(other_object, relative_velocity, relative_rotation, contact_normal) {
			    //     // `this` has collided with `other_object` with an impact speed of
			    //     //`relative_velocity` and a rotational force of `relative_rotation` and at normal `contact_normal`
			    //     console.log(arguments);
			    // });

	            camera.add(mesh);
	        }
	    });

		this._positionAnis = {
			breathing: {
				currOffset: 0,
				currAniDirection: 1,
				aniSpeed: .0002,
				maxOffset: .01,
				updateProp: 'rotation',
				updateAxis: 'z' 
			},
			walking: {
				currOffset: 0,
				currAniDirection: 1,
				aniSpeed: .009,
				maxOffset: .1,
				updateProp: 'position',
				updateAxis: 'z' 
			}
		};

		this._sounds = {};
		this._initSounds(camera);

		this._bindEvents();
	},

	update: function(){
		var currAniName = movementHelper.getCurrMovement() === 'walking' ? 'walking' : 'breathing';
		this._updatePositionAni(currAniName);
		this._weapon.update();
	},

	_initSounds: function(camera){
		var listener = new THREE.AudioListener();
		camera.add(listener);

		var shotgunFired = new THREE.Audio(listener);
		shotgunFired.load('assets_public/sounds/shotgunFired.mp3');
		this._sounds['shotgunFired'] = shotgunFired;
	},

	_updatePositionAni: function(name){
		//handles position animations using the
		//_positionAnis config

		var self = this,
			mesh = this._mesh,
			details = this._positionAnis[name];
		
		var speed = details.aniSpeed,
			currOffset = details.currOffset,
			aniDirection = details.currAniDirection,
			maxOffset = details.maxOffset,
			updateProp = details.updateProp,
			axis = details.updateAxis;

		if(mesh){
			if(aniDirection === 1){
				this._positionAnis[name].currOffset -= speed;
				mesh[updateProp][axis] -= speed;
			} else {
				this._positionAnis[name].currOffset += speed;
				mesh[updateProp][axis] += speed;
			}

			if(currOffset <= -maxOffset){
				this._positionAnis[name].currAniDirection = 2;
			} else if(currOffset >= maxOffset){
				this._positionAnis[name].currAniDirection = 1;
			}
		}	
	},

	_bindEvents: function(){
		var self = this;
		document.body.addEventListener('click', function(){
			self._triggerAction('pow');
		}, false);
	},

	_triggerAction: function(actionName){
		var weapon = this._weapon,
			mesh = this._mesh,
			shotgunFiredSound = mesh.children[0];

		switch(actionName){
			case 'pow':
				if(!shotgunFiredSound.isPlaying){
					weapon.playAnimation('pow', true);
					shotgunFiredSound.play();
				}
				break;
		}
	}

};

module.exports = playerWeapon;