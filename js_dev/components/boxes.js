import worldHelper from '../libs/worldHelper';

export default {
  init(scene, callback) {
    this._scene = scene;

    worldHelper.generateBoxes(250, '/crate3.jpg', (boxes) => {
      worldHelper.generateBoxes(250, '/crate-tnt-1.jpg', (boxes2) => {
        boxes = boxes.concat(boxes2);
        this._addBoxesToScene(boxes);
        callback(boxes);
      });
    });
  },

  _addBoxesToScene(boxMeshes) {
    const scene = this._scene;
    for (const mesh of boxMeshes) {
      scene.add(mesh);
    }
  }
};
