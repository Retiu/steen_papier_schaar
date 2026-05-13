const humanOutput = document.querySelector("#human");
const computerOutput = document.querySelector("#CPU");
const winnerOutput = document.querySelector("#winner");

const btns = document.querySelectorAll("button");

let humanChoice = "";
let computerChoice = "";
let winnerChoice = "";

// placeholder test
humanOutput.innerHTML = "test";

// speler keuzes
function humanPick() {
    humanChoice = event.target.id;
    humanOutput.innerHTML = humanChoice;
    // cpu willekeurige keuze
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

// functie om te chekcen wie heeft geownwen
function checkWinner() {
    if (humanChoice === "steen")
        // als speler de steen heeft gekozen dan vergelijk die keuze met de opties beneden voor de win or verlies conditite
        winnerChoice = {
            steen: "gelijk spel.",
            papier: "je hebt verloren.",
            schaar: "je hebt gewonnen!"
        }[computerChoice];

    if (humanChoice === "papier") {
        // als speler papier heeft gekozen dan vergelijk die keuze met de opties beneden voor de win or verlies conditite
        winnerChoice = {
            steen: "je hebt gewonnen!",
            papier: "gelijk spel.",
            schaar: "je hebt verloren."
        }[computerChoice];
    }

    if (humanChoice === "schaar") {
        // als speler de schaar heeft gekozen dan vergelijk die keuze met de opties beneden voor de win or verlies conditite
        winnerChoice = {
            steen: "je hebt verloren.",
            papier: "je hebt gewonnen!",
            schaar: "gelijk spel."
        }[computerChoice];
    }
    winnerOutput.innerHTML = winnerChoice;
}

btns.forEach(function(btn) {
    btn.addEventListener("click", function(event) {
        // kijtk naar wat is gekozne doro de speler
        humanPick(event);
        // checken wie er geowneon heef
        checkWinner();
    });
});
