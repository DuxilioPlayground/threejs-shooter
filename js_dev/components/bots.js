var Character = require('../libs/Character');

var bots = {
	
	init: function(scene, boxes){
		var objects = [],
			characterDetails = [{
		        x: 20,
		        character: 'ogro'
		    }, {
		        x: -20
		    }];

	    characterDetails.forEach(function(details){
	        var character = new Character(details);
	        scene.add(character.getRaw().root);
	        objects.push(character);
	    });

	    this._objects = objects;
	},

	update: function(){
		//update all characters
	    this._objects.forEach(function(obj){
	        obj.update();
	    });
	}

};

module.exports = bots;