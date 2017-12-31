export default {
  init(camera) {
    this._raycaster = new THREE.Raycaster();
    this._mouse = new THREE.Vector2();
    this._camera = camera;
    this._bindEvents();
  },

  _bindEvents() {
    const node = document.querySelector('.cursor');
    node.setAttribute('style', 'position: absolute; top: 50%; left: 50%; width: 5px; height: 5px; border: solid 1px red; border-radius: 100%; margin: -10px 0 0 -10px; z-index 99;');
    window.addEventListener('mousemove', this._onMouseMove.bind(this));
  },

  _onMouseMove(event) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    const x = ( event.clientX / window.innerWidth ) * 2 - 1;
    const y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    this._mouse.x = x;
    this._mouse.y = y;
  },

  checkCollidingWithObjects(objects, maxDistance = null) {
    const raycaster = this._raycaster;

    if (maxDistance) {
      raycaster.far = maxDistance;
    }

    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(this._mouse, this._camera);

    // calculate objects intersecting the picking ray
    let intersects = raycaster.intersectObjects(objects);

    for (const {object} of intersects) {
      object.material.color.set(0xff0000);
    }

    return intersects;
  }
};