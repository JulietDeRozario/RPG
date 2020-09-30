class Game {
  constructor(turnLeft=10){
    
    this.turnLeft = turnLeft

  }

  startGame = () => {
    let answer = confirm("Voulez-vous faire une partie?")
    if(answer == true){
      this.startTurn();
    }else{
      alert("Au revoir!");
      return false;
    };
  }

  startTurn = () => {
    console.log(`============ Tour numéro ${10 - this.turnLeft + 1} ============`);
    Character.allPlayers.map(function who_is_alive(player){
      if(player.hp > 0){
        console.log(`${player.name} est en vie`);
        if(player instanceof Fighter){
          player.defense = false;
        }else if(player instanceof Assassin && player.defense == true){
          player.defense = false;
        }else if(player instanceof Assassin && player.defense == "charging"){
          console.log(`${player.name} est protégé ce tour-ci`)
          player.defense = true;
        }
      };
    });
    this.callPlayers();
  }
  
  skipTurn = () => {
    console.clear();
    this.turnLeft -- ;
    if(Character.allPlayers.filter(player => player.status == "playing").length > 1 && this.turnLeft > 0){
      this.startTurn();
    }else{
      this.endGame();
    }
  }

  callPlayers = () => {
    let random_call = Character.allPlayers.sort(function(a, b){return 0.5 - Math.random()});
    random_call.map(function playerAction(player){
      if(player.hp > 0){
        console.log("_____________________________________________________")
        console.log(`C'est au tour de ${player.name} de jouer:`);
        let choice = prompt(`${player.name}, que faites-vous ? (1/2)\n1- Attaquer un autre joueur\n2- Utiliser ma capacité spéciale`);
        let victim;

        if(choice == "1" || player instanceof Fighter || player instanceof Paladin || player instanceof Assassin){
          console.log("Quelle est votre cible ?");
          Character.allPlayers.forEach((enemy) => {
            if (enemy != player && enemy.hp > 0){
            console.log(`${Character.allPlayers.indexOf(enemy)}- ${enemy.name}.`);
            };
          });
          let target = prompt(`${player.name}, qui attaquez-vous ? (1/2...)`);
          victim = Character.allPlayers.find(player => Character.allPlayers.indexOf(player).toString() == target);
        };

        if(choice == "1"){
          player.dealDamage(victim);
          killed(victim, player);
        }else if(choice == "2" && player instanceof Healer != true && player instanceof Berzerker != true ){
          player.specialAttack(victim);
          killed(victim, player);
        }else if(choice == "2" && (player instanceof Healer == true || player instanceof Berzerker == true)){
          player.specialAttack();
        }else{
          alert("Commande invalide, votre joueur est atteint d'une crise d'epillepsie et passe son tour");
        };
      }; 
    });

    function killed(victim, player){
      if(victim.hp <= 0){
        player.mana = player.mana + 20;
        console.log(`${player.name} gagne 20 points de mana!`)
      }
    }

    this.skipTurn();
  };


  endGame = () => {
    if(Character.allPlayers.filter(player => player.status == "playing").length == 1){
      let winner = Character.allPlayers.find(player => player.hp > 0);
      winner.status = "winner";
      console.log(`Félicitations ${winner.name}, tu es le dernier survivant, tu gagnes!`);
    }else if(Character.allPlayers.filter(player => player.status == "playing").length > 1){
      console.log(`Félicitation à tous les survivants, vous avez survécu 10 tours dans le donjon, vous gagnez!`)
      Character.allPlayers.forEach((player) => {
        if(player.status != "loser"){
          player.status = "winner"
          console.log(`Bravo ${player.name}!`)
        }
      });
    }else{
      console.log("Tout le monde est mort, vous avez perdus.");
    }
  }
}
