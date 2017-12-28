import CONFIG from '../../config';
import CHARACTERS_CONFIG from './charactersConfig';

export default class Character {
  constructor(userOptions = {}) {
    const options = this._options = Object.assign({
      character: 'ratamahatta',
      skin: 0,
      animation: 'stand'
    }, userOptions);

    const charConfig = CHARACTERS_CONFIG[options.character];
    const character = this._createCharacter(charConfig);

    this._eventListeners = {};
    this._clock = new THREE.Clock();

    this._character = character;
  }

  on(event, callback) {
    if(typeof this._eventListeners[event] !== 'array'){
      this._eventListeners[event] = [];
    }
    this._eventListeners[event].push(callback);
  }

  _triggerEvent(event) {
    const listeners = this._eventListeners[event];

    if(typeof listeners === 'object'){
      listeners.forEach(callback => {
        callback(this.getRaw());
      });
    }
  }

  _createCharacter(charConfig) {
    const options = this._options;
    const character = new THREE.MD2Character();

    character.scale = .5;

    character.onLoadComplete = () => {
      this.setSkin(options.skin);
      this.setAnimation(options.animation);

      if(typeof options.weapon === 'number'){
        this.setWeapon(options.weapon);
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

      this._triggerEvent('create');
    };

    charConfig.baseUrl = CONFIG.paths.models+charConfig.path;
    character.loadParts(charConfig);

    return character;
  }

  setSkin(idx) {
    //character.skinsBody
    this._character.setSkin(idx);
  }

  setWeapon(idx) {
    //character.weapons
    this._character.setWeapon(idx);
  }

  setAnimation(name) {
    //character.meshBody.geometry.animations
    this._character.setAnimation(name);
  }

  getRaw() {
    return this._character;
  }

  update() {
    const delta = this._clock.getDelta();
    this._character.update(delta);
  }
}
