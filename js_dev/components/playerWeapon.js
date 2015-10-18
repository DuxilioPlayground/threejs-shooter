var AnimMD2 = require('../libs/AnimMD2'),
	movementHelper = require('../libs/movementHelper');

var playerWeapon = {
	
	init: function(camera){
		var self = this;

		this._weapon = new AnimMD2({
	        md2: '/shotgun/hud/Dreadus-Shotgun.md2',
	        skin: '/shotgun/hud/Dreadus-Shotgun.jpg',
	        animTimeScale: 1.7,
	        onCreate: function(mesh){
	        	self._mesh = mesh;

	            mesh.scale.set(.05,.05,.05);
	            mesh.rotation.y = Math.PI / 2;
	            mesh.position.x -= 1;

	            camera.add(mesh);
	            mesh.add(self._sounds.shotgunFired);
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