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
        html, body {
            height: 100%;
            overflow: hidden;
        }

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

        .tracklist::-webkit-scrollbar {
            width: 4px;
        }

        .tracklist::-webkit-scrollbar-track {
            background: transparent;
        }

        .tracklist::-webkit-scrollbar-thumb {
            background: var(--groove);
            border-radius: 2px;
        }
    </style>
</head>
<body>

<div class="player">
    <p class="label">Now Playing</p>
    <div class="now-playing">
        <div class="now-playing-inner">
            <img id="coverArt" src="" alt="" class="cover-art">
            <div class="now-playing-text">
                <div class="track-title" id="trackTitle">—</div>
                <div class="track-artists" id="trackArtists"></div>
                <div class="track-album" id="trackAlbum"></div>
                <div class="track-index" id="trackIndex">Select a track</div>
                <div class="bars" id="bars">
                    <span></span><span></span><span></span><span></span>
                    <span></span><span></span><span></span><span></span>
                </div>
            </div>
        </div>
    </div>

    <p class="label">Tracks</p>
    <details class="filter-panel">
        <summary>Filter</summary>
        <div class="filter-fields">
            <div class="filter-row">
                <select id="filterType">
                    <option value="">— type —</option>
                    <option value="artist">Artist</option>
                    <option value="album">Album</option>
                    <option value="genre">Genre</option>
                    <option value="label">Label</option>
                </select>
                <select id="filterValue" disabled>
                    <option value="">— value —</option>
                </select>
            </div>
            <button class="filter-clear" id="filterClear">Clear filter</button>
        </div>
    </details>
    <div class="tracklist" id="tracklist"></div>
    <div class="controls">
        <button class="ctrl-btn" id="btnPrev" title="Previous">&#9664;&#9664;</button>
        <button class="ctrl-btn play-pause" id="btnPlay" title="Play / Pause">&#9654;</button>
        <button class="ctrl-btn" id="btnNext" title="Next">&#9654;&#9654;</button>
        <button class="ctrl-btn" id="btnShuffle" title="Shuffle">&#x2a60;</button>
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
    <div class="volume-row" style="margin-bottom:.5rem">
        <label style="font-size:.65rem; color:var(--muted); display:flex; align-items:center; gap:.5rem; cursor:pointer;">
            <input type="checkbox" id="chkAutoplay">
            Autoplay on open
        </label>
    </div>

    <details class="lastfm">
        <summary>Last.fm Scrobbling</summary>
        <div class="lastfm-fields">
            <p><span>API Key</span> <input id="lastfmKeybox" type="password"></p>
            <p><span>API Secret</span> <input id="lastfmSecretbox" type="password"></p>
            <p><span>Username</span> <input id="lastfmUserbox"></p>
            <p><span>Password</span> <input id="lastfmPassbox" type="password"></p>
        </div>
    </details>
    <div class="footer-line"></div>

    <p class="footer-text">MUSIC PLAYER</p>
    <p class="footer-text">Music mostly from <a href="https://untonemusic.com">UNTONE Music</a></p>
    <audio id="mediaSessionAudio" loop>
        <source src="data:audio/wav;base64,UklGRlQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==" type="audio/wav">
    </audio>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.19.0/js/md5.min.js"></script>
<script src="js/bgm.js"></script>
</body>
</html>
