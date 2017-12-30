import * as THREE from 'three';
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
  }
};
