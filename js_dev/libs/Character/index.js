var CONFIG = require('../../config'),
    CHARACTERS_CONFIG = require('./charactersConfig');

var Character = function(options){
	this._options = options || {};

    this._eventListeners = {};
	this._clock = new THREE.Clock();

    var charConfig = CHARACTERS_CONFIG[options.character || 'ratamahatta'],
        character = this._createCharacter(charConfig);

    this._character = character;
};

Character.prototype.on = function(event, callback){
    if(typeof this._eventListeners[event] !== 'array'){
        this._eventListeners[event] = [];
    }
    this._eventListeners[event].push(callback);
};

Character.prototype._triggerEvent = function(event){
    var listeners = this._eventListeners[event],
        self = this;

    if(typeof listeners === 'object'){
        listeners.forEach(function(callback){
            callback(self.getRaw());
        });
    }
};

Character.prototype._createCharacter = function(charConfig){
    var self = this,
        options = this._options,
        character = new THREE.MD2Character();

    character.scale = .5;

    var self = this;
    character.onLoadComplete = function(){
        self.setSkin(options.skin || 0);
        self.setAnimation(options.animation || 'stand');

        if(typeof options.weapon === 'number'){
            self.setWeapon(options.weapon);
        }

        self._triggerEvent('create');
    };

    charConfig.baseUrl = CONFIG.paths.models+charConfig.path;
    character.loadParts(charConfig);

    return character;
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