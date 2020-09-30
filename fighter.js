class Fighter extends Character {
  constructor(name, hp=12, dmg=4, mana=40, status="playing", defense=false){
    super(name, hp, dmg, mana, status);
    this.defense = defense;
  };

  specialAttack = (victim) => {
    if(this.mana < 20){
      alert(`${this.name} n'a pas assez de mana pour attaquer`);
    }else{
      console.log(`${this.name} attaque ${victim.name} et lui inflige 5 dégats!`);
      alert(`${this.name} utilise Dark Vision!\nLes dégats subits par ${this.name} sont réduits de 2 jusqu'à la fin du tour`);
      this.mana = this.mana - 20;
      this.defense = true;
      victim.takeDamage(5);
    }
    
  }
};