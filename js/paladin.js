class Paladin extends Character {
  constructor(name, hp=16, dmg=3, mana=160, status="playing", cost="40 mana"){
    super(name, hp, dmg, mana, status);
    this.cost = cost;
  }

  specialAttack = (victim) => {
    const {mana, name} = this;
    if(mana < 40){
      window.alert(`${name} n'a pas assez de mana pour attaquer`);
    }else{
      window.alert(`${name} utilise Lighting\n${name} gagne 5pv!`);
      console.log(`${name} attaque ${victim.name} et lui infliges 4 dégats!`);    
      this.mana -= 40;
      this.hp += 5;
      console.log(`${name} a gagné 5 pv!`);
      victim.takeDamage(4);
    }
  }
}