class Berzerker extends Character {
  constructor(name, hp=8, dmg=4, mana=0, status="playing", cost="1pv"){
    super(name, hp, dmg, mana, status);
    this.cost = cost;    
  }

  specialAttack = () => {
    const {name} = this;
    window.alert(`${name} utilise son coup spécial et gagne 1 point d'attaque!`);
    this.hp -= 1;
    if(this.hp <= 0){
      this.status = "loser";
      console.log(`${name} n'avait pas assez de pv pour lancer cette attaque, il décède.`);
    }else{
      this.dmg += 1;
      console.log(`${name} gagne 1 point d'attaque!`);
    }
  }
}