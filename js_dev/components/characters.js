import Character from '../libs/Character';

export default {
  init(scene) {
    const characters = [];
    const characterConfigs = [{
      x: 20,
      character: 'ogro'
    }, {
      x: -20
    }];

    for (const config of characterConfigs) {
      const character = new Character(config);
      scene.add(character.getRaw().root);
      characters.push(character);
    }

    this._characters = characters;
  },

  update() {
    for (const character of this._characters) {
      character.update();
    }
  }
};
