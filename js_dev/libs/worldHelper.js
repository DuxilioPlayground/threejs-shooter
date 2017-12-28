import CONFIG from '../config';
import utils from './utils';

export default {
  generateRenderer(clearHex) {
    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(clearHex);
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    return renderer;
  },

  generateFloor() {
    const geometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);

    geometry.rotateX(-Math.PI/2);

    for (let i = 0, l = geometry.vertices.length; i < l; i++) {
      const vertex = geometry.vertices[i];
      vertex.x += Math.random() * 20;
      vertex.z += Math.random() * 20;
      vertex.y += Math.random();
    }

    for (let i = 0, l = geometry.faces.length; i < l; i++) {
      const face = geometry.faces[i];
      const colors = [];

      for(let j = 0; j < 3; j++){
        const color = new THREE.Color(`rgb(${utils.rand(100,180)},${utils.rand(100,180)},${utils.rand(100,180)})`);
        colors.push(color);
      }

      for(let j = 0; j < 3; j++){
        face.vertexColors[j] = colors[j];
      }
    }

    const material = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors });
    return new THREE.Mesh(geometry, material);
  },

  generateBoxes(amount, texturePath, callback) {
    const textureLoader = new THREE.TextureLoader();

    const doGenerate = (crateTexture) => {
      let mesh;
      const boxes = [];

      for(let i = 0; i < amount; i++){
          mesh = this._generateBox({
            width: 20,
            height: 20,
            depth: 20,
            rgb: [55,81,159],
            texture: crateTexture
          });

          mesh.position.x = Math.floor( Math.random() * 20 - 10 ) * 20;
          mesh.position.y = Math.floor( Math.random() * 20 ) * 20 + 10;
          mesh.position.z = Math.floor( Math.random() * 20 - 10 ) * 20;

          mesh.rotation.y = -100;
          boxes.push(mesh);
        }

        callback(boxes);
      };

      textureLoader.load(CONFIG.paths.img+texturePath, crateTexture => {
      doGenerate(crateTexture);
    });
  },

  _generateBox(options) {
    const width = options.width;
    const height = options.height;
    const depth = options.depth;
    const rgb = options.rgb;
    const box = new THREE.BoxGeometry(width, height, depth);
    let material;

    if(options.texture){
      material = new THREE.MeshPhongMaterial({
        map: options.texture
      });
    } else {
      material = new THREE.MeshBasicMaterial({
        vertexColors: THREE.VertexColors
      });

      let face;
      let color;

      for (let i = 0; i < box.faces.length; i++) {
        face = box.faces[i];
        color = new THREE.Color(`rgb(${rgb[0]+(i*4)},${rgb[1]+(i*4)},${rgb[0]+(i*4)})`);
        face.color = color;
      }
    }

    return new THREE.Mesh(box, material);
  }
};
