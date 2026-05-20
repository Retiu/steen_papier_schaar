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
    <style>
        *, *::before, *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        :root {
            --bg: #1a120b;
            --surface: #2c1e13;
            --groove: #3d2b1f;
            --amber: #e8a838;
            --amber-dim: #b07820;
            --cream: #f5e9d0;
            --muted: #8a6a50;
            --active: #f0c060;
            --glow: rgba(232, 168, 56, .18);
        }

        body {
            background: var(--bg);
            color: var(--cream);
            font-family: 'Syne Mono', monospace;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }

        body::before {
            content: '';
            position: fixed;
            inset: 0;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
            pointer-events: none;
            z-index: 0;
        }

        .player {
            position: relative;
            z-index: 1;
            background: var(--surface);
            border: 1px solid var(--groove);
            border-radius: 4px;
            width: 100%;
            max-width: 420px;
            padding: 2rem 2rem 1.75rem;
            box-shadow: 0 0 0 1px #0004, 0 8px 40px #0009, 0 0 60px var(--glow);
        }

        .player::before {
            content: '';
            display: block;
            height: 3px;
            background: linear-gradient(90deg, transparent, var(--amber), transparent);
            margin-bottom: 1.75rem;
            opacity: .6;
        }

        .label {
            font-size: .6rem;
            letter-spacing: .18em;
            text-transform: uppercase;
            color: var(--muted);
            margin-bottom: .35rem;
        }

        .now-playing {
            background: var(--bg);
            border: 1px solid var(--groove);
            border-radius: 2px;
            padding: .85rem 1rem;
            margin-bottom: 1.5rem;
            min-height: 72px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: relative;
            overflow: hidden;
        }

        .now-playing::after {
            content: '';
            position: absolute;
            inset: 0;
            background: repeating-linear-gradient(
                    to bottom,
                    transparent 0px, transparent 3px,
                    rgba(0, 0, 0, .08) 3px, rgba(0, 0, 0, .08) 4px
            );
            pointer-events: none;
        }

        .track-title {
            font-family: 'Playfair Display', serif;
            font-style: italic;
            font-size: 1.2rem;
            color: var(--active);
            line-height: 1.3;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .track-index {
            font-size: .65rem;
            color: var(--muted);
            margin-top: .25rem;
            letter-spacing: .1em;
        }

        .bars {
            display: flex;
            align-items: flex-end;
            gap: 2px;
            height: 18px;
            margin-top: .55rem;
        }

        .bars span {
            display: block;
            width: 3px;
            background: var(--amber-dim);
            border-radius: 1px;
            height: 4px;
            transition: background .3s;
        }

        .bars.playing span {
            background: var(--amber);
        }

        .bars.playing span:nth-child(1) {
            animation: bar 0.9s ease-in-out infinite alternate;
        }

        .bars.playing span:nth-child(2) {
            animation: bar 1.1s ease-in-out .1s infinite alternate;
        }

        .bars.playing span:nth-child(3) {
            animation: bar 0.8s ease-in-out .2s infinite alternate;
        }

        .bars.playing span:nth-child(4) {
            animation: bar 1.3s ease-in-out .05s infinite alternate;
        }

        .bars.playing span:nth-child(5) {
            animation: bar 1.0s ease-in-out .15s infinite alternate;
        }

        .bars.playing span:nth-child(6) {
            animation: bar 0.7s ease-in-out .25s infinite alternate;
        }

        .bars.playing span:nth-child(7) {
            animation: bar 1.2s ease-in-out .1s infinite alternate;
        }

        .bars.playing span:nth-child(8) {
            animation: bar 0.95s ease-in-out .3s infinite alternate;
        }

        @keyframes bar {
            from {
                height: 3px;
            }
            to {
                height: 16px;
            }
        }

        .tracklist {
            display: flex;
            flex-direction: column;
            gap: .4rem;
            margin-bottom: 1.5rem;
        }

        .track-btn {
            background: none;
            border: 1px solid transparent;
            color: var(--muted);
            font-family: 'Syne Mono', monospace;
            font-size: .8rem;
            text-align: left;
            padding: .5rem .75rem;
            border-radius: 2px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: .75rem;
            transition: all .15s;
            letter-spacing: .02em;
        }

        .track-btn .num {
            color: var(--groove);
            min-width: 1.2em;
            font-size: .7rem;
        }

        .track-btn:hover {
            background: var(--groove);
            color: var(--cream);
            border-color: var(--groove);
        }

        .track-btn.active {
            background: var(--groove);
            border-color: var(--amber-dim);
            color: var(--amber);
        }

        .track-btn.active .num {
            color: var(--amber-dim);
        }

        .controls {
            display: flex;
            align-items: center;
            gap: .75rem;
            margin-bottom: 1.25rem;
        }

        .ctrl-btn {
            background: var(--groove);
            border: 1px solid #5a3d2a;
            color: var(--cream);
            font-size: 1rem;
            width: 2.4rem;
            height: 2.4rem;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all .15s;
            flex-shrink: 0;
        }

        .ctrl-btn:hover {
            background: #5a3d2a;
            border-color: var(--amber-dim);
        }

        .ctrl-btn:active {
            transform: scale(.94);
        }

        .ctrl-btn.play-pause {
            width: 3rem;
            height: 3rem;
            background: var(--amber-dim);
            border-color: var(--amber);
            font-size: 1.2rem;
        }

        .ctrl-btn.play-pause:hover {
            background: var(--amber);
        }

        .volume-row {
            display: flex;
            align-items: center;
            gap: .75rem;
        }

        .volume-icon {
            color: var(--muted);
            font-size: .9rem;
            flex-shrink: 0;
        }

        input[type=range] {
            -webkit-appearance: none;
            flex: 1;
            height: 3px;
            background: var(--groove);
            border-radius: 2px;
            outline: none;
            cursor: pointer;
        }

        input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 13px;
            height: 13px;
            background: var(--amber);
            border-radius: 50%;
            border: none;
            box-shadow: 0 0 6px var(--glow);
            transition: transform .1s;
        }

        input[type=range]::-webkit-slider-thumb:hover {
            transform: scale(1.2);
        }

        .vol-val {
            font-size: .65rem;
            color: var(--muted);
            min-width: 2.5em;
            text-align: right;
            letter-spacing: .05em;
        }

        .footer-line {
            height: 1px;
            background: linear-gradient(90deg, transparent, var(--groove), transparent);
            margin: 1.25rem 0 .75rem;
        }

        .footer-text {
            font-size: .58rem;
            color: var(--groove);
            text-align: center;
            letter-spacing: .12em;
            text-transform: uppercase;
        }
    </style>
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

