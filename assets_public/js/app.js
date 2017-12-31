(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _worldHelper = require('../libs/worldHelper');

var _worldHelper2 = _interopRequireDefault(_worldHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  init: function init(scene, callback) {
    var _this = this;

    this._scene = scene;

    _worldHelper2.default.generateBoxes(250, '/crate3.jpg', function (boxes) {
      _worldHelper2.default.generateBoxes(250, '/crate-tnt-1.jpg', function (boxes2) {
        boxes = boxes.concat(boxes2);
        _this._addBoxesToScene(boxes);
        callback(boxes);
      });
    });
  },
  _addBoxesToScene: function _addBoxesToScene(boxMeshes) {
    var scene = this._scene;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = boxMeshes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var mesh = _step.value;

        scene.add(mesh);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
};

},{"../libs/worldHelper":13}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Character = require('../libs/Character');

var _Character2 = _interopRequireDefault(_Character);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  init: function init(scene) {
    var characters = [];
    var characterConfigs = [{
      x: 20,
      character: 'ogro'
    }, {
      x: -20
    }];

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = characterConfigs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var config = _step.value;

        var character = new _Character2.default(config);
        scene.add(character.getRaw().root);
        characters.push(character);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    this._characters = characters;
  },
  getCharacters: function getCharacters() {
    return this._characters;
  },
  update: function update() {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = this._characters[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var character = _step2.value;

        character.update();
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }
};

},{"../libs/Character":8}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.characters = exports.boxes = exports.playerWeapon = undefined;

var _playerWeapon = require('./playerWeapon');

var _playerWeapon2 = _interopRequireDefault(_playerWeapon);

var _boxes = require('./boxes');

var _boxes2 = _interopRequireDefault(_boxes);

var _characters = require('./characters');

