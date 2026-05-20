<?php ?>
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
    <style>
        html, body { height: 100%; overflow: hidden; }
        .player {
            height: 100vh;
            display: flex;
            flex-direction: column;
            max-width: 420px;
            overflow: hidden;
        }
        .tracklist {
            flex: 1;
            overflow-y: auto;
            scrollbar-width: thin;
            scrollbar-color: var(--groove) transparent;
        }
        .tracklist::-webkit-scrollbar { width: 4px; }
        .tracklist::-webkit-scrollbar-track { background: transparent; }
        .tracklist::-webkit-scrollbar-thumb { background: var(--groove); border-radius: 2px; }
    </style>
</head>
<body>

<div class="player">
    <p class="label">Now Playing</p>
    <div class="now-playing">
        <div class="track-title" id="trackTitle">—</div>
        <div class="track-artists" id="trackArtists"></div>
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
    <p class="label">Position</p>
    <div class="volume-row">
        <span class="volume-icon">&#9201;</span>
        <input type="range" id="seekSlider" min="0" max="100" value="0" step="0.1">
        <span class="vol-val" id="seekVal">0:00</span>
    </div>

    <div class="footer-line"></div>
    <p class="footer-text">BGM &mdash; Steen Papier Schaar</p>
</div>

<script src="js/bgm.js"></script>
</body>
</html>
