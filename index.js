const humanOutput = document.querySelector("#human");
const computerOutput = document.querySelector("#CPU");
const winnerOutput = document.querySelector("#winner");
const steenBtn = document.querySelector("#steen");
const papierBtn = document.querySelector("#papier");
const schaarBtn = document.querySelector("#schaar");

let humanChoice = "";
let computerChoice = "";
let winnerChoice = "";

humanOutput.innerHTML = "test";


steenBtn.addEventListener("click", function (event) {
    humanChoice = event.target.id;
    humanOutput.innerHTML = humanChoice;
    const randomNumber = Math.floor(Math.random() * 3) + 1;
    if (randomNumber === 1) {
        computerChoice = 'steen';
    }
    if (randomNumber === 2) {
        computerChoice = 'schaar';
    }
    if (randomNumber === 3) {
        computerChoice = 'papier';
    }
    computerOutput.innerHTML = computerChoice;
    if (computerChoice === 'schaar') {
        winnerChoice = 'je hebt gewonnen!';
    }
    if (computerChoice === 'steen') {
        winnerChoice = 'gelijk spel.';
    }
    if (computerChoice === 'papier') {
        winnerChoice = 'je hebt verloren.';
    }
    winnerOutput.innerHTML = winnerChoice;
});

papierBtn.addEventListener("click", function (event) {
    humanChoice = event.target.id;
    humanOutput.innerHTML = humanChoice;
    const randomNumber = Math.floor(Math.random() * 3) + 1;
    if (randomNumber === 1) {
        computerChoice = 'steen';
    }
    if (randomNumber === 2) {
        computerChoice = 'schaar';
    }
    if (randomNumber === 3) {
        computerChoice = 'papier';
    }
    computerOutput.innerHTML = computerChoice;
    if (computerChoice === 'steen') {
        winnerChoice = 'je hebt gewonnen!';
    }
    if (computerChoice === 'schaar') {
        winnerChoice = 'je hebt verloren.';
    }
    if (computerChoice === 'papier') {
        winnerChoice = 'gelijk spel.';
    }
    winnerOutput.innerHTML = winnerChoice;
});

schaarBtn.addEventListener("click", function (event) {
    humanChoice = event.target.id;
    humanOutput.innerHTML = humanChoice;
    const randomNumber = Math.floor(Math.random() * 3) + 1;
    if (randomNumber === 1) {
        computerChoice = 'steen';
    }
    if (randomNumber === 2) {
        computerChoice = 'schaar';
    }
    if (randomNumber === 3) {
        computerChoice = 'papier';
    }
    computerOutput.innerHTML = computerChoice;
    if (computerChoice === 'schaar') {
        winnerChoice = 'gelijk spel.';
    }
    if (computerChoice === 'steen') {
        winnerChoice = 'je hebt verloren.';
    }
    if (computerChoice === 'papier') {
        winnerChoice = 'je hebt gewonnen!';
    }
    winnerOutput.innerHTML = winnerChoice;
});