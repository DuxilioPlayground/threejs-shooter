var CONFIG = require('./config'),
    
    utils = require('./libs/utils'),

	worldHelper = require('./libs/worldHelper'),
	lockControlsHelper = require('./libs/lockControlsHelper'),
	movementHelper = require('./libs/movementHelper'),

    Character = require('./libs/Character'),
    AnimMD2 = require('./libs/AnimMD2');

var scene,
    camera,
    renderer,
    stats;

var characters = [],
    animMD2Objects = [];

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
    generateBoxes(controls, scene, function(boxes){
        //characters
        generateCharacters(scene, boxes);

        //weapon
        generateWeapon();
    });
}

function generateWeapon(){
    var weapon = new AnimMD2({
        md2: '/shotgun/hud/Dreadus-Shotgun.md2',
        skin: '/shotgun/hud/Dreadus-Shotgun.jpg',
        animTimeScale: 1.5,
        onCreate: function(mesh){
            mesh.scale.set(.05,.05,.05);
            mesh.rotation.y = Math.PI / 2;
            mesh.position.x -= 1;
            camera.add(mesh); 
        }
    });

    document.body.addEventListener('click', function(){
        weapon.playAnimation('pow', true);
    }, false);

    animMD2Objects.push(weapon); 
}

function generateBoxes(controls, scene, callback){
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

    worldHelper.generateBoxes(250, '/crate.jpg', function(boxes){
        worldHelper.generateBoxes(250, '/crate2.gif', function(boxes2){
            boxes = boxes.concat(boxes2);
            handleBoxes(boxes);
            callback(boxes);
        });
    });
}

function generateCharacters(scene, boxes){
    var characterDetails = [{
        x: 20,
        character: 'ogro'
    }, {
        x: -20
    }];

    characterDetails.forEach(function(details){
        var character = new Character(details);
        scene.add(character.getRaw().root);
        characters.push(character);
    });
}

function update(){
    stats.begin();

    //update all characters
    characters.forEach(function(char){
        char.update();
    });

    //if controls are enabled
    if(lockControlsHelper.getEnabled()){
        //check movement
    	movementHelper.checkMovement();

        //update animMD2 objects
        animMD2Objects.forEach(function(object){
            object.update();
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