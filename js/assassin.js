class Assassin extends Character {
  constructor(name, hp=6, dmg=6, mana=20, status="playing", defense=false, cost="20 mana"){
    super(name, hp, dmg, mana, status);
    this.defense = defense;
    this.cost = cost;
  }

  specialAttack = (victim) => {
    const {mana, name, dmg} = this;
    if(mana < 20){ 
      window.alert(`${name} n'a pas assez de mana pour attaquer`);
    }else{
      window.alert(`${name} utilise son coup spécial!\n${name} sera intouchable au prochain tour`);
      console.log(`${name} attaque ${victim.name} et lui inflige ${dmg + 7} dégats!`);
      this.mana -= 20;
      this.defense = "charging";
      victim.takeDamage(dmg + 7);

      if(victim.hp > 0){
        window.alert(`Vous n'avez pas tué ${victim.name}, vous perdez 7 points de vie!`);
        this.hp -= 7;
      }
    }
  }
}