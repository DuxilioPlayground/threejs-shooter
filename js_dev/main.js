var utils = require('./libs/utils'),
	worldHelper = require('./libs/worldHelper'),
	lockControlsHelper = require('./libs/lockControlsHelper'),
	movementHelper = require('./libs/movementHelper'),
    CONFIG = require('./config');

var scene,
    camera,
    renderer;

init();
update();
render();

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

    //light
    var light = new THREE.HemisphereLight(0xffffff, 0xaaaaaa, 0.6);
    scene.add(light);

    //floor
    var floorMesh = worldHelper.generateFloor();
    scene.add(floorMesh);

    //renderer
    renderer = worldHelper.generateRenderer(0x0f445c);
    document.body.appendChild(renderer.domElement);

    var controls = lockControlsHelper.init(document.body, camera);
	scene.add(controls.getObject());

    //boxes
    var boxes = worldHelper.generateBoxes(250, CONFIG.paths.img+'/crate.jpg'),
        boxes2 = worldHelper.generateBoxes(250, CONFIG.paths.img+'/crate2.gif');

    boxes = boxes.concat(boxes2);
    boxes.forEach(function(mesh){
        scene.add(mesh);
    });

    movementHelper.init(controls, boxes, {
        movementSpeed: 600,
        jumpHeight: 350,
        enableSuperJump: true
    });

    // controls = new THREE.OrbitControls(camera);
    // controls.addEventListener('change', render);
}

function update() {
    requestAnimationFrame(update);

    if(lockControlsHelper.getEnabled()){
    	movementHelper.checkMovement();
    }

    render();
    //controls.update();
}

function render(){
    renderer.render(scene, camera);
}
