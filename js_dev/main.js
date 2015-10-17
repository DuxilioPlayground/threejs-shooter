var utils = require('./libs/utils'),
	worldHelper = require('./libs/worldHelper'),
	lockControlsHelper = require('./libs/lockControlsHelper'),
	movementHelper = require('./libs/movementHelper');

var scene,
    camera,
    renderer;

init();
update();
render();

function init() {
    var box, material;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

    //boxes
    var boxes = worldHelper.generateBoxes(500);
    boxes.forEach(function(mesh){
    	scene.add(mesh);
    });

    //floor
    var floorMesh = worldHelper.generateFloor();
    scene.add(floorMesh);

    //renderer
    renderer = worldHelper.generateRenderer(0x0f445c);
    document.body.appendChild(renderer.domElement);

    var controls = lockControlsHelper.init(document.body, camera);
	scene.add(controls.getObject());

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
