class Game {
  constructor(turnLeft=10){
    
    this.turnLeft = turnLeft

  }

  startGame = () => {
    let answer = confirm("Voulez-vous faire une partie?");
    if(answer == true){
      let new_character = confirm("Voulez-vous créer un nouveau personnage?");
      if(new_character){{mana, name}
        this.createPlayer();
      }else{
        this.startTurn();
      };
    }else{
      window.alert("Au revoir!");
      return false;
    }
  }

  createPlayer = () => {
    // A creation form appears
    masthead.style.visibility = "hidden";
    form.style.visibility = "visible";
    submit.onclick = () => {
      // I put all the form values in a hash table
      stats = Array.from(document.querySelectorAll('form input')).reduce((acc, input) => ({...acc, [input.id]: input.value}), {});
      let values = Object.values(stats);
      game.isThereErrors(values);
    }
  }

  isThereErrors = (values) => {
    let empty_values = [];
    const {hp, dmg, mana, name} = stats;
    // Check if there is no empty value
    for(let value of values){
      if(value == "" ) {
        empty_values.push(value);
      }
    }
    // If there is an empty value, or if a stat is invalid, it will return an error message
    if(empty_values.length > 0 || Math.round(hp) <= 0 || Math.round(hp) > 20 || Math.round(dmg) <= 0 || Math.round(dmg) > 15 || Math.round(mana) < 0 || Math.round(mana) > 200){
      game.creationErrors(stats);
    }else{
      // If the form entrees are valid, a new character is created
      new CustomCharacter(name, Math.round(hp), Math.round(dmg), Math.round(mana));
      console.log("%c *******   Votre personnage a été créé avec succès!   *******", "color:green;");
      form.style.visibility = "hidden"; // the form disappears
      masthead.style.visibility = "visible";
      // The game starts
      game.startTurn();
    }
  }

  creationErrors = ({name, hp, dmg, mana}) => {
    let message = ""
    if(name == "") {
      message = "Vous devez remplir le nom de votre héros"
    }else if(Math.round(hp) <= 0 || Math.round(hp) > 20){
      message = "Les pv de votre héros doivent être compris entre 1 et 20"
    }else if(Math.round(dmg) <= 0 || Math.round(dmg) > 15){
      message = "Les pa de votre héros doivent être compris entre 1 et 15"
    }else if(Math.round(mana) < 0 || Math.round(mana) > 200) {
      message = "Le mana de votre héros doit être compris entre 0 et 200"
    };
    alert.className = "alert alert-danger alert-dismissible fade show";
    alert.innerHTML = message + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>";

    let close = document.querySelector('.close');
    close.onclick = () => {
        alert.className="";
        alert.innerHTML=""
      }
    this.createPlayer();
  }

  startTurn = () => {
    console.log(`============ Tour numéro ${10 - this.turnLeft + 1} ============`);
    this.whoIsAlive();
    this.callPlayers();
  }

  whoIsAlive = () => {
    Character.allPlayers.map(player => {
      const {hp, name, defense} = player;
      if(hp > 0){
        console.log(`${name} est en vie`);
        if(player instanceof Fighter){
          player.defense = false;
        }else if(player instanceof Assassin && defense == true){
          player.defense = false;
        }else if(player instanceof Assassin && defense == "charging"){
          console.log(`${name} est protégé ce tour-ci`)
          player.defense = true;
        }
      }
    })
  }
  
  skipTurn = () => {
    setTimeout(console.clear(), 3000); 
    this.turnLeft -- ;
    // If nobody wan and if there are still comming turns 
    if(Character.allPlayers.filter(player => player.status == "playing").length > 1 && this.turnLeft > 0){
      this.startTurn();
    }else{
      this.endGame();
    }
  }

  callPlayers = () => {
    // Creation of a random sorted array with all players
    let random_call = Character.allPlayers.sort(function(a, b){return 0.5 - Math.random()});
    random_call.map((player) => {
      const{hp, name, cost, dmg, mana} = player;
      if(hp > 0){
        console.log("_____________________________________________________");
        console.log(`C'est au tour de ${name} de jouer:`);
        let choice = prompt(`${name}, que faites-vous ? (1/2)\n\n1- Attaquer un autre joueur\n2- Utiliser ma capacité spéciale (${cost})\n\nStats: ${hp} pv / ${dmg} pa / ${mana} mana`);
        game.playerAction(player, choice);
      }
    })
    this.skipTurn();
  }

  playerAction = (player, choice) => {
    let victim;
    if(choice == "1" || player instanceof Fighter || player instanceof Paladin || player instanceof Assassin || player instanceof CustomCharacter){
      victim = game.chooseTarget(player);
    }
    if(choice == "1"){
      if(game.isTargetAlreadyDeead(victim) == false){
        player.dealDamage(victim);
        game.didPlayerKilled(player, victim);
      }
    }else if(choice == "2" && player instanceof Healer != true && player instanceof Berzerker != true ){
      special_attack_soud.play();
      if(game.isTargetAlreadyDeead(victim) == false){
        player.specialAttack(victim);
        game.didPlayerKilled(player, victim);
      }
    // Healers and Berzekers do not need a victim for their special attack
    }else if(choice == "2" && (player instanceof Healer == true || player instanceof Berzerker == true)){
      special_attack_soud.play();
      player.specialAttack();
    }else{
      window.alert("Commande invalide, votre joueur est atteint d'une crise d'epillepsie et passe son tour");
    }
  }

  chooseTarget = (player) => {
    console.log("Quelle est votre cible ?");
    // Logging all enemies attached to their index
    Character.allPlayers.map(enemy => {
      if (enemy != player && enemy.hp > 0){
      console.log(`${Character.allPlayers.indexOf(enemy)}- ${enemy.name}.`);
      }
    })
    let target = prompt(`${player.name}, qui attaquez-vous ? (1/2...)`);
    let victim = Character.allPlayers.find(player => Character.allPlayers.indexOf(player).toString() == target);
    // If the player wants to hit himself
    if(victim == player){window.alert(`${player.name} a décider de s'infliger un coup`)}
    if(victim == undefined){
      console.log("Cet ennemi n'existe pas"); 
      victim = game.chooseTarget(player)
    }
    return victim;
  } 

  isTargetAlreadyDeead = (target) => {
    // If the entree is not valid
    if(target.hp <= 0){
      window.alert("Vous attaquez un mort...");
      return true;
    }else{return false}
  }
  
  didPlayerKilled = (player, victim) => {
    if(victim.checkIfIsDead()){
      player.mana += 20;
      console.log(`${player.name} gagne 20 points de mana!`)
    }
  }

  endGame = () => {
    if(Character.allPlayers.filter(player => player.status == "playing").length == 1){
      let winner = Character.allPlayers.find(player => player.hp > 0);
      winner.status = "winner";
      console.log(`Félicitations ${winner.name}, tu es le dernier survivant, tu gagnes!`);
    }else if(Character.allPlayers.filter(player => player.status == "playing").length > 1){
      console.log(`Félicitation à tous les survivants, vous avez survécu 10 tours dans le donjon, vous gagnez!`)
      for (let player of Character.allPlayers) {
        if(player.status != "loser"){
          player.status = "winner"
          console.log(`Bravo ${player.name}!`)
        }
      }
    }else{
      console.log("Tout le monde est mort, vous avez perdus.");
    }
  }
}
