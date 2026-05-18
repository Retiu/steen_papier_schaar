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
    switch (randomNumber) {
        case 1:
            computerChoice = 'steen';
            break;
        case 2:
            computerChoice = 'schaar';
            break;
        case 3:
            computerChoice = 'papier';
            break;
    }
    computerOutput.innerHTML = computerChoice;
}

// functie om te chekcen wie heeft geownwen
function checkWinner() {
    winnerChoice = {
        // kijk wat de speler heeft gekozen en vergeijljk het met wat de cpu heeft gorozkein en kij kdan wie heeft gewonenn  of vleroen
        steen: {
            steen: "gelijk spel.",
            papier: "je hebt verloren.",
            schaar: "je hebt gewonnen!"
        },
        papier: {
            steen: "je hebt gewonnen!",
            papier: "gelijk spel.",
            schaar: "je hebt verloren."
        },
        schaar: {
            steen: "je hebt verloren.",
            papier: "je hebt gewonnen!",
            schaar: "gelijk spel."
        }
    }[humanChoice][computerChoice];
    winnerOutput.innerHTML = winnerChoice;
}

btns.forEach(function (btn) {
    btn.addEventListener("click", function (event) {
        // kijtk naar wat is gekozne doro de speler
        humanPick(event);
        // checken wie er geowneon heef
        checkWinner();
    });
});
