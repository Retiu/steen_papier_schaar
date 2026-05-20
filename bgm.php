<?php
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BGM Player</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Syne+Mono&family=Playfair+Display:ital@0;1&display=swap"
          rel="stylesheet">
    <link rel="stylesheet" href="css/bgm.css">
</head>
<body>

<div class="player">
    <p class="label">Now Playing</p>
    <div class="now-playing">
        <div class="track-title" id="trackTitle">—</div>
        <div class="track-index" id="trackIndex">Select a track</div>
        <div class="bars" id="bars">
            <span></span><span></span><span></span><span></span>
            <span></span><span></span><span></span><span></span>
        </div>
    </div>

    <p class="label">Tracks</p>
    <div class="tracklist" id="tracklist"></div>

    <div class="controls">
        <button class="ctrl-btn" id="btnPrev" title="Previous">&#9664;&#9664;</button>
        <button class="ctrl-btn play-pause" id="btnPlay" title="Play / Pause">&#9654;</button>
        <button class="ctrl-btn" id="btnNext" title="Next">&#9654;&#9654;</button>
    </div>

    <p class="label">Volume</p>
    <div class="volume-row">
        <span class="volume-icon">&#128266;</span>
        <input type="range" id="volSlider" min="0" max="100" value="70">
        <span class="vol-val" id="volVal">70%</span>
    </div>

    <div class="footer-line"></div>
    <p class="footer-text">BGM &mdash; Steen Papier Schaar</p>
</div>

<audio id="audio"></audio>

<script src="js/bgm.js"></script>
</body>
</html>
