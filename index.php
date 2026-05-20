<?php
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Rock, paper, scissors</title>
</head>
<body>
<h1>Your choice: <span id="human"></span></h1>
<h1>CPU choice: <span id="CPU"></span></h1>
<h2>Winner: <span id="winner"></span></h2>

Current score: <span id="currentscore"></span>
<br>
Highscore: <span id="highscore"></span>
<br>
<br>

<button id="rock">Rock</button>
<button id="paper">Paper</button>
<button id="scissors">Scissors</button>

<br>
<br>
<button id="mutesfx">Mute SFX</button>
<br>
<br>

<iframe src="bgm.php" style="border:none; width:440px; height:520px;"></iframe>

</body>
<script src="js/index.js"></script>
</html>
