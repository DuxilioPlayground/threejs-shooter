```
git clone git@github.com:DuxilioPlayground/threejs-shooter.git
cd threejs-shooter
sudo npm i
gulp
```

Now open `localhost:9000` in your browser.

#### Notes

###### Weapon Damage
```
//get characterDamage
var getCharacterDamage = function(distance, weaponRange, weaponDamage){
    //distance: <distance between player and character e.g. 40>,
    //weaponRange: <range of weapon e.g. 50>,
    //weaponDamage: <damage weapon does at 0 distance e.g. 100>;
    return (distance < weaponRange) ? weaponDamage : 0;
};
```

###### Explosions
* http://oos.moxiecode.com/js_webgl/explosion/
* http://codepen.io/Xanmia/pen/DoljI
