const humanOutput = document.querySelector("#human");
const computerOutput = document.querySelector("#CPU");
const winnerOutput = document.querySelector("#winner");
const btns = document.querySelectorAll("#rock, #paper, #scissors");
const highscoresOutput = document.querySelector("#highscore");

let humanChoice = "";
let computerChoice = "";
let winnerChoice = "";
let score = 0;
let highscore = 0;

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
            computerChoice = 'rock';
            break;
        case 2:
            computerChoice = 'scissors';
            break;
        case 3:
            computerChoice = 'paper';
            break;
    }
    computerOutput.innerHTML = computerChoice;
}

// functie om te chekcen wie heeft geownwen
function checkWinner() {
    winnerChoice = {
        // kijk wat de speler heeft gekozen en vergeijljk het met wat de cpu heeft gorozkein en kij kdan wie heeft gewonenn  of vleroen
        rock: {
            rock: "tie.",
            paper: "you lost.",
            scissors: "you won!"
        },
        paper: {
            rock: "you won!",
            paper: "tie.",
            scissors: "you lost."
        },
        scissors: {
            rock: "you lost.",
            paper: "you won!",
            scissors: "tie."
        }
    }[humanChoice][computerChoice];
    winnerOutput.innerHTML = winnerChoice;
}
let sfxMuted = false;

document.getElementById('mutesfx').addEventListener('click', () => {
    sfxMuted = !sfxMuted;
    document.getElementById('mutesfx').textContent = sfxMuted ? 'Unmute SFX' : 'Mute SFX';
});

function updateScore() {
    if (winnerChoice === "you won!") {
        score++;
        if (score > highscore) {
            highscore = score;
            document.querySelector("#highscore").innerHTML = "" + highscore;
        }
    } else if (winnerChoice === "you lost." || winnerChoice === "tie.") {
        score = 0;
    }
    document.querySelector("#currentscore").innerHTML = "" + score;
}

function playSound() {
    if (winnerChoice === "you lost." && humanChoice === "paper" && computerChoice === "scissors" && !sfxMuted) {
        const sfx = new Audio('audio/sfx/sfx_scissorcutpaper.mp3');
        sfx.play();
    };
    if (winnerChoice === "you won!" && humanChoice === "scissors" && computerChoice === "paper" && !sfxMuted) {
        const sfx = new Audio('audio/sfx/sfx_scissorcutpaper.mp3');
        sfx.play();
    };
    if (winnerChoice === "you won!" && humanChoice === "rock" && computerChoice === "scissors" && !sfxMuted) {
        const sfx = new Audio('audio/sfx/sfx_rockbeatscissor-v3.mp3');
        sfx.play();
    };
    if (winnerChoice === "you lost." && humanChoice === "scissors" && computerChoice === "rock" && !sfxMuted) {
        const sfx = new Audio('audio/sfx/sfx_rockbeatscissor-v3.mp3');
        sfx.play();
    };
}

btns.forEach(function (btn) {
    btn.addEventListener("click", function (event) {
        // kijtk naar wat is gekozne doro de speler
        humanPick(event);
        // checken wie er geowneon heef
        checkWinner();
        updateScore(); // add this
        playSound();
    });
});
