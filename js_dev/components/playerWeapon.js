import AnimMD2 from '../libs/AnimMD2';
import movementHelper from '../libs/movementHelper';

export default {
  init(camera) {
    this._weapon = new AnimMD2({
      md2: '/shotgun/hud/Dreadus-Shotgun.md2',
      skin: '/shotgun/hud/Dreadus-Shotgun.jpg',
      animTimeScale: 2,
      onCreate: (mesh) => {
        this._mesh = mesh;

        mesh.scale.set(.05,.05,.05);
        mesh.rotation.y = Math.PI / 2;
        mesh.position.x -= 1;

        camera.add(mesh);
        mesh.add(this._sounds.shotgunFired);
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

  onAnimation(name, callback) {
    this._animationCallbacks[name] = callback;
  },

  update() {
    const currAniName = movementHelper.getCurrMovement() === 'walking' ? 'walking' : 'breathing';
    this._updatePositionAni(currAniName);
    this._weapon.update();
  },

  _initSounds(camera) {
    var listener = new THREE.AudioListener();
    camera.add(listener);

    var shotgunFired = new THREE.Audio(listener);
    shotgunFired.load('assets_public/sounds/shotgunFired.mp3');
    this._sounds['shotgunFired'] = shotgunFired;
  },

  _updatePositionAni(name) {
    const mesh = this._mesh;
    const details = this._positionAnis[name];

    const {
      aniSpeed,
      currOffset,
      currAniDirection,
      maxOffset,
      updateProp,
      updateAxis
    } = details;

    if (!mesh) {
      return;
    }

    if(currAniDirection === 1){
      this._positionAnis[name].currOffset -= aniSpeed;
      mesh[updateProp][updateAxis] -= aniSpeed;
    } else {
      this._positionAnis[name].currOffset += aniSpeed;
      mesh[updateProp][updateAxis] += aniSpeed;
    }

    if(currOffset <= -maxOffset){
      this._positionAnis[name].currAniDirection = 2;
    } else if(currOffset >= maxOffset){
      this._positionAnis[name].currAniDirection = 1;
    }
  },

  _bindEvents() {
    document.body.addEventListener('click', () => this._triggerAction('pow'), false);
  },

  _triggerAction(actionName) {
    const weapon = this._weapon;
    const mesh = this._mesh;
    const shotgunFiredSound = mesh.children[0];
    const animationCallbacks = this._animationCallbacks;

    switch(actionName){
      case 'pow':
        if(!shotgunFiredSound.isPlaying){
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
