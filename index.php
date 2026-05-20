<?php ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rock Paper Scissors</title>
    <link rel="stylesheet" href="css/index.css">
</head>
<body>

<div class="game-col">

    <!-- result display -->
    <div class="card">
        <p class="card-label">Round</p>
        <div class="result-grid">
            <div class="result-cell">
                <div class="cell-label">Your choice</div>
                <div class="cell-value" id="human">—</div>
            </div>
            <div class="result-cell">
                <div class="cell-label">CPU choice</div>
                <div class="cell-value" id="CPU">—</div>
            </div>
        </div>
        <div class="winner-bar">
            <span class="cell-label">Winner&nbsp;</span>
            <span id="winner">—</span>
        </div>
    </div>

    <!-- score -->
    <div class="card">
        <p class="card-label">Score</p>
        <div class="score-row">
            <div class="score-cell">
                <div class="cell-label">Current</div>
                <div class="cell-value" id="currentscore">0</div>
            </div>
            <div class="score-cell">
                <div class="cell-label">Highscore</div>
                <div class="cell-value" id="highscore">0</div>
            </div>
        </div>
    </div>

    <!-- choices -->
    <div class="card">
        <p class="card-label">Your Move</p>
        <div class="choice-btns">
            <button class="choice-btn" id="rock">
                <span class="icon">🪨</span>
                Rock
            </button>
            <button class="choice-btn" id="paper">
                <span class="icon">📄</span>
                Paper
            </button>
            <button class="choice-btn" id="scissors">
                <span class="icon">✂️</span>
                Scissors
            </button>
        </div>
    </div>

    <!-- audio controls -->
    <div class="card">
        <p class="card-label">Audio</p>
        <div class="mute-row">
            <button class="mute-btn" id="mutesfx">Mute All SFX</button>
            <button class="mute-btn" id="mutebuttonsfx">Mute Button SFX</button>
        </div>
    </div>

</div>

<div class="bgm-col">
    <iframe src="bgm.php"></iframe>
</div>

<script src="js/index.js"></script>
</body>
</html>
