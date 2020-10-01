class Assassin extends Character {
  constructor(name, hp=6, dmg=6, mana=20, status="playing", defense=false, cost="20 mana"){
    super(name, hp, dmg, mana, status);
    this.defense = defense;
    this.cost = cost;
  };

  specialAttack = (victim) => {
    if(this.mana < 20){
      window.alert(`${this.name} n'a pas assez de mana pour attaquer`);
    }else{
      window.alert(`${this.name} utilise son coup spécial!\n${this.name} sera intouchable au prochain tour`);
      console.log(`${this.name} attaque ${victim.name} et lui inflige ${this.dmg + 7} dégats!`);
      this.mana = this.mana - 20;
      this.defense = "charging";
      victim.takeDamage(this.dmg + 7);

      if(victim.hp > 0){
        console.log(`Vous n'avez pas tué ${victim}, vous perdez 7 points de vie!`);
        this.hp -= 7;
      };
    };
  };
};