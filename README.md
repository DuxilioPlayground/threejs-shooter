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
var distance = <distance between player and character e.g. 40>,
    weaponRange = <range of weapon e.g. 50>,
    weaponDamage = <damage weapon does at 0 distance e.g. 100>;
    
if(distance < weaponRange){
  var procentOfDamage = (100 / weaponRange) * distance,
      characterDamage = (procentOfDamage/100) * weaponDamage;
  return characterDamage;
  //return (weaponDamage + weaponRange) - distance;
} else {
  return 0;
}
```
