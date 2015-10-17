var Character = function(modelsPath, options){
	options = options || {};
	this._clock = new THREE.Clock();

	var config = {
        baseUrl: modelsPath+'/ratamahatta/',
        body: "ratamahatta.md2",
        skins: [ "ratamahatta.png", "ctf_b.png", "ctf_r.png", "dead.png", "gearwhore.png" ],
        weapons:  [  [ "weapon.md2", "weapon.png" ],
                     [ "w_bfg.md2", "w_bfg.png" ],
                     [ "w_blaster.md2", "w_blaster.png" ],
                     [ "w_chaingun.md2", "w_chaingun.png" ],
                     [ "w_glauncher.md2", "w_glauncher.png" ],
                     [ "w_hyperblaster.md2", "w_hyperblaster.png" ],
                     [ "w_machinegun.md2", "w_machinegun.png" ],
                     [ "w_railgun.md2", "w_railgun.png" ],
                     [ "w_rlauncher.md2", "w_rlauncher.png" ],
                     [ "w_shotgun.md2", "w_shotgun.png" ],
                     [ "w_sshotgun.md2", "w_sshotgun.png" ]
                    ]
    };

    var character = new THREE.MD2Character();
    character.scale = .5;

    var self = this;
    character.onLoadComplete = function(){
    	self.setSkin(options.skin || 0);
    	self.setAnimation(options.animation || 'stand');

    	if(options.weaponIdx){
    		self.setWeapon(options.weaponIdx);
    	}

    	if(options.onCreate) options.onCreate();
    };

    character.loadParts(config);
    this._character = character;
};

Character.prototype.setSkin = function(idx){
	//character.skinsBody
	this._character.setSkin(idx);
};

Character.prototype.setWeapon = function(idx){
	//character.weapons
	this._character.setWeapon(idx);
};

Character.prototype.setAnimation = function(name){
	//character.meshBody.geometry.animations
	this._character.setAnimation(name);
};

Character.prototype.getRaw = function(){
	return this._character;
};

Character.prototype.update = function(){
	var delta = this._clock.getDelta();
	this._character.update(delta);
};

module.exports = Character;