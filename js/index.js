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
let winsScore = 0;
let lossesScore = 0;
let tiesScore = 0;
let sfxMuted = false;
let buttonsfxMuted = false;
let newHighscoreReached = false;
let highscoreTimeout = false;


const sfxScissorCutPaper = new Audio('audio/sfx/sfx_scissorcutpaper.ogg');
sfxScissorCutPaper.volume = 0.55;

const sfxRockBeatScissor = new Audio('audio/sfx/sfx_rockbeatscissor-v3.ogg');
sfxRockBeatScissor.volume = 0.3;

const sfxNewHighscore = new Audio('audio/sfx/sfx_newhighscore-v4.ogg');
sfxNewHighscore.volume = 0.65;

function playSfx(audio) {
    const clone = audio.cloneNode();
    clone.play();
}

function playSfxFadeIn(audio, targetVolume, delay = 500, fadeDuration = 500) {
    setTimeout(() => {
        const clone = audio.cloneNode();
        clone.volume = 0;
        clone.play();
        const steps = 20;
        const stepTime = fadeDuration / steps;
        const stepSize = targetVolume / steps;
        const fade = setInterval(() => {
            if (clone.volume + stepSize >= targetVolume) {
                clone.volume = targetVolume;
                clearInterval(fade);
            } else {
                clone.volume += stepSize;
            }
        }, stepTime);
    }, delay);
}


// placeholder test
humanOutput.innerHTML = "test";

// speler keuzes
function humanPick(event) {
    const btn = event.target.closest('button');
    humanChoice = btn.id;
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
    const winnerEl = document.getElementById('winner');
    winnerEl.classList.remove('won', 'lost', 'tie');
    if (winnerChoice === 'you won!') winnerEl.classList.add('won');
    if (winnerChoice === 'you lost.') winnerEl.classList.add('lost');
    if (winnerChoice === 'tie.') winnerEl.classList.add('tie');
}


document.getElementById('mutesfx').addEventListener('click', () => {
    sfxMuted = !sfxMuted;
    const btn = document.getElementById('mutesfx');
    btn.textContent = sfxMuted ? 'Unmute All SFX' : 'Mute All SFX';
    btn.classList.toggle('muted', sfxMuted);
});
document.getElementById('mutebuttonsfx').addEventListener('click', () => {
    buttonsfxMuted = !buttonsfxMuted;
    const btn = document.getElementById('mutebuttonsfx');
    btn.textContent = buttonsfxMuted ? 'Unmute Button SFX' : 'Mute Button SFX';
    btn.classList.toggle('muted', buttonsfxMuted);
});


function updateScore() {
    if (winnerChoice === "you won!") {
        score++;
        if (score > highscore) {
            highscore = score;
            document.querySelector("#highscore").innerHTML = "" + highscore;
            newHighscoreReached = true;
        }
    } else if (winnerChoice === "you lost." || winnerChoice === "tie.") {
        if (winnerChoice === "you lost." && newHighscoreReached && !sfxMuted) {
            highscoreTimeout = true
            playSfx(sfxNewHighscore);
        }
        newHighscoreReached = false;
        score = 0;
    }
    document.querySelector("#currentscore").innerHTML = "" + score;
}

function WinsLosses() {
    if (winnerChoice === "you won!") {
        winsScore++
        document.querySelector("#winscore").innerHTML = "" + winsScore;
    }
    if (winnerChoice === "tie.") {
        tiesScore++
        document.querySelector("#tiescore").innerHTML = "" + tiesScore;
    }
    if (winnerChoice === "you lost.") {
        lossesScore++
        document.querySelector("#losescore").innerHTML = "" + lossesScore;
    }
}

function playSound() {
    if ((winnerChoice === "you lost." && humanChoice === "paper" && computerChoice === "scissors" ||
            winnerChoice === "you won!" && humanChoice === "scissors" && computerChoice === "paper")
        && !sfxMuted && !buttonsfxMuted) {
        if (highscoreTimeout) {
            playSfxFadeIn(sfxScissorCutPaper, 0.55, 1000, 500);
        } else {
            playSfx(sfxScissorCutPaper);
        }
    }

    if ((winnerChoice === "you lost." && humanChoice === "scissors" && computerChoice === "rock" ||
            winnerChoice === "you won!" && humanChoice === "rock" && computerChoice === "scissors")
        && !sfxMuted && !buttonsfxMuted) {
        if (highscoreTimeout) {
            playSfxFadeIn(sfxRockBeatScissor, 0.3, 1000, 500);
        } else {
            playSfx(sfxRockBeatScissor);
        }
    }
    if (highscoreTimeout) {
        setTimeout(() => {
            highscoreTimeout = false;
        }, 1000);
    }
}

btns.forEach(function (btn) {
    btn.addEventListener("click", function (event) {
        // kijtk naar wat is gekozne doro de speler
        humanPick(event);
        // checken wie er geowneon heef
        checkWinner();
        updateScore(); // add this
        WinsLosses()
        playSound();
    });
});
