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