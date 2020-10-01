Character.allPlayers = [];
let game = new Game;
let player1 = new Fighter("Grace");
let player2 = new Paladin("Ulder");
let player3 = new Healer("Moana");
let player4 = new Berzerker("Draven");
let player5 = new Assassin("Carl");
let death_sound = new Audio('audio/0477.mp3');
let attack_sound = new Audio('audio/0127.mp3');
let special_attack_soud = new Audio('audio/special_attack.mp3');
let stats = [];
let submit = document.getElementById("submit");
let alert = document.getElementById("alert");
let form = document.getElementById("form");
let masthead = document.querySelector('.masthead');

let play = document.getElementById('play');
play.onclick = function (){
  while(game.startGame()){}
}





