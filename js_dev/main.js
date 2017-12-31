import CONFIG from './config';
import utils from './libs/utils';
import worldHelper from './libs/worldHelper';
import lockControlsHelper from './libs/lockControlsHelper';
import movementHelper from './libs/movementHelper';
import mouseHelper from './libs/mouseHelper';
import * as components from './components';

let scene = null;
let camera = null;
let renderer = null;
let stats = null;

const componentsToUpdate = Object.values(components).filter(({update}) => (typeof update === 'function'));
const containerNode = document.body;

initStats();
init();
update();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

  //light
  const light = new THREE.HemisphereLight(0xffffff, 0xaaaaaa, 0.6);
  scene.add(light);

  //floor
  const floorMesh = worldHelper.generateFloor();
  scene.add(floorMesh);

  //renderer
  renderer = worldHelper.generateRenderer(0x0f445c);
  containerNode.appendChild(renderer.domElement);

  lockControlsHelper.init(containerNode, camera);
  const controls = lockControlsHelper.getControls();
  scene.add(controls.getObject());

  //boxes
  components.boxes.init(scene, (boxes) => {
    movementHelper.init(controls, boxes, {
      movementSpeed: CONFIG.movement.speed,
      jumpHeight: CONFIG.movement.jumpHeight,
      enableSuperJump: CONFIG.movement.enableSuperJump
    });

    //characters
    components.characters.init(scene, boxes);
    mouseHelper.init(camera);

    //weapon
    components.playerWeapon.init(camera);
    components.playerWeapon.onAnimation('pow', () => {
      const collidingBoxes = mouseHelper.checkCollidingWithObjects(window.boxes);
      for (const {object} of collidingBoxes) {
        scene.remove(object);
      }
    });

    window.boxes = boxes;
  });
}

function update(){
  stats.begin();

  if(lockControlsHelper.getEnabled()){
    movementHelper.checkMovement();

    for (const component of componentsToUpdate) {
      component.update();
    }
  }

  renderer.render(scene, camera);

  stats.end();
  requestAnimationFrame(update);
}

function initStats(){
  stats = new Stats();
  stats.setMode(0);

  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  containerNode.appendChild(stats.domElement);
}
