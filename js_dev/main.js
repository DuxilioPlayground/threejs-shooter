var CONFIG = require('./config'),
    
    utils = require('./libs/utils'),

	worldHelper = require('./libs/worldHelper'),
	lockControlsHelper = require('./libs/lockControlsHelper'),
	movementHelper = require('./libs/movementHelper');

//components
var components = {
    playerWeapon: require('./components/playerWeapon'),
    boxes: require('./components/boxes'),
    characters: require('./components/characters')
},
componentsToUpdate = [components.playerWeapon, components.characters];

//global vars
var scene,
    camera,
    renderer,
    stats;

initStats();
init();
update();

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
    components.boxes.init(scene, function(boxes){
        movementHelper.init(controls, boxes, {
            movementSpeed: CONFIG.movement.speed,
            jumpHeight: CONFIG.movement.jumpHeight,
            enableSuperJump: CONFIG.movement.enableSuperJump
        });

        //characters
        components.characters.init(scene, boxes);

        //weapon
        components.playerWeapon.init(camera, controls, boxes);
    });
}

function update(){
    stats.begin();

    //if controls are enabled
    if(lockControlsHelper.getEnabled()){
        //check movement
    	movementHelper.checkMovement();

        //update components
        componentsToUpdate.forEach(function(obj){
            obj.update();
        });
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
    document.body.appendChild(stats.domElement);
}