<script>
    const tracks = [
        {file: 'audio/bgm/bgm1_russet_dreams_41de54a90332c5e211350dfeae7c6de1.mp3', title: 'iBug - Russet Dreams'},
        {
            file: 'audio/bgm/bgm2_the_kings_crumpets_ba18dc4d2e014a922e9b65fdcabc7dc2.mp3',
            title: "iBug - The King's Crumpets"
        },
        {file: 'audio/bgm/bgm3_poached_c465432faff516c77e654ffbaa58f88a.mp3', title: 'iBug - Poached'},
        {file: 'audio/bgm/bgm4_scorched_sand_b2b6dace67b56ffdea5ff04fd7e6f429.mp3', title: 'iBug - Scorched Sand'},
    ];

    const audio = document.getElementById('audio');
    const titleEl = document.getElementById('trackTitle');
    const indexEl = document.getElementById('trackIndex');
    const barsEl = document.getElementById('bars');
    const tracklist = document.getElementById('tracklist');
    const btnPlay = document.getElementById('btnPlay');
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    const volSlider = document.getElementById('volSlider');
    const volVal = document.getElementById('volVal');

    let current = -1;
    let playing = false;

    tracks.forEach((t, i) => {
        const btn = document.createElement('button');
        btn.className = 'track-btn';
        btn.innerHTML = `<span class="num">${String(i + 1).padStart(2, '0')}</span>${t.title}`;
        btn.addEventListener('click', () => loadTrack(i, true));
        tracklist.appendChild(btn);
    });

    function getButtons() {
        return tracklist.querySelectorAll('.track-btn');
    }

    function loadTrack(index, autoplay = false) {
        current = index;
        const t = tracks[index];
        audio.src = t.file;
        audio.volume = volSlider.value / 100;

        titleEl.textContent = t.title;
        indexEl.textContent = `Track ${index + 1} of ${tracks.length}`;

        getButtons().forEach((b, i) => b.classList.toggle('active', i === index));

        if (autoplay) {
            audio.play();
            setPlaying(true);
        } else {
            setPlaying(false);
        }
    }

    function setPlaying(state) {
        playing = state;
        btnPlay.innerHTML = state ? '&#9646;&#9646;' : '&#9654;';
        barsEl.classList.toggle('playing', state);
    }

    btnPlay.addEventListener('click', () => {
        if (current === -1) {
            loadTrack(0, true);
            return;
        }
        if (playing) {
            audio.pause();
            setPlaying(false);
        } else {
            audio.play();
            setPlaying(true);
        }
    });

    btnPrev.addEventListener('click', () => {
        const prev = current <= 0 ? tracks.length - 1 : current - 1;
        loadTrack(prev, playing);
    });

    btnNext.addEventListener('click', () => {
        const next = current >= tracks.length - 1 ? 0 : current + 1;
        loadTrack(next, playing);
    });

    audio.addEventListener('ended', () => loadTrack((current + 1) % tracks.length, true));
    audio.addEventListener('play', () => setPlaying(true));
    audio.addEventListener('pause', () => setPlaying(false));

    volSlider.addEventListener('input', () => {
        const v = volSlider.value;
        audio.volume = v / 100;
        volVal.textContent = v + '%';
    });
</script>
</body>
</html>
