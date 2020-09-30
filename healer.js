class Healer extends Character {
  constructor(name, hp=8, dmg=2, mana=200, status="playing"){
    super(name, hp, dmg, mana, status);
  };

  specialAttack = () => {
    if(this.mana < 25){
      alert(`${this.name} n'a pas assez de mana pour attaquer`);
    }else{
      alert(`${this.name} utilise son coup spécial et gagne 8 points de vie!`);
      this.mana = this.mana - 25;
      this.hp = this.hp + 8;
      console.log(`${this.name} a gagné 8 pv!`)
    };
  }
};