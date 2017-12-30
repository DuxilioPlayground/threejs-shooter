import * as THREE from 'three';

export default {
  init(camera, collisionObjects) {
    this._raycaster = new THREE.Raycaster();
    this._mouse = new THREE.Vector2();
    this._collisionObjects = collisionObjects;
    this._camera = camera;
    this._bindEvents();
  },

  _bindEvents() {
    const node = document.createElement('div');
    node.setAttribute('style', 'position: absolute; top: 50%; left: 50%; width: 10px; height: 10px; border: solid 1px red; border-radius: 100%; margin: -10px 0 0 -10px; z-index 99;');
    document.body.appendChild(node);
    window.addEventListener('mousemove', this._onMouseMove.bind(this));
  },

  _onMouseMove(event) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    this._mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    this._mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  },

  getCollidingObjects(maxDistance = 22) {
    const raycaster = this._raycaster;

    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(this._mouse, this._camera);

    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(this._collisionObjects)
      .filter(({distance}) => distance <= maxDistance);

    for (const {object} of intersects) {
      object.material.color.set(0xff0000);
    }

    return intersects;
  }
};
