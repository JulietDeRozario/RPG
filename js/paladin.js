class Paladin extends Character {
  constructor(name, hp=16, dmg=3, mana=160, status="playing", cost="40 mana"){
    super(name, hp, dmg, mana, status);
    this.cost = cost;
  };

  specialAttack = (victim) => {
    if(this.mana < 40){
      window.alert(`${this.name} n'a pas assez de mana pour attaquer`);
    }else{
      window.alert(`${this.name} utilise Lighting\n${this.name} gagne 5pv!`);
      console.log(`${this.name} attaque ${victim.name} et lui infliges 4 dégats!`);    
      this.mana = this.mana - 40;
      this.hp = this.hp + 5;
      console.log(`${this.name} a gagné 5 pv!`);
      victim.takeDamage(4);
    };
  };
};