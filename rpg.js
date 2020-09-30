Character.allPlayers = [];

let player1 = new Fighter("Grace");
let player2 = new Paladin("Ulder");
let player3 = new Healer("Moana");
let player4 = new Berzerker("Draven");
let player5 = new Assassin("Carl");
let death_sound = new Audio('0477.mp3');
let attack_sound = new Audio('0127.mp3');

while(true){
  let game = new Game;
  if(game.startGame() == false){break};
}