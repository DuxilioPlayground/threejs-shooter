var worldHelper = require('../libs/worldHelper');

var boxes = {
	
	init: function(scene, callback){
		var self = this;

		this._scene = scene;

	    worldHelper.generateBoxes(250, '/crate.jpg', function(boxes){
	        worldHelper.generateBoxes(250, '/crate2.gif', function(boxes2){
	            boxes = boxes.concat(boxes2);
	            self._addBoxesToScene(boxes);
	            callback(boxes);
	        });
	    });
	},

	_addBoxesToScene: function(boxes){
		var scene = this._scene;
        boxes.forEach(function(mesh){
            scene.add(mesh);
        });
    }

};

module.exports = boxes;