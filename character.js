class Character {
  constructor(name, hp, dmg, mana, status="playing"){
    
    Character.allPlayers.push(this);

    this.name = name;
    this.hp = hp;
    this.dmg = dmg;
    this.mana = mana;
    this.status = status;

  }

  dealDamage = (victim) => {
    console.log(`${this.name} attaque ${victim.name} et lui inflige ${this.dmg} dégats!`);
    attack_sound.play();
    victim.takeDamage(this.dmg);
  }

  takeDamage = (damage) => {
    if(this instanceof Fighter && this.defense == true){
      damage = damage - 2;
      console.log("Dark Vision réduit ces dégats de 2")
    }else if(this instanceof Assassin && this.defense == true){
      damage = 0
      console.log(`${this.name} ne subit aucun dégat`)
    }
    this.hp = this.hp - damage;

    if(this.hp <= 0){
      console.log(`${this.name} est mort.`);
      this.status = "loser";
      death_sound.play();
    }else{
      console.log(`${this.name} n'a plus que ${this.hp} points de vie.`)
    }
  };
};