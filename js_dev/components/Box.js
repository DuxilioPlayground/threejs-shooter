import * as THREE from 'three';

export default class Box {
  constructor(options) {
    this._options = Object.assign({
      width: 20,
      height: 20,
      depth: 20,
      rgb: [55,81,159],
      texture: null
    }, options);
  }

  generateMesh() {
    const {
      width,
      height,
      depth,
      rbg,
      texture
    } = this._options;

    const box = new THREE.BoxGeometry(width, height, depth);

    if (texture) {
      const material = new THREE.MeshPhongMaterial({
        map: texture
      });
      return new THREE.Mesh(box, material);
    }

    const material = new THREE.MeshBasicMaterial({
      vertexColors: THREE.VertexColors
    });

    let face;
    let color;

    for (let i = 0; i < box.faces.length; i++) {
      face = box.faces[i];
      color = new THREE.Color(`rgb(${rgb[0]+(i*4)},${rgb[1]+(i*4)},${rgb[0]+(i*4)})`);
      face.color = color;
    }

    return new THREE.Mesh(box, material);
  }
};
