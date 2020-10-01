class CustomCharacter extends Character {
  constructor(name, hp, dmg, mana, status="playing", cost="40 mana"){
    super(name, hp, dmg, mana, status);
    this.cost = cost;
  }

  specialAttack = (victim) => {
    const {mana, name} = this;
    if(mana < 40){
      window.alert(`${name} n'a pas assez de mana pour attaquer`);
    }else{
      let hp_win = Math.floor((Math.random() * 5) + 1);
      let dmg_win = Math.floor((Math.random() * 10) + 1)
      window.alert(`${name} utilise son coup spécial et gagne ${hp_win} points de vie et inflige ${dmg_win} dégats!`);
      console.log(`${name} attaque ${victim.name} et lui inflige ${dmg_win} dégats!`);
      this.mana -= 40;
      this.hp += 2;
      victim.takeDamage(dmg_win);
    }
  }
}