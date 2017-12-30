import * as THREE from 'three';
import CONFIG from '../config';
import Box from './Box';
import worldHelper from '../helpers/worldHelper';

export default {
  setScene(scene) {
    this._scene = scene;
  },

  generate() {
    return new Promise((resolve) => {
      this._generateBoxes(250, '/crate3.jpg', (boxes) => {
        this._generateBoxes(250, '/crate-tnt-1.jpg', (boxes2) => {
          boxes = boxes.concat(boxes2);
          this._addBoxesToScene(boxes);
          resolve(boxes);
        });
      });
    });
  },

  _addBoxesToScene(boxMeshes) {
    const scene = this._scene;
    for (const mesh of boxMeshes) {
      scene.add(mesh);
    }
  },

  _generateBoxes(amount, texturePath, callback) {
    const textureLoader = new THREE.TextureLoader();

    function doGenerate(crateTexture) {
      const boxes = [];

      for(let i = 0; i < amount; i++){
        const mesh = new Box({
          width: 20,
          height: 20,
          depth: 20,
          rgb: [55,81,159],
          texture: crateTexture
        }).generateMesh();

        mesh.position.x = Math.floor( Math.random() * 20 - 10 ) * 20;
        mesh.position.y = Math.floor( Math.random() * 20 ) * 20 + 10;
        mesh.position.z = Math.floor( Math.random() * 20 - 10 ) * 20;

        mesh.rotation.y = -100;
        boxes.push(mesh);
      }

      callback(boxes);
    }

    textureLoader.load(`${CONFIG.paths.img}${texturePath}`, doGenerate.bind(this));
  }
};
