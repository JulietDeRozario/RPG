class Game {
  constructor(turnLeft=10){
    
    this.turnLeft = turnLeft

  }

  startGame = () => {
    let answer = confirm("Voulez-vous faire une partie?");
    if(answer == true){
      let new_character = confirm("Voulez-vous créer un nouveau personnage?");
      if(new_character){
        this.createPlayer();
      }else{
        this.startTurn();
      };
    }else{
      window.alert("Au revoir!");
      return false;
    };
  }

  createPlayer = () => {
    masthead.style.visibility = "hidden";
    form.style.visibility = "visible";
    submit.onclick = function submit() {
      stats = Array.from(document.querySelectorAll('form input')).reduce((acc, input) => ({...acc, [input.id]: input.value}), {});
      console.log(stats);
      let values = Object.values(stats);
      let empty_values = [];
      values.map(function is_there_empty_values(value) {
          if(value == "" ) {
            empty_values.push(value);
          };
      });
      if(empty_values.length > 0 || Math.round(stats["hp"]) <= 0 || Math.round(stats["hp"]) > 20 || Math.round(stats["dmg"]) <= 0 || Math.round(stats["dmg"]) > 15 || Math.round(stats["mana"]) < 0 || Math.round(stats["mana"]) > 200){
        error();
      }else{
        new CustomCharacter(stats["name"], Math.round(stats["hp"]), Math.round(stats["dmg"]), Math.round(stats["mana"]));
        console.log("*******Votre personnage a été créé avec succès!*********");
        form.style.visibility = "hidden";
        masthead.style.visibility = "visible";
        game.startTurn();
      }
    };

    function error() {
      let message = ""
      if(stats["name"] == "") {
        message = "Vous devez remplir le nom de votre héros"
      }else if(Math.round(stats["hp"]) <= 0 || Math.round(stats["hp"]) > 20){
        message = "Les pv de votre héros doivent être compris entre 1 et 20"
      }else if(Math.round(stats["dmg"]) <= 0 || Math.round(stats["dmg"]) > 15){
        message = "Les pa de votre héros doivent être compris entre 1 et 15"
      }else if(Math.round(stats["mana"]) < 0 || Math.round(stats["mana"]) > 200) {
        message = "Le mana de votre héros doit être compris entre 0 et 200"
      };
      alert.className = "alert alert-danger alert-dismissible fade show";
      alert.innerHTML = message + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>";
      closeAlert();
    };

    function closeAlert() {
      let close = document.querySelector('.close');
      close.onclick = function() {
        alert.className="";
        alert.innerHTML=""
      };
    }
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
    setTimeout(console.clear(), 3000); 
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
        let choice = prompt(`${player.name}, que faites-vous ? (1/2)\n\n1- Attaquer un autre joueur\n2- Utiliser ma capacité spéciale (${player.cost})\n\nStats: ${player.hp} pv / ${player.dmg} pa / ${player.mana} mana`);
        let victim;

        if(choice == "1" || player instanceof Fighter || player instanceof Paladin || player instanceof Assassin || player instanceof CustomCharacter){
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
          special_attack_soud.play();
          player.specialAttack(victim);
          killed(victim, player);
        }else if(choice == "2" && (player instanceof Healer == true || player instanceof Berzerker == true)){
          special_attack_soud.play();
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
