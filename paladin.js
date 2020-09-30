class Paladin extends Character {
  constructor(name, hp=16, dmg=3, mana=160, status="playing"){
    super(name, hp, dmg, mana, status);
  };

  specialAttack = (victim) => {
    if(this.mana < 40){
      alert(`${this.name} n'a pas assez de mana pour attaquer`);
    }else{
      alert(`${this.name} utilise Lighting!`);
      console.log(`${this.name} attaque ${victim.name} et lui infliges 4 dégats!`);    
      this.mana = this.mana - 40;
      this.hp = this.hp + 5;
      console.log(`${this.name} a gagné 5 pv!`)
      victim.takeDamage(4);
    }
  }
};