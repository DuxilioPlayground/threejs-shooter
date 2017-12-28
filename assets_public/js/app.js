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

},{"../libs/worldHelper":12}],2:[function(require,module,exports){
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

    this._bindEvents();
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

    switch (actionName) {
      case 'pow':
        if (!shotgunFiredSound.isPlaying) {
          weapon.playAnimation('pow', true);
          shotgunFiredSound.play();
        }
        break;
    }
  }
};

},{"../libs/AnimMD2":6,"../libs/movementHelper":10}],5:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	rand: function rand(min, max) {
		return Math.floor(Math.random() * max + min);
	}
};

},{}],12:[function(require,module,exports){
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

},{"../config":5,"./utils":11}],13:[function(require,module,exports){
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

    //weapon
    components.playerWeapon.init(camera);
  });
}

function update() {
  stats.begin();

  if (_lockControlsHelper2.default.getEnabled()) {
    _movementHelper2.default.checkMovement();

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = componentsToUpdate[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var component = _step.value;

        component.update();
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

},{"./components":3,"./config":5,"./libs/lockControlsHelper":9,"./libs/movementHelper":10,"./libs/utils":11,"./libs/worldHelper":12}]},{},[13])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqc19kZXYvY29tcG9uZW50cy9ib3hlcy5qcyIsImpzX2Rldi9jb21wb25lbnRzL2NoYXJhY3RlcnMuanMiLCJqc19kZXYvY29tcG9uZW50cy9pbmRleC5qcyIsImpzX2Rldi9jb21wb25lbnRzL3BsYXllcldlYXBvbi5qcyIsImpzX2Rldi9jb25maWcuanNvbiIsImpzX2Rldi9saWJzL0FuaW1NRDIuanMiLCJqc19kZXYvbGlicy9DaGFyYWN0ZXIvY2hhcmFjdGVyc0NvbmZpZy5qcyIsImpzX2Rldi9saWJzL0NoYXJhY3Rlci9pbmRleC5qcyIsImpzX2Rldi9saWJzL2xvY2tDb250cm9sc0hlbHBlci5qcyIsImpzX2Rldi9saWJzL21vdmVtZW50SGVscGVyLmpzIiwianNfZGV2L2xpYnMvdXRpbHMuanMiLCJqc19kZXYvbGlicy93b3JsZEhlbHBlci5qcyIsImpzX2Rldi9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQUE7Ozs7OztrQkFFZTtBQUNiLE1BRGEsZ0JBQ1IsS0FEUSxFQUNELFFBREMsRUFDUztBQUFBOztBQUNwQixTQUFLLE1BQUwsR0FBYyxLQUFkOztBQUVBLDBCQUFZLGFBQVosQ0FBMEIsR0FBMUIsRUFBK0IsYUFBL0IsRUFBOEMsVUFBQyxLQUFELEVBQVc7QUFDdkQsNEJBQVksYUFBWixDQUEwQixHQUExQixFQUErQixrQkFBL0IsRUFBbUQsVUFBQyxNQUFELEVBQVk7QUFDN0QsZ0JBQVEsTUFBTSxNQUFOLENBQWEsTUFBYixDQUFSO0FBQ0EsY0FBSyxnQkFBTCxDQUFzQixLQUF0QjtBQUNBLGlCQUFTLEtBQVQ7QUFDRCxPQUpEO0FBS0QsS0FORDtBQU9ELEdBWFk7QUFhYixrQkFiYSw0QkFhSSxTQWJKLEVBYWU7QUFDMUIsUUFBTSxRQUFRLEtBQUssTUFBbkI7QUFEMEI7QUFBQTtBQUFBOztBQUFBO0FBRTFCLDJCQUFtQixTQUFu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QUF2QixHQUE4QixLQUE5QjtBQUNBLFFBQU0sVUFBTixDQUFpQixLQUFqQixDQUF1QixHQUF2QixHQUE2QixLQUE3QjtBQUNBLGdCQUFjLFdBQWQsQ0FBMEIsTUFBTSxVQUFoQztBQUNEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB3b3JsZEhlbHBlciBmcm9tICcuLi9saWJzL3dvcmxkSGVscGVyJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0KHNjZW5lLCBjYWxsYmFjaykge1xuICAgIHRoaXMuX3NjZW5lID0gc2NlbmU7XG5cbiAgICB3b3JsZEhlbHBlci5nZW5lcmF0ZUJveGVzKDI1MCwgJy9jcmF0ZTMuanBnJywgKGJveGVzKSA9PiB7XG4gICAgICB3b3JsZEhlbHBlci5nZW5lcmF0ZUJveGVzKDI1MCwgJy9jcmF0ZS10bnQtMS5qcGcnLCAoYm94ZXMyKSA9PiB7XG4gICAgICAgIGJveGVzID0gYm94ZXMuY29uY2F0KGJveGVzMik7XG4gICAgICAgIHRoaXMuX2FkZEJveGVzVG9TY2VuZShib3hlcyk7XG4gICAgICAgIGNhbGxiYWNrKGJveGVzKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuXG4gIF9hZGRCb3hlc1RvU2NlbmUoYm94TWVzaGVzKSB7XG4gICAgY29uc3Qgc2NlbmUgPSB0aGlzLl9zY2VuZTtcbiAgICBmb3IgKGNvbnN0IG1lc2ggb2YgYm94TWVzaGVzKSB7XG4gICAgICBzY2VuZS5hZGQobWVzaCk7XG4gICAgfVxuICB9XG59O1xuIiwiaW1wb3J0IENoYXJhY3RlciBmcm9tICcuLi9saWJzL0NoYXJhY3Rlcic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdChzY2VuZSkge1xuICAgIGNvbnN0IGNoYXJhY3RlcnMgPSBbXTtcbiAgICBjb25zdCBjaGFyYWN0ZXJDb25maWdzID0gW3tcbiAgICAgIHg6IDIwLFxuICAgICAgY2hhcmFjdGVyOiAnb2dybydcbiAgICB9LCB7XG4gICAgICB4OiAtMjBcbiAgICB9XTtcblxuICAgIGZvciAoY29uc3QgY29uZmlnIG9mIGNoYXJhY3RlckNvbmZpZ3MpIHtcbiAgICAgIGNvbnN0IGNoYXJhY3RlciA9IG5ldyBDaGFyYWN0ZXIoY29uZmlnKTtcbiAgICAgIHNjZW5lLmFkZChjaGFyYWN0ZXIuZ2V0UmF3KCkucm9vdCk7XG4gICAgICBjaGFyYWN0ZXJzLnB1c2goY2hhcmFjdGVyKTtcbiAgICB9XG5cbiAgICB0aGlzLl9jaGFyYWN0ZXJzID0gY2hhcmFjdGVycztcbiAgfSxcblxuICB1cGRhdGUoKSB7XG4gICAgZm9yIChjb25zdCBjaGFyYWN0ZXIgb2YgdGhpcy5fY2hhcmFjdGVycykge1xuICAgICAgY2hhcmFjdGVyLnVwZGF0ZSgpO1xuICAgIH1cbiAgfVxufTtcbiIsImltcG9ydCBwbGF5ZXJXZWFwb24gZnJvbSAnLi9wbGF5ZXJXZWFwb24nO1xuaW1wb3J0IGJveGVzIGZyb20gJy4vYm94ZXMnO1xuaW1wb3J0IGNoYXJhY3RlcnMgZnJvbSAnLi9jaGFyYWN0ZXJzJztcblxuZXhwb3J0IHtwbGF5ZXJXZWFwb24sIGJveGVzLCBjaGFyYWN0ZXJzfTtcbiIsImltcG9ydCBBbmltTUQyIGZyb20gJy4uL2xpYnMvQW5pbU1EMic7XG5pbXBvcnQgbW92ZW1lbnRIZWxwZXIgZnJvbSAnLi4vbGlicy9tb3ZlbWVudEhlbHBlcic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdChjYW1lcmEpIHtcbiAgICB0aGlzLl93ZWFwb24gPSBuZXcgQW5pbU1EMih7XG4gICAgICBtZDI6ICcvc2hvdGd1bi9odWQvRHJlYWR1cy1TaG90Z3VuLm1kMicsXG4gICAgICBza2luOiAnL3Nob3RndW4vaHVkL0RyZWFkdXMtU2hvdGd1bi5qcGcnLFxuICAgICAgYW5pbVRpbWVTY2FsZTogMixcbiAgICAgIG9uQ3JlYXRlOiAobWVzaCkgPT4ge1xuICAgICAgICB0aGlzLl9tZXNoID0gbWVzaDtcblxuICAgICAgICBtZXNoLnNjYWxlLnNldCguMDUsLjA1LC4wNSk7XG4gICAgICAgIG1lc2gucm90YXRpb24ueSA9IE1hdGguUEkgLyAyO1xuICAgICAgICBtZXNoLnBvc2l0aW9uLnggLT0gMTtcblxuICAgICAgICBjYW1lcmEuYWRkKG1lc2gpO1xuICAgICAgICBtZXNoLmFkZCh0aGlzLl9zb3VuZHMuc2hvdGd1bkZpcmVkKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuX3Bvc2l0aW9uQW5pcyA9IHtcbiAgICAgIGJyZWF0aGluZzoge1xuICAgICAgICBjdXJyT2Zmc2V0OiAwLFxuICAgICAgICBjdXJyQW5pRGlyZWN0aW9uOiAxLFxuICAgICAgICBhbmlTcGVlZDogLjAwMDIsXG4gICAgICAgIG1heE9mZnNldDogLjAxLFxuICAgICAgICB1cGRhdGVQcm9wOiAncm90YXRpb24nLFxuICAgICAgICB1cGRhdGVBeGlzOiAneidcbiAgICAgIH0sXG4gICAgICB3YWxraW5nOiB7XG4gICAgICAgIGN1cnJPZmZzZXQ6IDAsXG4gICAgICAgIGN1cnJBbmlEaXJlY3Rpb246IDEsXG4gICAgICAgIGFuaVNwZWVkOiAuMDA5LFxuICAgICAgICBtYXhPZmZzZXQ6IC4xLFxuICAgICAgICB1cGRhdGVQcm9wOiAncG9zaXRpb24nLFxuICAgICAgICB1cGRhdGVBeGlzOiAneidcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5fc291bmRzID0ge307XG4gICAgdGhpcy5faW5pdFNvdW5kcyhjYW1lcmEpO1xuXG4gICAgdGhpcy5fYmluZEV2ZW50cygpO1xuICB9LFxuXG4gIHVwZGF0ZSgpIHtcbiAgICBjb25zdCBjdXJyQW5pTmFtZSA9IG1vdmVtZW50SGVscGVyLmdldEN1cnJNb3ZlbWVudCgpID09PSAnd2Fsa2luZycgPyAnd2Fsa2luZycgOiAnYnJlYXRoaW5nJztcbiAgICB0aGlzLl91cGRhdGVQb3NpdGlvbkFuaShjdXJyQW5pTmFtZSk7XG4gICAgdGhpcy5fd2VhcG9uLnVwZGF0ZSgpO1xuICB9LFxuXG4gIF9pbml0U291bmRzKGNhbWVyYSkge1xuICAgIHZhciBsaXN0ZW5lciA9IG5ldyBUSFJFRS5BdWRpb0xpc3RlbmVyKCk7XG4gICAgY2FtZXJhLmFkZChsaXN0ZW5lcik7XG5cbiAgICB2YXIgc2hvdGd1bkZpcmVkID0gbmV3IFRIUkVFLkF1ZGlvKGxpc3RlbmVyKTtcbiAgICBzaG90Z3VuRmlyZWQubG9hZCgnYXNzZXRzX3B1YmxpYy9zb3VuZHMvc2hvdGd1bkZpcmVkLm1wMycpO1xuICAgIHRoaXMuX3NvdW5kc1snc2hvdGd1bkZpcmVkJ10gPSBzaG90Z3VuRmlyZWQ7XG4gIH0sXG5cbiAgX3VwZGF0ZVBvc2l0aW9uQW5pKG5hbWUpIHtcbiAgICBjb25zdCBtZXNoID0gdGhpcy5fbWVzaDtcbiAgICBjb25zdCBkZXRhaWxzID0gdGhpcy5fcG9zaXRpb25BbmlzW25hbWVdO1xuXG4gICAgY29uc3Qge1xuICAgICAgYW5pU3BlZWQsXG4gICAgICBjdXJyT2Zmc2V0LFxuICAgICAgY3VyckFuaURpcmVjdGlvbixcbiAgICAgIG1heE9mZnNldCxcbiAgICAgIHVwZGF0ZVByb3AsXG4gICAgICB1cGRhdGVBeGlzXG4gICAgfSA9IGRldGFpbHM7XG5cbiAgICBpZiAoIW1lc2gpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZihjdXJyQW5pRGlyZWN0aW9uID09PSAxKXtcbiAgICAgIHRoaXMuX3Bvc2l0aW9uQW5pc1tuYW1lXS5jdXJyT2Zmc2V0IC09IGFuaVNwZWVkO1xuICAgICAgbWVzaFt1cGRhdGVQcm9wXVt1cGRhdGVBeGlzXSAtPSBhbmlTcGVlZDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcG9zaXRpb25BbmlzW25hbWVdLmN1cnJPZmZzZXQgKz0gYW5pU3BlZWQ7XG4gICAgICBtZXNoW3VwZGF0ZVByb3BdW3VwZGF0ZUF4aXNdICs9IGFuaVNwZWVkO1xuICAgIH1cblxuICAgIGlmKGN1cnJPZmZzZXQgPD0gLW1heE9mZnNldCl7XG4gICAgICB0aGlzLl9wb3NpdGlvbkFuaXNbbmFtZV0uY3VyckFuaURpcmVjdGlvbiA9IDI7XG4gICAgfSBlbHNlIGlmKGN1cnJPZmZzZXQgPj0gbWF4T2Zmc2V0KXtcbiAgICAgIHRoaXMuX3Bvc2l0aW9uQW5pc1tuYW1lXS5jdXJyQW5pRGlyZWN0aW9uID0gMTtcbiAgICB9XG4gIH0sXG5cbiAgX2JpbmRFdmVudHMoKSB7XG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuX3RyaWdnZXJBY3Rpb24oJ3BvdycpLCBmYWxzZSk7XG4gIH0sXG5cbiAgX3RyaWdnZXJBY3Rpb24oYWN0aW9uTmFtZSkge1xuICAgIGNvbnN0IHdlYXBvbiA9IHRoaXMuX3dlYXBvbjtcbiAgICBjb25zdCBtZXNoID0gdGhpcy5fbWVzaDtcbiAgICBjb25zdCBzaG90Z3VuRmlyZWRTb3VuZCA9IG1lc2guY2hpbGRyZW5bMF07XG5cbiAgICBzd2l0Y2goYWN0aW9uTmFtZSl7XG4gICAgICBjYXNlICdwb3cnOlxuICAgICAgICBpZighc2hvdGd1bkZpcmVkU291bmQuaXNQbGF5aW5nKXtcbiAgICAgICAgICB3ZWFwb24ucGxheUFuaW1hdGlvbigncG93JywgdHJ1ZSk7XG4gICAgICAgICAgc2hvdGd1bkZpcmVkU291bmQucGxheSgpO1xuICAgICAgICB9XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cz17XG5cdFwibW92ZW1lbnRcIjoge1xuXHRcdFwic3BlZWRcIjogNjAwLFxuXHRcdFwianVtcEhlaWdodFwiOiAzNTAsXG5cdFx0XCJlbmFibGVTdXBlckp1bXBcIjogZmFsc2Vcblx0fSxcbiAgICBcInBhdGhzXCI6IHtcbiAgICAgICAgXCJpbWdcIjogXCJhc3NldHNfcHVibGljL2ltZ1wiLFxuICAgICAgICBcIm1vZGVsc1wiOiBcImFzc2V0c19wdWJsaWMvbW9kZWxzXCIsXG4gICAgICAgIFwic291bmRzXCI6IFwiYXNzZXRzX3B1YmxpYy9zb3VuZHNcIlxuICAgIH1cbn0iLCJpbXBvcnQgQ09ORklHIGZyb20gJy4uL2NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFuaW1NRDIge1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0Y29uc3QgbG9hZGVyID0gbmV3IFRIUkVFLk1EMkxvYWRlcigpO1xuXG5cdFx0Ly9jaGVjayBhbmltVGltZVNjYWxlIG9wdGlvbiBwcm9wZXJ0eVxuXHRcdG9wdGlvbnMuYW5pbVRpbWVTY2FsZSA9IG9wdGlvbnMuYW5pbVRpbWVTY2FsZSB8fCAxO1xuXHRcdG9wdGlvbnMubWQyID0gQ09ORklHLnBhdGhzLm1vZGVscytvcHRpb25zLm1kMjtcblx0XHRvcHRpb25zLnNraW4gPSBDT05GSUcucGF0aHMubW9kZWxzK29wdGlvbnMuc2tpbjtcblxuXHRcdC8vc2V0IGNsYXNzIHZhcnNcblx0XHR0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcblx0XHR0aGlzLl9jbG9jayA9IG5ldyBUSFJFRS5DbG9jaygpO1xuXG5cdFx0Ly9wcmVsb2FkIG1kMiBhbmQgbWVzaFxuXHRcdGxvYWRlci5sb2FkKG9wdGlvbnMubWQyLCAoZ2VvKSA9PiB7XG5cdFx0XHRnZW8uY29tcHV0ZUJvdW5kaW5nQm94KCk7XG5cblx0XHRcdGNvbnN0IG1lc2ggPSB0aGlzLl9tZXNoID0gdGhpcy5fY3JlYXRlTUQyUGFydChnZW8sIFRIUkVFLkltYWdlVXRpbHMubG9hZFRleHR1cmUob3B0aW9ucy5za2luKSk7XG5cdFx0XHRvcHRpb25zLm9uQ3JlYXRlKG1lc2gpO1xuXHRcdH0pO1xuXHR9XG5cblx0X2NyZWF0ZU1EMlBhcnQoZ2VvbWV0cnksIHNraW5NYXApIHtcblx0XHRjb25zdCBtYXRlcmlhbFdpcmVmcmFtZSA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKCB7IGNvbG9yOiAweGZmYWEwMCwgd2lyZWZyYW1lOiB0cnVlLCBtb3JwaFRhcmdldHM6IHRydWUsIG1vcnBoTm9ybWFsczogdHJ1ZSB9ICk7XG5cdFx0Y29uc3QgbWF0ZXJpYWxUZXh0dXJlID0gbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoIHsgY29sb3I6IDB4ZmZmZmZmLCB3aXJlZnJhbWU6IGZhbHNlLCBtYXA6IHNraW5NYXAsIG1vcnBoVGFyZ2V0czogdHJ1ZSwgbW9ycGhOb3JtYWxzOiB0cnVlIH0gKTtcblxuXHRcdGNvbnN0IG1lc2ggPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWxUZXh0dXJlKTtcblx0XHRtZXNoLnJvdGF0aW9uLnkgPSAtIE1hdGguUEkgLyAyO1xuXG5cdFx0bWVzaC5jYXN0U2hhZG93ID0gdHJ1ZTtcblx0XHRtZXNoLnJlY2VpdmVTaGFkb3cgPSB0cnVlO1xuXG5cdFx0bWVzaC5tYXRlcmlhbFRleHR1cmUgPSBtYXRlcmlhbFRleHR1cmU7XG5cdFx0bWVzaC5tYXRlcmlhbFdpcmVmcmFtZSA9IG1hdGVyaWFsV2lyZWZyYW1lO1xuXG5cdFx0dGhpcy5fcGxheWluZ0FuaW1hdGlvbiA9IGZhbHNlO1xuXHRcdHRoaXMuX21peGVyID0gbmV3IFRIUkVFLkFuaW1hdGlvbk1peGVyKG1lc2gpO1xuXHRcdHRoaXMuX21lc2ggPSBtZXNoO1xuXG5cdFx0aWYodGhpcy5fb3B0aW9ucy5hbmltYXRpb24pe1xuXHRcdFx0dGhpcy5wbGF5QW5pbWF0aW9uKHRoaXMuX29wdGlvbnMuYW5pbWF0aW9uKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbWVzaDtcblx0fVxuXG5cdHBsYXlBbmltYXRpb24obmFtZSwgcGxheU9uY2UpIHtcblx0XHRpZih0aGlzLl9wbGF5aW5nQW5pbWF0aW9uKXtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRjb25zdCBvcHRpb25zID0gdGhpcy5fb3B0aW9ucztcblx0XHRjb25zdCBtaXhlciA9IHRoaXMuX21peGVyID0gbmV3IFRIUkVFLkFuaW1hdGlvbk1peGVyKG1lc2gpO1xuXHRcdGNvbnN0IG1lc2ggPSB0aGlzLl9tZXNoO1xuXHRcdGNvbnN0IHRpbWVTY2FsZSA9IG9wdGlvbnMuYW5pbVRpbWVTY2FsZTtcblxuXHRcdC8vc3BlZWQgYW5pbWF0aW9uIHVwIGJ5IDx0aW1lU2NhbGU+XG5cdFx0Ly9kdXJhdGlvbiBpcyBub3cgPGR1cmF0aW9uPi88dGltZVNjYWxlPlxuXHRcdG1peGVyLnRpbWVTY2FsZSA9IHRpbWVTY2FsZTtcblxuXHRcdGlmKCFtZXNoKXtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRjb25zdCBjbGlwID0gVEhSRUUuQW5pbWF0aW9uQ2xpcC5maW5kQnlOYW1lKG1lc2guZ2VvbWV0cnkuYW5pbWF0aW9ucywgbmFtZSk7XG5cblx0XHRpZighY2xpcCl7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y29uc3QgYWN0aW9uID0gbmV3IFRIUkVFLkFuaW1hdGlvbkFjdGlvbihjbGlwLCBtaXhlci50aW1lKS5zZXRMb2NhbFJvb3QobWVzaCk7XG5cblx0XHRtaXhlci5hZGRBY3Rpb24oYWN0aW9uKTtcblx0XHR0aGlzLl9wbGF5aW5nQW5pbWF0aW9uID0gdHJ1ZTtcblxuXHRcdGlmKCFwbGF5T25jZSl7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRtaXhlci5yZW1vdmVBY3Rpb24oYWN0aW9uKTtcblx0XHRcdHRoaXMuX3BsYXlpbmdBbmltYXRpb24gPSBmYWxzZTtcblx0XHR9LCAoY2xpcC5kdXJhdGlvbi90aW1lU2NhbGUpKjEwMDApO1xuXHR9XG5cblx0dXBkYXRlKCkge1xuXHRcdGNvbnN0IGRlbHRhID0gdGhpcy5fY2xvY2suZ2V0RGVsdGEoKTtcblx0XHRpZih0aGlzLl9taXhlcikgdGhpcy5fbWl4ZXIudXBkYXRlKGRlbHRhKTtcblx0fVxufVxuIiwiZXhwb3J0IGRlZmF1bHQge1xuICByYXRhbWFoYXR0YToge1xuXHQgIHBhdGg6ICcvcmF0YW1haGF0dGEvJyxcblx0ICBib2R5OiBcInJhdGFtYWhhdHRhLm1kMlwiLFxuXHQgIHNraW5zOiBbIFwicmF0YW1haGF0dGEucG5nXCIsIFwiY3RmX2IucG5nXCIsIFwiY3RmX3IucG5nXCIsIFwiZGVhZC5wbmdcIiwgXCJnZWFyd2hvcmUucG5nXCIgXSxcblx0ICB3ZWFwb25zOiAgW1xuXHQgIFx0WyBcIndlYXBvbi5tZDJcIiwgXCJ3ZWFwb24ucG5nXCIgXSxcblx0XHRcdFsgXCJ3X2JmZy5tZDJcIiwgXCJ3X2JmZy5wbmdcIiBdLFxuXHRcdFx0WyBcIndfYmxhc3Rlci5tZDJcIiwgXCJ3X2JsYXN0ZXIucG5nXCIgXSxcblx0XHRcdFsgXCJ3X2NoYWluZ3VuLm1kMlwiLCBcIndfY2hhaW5ndW4ucG5nXCIgXSxcblx0XHRcdFsgXCJ3X2dsYXVuY2hlci5tZDJcIiwgXCJ3X2dsYXVuY2hlci5wbmdcIiBdLFxuXHRcdFx0WyBcIndfaHlwZXJibGFzdGVyLm1kMlwiLCBcIndfaHlwZXJibGFzdGVyLnBuZ1wiIF0sXG5cdFx0XHRbIFwid19tYWNoaW5lZ3VuLm1kMlwiLCBcIndfbWFjaGluZWd1bi5wbmdcIiBdLFxuXHRcdFx0WyBcIndfcmFpbGd1bi5tZDJcIiwgXCJ3X3JhaWxndW4ucG5nXCIgXSxcblx0XHRcdFsgXCJ3X3JsYXVuY2hlci5tZDJcIiwgXCJ3X3JsYXVuY2hlci5wbmdcIiBdLFxuXHRcdFx0WyBcIndfc2hvdGd1bi5tZDJcIiwgXCJ3X3Nob3RndW4ucG5nXCIgXSxcblx0XHRcdFsgXCJ3X3NzaG90Z3VuLm1kMlwiLCBcIndfc3Nob3RndW4ucG5nXCIgXVxuXHRcdF1cblx0fSxcblx0b2dybzoge1xuXHQgIHBhdGg6IFwiL29ncm8vXCIsXG5cdFx0Ym9keTogXCJvZ3JvLm1kMlwiLFxuXHRcdHNraW5zOiBbXG5cdFx0XHRcImdyb2suanBnXCIsIFwib2dyb2Jhc2UucG5nXCIsIFwiYXJib3NoYWsucG5nXCIsIFwiY3RmX3IucG5nXCIsIFwiY3RmX2IucG5nXCIsIFwiZGFya2FtLnBuZ1wiLCBcImZyZWVkb20ucG5nXCIsXG5cdFx0IFx0XCJnaWIucG5nXCIsIFwiZ29yZG9naC5wbmdcIiwgXCJpZ2Rvc2gucG5nXCIsIFwia2hvcm5lLnBuZ1wiLCBcIm5hYm9ncm8ucG5nXCIsXG5cdFx0IFx0XCJzaGFyb2toLnBuZ1wiXG5cdFx0XSxcblx0XHR3ZWFwb25zOiAgWyBbIFwid2VhcG9uLm1kMlwiLCBcIndlYXBvbi5qcGdcIiBdIF1cblx0fVxufTtcbiIsImltcG9ydCBDT05GSUcgZnJvbSAnLi4vLi4vY29uZmlnJztcbmltcG9ydCBDSEFSQUNURVJTX0NPTkZJRyBmcm9tICcuL2NoYXJhY3RlcnNDb25maWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGFyYWN0ZXIge1xuICBjb25zdHJ1Y3Rvcih1c2VyT3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuX29wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGNoYXJhY3RlcjogJ3JhdGFtYWhhdHRhJyxcbiAgICAgIHNraW46IDAsXG4gICAgICBhbmltYXRpb246ICdzdGFuZCdcbiAgICB9LCB1c2VyT3B0aW9ucyk7XG5cbiAgICBjb25zdCBjaGFyQ29uZmlnID0gQ0hBUkFDVEVSU19DT05GSUdbb3B0aW9ucy5jaGFyYWN0ZXJdO1xuICAgIGNvbnN0IGNoYXJhY3RlciA9IHRoaXMuX2NyZWF0ZUNoYXJhY3RlcihjaGFyQ29uZmlnKTtcblxuICAgIHRoaXMuX2V2ZW50TGlzdGVuZXJzID0ge307XG4gICAgdGhpcy5fY2xvY2sgPSBuZXcgVEhSRUUuQ2xvY2soKTtcblxuICAgIHRoaXMuX2NoYXJhY3RlciA9IGNoYXJhY3RlcjtcbiAgfVxuXG4gIG9uKGV2ZW50LCBjYWxsYmFjaykge1xuICAgIGlmKHR5cGVvZiB0aGlzLl9ldmVudExpc3RlbmVyc1tldmVudF0gIT09ICdhcnJheScpe1xuICAgICAgdGhpcy5fZXZlbnRMaXN0ZW5lcnNbZXZlbnRdID0gW107XG4gICAgfVxuICAgIHRoaXMuX2V2ZW50TGlzdGVuZXJzW2V2ZW50XS5wdXNoKGNhbGxiYWNrKTtcbiAgfVxuXG4gIF90cmlnZ2VyRXZlbnQoZXZlbnQpIHtcbiAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudExpc3RlbmVyc1tldmVudF07XG5cbiAgICBpZih0eXBlb2YgbGlzdGVuZXJzID09PSAnb2JqZWN0Jyl7XG4gICAgICBsaXN0ZW5lcnMuZm9yRWFjaChjYWxsYmFjayA9PiB7XG4gICAgICAgIGNhbGxiYWNrKHRoaXMuZ2V0UmF3KCkpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgX2NyZWF0ZUNoYXJhY3RlcihjaGFyQ29uZmlnKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuX29wdGlvbnM7XG4gICAgY29uc3QgY2hhcmFjdGVyID0gbmV3IFRIUkVFLk1EMkNoYXJhY3RlcigpO1xuXG4gICAgY2hhcmFjdGVyLnNjYWxlID0gLjU7XG5cbiAgICBjaGFyYWN0ZXIub25Mb2FkQ29tcGxldGUgPSAoKSA9PiB7XG4gICAgICB0aGlzLnNldFNraW4ob3B0aW9ucy5za2luKTtcbiAgICAgIHRoaXMuc2V0QW5pbWF0aW9uKG9wdGlvbnMuYW5pbWF0aW9uKTtcblxuICAgICAgaWYodHlwZW9mIG9wdGlvbnMud2VhcG9uID09PSAnbnVtYmVyJyl7XG4gICAgICAgIHRoaXMuc2V0V2VhcG9uKG9wdGlvbnMud2VhcG9uKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLnggPT09ICdudW1iZXInKSB7XG4gICAgICAgIGNoYXJhY3Rlci5yb290LnBvc2l0aW9uLnggPSBvcHRpb25zLng7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy55ID09PSAnbnVtYmVyJykge1xuICAgICAgICBjaGFyYWN0ZXIucm9vdC5wb3NpdGlvbi55ID0gb3B0aW9ucy55O1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbnMueiA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgY2hhcmFjdGVyLnJvb3QucG9zaXRpb24ueiA9IG9wdGlvbnMuejtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fdHJpZ2dlckV2ZW50KCdjcmVhdGUnKTtcbiAgICB9O1xuXG4gICAgY2hhckNvbmZpZy5iYXNlVXJsID0gQ09ORklHLnBhdGhzLm1vZGVscytjaGFyQ29uZmlnLnBhdGg7XG4gICAgY2hhcmFjdGVyLmxvYWRQYXJ0cyhjaGFyQ29uZmlnKTtcblxuICAgIHJldHVybiBjaGFyYWN0ZXI7XG4gIH1cblxuICBzZXRTa2luKGlkeCkge1xuICAgIC8vY2hhcmFjdGVyLnNraW5zQm9keVxuICAgIHRoaXMuX2NoYXJhY3Rlci5zZXRTa2luKGlkeCk7XG4gIH1cblxuICBzZXRXZWFwb24oaWR4KSB7XG4gICAgLy9jaGFyYWN0ZXIud2VhcG9uc1xuICAgIHRoaXMuX2NoYXJhY3Rlci5zZXRXZWFwb24oaWR4KTtcbiAgfVxuXG4gIHNldEFuaW1hdGlvbihuYW1lKSB7XG4gICAgLy9jaGFyYWN0ZXIubWVzaEJvZHkuZ2VvbWV0cnkuYW5pbWF0aW9uc1xuICAgIHRoaXMuX2NoYXJhY3Rlci5zZXRBbmltYXRpb24obmFtZSk7XG4gIH1cblxuICBnZXRSYXcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NoYXJhY3RlcjtcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBjb25zdCBkZWx0YSA9IHRoaXMuX2Nsb2NrLmdldERlbHRhKCk7XG4gICAgdGhpcy5fY2hhcmFjdGVyLnVwZGF0ZShkZWx0YSk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdChlbGVtZW50LCBjYW1lcmEsIGNvbnRyb2xzKXtcbiAgICB0aGlzLl9jb250cm9scyA9IG5ldyBUSFJFRS5Qb2ludGVyTG9ja0NvbnRyb2xzKGNhbWVyYSk7XG4gICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5fYmluZEV2ZW50cygpO1xuICB9LFxuXG4gIGdldENvbnRyb2xzKCkge1xuICAgIHJldHVybiB0aGlzLl9jb250cm9scztcbiAgfSxcblxuICBnZXRFbmFibGVkKCl7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRyb2xzLmVuYWJsZWQ7XG4gIH0sXG5cbiAgX2JpbmRFdmVudHMoKXtcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fcmVxdWVzdExvY2suYmluZCh0aGlzKSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmxvY2tjaGFuZ2UnLCB0aGlzLl9vbkxvY2tDaGFuZ2UuYmluZCh0aGlzKSwgZmFsc2UpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21venBvaW50ZXJsb2NrY2hhbmdlJywgdGhpcy5fb25Mb2NrQ2hhbmdlLmJpbmQodGhpcyksIGZhbHNlKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRwb2ludGVybG9ja2NoYW5nZScsIHRoaXMuX29uTG9ja0NoYW5nZS5iaW5kKHRoaXMpLCBmYWxzZSk7XG4gIH0sXG5cbiAgX3JlcXVlc3RMb2NrKCl7XG4gICAgY29uc3QgZWxlbWVudCA9IHRoaXMuX2VsZW1lbnQ7XG4gICAgZWxlbWVudC5yZXF1ZXN0UG9pbnRlckxvY2sgPSBlbGVtZW50LnJlcXVlc3RQb2ludGVyTG9jayB8fCBlbGVtZW50Lm1velJlcXVlc3RQb2ludGVyTG9jayB8fCBlbGVtZW50LndlYmtpdFJlcXVlc3RQb2ludGVyTG9jaztcbiAgICBlbGVtZW50LnJlcXVlc3RQb2ludGVyTG9jaygpO1xuICB9LFxuXG4gIF9vbkxvY2tDaGFuZ2UoKXtcbiAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5fZWxlbWVudDtcbiAgICBpZiAoZG9jdW1lbnQucG9pbnRlckxvY2tFbGVtZW50ID09PSBlbGVtZW50IHx8XG4gICAgICBkb2N1bWVudC5tb3pQb2ludGVyTG9ja0VsZW1lbnQgPT09IGVsZW1lbnQgfHxcbiAgICAgIGRvY3VtZW50LndlYmtpdFBvaW50ZXJMb2NrRWxlbWVudCA9PT0gZWxlbWVudCkge1xuICAgICAgY29uc29sZS5sb2coJ1BvaW50ZXIgbG9ja2VkJyk7XG4gICAgICB0aGlzLl9jb250cm9scy5lbmFibGVkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJ1BvaW50ZXIgbG9jayByZW1vdmVkJyk7XG4gICAgICB0aGlzLl9jb250cm9scy5lbmFibGVkID0gZmFsc2U7XG4gICAgfVxuICB9XG59O1xuIiwiZXhwb3J0IGRlZmF1bHQge1xuICBpbml0KGNvbnRyb2xzLCBjb2xsaXNpb25PYmplY3RzLCBvcHRpb25zKSB7XG4gICAgdGhpcy5fY29udHJvbHMgPSBjb250cm9scztcbiAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcblxuICAgIHRoaXMuX2NvbGxpc2lvbk9iamVjdHMgPSBjb2xsaXNpb25PYmplY3RzO1xuICAgIHRoaXMuX3JheWNhc3RlciA9IG5ldyBUSFJFRS5SYXljYXN0ZXIobmV3IFRIUkVFLlZlY3RvcjMoKSwgbmV3IFRIUkVFLlZlY3RvcjMoMCwgLTEsIDApLCAwLCAxMCk7XG5cbiAgICB0aGlzLl9tb3ZlbWVudCA9IHtcbiAgICAgIGZvcndhcmQ6IGZhbHNlLFxuICAgICAgYmFja3dhcmQ6IGZhbHNlLFxuICAgICAgcmlnaHQ6IGZhbHNlLFxuICAgICAgbGVmdDogZmFsc2UsXG4gICAgICBjYW5KdW1wOiBmYWxzZVxuICAgIH07XG5cbiAgICB0aGlzLl92ZWxvY2l0eSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG4gICAgdGhpcy5fcHJldlRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcblxuICAgIHRoaXMuX2JpbmRLZXlFdmVudHMoKTtcbiAgfSxcblxuICBnZXRDdXJyTW92ZW1lbnQoKSB7XG4gICAgY29uc3QgbW92ZW1lbnQgPSB0aGlzLl9tb3ZlbWVudDtcblxuICAgIGZvciAoY29uc3Qga2V5IGluIG1vdmVtZW50KSB7XG4gICAgICBpZighbW92ZW1lbnRba2V5XSl7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoWydmb3J3YXJkJywgJ2JhY2t3YXJkJywgJ3JpZ2h0JywgJ2xlZnQnXS5pbmRleE9mKGtleSkgIT09IC0xICYmIG1vdmVtZW50LmNhbkp1bXAgIT09IGZhbHNlKSB7XG4gICAgICAgIC8vd2Fsa2luZyBhbmQgbm90IGp1bXBpbmdcbiAgICAgICAgcmV0dXJuICd3YWxraW5nJztcbiAgICAgIH0gZWxzZSBpZihrZXkgPT09ICdjYW5KdW1wJyl7XG4gICAgICAgIC8vanVtcGluZ1xuICAgICAgICByZXR1cm4gJ2p1bXBpbmcnXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvL25vdCB3YWxraW5nLCBub3QganVtcGluZyA9IGlkbGVcbiAgICAgICAgcmV0dXJuICdpZGxlJztcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgY2hlY2tNb3ZlbWVudCgpIHtcbiAgICBjb25zdCBjb250cm9scyA9IHRoaXMuX2NvbnRyb2xzO1xuICAgIGNvbnN0IHZlbG9jaXR5ID0gdGhpcy5fdmVsb2NpdHk7XG4gICAgY29uc3QgbW92ZW1lbnQgPSB0aGlzLl9tb3ZlbWVudDtcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5fb3B0aW9ucztcblxuICAgIGNvbnN0IHRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICBjb25zdCBkZWx0YSA9ICh0aW1lIC0gdGhpcy5fcHJldlRpbWUpIC8gMTAwMDtcblxuICAgICAgLy91cGRhdGUgdmVsb2NpdHlcbiAgICB2ZWxvY2l0eS54IC09IHZlbG9jaXR5LnggKiAxMC4wICogZGVsdGE7XG4gICAgdmVsb2NpdHkueiAtPSB2ZWxvY2l0eS56ICogMTAuMCAqIGRlbHRhO1xuICAgIHZlbG9jaXR5LnkgLT0gOS44ICogMTAwLjAgKiBkZWx0YTsgLy8gMTAwLjAgPSBtYXNzXG5cbiAgICAvL2NoZWNrIGRpcmVjdGlvbmFsIG1vdmVtZW50XG4gICAgaWYobW92ZW1lbnQuZm9yd2FyZCkgdmVsb2NpdHkueiAtPSBvcHRpb25zLm1vdmVtZW50U3BlZWQgKiBkZWx0YTtcbiAgICBpZihtb3ZlbWVudC5iYWNrd2FyZCkgdmVsb2NpdHkueiArPSBvcHRpb25zLm1vdmVtZW50U3BlZWQgKiBkZWx0YTtcbiAgICBpZihtb3ZlbWVudC5sZWZ0KSB2ZWxvY2l0eS54IC09IG9wdGlvbnMubW92ZW1lbnRTcGVlZCAqIGRlbHRhO1xuICAgIGlmKG1vdmVtZW50LnJpZ2h0KSB2ZWxvY2l0eS54ICs9IG9wdGlvbnMubW92ZW1lbnRTcGVlZCAqIGRlbHRhO1xuXG4gICAgLy9vYmplY3RzIGNvbGxpc2lvbiBkZXRlY3Rpb25cbiAgICBjb25zdCBpc09uT2JqZWN0ID0gdGhpcy5fY2hlY2tPYmplY3RzQ29sbGlzaW9uKCk7XG4gICAgaWYgKGlzT25PYmplY3QpIHtcbiAgICAgIHZlbG9jaXR5LnkgPSBNYXRoLm1heCgwLCB2ZWxvY2l0eS55KTtcbiAgICAgIG1vdmVtZW50LmNhbkp1bXAgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vdXBkYXRlIGNvbnRyb2xzXG4gICAgY29uc3QgY29udHJvbHNPYmplY3QgPSBjb250cm9scy5nZXRPYmplY3QoKTtcbiAgICBjb250cm9sc09iamVjdC50cmFuc2xhdGVaKHZlbG9jaXR5LnogKiBkZWx0YSk7XG4gICAgY29udHJvbHNPYmplY3QudHJhbnNsYXRlWSh2ZWxvY2l0eS55ICogZGVsdGEpO1xuICAgIGNvbnRyb2xzT2JqZWN0LnRyYW5zbGF0ZVgodmVsb2NpdHkueCAqIGRlbHRhKTtcblxuICAgIC8vZGV0ZWN0IGZsb29yXG4gICAgaWYgKGNvbnRyb2xzLmdldE9iamVjdCgpLnBvc2l0aW9uLnkgPCAyMCkge1xuICAgICAgdmVsb2NpdHkueSA9IDA7XG4gICAgICBjb250cm9sc09iamVjdC5wb3NpdGlvbi55ID0gMjA7XG4gICAgICBtb3ZlbWVudC5jYW5KdW1wID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB0aGlzLl9wcmV2VGltZSA9IHRpbWU7XG4gIH0sXG5cbiAgX2NoZWNrT2JqZWN0c0NvbGxpc2lvbigpIHtcbiAgICBjb25zdCByYXljYXN0ZXIgPSB0aGlzLl9yYXljYXN0ZXI7XG4gICAgY29uc3Qgb2JqZWN0cyA9IHRoaXMuX2NvbGxpc2lvbk9iamVjdHM7XG4gICAgY29uc3QgY29udHJvbHMgPSB0aGlzLl9jb250cm9scztcblxuICAgIHJheWNhc3Rlci5yYXkub3JpZ2luLmNvcHkoY29udHJvbHMuZ2V0T2JqZWN0KCkucG9zaXRpb24pO1xuICAgIHJheWNhc3Rlci5yYXkub3JpZ2luLnkgLT0gMTA7XG5cbiAgICBjb25zdCBpbnRlcnNlY3Rpb25zID0gcmF5Y2FzdGVyLmludGVyc2VjdE9iamVjdHMob2JqZWN0cyk7XG4gICAgY29uc3QgaXNPbk9iamVjdCA9IGludGVyc2VjdGlvbnMubGVuZ3RoID4gMDtcblxuICAgIHJldHVybiBpc09uT2JqZWN0O1xuICB9LFxuXG4gIF9iaW5kS2V5RXZlbnRzKCkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoe2tleUNvZGV9KSA9PiB0aGlzLl9jaGVja0tleXMoa2V5Q29kZSwgdHJ1ZSksIGZhbHNlKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsICh7a2V5Q29kZX0pID0+IHRoaXMuX2NoZWNrS2V5cyhrZXlDb2RlLCBmYWxzZSksIGZhbHNlKTtcbiAgfSxcblxuICBfY2hlY2tLZXlzKGtleUNvZGUsIHNldFRvVmFsKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuX29wdGlvbnM7XG4gICAgc3dpdGNoKGtleUNvZGUpe1xuICAgICAgY2FzZSA4NzogLy93XG4gICAgICAgIHRoaXMuX21vdmVtZW50LmZvcndhcmQgPSBzZXRUb1ZhbDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDgzOiAvL3NcbiAgICAgICAgdGhpcy5fbW92ZW1lbnQuYmFja3dhcmQgPSBzZXRUb1ZhbDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDY4OiAvLyBkXG4gICAgICAgIHRoaXMuX21vdmVtZW50LnJpZ2h0ID0gc2V0VG9WYWw7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA2NTogLy8gYVxuICAgICAgICB0aGlzLl9tb3ZlbWVudC5sZWZ0ID0gc2V0VG9WYWw7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzMjogLy8gc3BhY2VcbiAgICAgICAgaWYoc2V0VG9WYWwgPT09IHRydWUpeyAvL2tleWRvd25cbiAgICAgICAgICBpZih0aGlzLl9tb3ZlbWVudC5jYW5KdW1wIHx8IG9wdGlvbnMuZW5hYmxlU3VwZXJKdW1wKXtcbiAgICAgICAgICAgIHRoaXMuX3ZlbG9jaXR5LnkgKz0gdGhpcy5fb3B0aW9ucy5qdW1wSGVpZ2h0O1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl9tb3ZlbWVudC5jYW5KdW1wID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG59O1xuIiwiZXhwb3J0IGRlZmF1bHQge1xuXHRyYW5kKG1pbiwgbWF4KSB7XG5cdFx0cmV0dXJuIE1hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiBtYXgpICsgbWluKTtcblx0fVxufTtcbiIsImltcG9ydCBDT05GSUcgZnJvbSAnLi4vY29uZmlnJztcbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBnZW5lcmF0ZVJlbmRlcmVyKGNsZWFySGV4KSB7XG4gICAgY29uc3QgcmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcigpO1xuICAgIHJlbmRlcmVyLnNldENsZWFyQ29sb3IoY2xlYXJIZXgpO1xuICAgIHJlbmRlcmVyLnNldFBpeGVsUmF0aW8od2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMSk7XG4gICAgcmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICByZXR1cm4gcmVuZGVyZXI7XG4gIH0sXG5cbiAgZ2VuZXJhdGVGbG9vcigpIHtcbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyBUSFJFRS5QbGFuZUdlb21ldHJ5KDIwMDAsIDIwMDAsIDEwMCwgMTAwKTtcblxuICAgIGdlb21ldHJ5LnJvdGF0ZVgoLU1hdGguUEkvMik7XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IGdlb21ldHJ5LnZlcnRpY2VzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgY29uc3QgdmVydGV4ID0gZ2VvbWV0cnkudmVydGljZXNbaV07XG4gICAgICB2ZXJ0ZXgueCArPSBNYXRoLnJhbmRvbSgpICogMjA7XG4gICAgICB2ZXJ0ZXgueiArPSBNYXRoLnJhbmRvbSgpICogMjA7XG4gICAgICB2ZXJ0ZXgueSArPSBNYXRoLnJhbmRvbSgpO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwLCBsID0gZ2VvbWV0cnkuZmFjZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBjb25zdCBmYWNlID0gZ2VvbWV0cnkuZmFjZXNbaV07XG4gICAgICBjb25zdCBjb2xvcnMgPSBbXTtcblxuICAgICAgZm9yKGxldCBqID0gMDsgaiA8IDM7IGorKyl7XG4gICAgICAgIGNvbnN0IGNvbG9yID0gbmV3IFRIUkVFLkNvbG9yKGByZ2IoJHt1dGlscy5yYW5kKDEwMCwxODApfSwke3V0aWxzLnJhbmQoMTAwLDE4MCl9LCR7dXRpbHMucmFuZCgxMDAsMTgwKX0pYCk7XG4gICAgICAgIGNvbG9ycy5wdXNoKGNvbG9yKTtcbiAgICAgIH1cblxuICAgICAgZm9yKGxldCBqID0gMDsgaiA8IDM7IGorKyl7XG4gICAgICAgIGZhY2UudmVydGV4Q29sb3JzW2pdID0gY29sb3JzW2pdO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgdmVydGV4Q29sb3JzOiBUSFJFRS5WZXJ0ZXhDb2xvcnMgfSk7XG4gICAgcmV0dXJuIG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCk7XG4gIH0sXG5cbiAgZ2VuZXJhdGVCb3hlcyhhbW91bnQsIHRleHR1cmVQYXRoLCBjYWxsYmFjaykge1xuICAgIGNvbnN0IHRleHR1cmVMb2FkZXIgPSBuZXcgVEhSRUUuVGV4dHVyZUxvYWRlcigpO1xuXG4gICAgY29uc3QgZG9HZW5lcmF0ZSA9IChjcmF0ZVRleHR1cmUpID0+IHtcbiAgICAgIGxldCBtZXNoO1xuICAgICAgY29uc3QgYm94ZXMgPSBbXTtcblxuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGFtb3VudDsgaSsrKXtcbiAgICAgICAgICBtZXNoID0gdGhpcy5fZ2VuZXJhdGVCb3goe1xuICAgICAgICAgICAgd2lkdGg6IDIwLFxuICAgICAgICAgICAgaGVpZ2h0OiAyMCxcbiAgICAgICAgICAgIGRlcHRoOiAyMCxcbiAgICAgICAgICAgIHJnYjogWzU1LDgxLDE1OV0sXG4gICAgICAgICAgICB0ZXh0dXJlOiBjcmF0ZVRleHR1cmVcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIG1lc2gucG9zaXRpb24ueCA9IE1hdGguZmxvb3IoIE1hdGgucmFuZG9tKCkgKiAyMCAtIDEwICkgKiAyMDtcbiAgICAgICAgICBtZXNoLnBvc2l0aW9uLnkgPSBNYXRoLmZsb29yKCBNYXRoLnJhbmRvbSgpICogMjAgKSAqIDIwICsgMTA7XG4gICAgICAgICAgbWVzaC5wb3NpdGlvbi56ID0gTWF0aC5mbG9vciggTWF0aC5yYW5kb20oKSAqIDIwIC0gMTAgKSAqIDIwO1xuXG4gICAgICAgICAgbWVzaC5yb3RhdGlvbi55ID0gLTEwMDtcbiAgICAgICAgICBib3hlcy5wdXNoKG1lc2gpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FsbGJhY2soYm94ZXMpO1xuICAgICAgfTtcblxuICAgICAgdGV4dHVyZUxvYWRlci5sb2FkKENPTkZJRy5wYXRocy5pbWcrdGV4dHVyZVBhdGgsIGNyYXRlVGV4dHVyZSA9PiB7XG4gICAgICBkb0dlbmVyYXRlKGNyYXRlVGV4dHVyZSk7XG4gICAgfSk7XG4gIH0sXG5cbiAgX2dlbmVyYXRlQm94KG9wdGlvbnMpIHtcbiAgICBjb25zdCB3aWR0aCA9IG9wdGlvbnMud2lkdGg7XG4gICAgY29uc3QgaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQ7XG4gICAgY29uc3QgZGVwdGggPSBvcHRpb25zLmRlcHRoO1xuICAgIGNvbnN0IHJnYiA9IG9wdGlvbnMucmdiO1xuICAgIGNvbnN0IGJveCA9IG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSh3aWR0aCwgaGVpZ2h0LCBkZXB0aCk7XG4gICAgbGV0IG1hdGVyaWFsO1xuXG4gICAgaWYob3B0aW9ucy50ZXh0dXJlKXtcbiAgICAgIG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKHtcbiAgICAgICAgbWFwOiBvcHRpb25zLnRleHR1cmVcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gICAgICAgIHZlcnRleENvbG9yczogVEhSRUUuVmVydGV4Q29sb3JzXG4gICAgICB9KTtcblxuICAgICAgbGV0IGZhY2U7XG4gICAgICBsZXQgY29sb3I7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm94LmZhY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGZhY2UgPSBib3guZmFjZXNbaV07XG4gICAgICAgIGNvbG9yID0gbmV3IFRIUkVFLkNvbG9yKGByZ2IoJHtyZ2JbMF0rKGkqNCl9LCR7cmdiWzFdKyhpKjQpfSwke3JnYlswXSsoaSo0KX0pYCk7XG4gICAgICAgIGZhY2UuY29sb3IgPSBjb2xvcjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFRIUkVFLk1lc2goYm94LCBtYXRlcmlhbCk7XG4gIH1cbn07XG4iLCJpbXBvcnQgQ09ORklHIGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB1dGlscyBmcm9tICcuL2xpYnMvdXRpbHMnO1xuaW1wb3J0IHdvcmxkSGVscGVyIGZyb20gJy4vbGlicy93b3JsZEhlbHBlcic7XG5pbXBvcnQgbG9ja0NvbnRyb2xzSGVscGVyIGZyb20gJy4vbGlicy9sb2NrQ29udHJvbHNIZWxwZXInO1xuaW1wb3J0ICBtb3ZlbWVudEhlbHBlciBmcm9tICcuL2xpYnMvbW92ZW1lbnRIZWxwZXInO1xuaW1wb3J0ICogYXMgY29tcG9uZW50cyBmcm9tICcuL2NvbXBvbmVudHMnO1xuXG5sZXQgc2NlbmUgPSBudWxsO1xubGV0IGNhbWVyYSA9IG51bGw7XG5sZXQgcmVuZGVyZXIgPSBudWxsO1xubGV0IHN0YXRzID0gbnVsbDtcblxuY29uc3QgY29tcG9uZW50c1RvVXBkYXRlID0gT2JqZWN0LnZhbHVlcyhjb21wb25lbnRzKS5maWx0ZXIoKHt1cGRhdGV9KSA9PiAodHlwZW9mIHVwZGF0ZSA9PT0gJ2Z1bmN0aW9uJykpO1xuY29uc3QgY29udGFpbmVyTm9kZSA9IGRvY3VtZW50LmJvZHk7XG5cbmluaXRTdGF0cygpO1xuaW5pdCgpO1xudXBkYXRlKCk7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG4gIGNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg3NSwgd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQsIDEsIDEwMDApO1xuXG4gIC8vbGlnaHRcbiAgY29uc3QgbGlnaHQgPSBuZXcgVEhSRUUuSGVtaXNwaGVyZUxpZ2h0KDB4ZmZmZmZmLCAweGFhYWFhYSwgMC42KTtcbiAgc2NlbmUuYWRkKGxpZ2h0KTtcblxuICAvL2Zsb29yXG4gIGNvbnN0IGZsb29yTWVzaCA9IHdvcmxkSGVscGVyLmdlbmVyYXRlRmxvb3IoKTtcbiAgc2NlbmUuYWRkKGZsb29yTWVzaCk7XG5cbiAgLy9yZW5kZXJlclxuICByZW5kZXJlciA9IHdvcmxkSGVscGVyLmdlbmVyYXRlUmVuZGVyZXIoMHgwZjQ0NWMpO1xuICBjb250YWluZXJOb2RlLmFwcGVuZENoaWxkKHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuXG4gIGxvY2tDb250cm9sc0hlbHBlci5pbml0KGNvbnRhaW5lck5vZGUsIGNhbWVyYSk7XG4gIGNvbnN0IGNvbnRyb2xzID0gbG9ja0NvbnRyb2xzSGVscGVyLmdldENvbnRyb2xzKCk7XG4gIHNjZW5lLmFkZChjb250cm9scy5nZXRPYmplY3QoKSk7XG5cbiAgLy9ib3hlc1xuICBjb21wb25lbnRzLmJveGVzLmluaXQoc2NlbmUsIChib3hlcykgPT4ge1xuICAgIG1vdmVtZW50SGVscGVyLmluaXQoY29udHJvbHMsIGJveGVzLCB7XG4gICAgICBtb3ZlbWVudFNwZWVkOiBDT05GSUcubW92ZW1lbnQuc3BlZWQsXG4gICAgICBqdW1wSGVpZ2h0OiBDT05GSUcubW92ZW1lbnQuanVtcEhlaWdodCxcbiAgICAgIGVuYWJsZVN1cGVySnVtcDogQ09ORklHLm1vdmVtZW50LmVuYWJsZVN1cGVySnVtcFxuICAgIH0pO1xuXG4gICAgLy9jaGFyYWN0ZXJzXG4gICAgY29tcG9uZW50cy5jaGFyYWN0ZXJzLmluaXQoc2NlbmUsIGJveGVzKTtcblxuICAgIC8vd2VhcG9uXG4gICAgY29tcG9uZW50cy5wbGF5ZXJXZWFwb24uaW5pdChjYW1lcmEpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlKCl7XG4gIHN0YXRzLmJlZ2luKCk7XG5cbiAgaWYobG9ja0NvbnRyb2xzSGVscGVyLmdldEVuYWJsZWQoKSl7XG4gICAgbW92ZW1lbnRIZWxwZXIuY2hlY2tNb3ZlbWVudCgpO1xuXG4gICAgZm9yIChjb25zdCBjb21wb25lbnQgb2YgY29tcG9uZW50c1RvVXBkYXRlKSB7XG4gICAgICBjb21wb25lbnQudXBkYXRlKCk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEpO1xuXG4gIHN0YXRzLmVuZCgpO1xuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlKTtcbn1cblxuZnVuY3Rpb24gaW5pdFN0YXRzKCl7XG4gIHN0YXRzID0gbmV3IFN0YXRzKCk7XG4gIHN0YXRzLnNldE1vZGUoMCk7XG5cbiAgc3RhdHMuZG9tRWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gIHN0YXRzLmRvbUVsZW1lbnQuc3R5bGUubGVmdCA9ICcwcHgnO1xuICBzdGF0cy5kb21FbGVtZW50LnN0eWxlLnRvcCA9ICcwcHgnO1xuICBjb250YWluZXJOb2RlLmFwcGVuZENoaWxkKHN0YXRzLmRvbUVsZW1lbnQpO1xufVxuIl19
