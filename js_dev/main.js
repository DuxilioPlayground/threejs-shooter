var CONFIG = require('./config'),
    utils = require('./libs/utils'),
	worldHelper = require('./libs/worldHelper'),
	lockControlsHelper = require('./libs/lockControlsHelper'),
	movementHelper = require('./libs/movementHelper'),
    Character = require('./libs/Character');

var scene,
    camera,
    renderer;

var characters = [];

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
    var handleBoxes = function(boxes){
        boxes.forEach(function(mesh){
            scene.add(mesh);
        });

        movementHelper.init(controls, boxes, {
            movementSpeed: 600,
            jumpHeight: 350,
            enableSuperJump: true
        });
    };

    worldHelper.generateBoxes(250, CONFIG.paths.img+'/crate.jpg', function(boxes){
        worldHelper.generateBoxes(250, CONFIG.paths.img+'/crate2.gif', function(boxes2){
            boxes = boxes.concat(boxes2);
            handleBoxes(boxes);
        });
    });

    //characters
    var character = new Character(CONFIG.paths.models);
    scene.add(character.getRaw().root);
    characters.push(character);

    // controls = new THREE.OrbitControls(camera);
    // controls.addEventListener('change', render);
}

function update() {
    requestAnimationFrame(update);

    //update all characters
    characters.forEach(function(char){
        char.update();
    });

    //if controls are enabled check movement
    if(lockControlsHelper.getEnabled()){
    	movementHelper.checkMovement();
    }

    render();
    //controls.update();
}

function render(){
    renderer.render(scene, camera);
}
