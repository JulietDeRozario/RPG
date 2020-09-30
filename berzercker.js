class Berzerker extends Character {
  constructor(name, hp=8, dmg=4, mana=0, status="playing"){
    super(name, hp, dmg, mana, status);    
  };

  specialAttack = () => {
    alert(`${this.name} utilise son coup spécial et gagne 1 point d'attaque!`);
    this.hp = this.hp - 1;
    this.dmg = this.dmg + 1;
    console.log(`${this.name} gagne 1 point d'attaque!`)
  }
};