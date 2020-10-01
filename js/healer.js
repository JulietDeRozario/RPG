class Healer extends Character {
  constructor(name, hp=8, dmg=2, mana=200, status="playing", cost="25 mana"){
    super(name, hp, dmg, mana, status);
    this.cost = cost
  }

  specialAttack = () => {
    const {mana, name} = this;
    if(mana < 25){
      window.alert(`${name} n'a pas assez de mana pour attaquer`);
    }else{
      window.alert(`${name} utilise son coup spécial et gagne 8 points de vie!`);
      this.mana -= 25;
      this.hp += 8;
      console.log(`${name} a gagné 8 pv!`);
    }
  }
}