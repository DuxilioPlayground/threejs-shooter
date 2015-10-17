var CONFIG = require('../config'),
	utils = require('./utils');

var worldHelper = {

	generateRenderer: function(clearHex){
		var renderer = new THREE.WebGLRenderer();
    	renderer.setClearColor(clearHex);
    	renderer.setPixelRatio(window.devicePixelRatio || 1);
    	renderer.setSize(window.innerWidth, window.innerHeight);
    	return renderer;
	},

	generateFloor: function(){
		var geometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
	    geometry.rotateX(-Math.PI/2);

		for (var i = 0, l = geometry.vertices.length; i < l; i++) {
			var vertex = geometry.vertices[i];
			vertex.x += Math.random() * 20;
			vertex.z += Math.random() * 20;
			vertex.y += Math.random();
		}

		for(var i = 0, l = geometry.faces.length; i < l; i++) {
			var face = geometry.faces[i],
				colors = [];

			for(var j = 0; j < 3; j++){
				var color = new THREE.Color('rgb('+utils.rand(100,180)+','+utils.rand(100,180)+','+utils.rand(100,180)+')');
				colors.push(color);
			}

			for(var j = 0; j < 3; j++){
				face.vertexColors[j] = colors[j];
			}
		}

	    var material = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors });
	    return new THREE.Mesh(geometry, material);
	},

	generateBoxes: function(amount, callback){
		var self = this,
			textureLoader = new THREE.TextureLoader();

		var doGenerate = function(crateTexture){
			var mesh,
				boxes = [];

			for(var i = 0; i < amount; i++){
			    mesh = self.generateBox({
			    	width: 20,
			    	height: 20,
			    	depth: 20,
			    	rgb: [55,81,159],
			    	texture: crateTexture
			    });

			    mesh.position.x = Math.floor( Math.random() * 20 - 10 ) * 20;
				mesh.position.y = Math.floor( Math.random() * 20 ) * 20 + 10;
				mesh.position.z = Math.floor( Math.random() * 20 - 10 ) * 20;
			    
			    mesh.rotation.y = -100;
			    boxes.push(mesh);
	    	}

	    	callback(boxes);
		};

		textureLoader.load(CONFIG.paths.img+'/crate.jpg', function(crateTexture){
			doGenerate(crateTexture);
		});
	},
	
	generateBox: function(options){
		var width = options.width,
			height = options.height,
			depth = options.depth,
			rgb = options.rgb;

		var box = new THREE.BoxGeometry(width, height, depth),
			material;

		if(options.texture){
	    	material = new THREE.MeshPhongMaterial({
	    		map: options.texture
	    	});
	    } else {
	    	material = new THREE.MeshBasicMaterial({
	        	vertexColors: THREE.VertexColors
	    	});

	    	var face, color;
		    for (var i = 0; i < box.faces.length; i++) {
		        face = box.faces[i];
		        color = new THREE.Color('rgb('+(rgb[0]+(i*4))+','+(rgb[1]+(i*4))+','+(rgb[0]+(i*4))+')');
		        face.color = color;
		    }
	    }

	    return new THREE.Mesh(box, material);
	}

};

module.exports = worldHelper;