var _characters2 = _interopRequireDefault(_characters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.playerWeapon = _playerWeapon2.default;
exports.boxes = _boxes2.default;
exports.characters = _characters2.default;

},{"./boxes":1,"./characters":2,"./playerWeapon":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AnimMD = require('../libs/AnimMD2');

var _AnimMD2 = _interopRequireDefault(_AnimMD);

var _movementHelper = require('../libs/movementHelper');

var _movementHelper2 = _interopRequireDefault(_movementHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  init: function init(camera) {
    var _this = this;

    this._weapon = new _AnimMD2.default({
      md2: '/shotgun/hud/Dreadus-Shotgun.md2',
      skin: '/shotgun/hud/Dreadus-Shotgun.jpg',
      animTimeScale: 2,
      onCreate: function onCreate(mesh) {
        _this._mesh = mesh;

        mesh.scale.set(.05, .05, .05);
        mesh.rotation.y = Math.PI / 2;
        mesh.position.x -= 1;

        camera.add(mesh);
        mesh.add(_this._sounds.shotgunFired);
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

    this._animationCallbacks = [];

    this._bindEvents();
  },
  onAnimation: function onAnimation(name, callback) {
    this._animationCallbacks[name] = callback;
  },
  update: function update() {
    var currAniName = _movementHelper2.default.getCurrMovement() === 'walking' ? 'walking' : 'breathing';
    this._updatePositionAni(currAniName);
    this._weapon.update();
  },
  _initSounds: function _initSounds(camera) {
    var listener = new THREE.AudioListener();
    camera.add(listener);

    var shotgunFired = new THREE.Audio(listener);
    shotgunFired.load('assets_public/sounds/shotgunFired.mp3');
    this._sounds['shotgunFired'] = shotgunFired;
  },
  _updatePositionAni: function _updatePositionAni(name) {
    var mesh = this._mesh;
    var details = this._positionAnis[name];

    var aniSpeed = details.aniSpeed,
        currOffset = details.currOffset,
        currAniDirection = details.currAniDirection,
        maxOffset = details.maxOffset,
        updateProp = details.updateProp,
        updateAxis = details.updateAxis;


    if (!mesh) {
      return;
    }

    if (currAniDirection === 1) {
      this._positionAnis[name].currOffset -= aniSpeed;
      mesh[updateProp][updateAxis] -= aniSpeed;
    } else {
      this._positionAnis[name].currOffset += aniSpeed;
      mesh[updateProp][updateAxis] += aniSpeed;
    }

    if (currOffset <= -maxOffset) {
      this._positionAnis[name].currAniDirection = 2;
    } else if (currOffset >= maxOffset) {
      this._positionAnis[name].currAniDirection = 1;
    }
  },
  _bindEvents: function _bindEvents() {
    var _this2 = this;

    document.body.addEventListener('click', function () {
      return _this2._triggerAction('pow');
    }, false);
  },
  _triggerAction: function _triggerAction(actionName) {
    var weapon = this._weapon;
    var mesh = this._mesh;
    var shotgunFiredSound = mesh.children[0];
    var animationCallbacks = this._animationCallbacks;

    switch (actionName) {
      case 'pow':
        if (!shotgunFiredSound.isPlaying) {
          weapon.playAnimation('pow', true);
          shotgunFiredSound.play();
          if (animationCallbacks.pow) {
            animationCallbacks.pow();
          }
        }
        break;
    }
  }
};

},{"../libs/AnimMD2":6,"../libs/movementHelper":11}],5:[function(require,module,exports){
module.exports={
	"movement": {
		"speed": 600,
		"jumpHeight": 350,
		"enableSuperJump": false
	},
    "paths": {
        "img": "assets_public/img",
        "models": "assets_public/models",
        "sounds": "assets_public/sounds"
    }
}
},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AnimMD2 = function () {
	function AnimMD2(options) {
		var _this = this;

		_classCallCheck(this, AnimMD2);

		var loader = new THREE.MD2Loader();

		//check animTimeScale option property
		options.animTimeScale = options.animTimeScale || 1;
		options.md2 = _config2.default.paths.models + options.md2;
		options.skin = _config2.default.paths.models + options.skin;

		//set class vars
		this._options = options;
		this._clock = new THREE.Clock();

		//preload md2 and mesh
		loader.load(options.md2, function (geo) {
			geo.computeBoundingBox();

			var mesh = _this._mesh = _this._createMD2Part(geo, THREE.ImageUtils.loadTexture(options.skin));
			options.onCreate(mesh);
		});
	}

	_createClass(AnimMD2, [{
		key: '_createMD2Part',
		value: function _createMD2Part(geometry, skinMap) {
			var materialWireframe = new THREE.MeshLambertMaterial({ color: 0xffaa00, wireframe: true, morphTargets: true, morphNormals: true });
			var materialTexture = new THREE.MeshLambertMaterial({ color: 0xffffff, wireframe: false, map: skinMap, morphTargets: true, morphNormals: true });

			var mesh = new THREE.Mesh(geometry, materialTexture);
			mesh.rotation.y = -Math.PI / 2;

			mesh.castShadow = true;
			mesh.receiveShadow = true;

			mesh.materialTexture = materialTexture;
			mesh.materialWireframe = materialWireframe;

			this._playingAnimation = false;
			this._mixer = new THREE.AnimationMixer(mesh);
			this._mesh = mesh;

			if (this._options.animation) {
				this.playAnimation(this._options.animation);
			}

			return mesh;
		}
	}, {
		key: 'playAnimation',
		value: function playAnimation(name, playOnce) {
			var _this2 = this;

			if (this._playingAnimation) {
				return;
			}

			var options = this._options;
			var mixer = this._mixer = new THREE.AnimationMixer(mesh);
			var mesh = this._mesh;
			var timeScale = options.animTimeScale;

			//speed animation up by <timeScale>
			//duration is now <duration>/<timeScale>
			mixer.timeScale = timeScale;

			if (!mesh) {
				return;
			}

			var clip = THREE.AnimationClip.findByName(mesh.geometry.animations, name);

			if (!clip) {
				return;
			}

			var action = new THREE.AnimationAction(clip, mixer.time).setLocalRoot(mesh);

			mixer.addAction(action);
			this._playingAnimation = true;

			if (!playOnce) {
				return;
			}

			setTimeout(function () {
				mixer.removeAction(action);
				_this2._playingAnimation = false;
			}, clip.duration / timeScale * 1000);
		}
	}, {
		key: 'update',
		value: function update() {
			var delta = this._clock.getDelta();
			if (this._mixer) this._mixer.update(delta);
		}
	}]);

	return AnimMD2;
}();

exports.default = AnimMD2;

},{"../config":5}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	ratamahatta: {
		path: '/ratamahatta/',
		body: "ratamahatta.md2",
		skins: ["ratamahatta.png", "ctf_b.png", "ctf_r.png", "dead.png", "gearwhore.png"],
		weapons: [["weapon.md2", "weapon.png"], ["w_bfg.md2", "w_bfg.png"], ["w_blaster.md2", "w_blaster.png"], ["w_chaingun.md2", "w_chaingun.png"], ["w_glauncher.md2", "w_glauncher.png"], ["w_hyperblaster.md2", "w_hyperblaster.png"], ["w_machinegun.md2", "w_machinegun.png"], ["w_railgun.md2", "w_railgun.png"], ["w_rlauncher.md2", "w_rlauncher.png"], ["w_shotgun.md2", "w_shotgun.png"], ["w_sshotgun.md2", "w_sshotgun.png"]]
	},
	ogro: {
		path: "/ogro/",
		body: "ogro.md2",
		skins: ["grok.jpg", "ogrobase.png", "arboshak.png", "ctf_r.png", "ctf_b.png", "darkam.png", "freedom.png", "gib.png", "gordogh.png", "igdosh.png", "khorne.png", "nabogro.png", "sharokh.png"],
		weapons: [["weapon.md2", "weapon.jpg"]]
	}
};

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _charactersConfig = require('./charactersConfig');

var _charactersConfig2 = _interopRequireDefault(_charactersConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Character = function () {
  function Character() {
    var userOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Character);

    var options = this._options = Object.assign({
      character: 'ratamahatta',
      skin: 0,
      animation: 'stand'
    }, userOptions);

    var charConfig = _charactersConfig2.default[options.character];
    var character = this._createCharacter(charConfig);

    this._eventListeners = {};
    this._clock = new THREE.Clock();

    this._character = character;
  }

  _createClass(Character, [{
    key: 'on',
    value: function on(event, callback) {
      if (typeof this._eventListeners[event] !== 'array') {
        this._eventListeners[event] = [];
      }
      this._eventListeners[event].push(callback);
    }
  }, {
    key: '_triggerEvent',
    value: function _triggerEvent(event) {
      var _this = this;

      var listeners = this._eventListeners[event];

      if ((typeof listeners === 'undefined' ? 'undefined' : _typeof(listeners)) === 'object') {
        listeners.forEach(function (callback) {
          callback(_this.getRaw());
        });
      }
    }
  }, {
    key: '_createCharacter',
    value: function _createCharacter(charConfig) {
      var _this2 = this;

      var options = this._options;
      var character = new THREE.MD2Character();

      character.scale = .5;

      character.onLoadComplete = function () {
        _this2.setSkin(options.skin);
        _this2.setAnimation(options.animation);

        if (typeof options.weapon === 'number') {
          _this2.setWeapon(options.weapon);
        }

        if (typeof options.x === 'number') {
          character.root.position.x = options.x;
        }

        if (typeof options.y === 'number') {
          character.root.position.y = options.y;
        }

        if (typeof options.z === 'number') {
          character.root.position.z = options.z;
        }

        _this2._triggerEvent('create');
      };

      charConfig.baseUrl = _config2.default.paths.models + charConfig.path;
      character.loadParts(charConfig);

      return character;
    }
  }, {
    key: 'setSkin',
    value: function setSkin(idx) {
      //character.skinsBody
      this._character.setSkin(idx);
    }
  }, {
    key: 'setWeapon',
    value: function setWeapon(idx) {
      //character.weapons
      this._character.setWeapon(idx);
    }
  }, {
    key: 'setAnimation',
    value: function setAnimation(name) {
      //character.meshBody.geometry.animations
      this._character.setAnimation(name);
    }
  }, {
    key: 'getRaw',
    value: function getRaw() {
      return this._character;
    }
  }, {
    key: 'update',
    value: function update() {
      var delta = this._clock.getDelta();
      this._character.update(delta);
    }
  }]);

  return Character;
}();

exports.default = Character;

},{"../../config":5,"./charactersConfig":7}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  init: function init(element, camera, controls) {
    this._controls = new THREE.PointerLockControls(camera);
    this._element = element;
    this._bindEvents();
  },
  getControls: function getControls() {
    return this._controls;
  },
  getEnabled: function getEnabled() {
    return this._controls.enabled;
  },
  _bindEvents: function _bindEvents() {
    document.body.addEventListener('click', this._requestLock.bind(this));
    document.addEventListener('pointerlockchange', this._onLockChange.bind(this), false);
    document.addEventListener('mozpointerlockchange', this._onLockChange.bind(this), false);
    document.addEventListener('webkitpointerlockchange', this._onLockChange.bind(this), false);
  },
  _requestLock: function _requestLock() {
    var element = this._element;
    element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
    element.requestPointerLock();
  },
  _onLockChange: function _onLockChange() {
    var element = this._element;
    if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {
      console.log('Pointer locked');
      this._controls.enabled = true;
    } else {
      console.log('Pointer lock removed');
      this._controls.enabled = false;
    }
  }
};

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  init: function init(camera) {
    this._raycaster = new THREE.Raycaster();
    this._mouse = new THREE.Vector2();
    this._camera = camera;
    this._bindEvents();
  },
  _bindEvents: function _bindEvents() {
    var node = document.querySelector('.cursor');
    node.setAttribute('style', 'position: absolute; top: 50%; left: 50%; width: 5px; height: 5px; border: solid 1px red; border-radius: 100%; margin: -10px 0 0 -10px; z-index 99;');
    window.addEventListener('mousemove', this._onMouseMove.bind(this));
  },
  _onMouseMove: function _onMouseMove(event) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    var x = event.clientX / window.innerWidth * 2 - 1;
    var y = -(event.clientY / window.innerHeight) * 2 + 1;

    this._mouse.x = x;
    this._mouse.y = y;
  },
  checkCollidingWithObjects: function checkCollidingWithObjects(objects) {
    var maxDistance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    var raycaster = this._raycaster;

    if (maxDistance) {
      raycaster.far = maxDistance;
    }

    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(this._mouse, this._camera);

    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects(objects);

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = intersects[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var object = _step.value.object;

        object.material.color.set(0xff0000);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return intersects;
  }
};

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  init: function init(controls, collisionObjects, options) {
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
  getCurrMovement: function getCurrMovement() {
    var movement = this._movement;

    for (var key in movement) {
      if (!movement[key]) {
        continue;
      }

      if (['forward', 'backward', 'right', 'left'].indexOf(key) !== -1 && movement.canJump !== false) {
        //walking and not jumping
        return 'walking';
      } else if (key === 'canJump') {
        //jumping
        return 'jumping';
      } else {
        //not walking, not jumping = idle
        return 'idle';
      }
    }
  },
  checkMovement: function checkMovement() {
    var controls = this._controls;
    var velocity = this._velocity;
    var movement = this._movement;
    var options = this._options;

    var time = performance.now();
    var delta = (time - this._prevTime) / 1000;

    //update velocity
    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;
    velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

    //check directional movement
    if (movement.forward) velocity.z -= options.movementSpeed * delta;
    if (movement.backward) velocity.z += options.movementSpeed * delta;
    if (movement.left) velocity.x -= options.movementSpeed * delta;
    if (movement.right) velocity.x += options.movementSpeed * delta;

    //objects collision detection
    var isOnObject = this._checkObjectsCollision();
    if (isOnObject) {
      velocity.y = Math.max(0, velocity.y);
      movement.canJump = true;
    }

    //update controls
    var controlsObject = controls.getObject();
    controlsObject.translateZ(velocity.z * delta);
    controlsObject.translateY(velocity.y * delta);
    controlsObject.translateX(velocity.x * delta);

    //detect floor
    if (controls.getObject().position.y < 20) {
      velocity.y = 0;
      controlsObject.position.y = 20;
      movement.canJump = true;
    }

    this._prevTime = time;
  },
  _checkObjectsCollision: function _checkObjectsCollision() {
    var raycaster = this._raycaster;
    var objects = this._collisionObjects;
    var controls = this._controls;

    raycaster.ray.origin.copy(controls.getObject().position);
    raycaster.ray.origin.y -= 10;

    var intersections = raycaster.intersectObjects(objects);
    var isOnObject = intersections.length > 0;

    return isOnObject;
  },
  _bindKeyEvents: function _bindKeyEvents() {
    var _this = this;

    document.addEventListener('keydown', function (_ref) {
      var keyCode = _ref.keyCode;
      return _this._checkKeys(keyCode, true);
    }, false);
    document.addEventListener('keyup', function (_ref2) {
      var keyCode = _ref2.keyCode;
      return _this._checkKeys(keyCode, false);
    }, false);
  },
  _checkKeys: function _checkKeys(keyCode, setToVal) {
    var options = this._options;
    switch (keyCode) {
      case 87:
        //w
        this._movement.forward = setToVal;
        break;
      case 83:
        //s
        this._movement.backward = setToVal;
        break;
      case 68:
        // d
        this._movement.right = setToVal;
        break;
      case 65:
        // a
        this._movement.left = setToVal;
        break;
      case 32:
        // space
        if (setToVal === true) {
          //keydown
          if (this._movement.canJump || options.enableSuperJump) {
            this._velocity.y += this._options.jumpHeight;
          }
          this._movement.canJump = false;
        }
        break;
    }
  }
};

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	rand: function rand(min, max) {
		return Math.floor(Math.random() * max + min);
	}
};

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  generateRenderer: function generateRenderer(clearHex) {
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(clearHex);
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    return renderer;
  },
  generateFloor: function generateFloor() {
    var geometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);

    geometry.rotateX(-Math.PI / 2);

    for (var i = 0, l = geometry.vertices.length; i < l; i++) {
      var vertex = geometry.vertices[i];
      vertex.x += Math.random() * 20;
      vertex.z += Math.random() * 20;
      vertex.y += Math.random();
    }

    for (var _i = 0, _l = geometry.faces.length; _i < _l; _i++) {
      var face = geometry.faces[_i];
      var colors = [];

      for (var j = 0; j < 3; j++) {
        var color = new THREE.Color('rgb(' + _utils2.default.rand(100, 180) + ',' + _utils2.default.rand(100, 180) + ',' + _utils2.default.rand(100, 180) + ')');
        colors.push(color);
      }

      for (var _j = 0; _j < 3; _j++) {
        face.vertexColors[_j] = colors[_j];
      }
    }

    var material = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors });
    return new THREE.Mesh(geometry, material);
  },
  generateBoxes: function generateBoxes(amount, texturePath, callback) {
    var _this = this;

    var textureLoader = new THREE.TextureLoader();

    var doGenerate = function doGenerate(crateTexture) {
      var mesh = void 0;
      var boxes = [];

      for (var i = 0; i < amount; i++) {
        mesh = _this._generateBox({
          width: 20,
          height: 20,
          depth: 20,
          rgb: [55, 81, 159],
          texture: crateTexture
        });

        mesh.position.x = Math.floor(Math.random() * 20 - 10) * 20;
        mesh.position.y = Math.floor(Math.random() * 20) * 20 + 10;
        mesh.position.z = Math.floor(Math.random() * 20 - 10) * 20;

        mesh.rotation.y = -100;
        boxes.push(mesh);
      }

      callback(boxes);
    };

    textureLoader.load(_config2.default.paths.img + texturePath, function (crateTexture) {
      doGenerate(crateTexture);
    });
  },
  _generateBox: function _generateBox(options) {
    var width = options.width;
    var height = options.height;
    var depth = options.depth;
    var rgb = options.rgb;
    var box = new THREE.BoxGeometry(width, height, depth);
    var material = void 0;

    if (options.texture) {
      material = new THREE.MeshPhongMaterial({
        map: options.texture
      });
    } else {
      material = new THREE.MeshBasicMaterial({
        vertexColors: THREE.VertexColors
      });

      var face = void 0;
      var color = void 0;

      for (var i = 0; i < box.faces.length; i++) {
        face = box.faces[i];
        color = new THREE.Color('rgb(' + (rgb[0] + i * 4) + ',' + (rgb[1] + i * 4) + ',' + (rgb[0] + i * 4) + ')');
        face.color = color;
      }
    }

    return new THREE.Mesh(box, material);
  }
};

},{"../config":5,"./utils":12}],14:[function(require,module,exports){
'use strict';

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _utils = require('./libs/utils');

var _utils2 = _interopRequireDefault(_utils);

var _worldHelper = require('./libs/worldHelper');

var _worldHelper2 = _interopRequireDefault(_worldHelper);

var _lockControlsHelper = require('./libs/lockControlsHelper');

var _lockControlsHelper2 = _interopRequireDefault(_lockControlsHelper);

var _movementHelper = require('./libs/movementHelper');

var _movementHelper2 = _interopRequireDefault(_movementHelper);

var _mouseHelper = require('./libs/mouseHelper');

var _mouseHelper2 = _interopRequireDefault(_mouseHelper);

var _components = require('./components');

var components = _interopRequireWildcard(_components);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var scene = null;
var camera = null;
var renderer = null;
var stats = null;

var componentsToUpdate = Object.values(components).filter(function (_ref) {
  var update = _ref.update;
  return typeof update === 'function';
});
var containerNode = document.body;

initStats();
init();
update();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

  //light
  var light = new THREE.HemisphereLight(0xffffff, 0xaaaaaa, 0.6);
  scene.add(light);

  //floor
  var floorMesh = _worldHelper2.default.generateFloor();
  scene.add(floorMesh);

  //renderer
  renderer = _worldHelper2.default.generateRenderer(0x0f445c);
  containerNode.appendChild(renderer.domElement);

  _lockControlsHelper2.default.init(containerNode, camera);
  var controls = _lockControlsHelper2.default.getControls();
  scene.add(controls.getObject());

  //boxes
  components.boxes.init(scene, function (boxes) {
    _movementHelper2.default.init(controls, boxes, {
      movementSpeed: _config2.default.movement.speed,
      jumpHeight: _config2.default.movement.jumpHeight,
      enableSuperJump: _config2.default.movement.enableSuperJump
    });

    //characters
    components.characters.init(scene, boxes);
    _mouseHelper2.default.init(camera);

    //weapon
    components.playerWeapon.init(camera);
    components.playerWeapon.onAnimation('pow', function () {
      var collidingBoxes = _mouseHelper2.default.checkCollidingWithObjects(window.boxes);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = collidingBoxes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var object = _step.value.object;

          scene.remove(object);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    });

    window.boxes = boxes;
  });
}

function update() {
  stats.begin();

  if (_lockControlsHelper2.default.getEnabled()) {
    _movementHelper2.default.checkMovement();

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = componentsToUpdate[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var component = _step2.value;

        component.update();
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }

  renderer.render(scene, camera);

  stats.end();
  requestAnimationFrame(update);
}

function initStats() {
  stats = new Stats();
  stats.setMode(0);

  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  containerNode.appendChild(stats.domElement);
}

},{"./components":3,"./config":5,"./libs/lockControlsHelper":9,"./libs/mouseHelper":10,"./libs/movementHelper":11,"./libs/utils":12,"./libs/worldHelper":13}]},{},[14])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqc19kZXYvY29tcG9uZW50cy9ib3hlcy5qcyIsImpzX2Rldi9jb21wb25lbnRzL2NoYXJhY3RlcnMuanMiLCJqc19kZXYvY29tcG9uZW50cy9pbmRleC5qcyIsImpzX2Rldi9jb21wb25lbnRzL3BsYXllcldlYXBvbi5qcyIsImpzX2Rldi9jb25maWcuanNvbiIsImpzX2Rldi9saWJzL0FuaW1NRDIuanMiLCJqc19kZXYvbGlicy9DaGFyYWN0ZXIvY2hhcmFjdGVyc0NvbmZpZy5qcyIsImpzX2Rldi9saWJzL0NoYXJhY3Rlci9pbmRleC5qcyIsImpzX2Rldi9saWJzL2xvY2tDb250cm9sc0hlbHBlci5qcyIsImpzX2Rldi9saWJzL21vdXNlSGVscGVyLmpzIiwianNfZGV2L2xpYnMvbW92ZW1lbnRIZWxwZXIuanMiLCJqc19kZXYvbGlicy91dGlscy5qcyIsImpzX2Rldi9saWJzL3dvcmxkSGVscGVyLmpzIiwianNfZGV2L21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQTs7Ozs7O2tCQUVlO0FBQ2IsTUFEYSxnQkFDUixLQURRLEVBQ0QsUUFEQyxFQUNTO0FBQUE7O0FBQ3BCLFNBQUssTUFBTCxHQUFjLEtBQWQ7O0FBRUEsMEJBQVksYUFBWixDQUEwQixHQUExQixFQUErQixhQUEvQixFQUE4QyxVQUFDLEtBQUQsRUFBVztBQUN2RCw0QkFBWSxhQUFaLENBQTBCLEdBQTFCLEVBQStCLGtCQUEvQixFQUFtRCxVQUFDLE1BQUQsRUFBWTtBQUM3RCxnQkFBUSxNQUFNLE1BQU4sQ0FBYSxNQUFiLENBQVI7QUFDQSxjQUFLLGdCQUFMLENBQXNCLEtBQXRCO0FBQ0EsaUJBQVMsS0FBVDtBQUNELE9BSkQ7QUFLRCxLQU5EO0FBT0QsR0FYWTtBQWFiLGtCQWJhLDRCQWFJLFNBYkosRUFhZTtBQUMxQixRQUFNLFFBQVEsS0FBSyxNQUFuQjtBQUQwQjtBQUFB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R0FBNkIsS0FBN0I7QUFDQSxnQkFBYyxXQUFkLENBQTBCLE1BQU0sVUFBaEM7QUFDRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgd29ybGRIZWxwZXIgZnJvbSAnLi4vbGlicy93b3JsZEhlbHBlcic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdChzY2VuZSwgY2FsbGJhY2spIHtcbiAgICB0aGlzLl9zY2VuZSA9IHNjZW5lO1xuXG4gICAgd29ybGRIZWxwZXIuZ2VuZXJhdGVCb3hlcygyNTAsICcvY3JhdGUzLmpwZycsIChib3hlcykgPT4ge1xuICAgICAgd29ybGRIZWxwZXIuZ2VuZXJhdGVCb3hlcygyNTAsICcvY3JhdGUtdG50LTEuanBnJywgKGJveGVzMikgPT4ge1xuICAgICAgICBib3hlcyA9IGJveGVzLmNvbmNhdChib3hlczIpO1xuICAgICAgICB0aGlzLl9hZGRCb3hlc1RvU2NlbmUoYm94ZXMpO1xuICAgICAgICBjYWxsYmFjayhib3hlcyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSxcblxuICBfYWRkQm94ZXNUb1NjZW5lKGJveE1lc2hlcykge1xuICAgIGNvbnN0IHNjZW5lID0gdGhpcy5fc2NlbmU7XG4gICAgZm9yIChjb25zdCBtZXNoIG9mIGJveE1lc2hlcykge1xuICAgICAgc2NlbmUuYWRkKG1lc2gpO1xuICAgIH1cbiAgfVxufTtcbiIsImltcG9ydCBDaGFyYWN0ZXIgZnJvbSAnLi4vbGlicy9DaGFyYWN0ZXInO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGluaXQoc2NlbmUpIHtcbiAgICBjb25zdCBjaGFyYWN0ZXJzID0gW107XG4gICAgY29uc3QgY2hhcmFjdGVyQ29uZmlncyA9IFt7XG4gICAgICB4OiAyMCxcbiAgICAgIGNoYXJhY3RlcjogJ29ncm8nXG4gICAgfSwge1xuICAgICAgeDogLTIwXG4gICAgfV07XG5cbiAgICBmb3IgKGNvbnN0IGNvbmZpZyBvZiBjaGFyYWN0ZXJDb25maWdzKSB7XG4gICAgICBjb25zdCBjaGFyYWN0ZXIgPSBuZXcgQ2hhcmFjdGVyKGNvbmZpZyk7XG4gICAgICBzY2VuZS5hZGQoY2hhcmFjdGVyLmdldFJhdygpLnJvb3QpO1xuICAgICAgY2hhcmFjdGVycy5wdXNoKGNoYXJhY3Rlcik7XG4gICAgfVxuXG4gICAgdGhpcy5fY2hhcmFjdGVycyA9IGNoYXJhY3RlcnM7XG4gIH0sXG5cbiAgZ2V0Q2hhcmFjdGVycygpIHtcbiAgICByZXR1cm4gdGhpcy5fY2hhcmFjdGVycztcbiAgfSxcblxuICB1cGRhdGUoKSB7XG4gICAgZm9yIChjb25zdCBjaGFyYWN0ZXIgb2YgdGhpcy5fY2hhcmFjdGVycykge1xuICAgICAgY2hhcmFjdGVyLnVwZGF0ZSgpO1xuICAgIH1cbiAgfVxufTtcbiIsImltcG9ydCBwbGF5ZXJXZWFwb24gZnJvbSAnLi9wbGF5ZXJXZWFwb24nO1xuaW1wb3J0IGJveGVzIGZyb20gJy4vYm94ZXMnO1xuaW1wb3J0IGNoYXJhY3RlcnMgZnJvbSAnLi9jaGFyYWN0ZXJzJztcblxuZXhwb3J0IHtwbGF5ZXJXZWFwb24sIGJveGVzLCBjaGFyYWN0ZXJzfTtcbiIsImltcG9ydCBBbmltTUQyIGZyb20gJy4uL2xpYnMvQW5pbU1EMic7XG5pbXBvcnQgbW92ZW1lbnRIZWxwZXIgZnJvbSAnLi4vbGlicy9tb3ZlbWVudEhlbHBlcic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdChjYW1lcmEpIHtcbiAgICB0aGlzLl93ZWFwb24gPSBuZXcgQW5pbU1EMih7XG4gICAgICBtZDI6ICcvc2hvdGd1bi9odWQvRHJlYWR1cy1TaG90Z3VuLm1kMicsXG4gICAgICBza2luOiAnL3Nob3RndW4vaHVkL0RyZWFkdXMtU2hvdGd1bi5qcGcnLFxuICAgICAgYW5pbVRpbWVTY2FsZTogMixcbiAgICAgIG9uQ3JlYXRlOiAobWVzaCkgPT4ge1xuICAgICAgICB0aGlzLl9tZXNoID0gbWVzaDtcblxuICAgICAgICBtZXNoLnNjYWxlLnNldCguMDUsLjA1LC4wNSk7XG4gICAgICAgIG1lc2gucm90YXRpb24ueSA9IE1hdGguUEkgLyAyO1xuICAgICAgICBtZXNoLnBvc2l0aW9uLnggLT0gMTtcblxuICAgICAgICBjYW1lcmEuYWRkKG1lc2gpO1xuICAgICAgICBtZXNoLmFkZCh0aGlzLl9zb3VuZHMuc2hvdGd1bkZpcmVkKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuX3Bvc2l0aW9uQW5pcyA9IHtcbiAgICAgIGJyZWF0aGluZzoge1xuICAgICAgICBjdXJyT2Zmc2V0OiAwLFxuICAgICAgICBjdXJyQW5pRGlyZWN0aW9uOiAxLFxuICAgICAgICBhbmlTcGVlZDogLjAwMDIsXG4gICAgICAgIG1heE9mZnNldDogLjAxLFxuICAgICAgICB1cGRhdGVQcm9wOiAncm90YXRpb24nLFxuICAgICAgICB1cGRhdGVBeGlzOiAneidcbiAgICAgIH0sXG4gICAgICB3YWxraW5nOiB7XG4gICAgICAgIGN1cnJPZmZzZXQ6IDAsXG4gICAgICAgIGN1cnJBbmlEaXJlY3Rpb246IDEsXG4gICAgICAgIGFuaVNwZWVkOiAuMDA5LFxuICAgICAgICBtYXhPZmZzZXQ6IC4xLFxuICAgICAgICB1cGRhdGVQcm9wOiAncG9zaXRpb24nLFxuICAgICAgICB1cGRhdGVBeGlzOiAneidcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5fc291bmRzID0ge307XG4gICAgdGhpcy5faW5pdFNvdW5kcyhjYW1lcmEpO1xuXG4gICAgdGhpcy5fYW5pbWF0aW9uQ2FsbGJhY2tzID0gW107XG5cbiAgICB0aGlzLl9iaW5kRXZlbnRzKCk7XG4gIH0sXG5cbiAgb25BbmltYXRpb24obmFtZSwgY2FsbGJhY2spIHtcbiAgICB0aGlzLl9hbmltYXRpb25DYWxsYmFja3NbbmFtZV0gPSBjYWxsYmFjaztcbiAgfSxcblxuICB1cGRhdGUoKSB7XG4gICAgY29uc3QgY3VyckFuaU5hbWUgPSBtb3ZlbWVudEhlbHBlci5nZXRDdXJyTW92ZW1lbnQoKSA9PT0gJ3dhbGtpbmcnID8gJ3dhbGtpbmcnIDogJ2JyZWF0aGluZyc7XG4gICAgdGhpcy5fdXBkYXRlUG9zaXRpb25BbmkoY3VyckFuaU5hbWUpO1xuICAgIHRoaXMuX3dlYXBvbi51cGRhdGUoKTtcbiAgfSxcblxuICBfaW5pdFNvdW5kcyhjYW1lcmEpIHtcbiAgICB2YXIgbGlzdGVuZXIgPSBuZXcgVEhSRUUuQXVkaW9MaXN0ZW5lcigpO1xuICAgIGNhbWVyYS5hZGQobGlzdGVuZXIpO1xuXG4gICAgdmFyIHNob3RndW5GaXJlZCA9IG5ldyBUSFJFRS5BdWRpbyhsaXN0ZW5lcik7XG4gICAgc2hvdGd1bkZpcmVkLmxvYWQoJ2Fzc2V0c19wdWJsaWMvc291bmRzL3Nob3RndW5GaXJlZC5tcDMnKTtcbiAgICB0aGlzLl9zb3VuZHNbJ3Nob3RndW5GaXJlZCddID0gc2hvdGd1bkZpcmVkO1xuICB9LFxuXG4gIF91cGRhdGVQb3NpdGlvbkFuaShuYW1lKSB7XG4gICAgY29uc3QgbWVzaCA9IHRoaXMuX21lc2g7XG4gICAgY29uc3QgZGV0YWlscyA9IHRoaXMuX3Bvc2l0aW9uQW5pc1tuYW1lXTtcblxuICAgIGNvbnN0IHtcbiAgICAgIGFuaVNwZWVkLFxuICAgICAgY3Vyck9mZnNldCxcbiAgICAgIGN1cnJBbmlEaXJlY3Rpb24sXG4gICAgICBtYXhPZmZzZXQsXG4gICAgICB1cGRhdGVQcm9wLFxuICAgICAgdXBkYXRlQXhpc1xuICAgIH0gPSBkZXRhaWxzO1xuXG4gICAgaWYgKCFtZXNoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYoY3VyckFuaURpcmVjdGlvbiA9PT0gMSl7XG4gICAgICB0aGlzLl9wb3NpdGlvbkFuaXNbbmFtZV0uY3Vyck9mZnNldCAtPSBhbmlTcGVlZDtcbiAgICAgIG1lc2hbdXBkYXRlUHJvcF1bdXBkYXRlQXhpc10gLT0gYW5pU3BlZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3Bvc2l0aW9uQW5pc1tuYW1lXS5jdXJyT2Zmc2V0ICs9IGFuaVNwZWVkO1xuICAgICAgbWVzaFt1cGRhdGVQcm9wXVt1cGRhdGVBeGlzXSArPSBhbmlTcGVlZDtcbiAgICB9XG5cbiAgICBpZihjdXJyT2Zmc2V0IDw9IC1tYXhPZmZzZXQpe1xuICAgICAgdGhpcy5fcG9zaXRpb25BbmlzW25hbWVdLmN1cnJBbmlEaXJlY3Rpb24gPSAyO1xuICAgIH0gZWxzZSBpZihjdXJyT2Zmc2V0ID49IG1heE9mZnNldCl7XG4gICAgICB0aGlzLl9wb3NpdGlvbkFuaXNbbmFtZV0uY3VyckFuaURpcmVjdGlvbiA9IDE7XG4gICAgfVxuICB9LFxuXG4gIF9iaW5kRXZlbnRzKCkge1xuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLl90cmlnZ2VyQWN0aW9uKCdwb3cnKSwgZmFsc2UpO1xuICB9LFxuXG4gIF90cmlnZ2VyQWN0aW9uKGFjdGlvbk5hbWUpIHtcbiAgICBjb25zdCB3ZWFwb24gPSB0aGlzLl93ZWFwb247XG4gICAgY29uc3QgbWVzaCA9IHRoaXMuX21lc2g7XG4gICAgY29uc3Qgc2hvdGd1bkZpcmVkU291bmQgPSBtZXNoLmNoaWxkcmVuWzBdO1xuICAgIGNvbnN0IGFuaW1hdGlvbkNhbGxiYWNrcyA9IHRoaXMuX2FuaW1hdGlvbkNhbGxiYWNrcztcblxuICAgIHN3aXRjaChhY3Rpb25OYW1lKXtcbiAgICAgIGNhc2UgJ3Bvdyc6XG4gICAgICAgIGlmKCFzaG90Z3VuRmlyZWRTb3VuZC5pc1BsYXlpbmcpe1xuICAgICAgICAgIHdlYXBvbi5wbGF5QW5pbWF0aW9uKCdwb3cnLCB0cnVlKTtcbiAgICAgICAgICBzaG90Z3VuRmlyZWRTb3VuZC5wbGF5KCk7XG4gICAgICAgICAgaWYgKGFuaW1hdGlvbkNhbGxiYWNrcy5wb3cpIHtcbiAgICAgICAgICAgIGFuaW1hdGlvbkNhbGxiYWNrcy5wb3coKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzPXtcblx0XCJtb3ZlbWVudFwiOiB7XG5cdFx0XCJzcGVlZFwiOiA2MDAsXG5cdFx0XCJqdW1wSGVpZ2h0XCI6IDM1MCxcblx0XHRcImVuYWJsZVN1cGVySnVtcFwiOiBmYWxzZVxuXHR9LFxuICAgIFwicGF0aHNcIjoge1xuICAgICAgICBcImltZ1wiOiBcImFzc2V0c19wdWJsaWMvaW1nXCIsXG4gICAgICAgIFwibW9kZWxzXCI6IFwiYXNzZXRzX3B1YmxpYy9tb2RlbHNcIixcbiAgICAgICAgXCJzb3VuZHNcIjogXCJhc3NldHNfcHVibGljL3NvdW5kc1wiXG4gICAgfVxufSIsImltcG9ydCBDT05GSUcgZnJvbSAnLi4vY29uZmlnJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQW5pbU1EMiB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRjb25zdCBsb2FkZXIgPSBuZXcgVEhSRUUuTUQyTG9hZGVyKCk7XG5cblx0XHQvL2NoZWNrIGFuaW1UaW1lU2NhbGUgb3B0aW9uIHByb3BlcnR5XG5cdFx0b3B0aW9ucy5hbmltVGltZVNjYWxlID0gb3B0aW9ucy5hbmltVGltZVNjYWxlIHx8IDE7XG5cdFx0b3B0aW9ucy5tZDIgPSBDT05GSUcucGF0aHMubW9kZWxzK29wdGlvbnMubWQyO1xuXHRcdG9wdGlvbnMuc2tpbiA9IENPTkZJRy5wYXRocy5tb2RlbHMrb3B0aW9ucy5za2luO1xuXG5cdFx0Ly9zZXQgY2xhc3MgdmFyc1xuXHRcdHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xuXHRcdHRoaXMuX2Nsb2NrID0gbmV3IFRIUkVFLkNsb2NrKCk7XG5cblx0XHQvL3ByZWxvYWQgbWQyIGFuZCBtZXNoXG5cdFx0bG9hZGVyLmxvYWQob3B0aW9ucy5tZDIsIChnZW8pID0+IHtcblx0XHRcdGdlby5jb21wdXRlQm91bmRpbmdCb3goKTtcblxuXHRcdFx0Y29uc3QgbWVzaCA9IHRoaXMuX21lc2ggPSB0aGlzLl9jcmVhdGVNRDJQYXJ0KGdlbywgVEhSRUUuSW1hZ2VVdGlscy5sb2FkVGV4dHVyZShvcHRpb25zLnNraW4pKTtcblx0XHRcdG9wdGlvbnMub25DcmVhdGUobWVzaCk7XG5cdFx0fSk7XG5cdH1cblxuXHRfY3JlYXRlTUQyUGFydChnZW9tZXRyeSwgc2tpbk1hcCkge1xuXHRcdGNvbnN0IG1hdGVyaWFsV2lyZWZyYW1lID0gbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoIHsgY29sb3I6IDB4ZmZhYTAwLCB3aXJlZnJhbWU6IHRydWUsIG1vcnBoVGFyZ2V0czogdHJ1ZSwgbW9ycGhOb3JtYWxzOiB0cnVlIH0gKTtcblx0XHRjb25zdCBtYXRlcmlhbFRleHR1cmUgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCggeyBjb2xvcjogMHhmZmZmZmYsIHdpcmVmcmFtZTogZmFsc2UsIG1hcDogc2tpbk1hcCwgbW9ycGhUYXJnZXRzOiB0cnVlLCBtb3JwaE5vcm1hbHM6IHRydWUgfSApO1xuXG5cdFx0Y29uc3QgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbFRleHR1cmUpO1xuXHRcdG1lc2gucm90YXRpb24ueSA9IC0gTWF0aC5QSSAvIDI7XG5cblx0XHRtZXNoLmNhc3RTaGFkb3cgPSB0cnVlO1xuXHRcdG1lc2gucmVjZWl2ZVNoYWRvdyA9IHRydWU7XG5cblx0XHRtZXNoLm1hdGVyaWFsVGV4dHVyZSA9IG1hdGVyaWFsVGV4dHVyZTtcblx0XHRtZXNoLm1hdGVyaWFsV2lyZWZyYW1lID0gbWF0ZXJpYWxXaXJlZnJhbWU7XG5cblx0XHR0aGlzLl9wbGF5aW5nQW5pbWF0aW9uID0gZmFsc2U7XG5cdFx0dGhpcy5fbWl4ZXIgPSBuZXcgVEhSRUUuQW5pbWF0aW9uTWl4ZXIobWVzaCk7XG5cdFx0dGhpcy5fbWVzaCA9IG1lc2g7XG5cblx0XHRpZih0aGlzLl9vcHRpb25zLmFuaW1hdGlvbil7XG5cdFx0XHR0aGlzLnBsYXlBbmltYXRpb24odGhpcy5fb3B0aW9ucy5hbmltYXRpb24pO1xuXHRcdH1cblxuXHRcdHJldHVybiBtZXNoO1xuXHR9XG5cblx0cGxheUFuaW1hdGlvbihuYW1lLCBwbGF5T25jZSkge1xuXHRcdGlmKHRoaXMuX3BsYXlpbmdBbmltYXRpb24pe1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGNvbnN0IG9wdGlvbnMgPSB0aGlzLl9vcHRpb25zO1xuXHRcdGNvbnN0IG1peGVyID0gdGhpcy5fbWl4ZXIgPSBuZXcgVEhSRUUuQW5pbWF0aW9uTWl4ZXIobWVzaCk7XG5cdFx0Y29uc3QgbWVzaCA9IHRoaXMuX21lc2g7XG5cdFx0Y29uc3QgdGltZVNjYWxlID0gb3B0aW9ucy5hbmltVGltZVNjYWxlO1xuXG5cdFx0Ly9zcGVlZCBhbmltYXRpb24gdXAgYnkgPHRpbWVTY2FsZT5cblx0XHQvL2R1cmF0aW9uIGlzIG5vdyA8ZHVyYXRpb24+Lzx0aW1lU2NhbGU+XG5cdFx0bWl4ZXIudGltZVNjYWxlID0gdGltZVNjYWxlO1xuXG5cdFx0aWYoIW1lc2gpe1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGNvbnN0IGNsaXAgPSBUSFJFRS5BbmltYXRpb25DbGlwLmZpbmRCeU5hbWUobWVzaC5nZW9tZXRyeS5hbmltYXRpb25zLCBuYW1lKTtcblxuXHRcdGlmKCFjbGlwKXtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRjb25zdCBhY3Rpb24gPSBuZXcgVEhSRUUuQW5pbWF0aW9uQWN0aW9uKGNsaXAsIG1peGVyLnRpbWUpLnNldExvY2FsUm9vdChtZXNoKTtcblxuXHRcdG1peGVyLmFkZEFjdGlvbihhY3Rpb24pO1xuXHRcdHRoaXMuX3BsYXlpbmdBbmltYXRpb24gPSB0cnVlO1xuXG5cdFx0aWYoIXBsYXlPbmNlKXtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdG1peGVyLnJlbW92ZUFjdGlvbihhY3Rpb24pO1xuXHRcdFx0dGhpcy5fcGxheWluZ0FuaW1hdGlvbiA9IGZhbHNlO1xuXHRcdH0sIChjbGlwLmR1cmF0aW9uL3RpbWVTY2FsZSkqMTAwMCk7XG5cdH1cblxuXHR1cGRhdGUoKSB7XG5cdFx0Y29uc3QgZGVsdGEgPSB0aGlzLl9jbG9jay5nZXREZWx0YSgpO1xuXHRcdGlmKHRoaXMuX21peGVyKSB0aGlzLl9taXhlci51cGRhdGUoZGVsdGEpO1xuXHR9XG59XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIHJhdGFtYWhhdHRhOiB7XG5cdCAgcGF0aDogJy9yYXRhbWFoYXR0YS8nLFxuXHQgIGJvZHk6IFwicmF0YW1haGF0dGEubWQyXCIsXG5cdCAgc2tpbnM6IFsgXCJyYXRhbWFoYXR0YS5wbmdcIiwgXCJjdGZfYi5wbmdcIiwgXCJjdGZfci5wbmdcIiwgXCJkZWFkLnBuZ1wiLCBcImdlYXJ3aG9yZS5wbmdcIiBdLFxuXHQgIHdlYXBvbnM6ICBbXG5cdCAgXHRbIFwid2VhcG9uLm1kMlwiLCBcIndlYXBvbi5wbmdcIiBdLFxuXHRcdFx0WyBcIndfYmZnLm1kMlwiLCBcIndfYmZnLnBuZ1wiIF0sXG5cdFx0XHRbIFwid19ibGFzdGVyLm1kMlwiLCBcIndfYmxhc3Rlci5wbmdcIiBdLFxuXHRcdFx0WyBcIndfY2hhaW5ndW4ubWQyXCIsIFwid19jaGFpbmd1bi5wbmdcIiBdLFxuXHRcdFx0WyBcIndfZ2xhdW5jaGVyLm1kMlwiLCBcIndfZ2xhdW5jaGVyLnBuZ1wiIF0sXG5cdFx0XHRbIFwid19oeXBlcmJsYXN0ZXIubWQyXCIsIFwid19oeXBlcmJsYXN0ZXIucG5nXCIgXSxcblx0XHRcdFsgXCJ3X21hY2hpbmVndW4ubWQyXCIsIFwid19tYWNoaW5lZ3VuLnBuZ1wiIF0sXG5cdFx0XHRbIFwid19yYWlsZ3VuLm1kMlwiLCBcIndfcmFpbGd1bi5wbmdcIiBdLFxuXHRcdFx0WyBcIndfcmxhdW5jaGVyLm1kMlwiLCBcIndfcmxhdW5jaGVyLnBuZ1wiIF0sXG5cdFx0XHRbIFwid19zaG90Z3VuLm1kMlwiLCBcIndfc2hvdGd1bi5wbmdcIiBdLFxuXHRcdFx0WyBcIndfc3Nob3RndW4ubWQyXCIsIFwid19zc2hvdGd1bi5wbmdcIiBdXG5cdFx0XVxuXHR9LFxuXHRvZ3JvOiB7XG5cdCAgcGF0aDogXCIvb2dyby9cIixcblx0XHRib2R5OiBcIm9ncm8ubWQyXCIsXG5cdFx0c2tpbnM6IFtcblx0XHRcdFwiZ3Jvay5qcGdcIiwgXCJvZ3JvYmFzZS5wbmdcIiwgXCJhcmJvc2hhay5wbmdcIiwgXCJjdGZfci5wbmdcIiwgXCJjdGZfYi5wbmdcIiwgXCJkYXJrYW0ucG5nXCIsIFwiZnJlZWRvbS5wbmdcIixcblx0XHQgXHRcImdpYi5wbmdcIiwgXCJnb3Jkb2doLnBuZ1wiLCBcImlnZG9zaC5wbmdcIiwgXCJraG9ybmUucG5nXCIsIFwibmFib2dyby5wbmdcIixcblx0XHQgXHRcInNoYXJva2gucG5nXCJcblx0XHRdLFxuXHRcdHdlYXBvbnM6ICBbIFsgXCJ3ZWFwb24ubWQyXCIsIFwid2VhcG9uLmpwZ1wiIF0gXVxuXHR9XG59O1xuIiwiaW1wb3J0IENPTkZJRyBmcm9tICcuLi8uLi9jb25maWcnO1xuaW1wb3J0IENIQVJBQ1RFUlNfQ09ORklHIGZyb20gJy4vY2hhcmFjdGVyc0NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYXJhY3RlciB7XG4gIGNvbnN0cnVjdG9yKHVzZXJPcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5fb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgY2hhcmFjdGVyOiAncmF0YW1haGF0dGEnLFxuICAgICAgc2tpbjogMCxcbiAgICAgIGFuaW1hdGlvbjogJ3N0YW5kJ1xuICAgIH0sIHVzZXJPcHRpb25zKTtcblxuICAgIGNvbnN0IGNoYXJDb25maWcgPSBDSEFSQUNURVJTX0NPTkZJR1tvcHRpb25zLmNoYXJhY3Rlcl07XG4gICAgY29uc3QgY2hhcmFjdGVyID0gdGhpcy5fY3JlYXRlQ2hhcmFjdGVyKGNoYXJDb25maWcpO1xuXG4gICAgdGhpcy5fZXZlbnRMaXN0ZW5lcnMgPSB7fTtcbiAgICB0aGlzLl9jbG9jayA9IG5ldyBUSFJFRS5DbG9jaygpO1xuXG4gICAgdGhpcy5fY2hhcmFjdGVyID0gY2hhcmFjdGVyO1xuICB9XG5cbiAgb24oZXZlbnQsIGNhbGxiYWNrKSB7XG4gICAgaWYodHlwZW9mIHRoaXMuX2V2ZW50TGlzdGVuZXJzW2V2ZW50XSAhPT0gJ2FycmF5Jyl7XG4gICAgICB0aGlzLl9ldmVudExpc3RlbmVyc1tldmVudF0gPSBbXTtcbiAgICB9XG4gICAgdGhpcy5fZXZlbnRMaXN0ZW5lcnNbZXZlbnRdLnB1c2goY2FsbGJhY2spO1xuICB9XG5cbiAgX3RyaWdnZXJFdmVudChldmVudCkge1xuICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50TGlzdGVuZXJzW2V2ZW50XTtcblxuICAgIGlmKHR5cGVvZiBsaXN0ZW5lcnMgPT09ICdvYmplY3QnKXtcbiAgICAgIGxpc3RlbmVycy5mb3JFYWNoKGNhbGxiYWNrID0+IHtcbiAgICAgICAgY2FsbGJhY2sodGhpcy5nZXRSYXcoKSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBfY3JlYXRlQ2hhcmFjdGVyKGNoYXJDb25maWcpIHtcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5fb3B0aW9ucztcbiAgICBjb25zdCBjaGFyYWN0ZXIgPSBuZXcgVEhSRUUuTUQyQ2hhcmFjdGVyKCk7XG5cbiAgICBjaGFyYWN0ZXIuc2NhbGUgPSAuNTtcblxuICAgIGNoYXJhY3Rlci5vbkxvYWRDb21wbGV0ZSA9ICgpID0+IHtcbiAgICAgIHRoaXMuc2V0U2tpbihvcHRpb25zLnNraW4pO1xuICAgICAgdGhpcy5zZXRBbmltYXRpb24ob3B0aW9ucy5hbmltYXRpb24pO1xuXG4gICAgICBpZih0eXBlb2Ygb3B0aW9ucy53ZWFwb24gPT09ICdudW1iZXInKXtcbiAgICAgICAgdGhpcy5zZXRXZWFwb24ob3B0aW9ucy53ZWFwb24pO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbnMueCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgY2hhcmFjdGVyLnJvb3QucG9zaXRpb24ueCA9IG9wdGlvbnMueDtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLnkgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGNoYXJhY3Rlci5yb290LnBvc2l0aW9uLnkgPSBvcHRpb25zLnk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy56ID09PSAnbnVtYmVyJykge1xuICAgICAgICBjaGFyYWN0ZXIucm9vdC5wb3NpdGlvbi56ID0gb3B0aW9ucy56O1xuICAgICAgfVxuXG4gICAgICB0aGlzLl90cmlnZ2VyRXZlbnQoJ2NyZWF0ZScpO1xuICAgIH07XG5cbiAgICBjaGFyQ29uZmlnLmJhc2VVcmwgPSBDT05GSUcucGF0aHMubW9kZWxzK2NoYXJDb25maWcucGF0aDtcbiAgICBjaGFyYWN0ZXIubG9hZFBhcnRzKGNoYXJDb25maWcpO1xuXG4gICAgcmV0dXJuIGNoYXJhY3RlcjtcbiAgfVxuXG4gIHNldFNraW4oaWR4KSB7XG4gICAgLy9jaGFyYWN0ZXIuc2tpbnNCb2R5XG4gICAgdGhpcy5fY2hhcmFjdGVyLnNldFNraW4oaWR4KTtcbiAgfVxuXG4gIHNldFdlYXBvbihpZHgpIHtcbiAgICAvL2NoYXJhY3Rlci53ZWFwb25zXG4gICAgdGhpcy5fY2hhcmFjdGVyLnNldFdlYXBvbihpZHgpO1xuICB9XG5cbiAgc2V0QW5pbWF0aW9uKG5hbWUpIHtcbiAgICAvL2NoYXJhY3Rlci5tZXNoQm9keS5nZW9tZXRyeS5hbmltYXRpb25zXG4gICAgdGhpcy5fY2hhcmFjdGVyLnNldEFuaW1hdGlvbihuYW1lKTtcbiAgfVxuXG4gIGdldFJhdygpIHtcbiAgICByZXR1cm4gdGhpcy5fY2hhcmFjdGVyO1xuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIGNvbnN0IGRlbHRhID0gdGhpcy5fY2xvY2suZ2V0RGVsdGEoKTtcbiAgICB0aGlzLl9jaGFyYWN0ZXIudXBkYXRlKGRlbHRhKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQge1xuICBpbml0KGVsZW1lbnQsIGNhbWVyYSwgY29udHJvbHMpe1xuICAgIHRoaXMuX2NvbnRyb2xzID0gbmV3IFRIUkVFLlBvaW50ZXJMb2NrQ29udHJvbHMoY2FtZXJhKTtcbiAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLl9iaW5kRXZlbnRzKCk7XG4gIH0sXG5cbiAgZ2V0Q29udHJvbHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRyb2xzO1xuICB9LFxuXG4gIGdldEVuYWJsZWQoKXtcbiAgICByZXR1cm4gdGhpcy5fY29udHJvbHMuZW5hYmxlZDtcbiAgfSxcblxuICBfYmluZEV2ZW50cygpe1xuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9yZXF1ZXN0TG9jay5iaW5kKHRoaXMpKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVybG9ja2NoYW5nZScsIHRoaXMuX29uTG9ja0NoYW5nZS5iaW5kKHRoaXMpLCBmYWxzZSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW96cG9pbnRlcmxvY2tjaGFuZ2UnLCB0aGlzLl9vbkxvY2tDaGFuZ2UuYmluZCh0aGlzKSwgZmFsc2UpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdHBvaW50ZXJsb2NrY2hhbmdlJywgdGhpcy5fb25Mb2NrQ2hhbmdlLmJpbmQodGhpcyksIGZhbHNlKTtcbiAgfSxcblxuICBfcmVxdWVzdExvY2soKXtcbiAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5fZWxlbWVudDtcbiAgICBlbGVtZW50LnJlcXVlc3RQb2ludGVyTG9jayA9IGVsZW1lbnQucmVxdWVzdFBvaW50ZXJMb2NrIHx8IGVsZW1lbnQubW96UmVxdWVzdFBvaW50ZXJMb2NrIHx8IGVsZW1lbnQud2Via2l0UmVxdWVzdFBvaW50ZXJMb2NrO1xuICAgIGVsZW1lbnQucmVxdWVzdFBvaW50ZXJMb2NrKCk7XG4gIH0sXG5cbiAgX29uTG9ja0NoYW5nZSgpe1xuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLl9lbGVtZW50O1xuICAgIGlmIChkb2N1bWVudC5wb2ludGVyTG9ja0VsZW1lbnQgPT09IGVsZW1lbnQgfHxcbiAgICAgIGRvY3VtZW50Lm1velBvaW50ZXJMb2NrRWxlbWVudCA9PT0gZWxlbWVudCB8fFxuICAgICAgZG9jdW1lbnQud2Via2l0UG9pbnRlckxvY2tFbGVtZW50ID09PSBlbGVtZW50KSB7XG4gICAgICBjb25zb2xlLmxvZygnUG9pbnRlciBsb2NrZWQnKTtcbiAgICAgIHRoaXMuX2NvbnRyb2xzLmVuYWJsZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZygnUG9pbnRlciBsb2NrIHJlbW92ZWQnKTtcbiAgICAgIHRoaXMuX2NvbnRyb2xzLmVuYWJsZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbn07XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIGluaXQoY2FtZXJhKSB7XG4gICAgdGhpcy5fcmF5Y2FzdGVyID0gbmV3IFRIUkVFLlJheWNhc3RlcigpO1xuICAgIHRoaXMuX21vdXNlID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcbiAgICB0aGlzLl9jYW1lcmEgPSBjYW1lcmE7XG4gICAgdGhpcy5fYmluZEV2ZW50cygpO1xuICB9LFxuXG4gIF9iaW5kRXZlbnRzKCkge1xuICAgIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3Vyc29yJyk7XG4gICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ3Bvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiA1MCU7IGxlZnQ6IDUwJTsgd2lkdGg6IDVweDsgaGVpZ2h0OiA1cHg7IGJvcmRlcjogc29saWQgMXB4IHJlZDsgYm9yZGVyLXJhZGl1czogMTAwJTsgbWFyZ2luOiAtMTBweCAwIDAgLTEwcHg7IHotaW5kZXggOTk7Jyk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuX29uTW91c2VNb3ZlLmJpbmQodGhpcykpO1xuICB9LFxuXG4gIF9vbk1vdXNlTW92ZShldmVudCkge1xuICAgIC8vIGNhbGN1bGF0ZSBtb3VzZSBwb3NpdGlvbiBpbiBub3JtYWxpemVkIGRldmljZSBjb29yZGluYXRlc1xuICAgIC8vICgtMSB0byArMSkgZm9yIGJvdGggY29tcG9uZW50c1xuICAgIGNvbnN0IHggPSAoIGV2ZW50LmNsaWVudFggLyB3aW5kb3cuaW5uZXJXaWR0aCApICogMiAtIDE7XG4gICAgY29uc3QgeSA9IC0gKCBldmVudC5jbGllbnRZIC8gd2luZG93LmlubmVySGVpZ2h0ICkgKiAyICsgMTtcblxuICAgIHRoaXMuX21vdXNlLnggPSB4O1xuICAgIHRoaXMuX21vdXNlLnkgPSB5O1xuICB9LFxuXG4gIGNoZWNrQ29sbGlkaW5nV2l0aE9iamVjdHMob2JqZWN0cywgbWF4RGlzdGFuY2UgPSBudWxsKSB7XG4gICAgY29uc3QgcmF5Y2FzdGVyID0gdGhpcy5fcmF5Y2FzdGVyO1xuXG4gICAgaWYgKG1heERpc3RhbmNlKSB7XG4gICAgICByYXljYXN0ZXIuZmFyID0gbWF4RGlzdGFuY2U7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIHRoZSBwaWNraW5nIHJheSB3aXRoIHRoZSBjYW1lcmEgYW5kIG1vdXNlIHBvc2l0aW9uXG4gICAgcmF5Y2FzdGVyLnNldEZyb21DYW1lcmEodGhpcy5fbW91c2UsIHRoaXMuX2NhbWVyYSk7XG5cbiAgICAvLyBjYWxjdWxhdGUgb2JqZWN0cyBpbnRlcnNlY3RpbmcgdGhlIHBpY2tpbmcgcmF5XG4gICAgbGV0IGludGVyc2VjdHMgPSByYXljYXN0ZXIuaW50ZXJzZWN0T2JqZWN0cyhvYmplY3RzKTtcblxuICAgIGZvciAoY29uc3Qge29iamVjdH0gb2YgaW50ZXJzZWN0cykge1xuICAgICAgb2JqZWN0Lm1hdGVyaWFsLmNvbG9yLnNldCgweGZmMDAwMCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGludGVyc2VjdHM7XG4gIH1cbn07IiwiZXhwb3J0IGRlZmF1bHQge1xuICBpbml0KGNvbnRyb2xzLCBjb2xsaXNpb25PYmplY3RzLCBvcHRpb25zKSB7XG4gICAgdGhpcy5fY29udHJvbHMgPSBjb250cm9scztcbiAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcblxuICAgIHRoaXMuX2NvbGxpc2lvbk9iamVjdHMgPSBjb2xsaXNpb25PYmplY3RzO1xuICAgIHRoaXMuX3JheWNhc3RlciA9IG5ldyBUSFJFRS5SYXljYXN0ZXIobmV3IFRIUkVFLlZlY3RvcjMoKSwgbmV3IFRIUkVFLlZlY3RvcjMoMCwgLTEsIDApLCAwLCAxMCk7XG5cbiAgICB0aGlzLl9tb3ZlbWVudCA9IHtcbiAgICAgIGZvcndhcmQ6IGZhbHNlLFxuICAgICAgYmFja3dhcmQ6IGZhbHNlLFxuICAgICAgcmlnaHQ6IGZhbHNlLFxuICAgICAgbGVmdDogZmFsc2UsXG4gICAgICBjYW5KdW1wOiBmYWxzZVxuICAgIH07XG5cbiAgICB0aGlzLl92ZWxvY2l0eSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG4gICAgdGhpcy5fcHJldlRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcblxuICAgIHRoaXMuX2JpbmRLZXlFdmVudHMoKTtcbiAgfSxcblxuICBnZXRDdXJyTW92ZW1lbnQoKSB7XG4gICAgY29uc3QgbW92ZW1lbnQgPSB0aGlzLl9tb3ZlbWVudDtcblxuICAgIGZvciAoY29uc3Qga2V5IGluIG1vdmVtZW50KSB7XG4gICAgICBpZighbW92ZW1lbnRba2V5XSl7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoWydmb3J3YXJkJywgJ2JhY2t3YXJkJywgJ3JpZ2h0JywgJ2xlZnQnXS5pbmRleE9mKGtleSkgIT09IC0xICYmIG1vdmVtZW50LmNhbkp1bXAgIT09IGZhbHNlKSB7XG4gICAgICAgIC8vd2Fsa2luZyBhbmQgbm90IGp1bXBpbmdcbiAgICAgICAgcmV0dXJuICd3YWxraW5nJztcbiAgICAgIH0gZWxzZSBpZihrZXkgPT09ICdjYW5KdW1wJyl7XG4gICAgICAgIC8vanVtcGluZ1xuICAgICAgICByZXR1cm4gJ2p1bXBpbmcnXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvL25vdCB3YWxraW5nLCBub3QganVtcGluZyA9IGlkbGVcbiAgICAgICAgcmV0dXJuICdpZGxlJztcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgY2hlY2tNb3ZlbWVudCgpIHtcbiAgICBjb25zdCBjb250cm9scyA9IHRoaXMuX2NvbnRyb2xzO1xuICAgIGNvbnN0IHZlbG9jaXR5ID0gdGhpcy5fdmVsb2NpdHk7XG4gICAgY29uc3QgbW92ZW1lbnQgPSB0aGlzLl9tb3ZlbWVudDtcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5fb3B0aW9ucztcblxuICAgIGNvbnN0IHRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICBjb25zdCBkZWx0YSA9ICh0aW1lIC0gdGhpcy5fcHJldlRpbWUpIC8gMTAwMDtcblxuICAgICAgLy91cGRhdGUgdmVsb2NpdHlcbiAgICB2ZWxvY2l0eS54IC09IHZlbG9jaXR5LnggKiAxMC4wICogZGVsdGE7XG4gICAgdmVsb2NpdHkueiAtPSB2ZWxvY2l0eS56ICogMTAuMCAqIGRlbHRhO1xuICAgIHZlbG9jaXR5LnkgLT0gOS44ICogMTAwLjAgKiBkZWx0YTsgLy8gMTAwLjAgPSBtYXNzXG5cbiAgICAvL2NoZWNrIGRpcmVjdGlvbmFsIG1vdmVtZW50XG4gICAgaWYobW92ZW1lbnQuZm9yd2FyZCkgdmVsb2NpdHkueiAtPSBvcHRpb25zLm1vdmVtZW50U3BlZWQgKiBkZWx0YTtcbiAgICBpZihtb3ZlbWVudC5iYWNrd2FyZCkgdmVsb2NpdHkueiArPSBvcHRpb25zLm1vdmVtZW50U3BlZWQgKiBkZWx0YTtcbiAgICBpZihtb3ZlbWVudC5sZWZ0KSB2ZWxvY2l0eS54IC09IG9wdGlvbnMubW92ZW1lbnRTcGVlZCAqIGRlbHRhO1xuICAgIGlmKG1vdmVtZW50LnJpZ2h0KSB2ZWxvY2l0eS54ICs9IG9wdGlvbnMubW92ZW1lbnRTcGVlZCAqIGRlbHRhO1xuXG4gICAgLy9vYmplY3RzIGNvbGxpc2lvbiBkZXRlY3Rpb25cbiAgICBjb25zdCBpc09uT2JqZWN0ID0gdGhpcy5fY2hlY2tPYmplY3RzQ29sbGlzaW9uKCk7XG4gICAgaWYgKGlzT25PYmplY3QpIHtcbiAgICAgIHZlbG9jaXR5LnkgPSBNYXRoLm1heCgwLCB2ZWxvY2l0eS55KTtcbiAgICAgIG1vdmVtZW50LmNhbkp1bXAgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vdXBkYXRlIGNvbnRyb2xzXG4gICAgY29uc3QgY29udHJvbHNPYmplY3QgPSBjb250cm9scy5nZXRPYmplY3QoKTtcbiAgICBjb250cm9sc09iamVjdC50cmFuc2xhdGVaKHZlbG9jaXR5LnogKiBkZWx0YSk7XG4gICAgY29udHJvbHNPYmplY3QudHJhbnNsYXRlWSh2ZWxvY2l0eS55ICogZGVsdGEpO1xuICAgIGNvbnRyb2xzT2JqZWN0LnRyYW5zbGF0ZVgodmVsb2NpdHkueCAqIGRlbHRhKTtcblxuICAgIC8vZGV0ZWN0IGZsb29yXG4gICAgaWYgKGNvbnRyb2xzLmdldE9iamVjdCgpLnBvc2l0aW9uLnkgPCAyMCkge1xuICAgICAgdmVsb2NpdHkueSA9IDA7XG4gICAgICBjb250cm9sc09iamVjdC5wb3NpdGlvbi55ID0gMjA7XG4gICAgICBtb3ZlbWVudC5jYW5KdW1wID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB0aGlzLl9wcmV2VGltZSA9IHRpbWU7XG4gIH0sXG5cbiAgX2NoZWNrT2JqZWN0c0NvbGxpc2lvbigpIHtcbiAgICBjb25zdCByYXljYXN0ZXIgPSB0aGlzLl9yYXljYXN0ZXI7XG4gICAgY29uc3Qgb2JqZWN0cyA9IHRoaXMuX2NvbGxpc2lvbk9iamVjdHM7XG4gICAgY29uc3QgY29udHJvbHMgPSB0aGlzLl9jb250cm9scztcblxuICAgIHJheWNhc3Rlci5yYXkub3JpZ2luLmNvcHkoY29udHJvbHMuZ2V0T2JqZWN0KCkucG9zaXRpb24pO1xuICAgIHJheWNhc3Rlci5yYXkub3JpZ2luLnkgLT0gMTA7XG5cbiAgICBjb25zdCBpbnRlcnNlY3Rpb25zID0gcmF5Y2FzdGVyLmludGVyc2VjdE9iamVjdHMob2JqZWN0cyk7XG4gICAgY29uc3QgaXNPbk9iamVjdCA9IGludGVyc2VjdGlvbnMubGVuZ3RoID4gMDtcblxuICAgIHJldHVybiBpc09uT2JqZWN0O1xuICB9LFxuXG4gIF9iaW5kS2V5RXZlbnRzKCkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoe2tleUNvZGV9KSA9PiB0aGlzLl9jaGVja0tleXMoa2V5Q29kZSwgdHJ1ZSksIGZhbHNlKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsICh7a2V5Q29kZX0pID0+IHRoaXMuX2NoZWNrS2V5cyhrZXlDb2RlLCBmYWxzZSksIGZhbHNlKTtcbiAgfSxcblxuICBfY2hlY2tLZXlzKGtleUNvZGUsIHNldFRvVmFsKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuX29wdGlvbnM7XG4gICAgc3dpdGNoKGtleUNvZGUpe1xuICAgICAgY2FzZSA4NzogLy93XG4gICAgICAgIHRoaXMuX21vdmVtZW50LmZvcndhcmQgPSBzZXRUb1ZhbDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDgzOiAvL3NcbiAgICAgICAgdGhpcy5fbW92ZW1lbnQuYmFja3dhcmQgPSBzZXRUb1ZhbDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDY4OiAvLyBkXG4gICAgICAgIHRoaXMuX21vdmVtZW50LnJpZ2h0ID0gc2V0VG9WYWw7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA2NTogLy8gYVxuICAgICAgICB0aGlzLl9tb3ZlbWVudC5sZWZ0ID0gc2V0VG9WYWw7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzMjogLy8gc3BhY2VcbiAgICAgICAgaWYoc2V0VG9WYWwgPT09IHRydWUpeyAvL2tleWRvd25cbiAgICAgICAgICBpZih0aGlzLl9tb3ZlbWVudC5jYW5KdW1wIHx8IG9wdGlvbnMuZW5hYmxlU3VwZXJKdW1wKXtcbiAgICAgICAgICAgIHRoaXMuX3ZlbG9jaXR5LnkgKz0gdGhpcy5fb3B0aW9ucy5qdW1wSGVpZ2h0O1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl9tb3ZlbWVudC5jYW5KdW1wID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG59O1xuIiwiZXhwb3J0IGRlZmF1bHQge1xuXHRyYW5kKG1pbiwgbWF4KSB7XG5cdFx0cmV0dXJuIE1hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiBtYXgpICsgbWluKTtcblx0fVxufTtcbiIsImltcG9ydCBDT05GSUcgZnJvbSAnLi4vY29uZmlnJztcbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBnZW5lcmF0ZVJlbmRlcmVyKGNsZWFySGV4KSB7XG4gICAgY29uc3QgcmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcigpO1xuICAgIHJlbmRlcmVyLnNldENsZWFyQ29sb3IoY2xlYXJIZXgpO1xuICAgIHJlbmRlcmVyLnNldFBpeGVsUmF0aW8od2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMSk7XG4gICAgcmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICByZXR1cm4gcmVuZGVyZXI7XG4gIH0sXG5cbiAgZ2VuZXJhdGVGbG9vcigpIHtcbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyBUSFJFRS5QbGFuZUdlb21ldHJ5KDIwMDAsIDIwMDAsIDEwMCwgMTAwKTtcblxuICAgIGdlb21ldHJ5LnJvdGF0ZVgoLU1hdGguUEkvMik7XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IGdlb21ldHJ5LnZlcnRpY2VzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgY29uc3QgdmVydGV4ID0gZ2VvbWV0cnkudmVydGljZXNbaV07XG4gICAgICB2ZXJ0ZXgueCArPSBNYXRoLnJhbmRvbSgpICogMjA7XG4gICAgICB2ZXJ0ZXgueiArPSBNYXRoLnJhbmRvbSgpICogMjA7XG4gICAgICB2ZXJ0ZXgueSArPSBNYXRoLnJhbmRvbSgpO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwLCBsID0gZ2VvbWV0cnkuZmFjZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBjb25zdCBmYWNlID0gZ2VvbWV0cnkuZmFjZXNbaV07XG4gICAgICBjb25zdCBjb2xvcnMgPSBbXTtcblxuICAgICAgZm9yKGxldCBqID0gMDsgaiA8IDM7IGorKyl7XG4gICAgICAgIGNvbnN0IGNvbG9yID0gbmV3IFRIUkVFLkNvbG9yKGByZ2IoJHt1dGlscy5yYW5kKDEwMCwxODApfSwke3V0aWxzLnJhbmQoMTAwLDE4MCl9LCR7dXRpbHMucmFuZCgxMDAsMTgwKX0pYCk7XG4gICAgICAgIGNvbG9ycy5wdXNoKGNvbG9yKTtcbiAgICAgIH1cblxuICAgICAgZm9yKGxldCBqID0gMDsgaiA8IDM7IGorKyl7XG4gICAgICAgIGZhY2UudmVydGV4Q29sb3JzW2pdID0gY29sb3JzW2pdO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgdmVydGV4Q29sb3JzOiBUSFJFRS5WZXJ0ZXhDb2xvcnMgfSk7XG4gICAgcmV0dXJuIG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCk7XG4gIH0sXG5cbiAgZ2VuZXJhdGVCb3hlcyhhbW91bnQsIHRleHR1cmVQYXRoLCBjYWxsYmFjaykge1xuICAgIGNvbnN0IHRleHR1cmVMb2FkZXIgPSBuZXcgVEhSRUUuVGV4dHVyZUxvYWRlcigpO1xuXG4gICAgY29uc3QgZG9HZW5lcmF0ZSA9IChjcmF0ZVRleHR1cmUpID0+IHtcbiAgICAgIGxldCBtZXNoO1xuICAgICAgY29uc3QgYm94ZXMgPSBbXTtcblxuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGFtb3VudDsgaSsrKXtcbiAgICAgICAgICBtZXNoID0gdGhpcy5fZ2VuZXJhdGVCb3goe1xuICAgICAgICAgICAgd2lkdGg6IDIwLFxuICAgICAgICAgICAgaGVpZ2h0OiAyMCxcbiAgICAgICAgICAgIGRlcHRoOiAyMCxcbiAgICAgICAgICAgIHJnYjogWzU1LDgxLDE1OV0sXG4gICAgICAgICAgICB0ZXh0dXJlOiBjcmF0ZVRleHR1cmVcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIG1lc2gucG9zaXRpb24ueCA9IE1hdGguZmxvb3IoIE1hdGgucmFuZG9tKCkgKiAyMCAtIDEwICkgKiAyMDtcbiAgICAgICAgICBtZXNoLnBvc2l0aW9uLnkgPSBNYXRoLmZsb29yKCBNYXRoLnJhbmRvbSgpICogMjAgKSAqIDIwICsgMTA7XG4gICAgICAgICAgbWVzaC5wb3NpdGlvbi56ID0gTWF0aC5mbG9vciggTWF0aC5yYW5kb20oKSAqIDIwIC0gMTAgKSAqIDIwO1xuXG4gICAgICAgICAgbWVzaC5yb3RhdGlvbi55ID0gLTEwMDtcbiAgICAgICAgICBib3hlcy5wdXNoKG1lc2gpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FsbGJhY2soYm94ZXMpO1xuICAgICAgfTtcblxuICAgICAgdGV4dHVyZUxvYWRlci5sb2FkKENPTkZJRy5wYXRocy5pbWcrdGV4dHVyZVBhdGgsIGNyYXRlVGV4dHVyZSA9PiB7XG4gICAgICBkb0dlbmVyYXRlKGNyYXRlVGV4dHVyZSk7XG4gICAgfSk7XG4gIH0sXG5cbiAgX2dlbmVyYXRlQm94KG9wdGlvbnMpIHtcbiAgICBjb25zdCB3aWR0aCA9IG9wdGlvbnMud2lkdGg7XG4gICAgY29uc3QgaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQ7XG4gICAgY29uc3QgZGVwdGggPSBvcHRpb25zLmRlcHRoO1xuICAgIGNvbnN0IHJnYiA9IG9wdGlvbnMucmdiO1xuICAgIGNvbnN0IGJveCA9IG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSh3aWR0aCwgaGVpZ2h0LCBkZXB0aCk7XG4gICAgbGV0IG1hdGVyaWFsO1xuXG4gICAgaWYob3B0aW9ucy50ZXh0dXJlKXtcbiAgICAgIG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKHtcbiAgICAgICAgbWFwOiBvcHRpb25zLnRleHR1cmVcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gICAgICAgIHZlcnRleENvbG9yczogVEhSRUUuVmVydGV4Q29sb3JzXG4gICAgICB9KTtcblxuICAgICAgbGV0IGZhY2U7XG4gICAgICBsZXQgY29sb3I7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm94LmZhY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGZhY2UgPSBib3guZmFjZXNbaV07XG4gICAgICAgIGNvbG9yID0gbmV3IFRIUkVFLkNvbG9yKGByZ2IoJHtyZ2JbMF0rKGkqNCl9LCR7cmdiWzFdKyhpKjQpfSwke3JnYlswXSsoaSo0KX0pYCk7XG4gICAgICAgIGZhY2UuY29sb3IgPSBjb2xvcjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFRIUkVFLk1lc2goYm94LCBtYXRlcmlhbCk7XG4gIH1cbn07XG4iLCJpbXBvcnQgQ09ORklHIGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB1dGlscyBmcm9tICcuL2xpYnMvdXRpbHMnO1xuaW1wb3J0IHdvcmxkSGVscGVyIGZyb20gJy4vbGlicy93b3JsZEhlbHBlcic7XG5pbXBvcnQgbG9ja0NvbnRyb2xzSGVscGVyIGZyb20gJy4vbGlicy9sb2NrQ29udHJvbHNIZWxwZXInO1xuaW1wb3J0IG1vdmVtZW50SGVscGVyIGZyb20gJy4vbGlicy9tb3ZlbWVudEhlbHBlcic7XG5pbXBvcnQgbW91c2VIZWxwZXIgZnJvbSAnLi9saWJzL21vdXNlSGVscGVyJztcbmltcG9ydCAqIGFzIGNvbXBvbmVudHMgZnJvbSAnLi9jb21wb25lbnRzJztcblxubGV0IHNjZW5lID0gbnVsbDtcbmxldCBjYW1lcmEgPSBudWxsO1xubGV0IHJlbmRlcmVyID0gbnVsbDtcbmxldCBzdGF0cyA9IG51bGw7XG5cbmNvbnN0IGNvbXBvbmVudHNUb1VwZGF0ZSA9IE9iamVjdC52YWx1ZXMoY29tcG9uZW50cykuZmlsdGVyKCh7dXBkYXRlfSkgPT4gKHR5cGVvZiB1cGRhdGUgPT09ICdmdW5jdGlvbicpKTtcbmNvbnN0IGNvbnRhaW5lck5vZGUgPSBkb2N1bWVudC5ib2R5O1xuXG5pbml0U3RhdHMoKTtcbmluaXQoKTtcbnVwZGF0ZSgpO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICBzY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuICBjYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNzUsIHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0LCAxLCAxMDAwKTtcblxuICAvL2xpZ2h0XG4gIGNvbnN0IGxpZ2h0ID0gbmV3IFRIUkVFLkhlbWlzcGhlcmVMaWdodCgweGZmZmZmZiwgMHhhYWFhYWEsIDAuNik7XG4gIHNjZW5lLmFkZChsaWdodCk7XG5cbiAgLy9mbG9vclxuICBjb25zdCBmbG9vck1lc2ggPSB3b3JsZEhlbHBlci5nZW5lcmF0ZUZsb29yKCk7XG4gIHNjZW5lLmFkZChmbG9vck1lc2gpO1xuXG4gIC8vcmVuZGVyZXJcbiAgcmVuZGVyZXIgPSB3b3JsZEhlbHBlci5nZW5lcmF0ZVJlbmRlcmVyKDB4MGY0NDVjKTtcbiAgY29udGFpbmVyTm9kZS5hcHBlbmRDaGlsZChyZW5kZXJlci5kb21FbGVtZW50KTtcblxuICBsb2NrQ29udHJvbHNIZWxwZXIuaW5pdChjb250YWluZXJOb2RlLCBjYW1lcmEpO1xuICBjb25zdCBjb250cm9scyA9IGxvY2tDb250cm9sc0hlbHBlci5nZXRDb250cm9scygpO1xuICBzY2VuZS5hZGQoY29udHJvbHMuZ2V0T2JqZWN0KCkpO1xuXG4gIC8vYm94ZXNcbiAgY29tcG9uZW50cy5ib3hlcy5pbml0KHNjZW5lLCAoYm94ZXMpID0+IHtcbiAgICBtb3ZlbWVudEhlbHBlci5pbml0KGNvbnRyb2xzLCBib3hlcywge1xuICAgICAgbW92ZW1lbnRTcGVlZDogQ09ORklHLm1vdmVtZW50LnNwZWVkLFxuICAgICAganVtcEhlaWdodDogQ09ORklHLm1vdmVtZW50Lmp1bXBIZWlnaHQsXG4gICAgICBlbmFibGVTdXBlckp1bXA6IENPTkZJRy5tb3ZlbWVudC5lbmFibGVTdXBlckp1bXBcbiAgICB9KTtcblxuICAgIC8vY2hhcmFjdGVyc1xuICAgIGNvbXBvbmVudHMuY2hhcmFjdGVycy5pbml0KHNjZW5lLCBib3hlcyk7XG4gICAgbW91c2VIZWxwZXIuaW5pdChjYW1lcmEpO1xuXG4gICAgLy93ZWFwb25cbiAgICBjb21wb25lbnRzLnBsYXllcldlYXBvbi5pbml0KGNhbWVyYSk7XG4gICAgY29tcG9uZW50cy5wbGF5ZXJXZWFwb24ub25BbmltYXRpb24oJ3BvdycsICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbGxpZGluZ0JveGVzID0gbW91c2VIZWxwZXIuY2hlY2tDb2xsaWRpbmdXaXRoT2JqZWN0cyh3aW5kb3cuYm94ZXMpO1xuICAgICAgZm9yIChjb25zdCB7b2JqZWN0fSBvZiBjb2xsaWRpbmdCb3hlcykge1xuICAgICAgICBzY2VuZS5yZW1vdmUob2JqZWN0KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHdpbmRvdy5ib3hlcyA9IGJveGVzO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlKCl7XG4gIHN0YXRzLmJlZ2luKCk7XG5cbiAgaWYobG9ja0NvbnRyb2xzSGVscGVyLmdldEVuYWJsZWQoKSl7XG4gICAgbW92ZW1lbnRIZWxwZXIuY2hlY2tNb3ZlbWVudCgpO1xuXG4gICAgZm9yIChjb25zdCBjb21wb25lbnQgb2YgY29tcG9uZW50c1RvVXBkYXRlKSB7XG4gICAgICBjb21wb25lbnQudXBkYXRlKCk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEpO1xuXG4gIHN0YXRzLmVuZCgpO1xuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlKTtcbn1cblxuZnVuY3Rpb24gaW5pdFN0YXRzKCl7XG4gIHN0YXRzID0gbmV3IFN0YXRzKCk7XG4gIHN0YXRzLnNldE1vZGUoMCk7XG5cbiAgc3RhdHMuZG9tRWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gIHN0YXRzLmRvbUVsZW1lbnQuc3R5bGUubGVmdCA9ICcwcHgnO1xuICBzdGF0cy5kb21FbGVtZW50LnN0eWxlLnRvcCA9ICcwcHgnO1xuICBjb250YWluZXJOb2RlLmFwcGVuZENoaWxkKHN0YXRzLmRvbUVsZW1lbnQpO1xufVxuIl19
