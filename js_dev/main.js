var CONFIG = require('./config'),
    utils = require('./libs/utils'),
	worldHelper = require('./libs/worldHelper'),
	lockControlsHelper = require('./libs/lockControlsHelper'),
	movementHelper = require('./libs/movementHelper'),
    Character = require('./libs/Character');

var scene,
    camera,
    renderer,
    stats;

var characters = [];

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
        // utils.loadMD2({
        //     md2: CONFIG.paths.models+'/shotgun/hud/Dreadus-Shotgun.md2',
        //     skin: CONFIG.paths.models+'/shotgun/hud/Dreadus-Shotgun.jpg',
        //     onSuccess: function(mesh){
        //         mesh.scale.set(.05,.05,.05);
        //         mesh.rotation.y = Math.PI / 2;
        //         camera.add(mesh); 
        //     }
        // });

        // var character = new Character({
        //     character: 'shotgun'
        // });
        // character.getRaw().root.scale.set(.1,.1,.1);
        // character.getRaw().root.rotation.y = -Math.PI / 2;
        // character.getRaw().root.position.z = -50;
        // character.getRaw().root.position.y = -2000;
        // camera.add(character.getRaw().root);

        $.getJSON("assets_public/models/shotgun/hud/Dreadus-Shotgun.json", function(shotgunModel){
            $.get("assets_public/models/shotgun/hud/skins/Dreadus-Shotgun.jpg", function(shotgunTexture){
                console.log(shotgunModel, shotgunTexture);
                var mesh = new AnimatedMD2Model(shotgunModel, shotgunTexture);
                mesh.rotation.y = -Math.PI / 2;
                camera.add(mesh);
            });
        });
    });
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

    //if controls are enabled check movement
    if(lockControlsHelper.getEnabled()){
    	movementHelper.checkMovement();
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