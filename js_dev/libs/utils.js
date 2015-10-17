var utils = {

	rand: function(min, max){
		return Math.floor((Math.random() * max) + min);
	},

	loadMD2: function(options){
		var loader = new THREE.MD2Loader(),
			self = this;

        loader.load(options.md2, function(geo) {
            geo.computeBoundingBox();

            var mesh = self._createMD2Part(geo, THREE.ImageUtils.loadTexture(options.skin));
            options.onSuccess(mesh);
        });
	},

	_createMD2Part: function(geometry, skinMap){
	    var materialWireframe = new THREE.MeshLambertMaterial( { color: 0xffaa00, wireframe: true, morphTargets: true, morphNormals: true } );
	    var materialTexture = new THREE.MeshLambertMaterial( { color: 0xffffff, wireframe: false, map: skinMap, morphTargets: true, morphNormals: true } );

	    var mesh = new THREE.Mesh(geometry, materialTexture);
	    mesh.rotation.y = - Math.PI / 2;

	    mesh.castShadow = true;
	    mesh.receiveShadow = true;

	    mesh.materialTexture = materialTexture;
	    mesh.materialWireframe = materialWireframe;

	    return mesh;
	}
};

module.exports = utils;