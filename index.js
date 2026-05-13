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

function humanPick() {
    humanChoice = event.target.id;
    humanOutput.innerHTML = humanChoice;
    let randomNumber = Math.floor(Math.random() * 3) + 1;
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
}

function checkWinner() {

    if (humanChoice === "steen") {
        winnerChoice = {
            steen: "gelijk spel.",
            papier: "je hebt verloren.",
            schaar: "je hebt gewonnen!"
        }[computerChoice];
    }

    if (humanChoice === "papier") {
        winnerChoice = {
            steen: "je hebt gewonnen!",
            papier: "gelijk spel.",
            schaar: "je hebt verloren."
        }[computerChoice];
    }

    if (humanChoice === "schaar") {
        winnerChoice = {
            steen: "je hebt verloren.",
            papier: "je hebt gewonnen!",
            schaar: "gelijk spel."
        }[computerChoice];
    }

    winnerOutput.innerHTML = winnerChoice;
}

steenBtn.addEventListener("click", function (event) {
    humanPick(event);
    checkWinner();
});

papierBtn.addEventListener("click", function (event) {
    humanPick(event);
    checkWinner();
});

schaarBtn.addEventListener("click", function (event) {
    humanPick(event);
    checkWinner();
});