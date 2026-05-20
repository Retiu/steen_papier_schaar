const trackList = [
    {
        url: 'audio/bgm/41de54a90332c5e211350dfeae7c6de1',
        title: 'Russet Dreams',
        artists: [
            { name: 'iBug', url: 'https://untonemusic.com/profile/ibug' }
        ],
        releaseUrl: 'https://untonemusic.com/release/russet-dreams'
    },
    {
        url: 'audio/bgm/ba18dc4d2e014a922e9b65fdcabc7dc2',
        title: "The King's Crumpets",
        artists: [
            { name: 'iBug', url: 'https://untonemusic.com/profile/ibug' }
        ],
        releaseUrl: 'https://untonemusic.com/release/russet-dreams'
    },
    {
        url: 'audio/bgm/c465432faff516c77e654ffbaa58f88a',
        title: 'Poached',
        artists: [
            { name: 'iBug', url: 'https://untonemusic.com/profile/ibug' }
        ],
        releaseUrl: 'https://untonemusic.com/release/russet-dreams'
    },
    {
        url: 'audio/bgm/b2b6dace67b56ffdea5ff04fd7e6f429',
        title: 'Scorched Sand',
        artists: [
            { name: 'iBug', url: 'https://untonemusic.com/profile/ibug' }
        ],
        releaseUrl: 'https://untonemusic.com/release/russet-dreams'
    },
    {
        url: 'audio/bgm/7e7b098a680e76a7024f48fcfc5ec539',
        title: 'Deserted Spirits',
        artists: [
            { name: 'DJ Stuiter', url: 'https://untonemusic.com/profile/dj-stuiter' },
            { name: 'The_ongoing', url: 'https://www.youtube.com/@the_ongoing' }
        ],
        releaseUrl: ''
    },
    {
        url: 'audio/bgm/befa2c5a5a8ed06c6b6f1984ec7cadd3',
        title: 'Stars',
        artists: [
            { name: 'DJ Stuiter', url: 'https://untonemusic.com/profile/dj-stuiter' },
            { name: 'The_ongoing', url: 'https://www.youtube.com/@the_ongoing' }
        ],
        releaseUrl: ''
    },
    {
        url: 'audio/bgm/2946b2329d6dab1a9758ad80b32825d0',
        title: 'Falling Time',
        artists: [
            { name: 'DJ Stuiter', url: 'https://untonemusic.com/profile/dj-stuiter' },
            { name: 'The_ongoing', url: 'https://www.youtube.com/@the_ongoing' }
        ],
        releaseUrl: ''
    },
    {
        url: 'audio/bgm/f2bf89c471ee351cd0913fb387e41aca',
        title: 'Falling Time (Instrumental)',
        artists: [
            { name: 'DJ Stuiter', url: 'https://untonemusic.com/profile/dj-stuiter' },
            { name: 'The_ongoing', url: 'https://www.youtube.com/@the_ongoing' }
        ],
        releaseUrl: ''
    },
];

const titleEl   = document.getElementById('trackTitle');
const indexEl   = document.getElementById('trackIndex');
const barsEl    = document.getElementById('bars');
const tracklist = document.getElementById('tracklist');
const btnPlay   = document.getElementById('btnPlay');
const btnPrev   = document.getElementById('btnPrev');
const btnNext   = document.getElementById('btnNext');
const volSlider = document.getElementById('volSlider');
const volVal    = document.getElementById('volVal');
const seekSlider = document.getElementById('seekSlider');
const seekVal    = document.getElementById('seekVal');

const ctx        = new AudioContext();
const gainNode   = ctx.createGain();
gainNode.gain.value = volSlider.value / 100;
gainNode.connect(ctx.destination);

const buffers = new Array(trackList.length).fill(null);
let current    = -1;
let playing    = false;
let sourceNode = null;
let startTime  = 0;   // ctx.currentTime when playback started
let startOffset = 0;  // how far into the track we started from

// decode all tracks upfront
trackList.forEach((t, i) => {
    fetch(t.url)
        .then(r => r.arrayBuffer())
        .then(ab => ctx.decodeAudioData(ab))
        .then(buf => {
            buffers[i] = buf;
            if (i === 0) indexEl.textContent = 'Ready';
        })
        .catch(e => console.error('Failed to load track', i, e));
});

// build track buttons
trackList.forEach((t, i) => {
    const btn = document.createElement('button');
    btn.className = 'track-btn';
    btn.innerHTML = `<span class="num">${String(i + 1).padStart(2, '0')}</span>${t.title}`;
    btn.addEventListener('click', () => loadTrack(i, true));
    tracklist.appendChild(btn);
});

function getButtons() {
    return tracklist.querySelectorAll('.track-btn');
}

function formatTime(secs) {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
}

function getCurrentTime() {
    if (!playing) return startOffset;
    return startOffset + (ctx.currentTime - startTime);
}

const artistEl  = document.getElementById('trackArtists');

function loadTrack(index, autoplay = false) {
    stopCurrent();

    current = index;
    startOffset = 0;

    const t = trackList[index];

    // title with marquee if too long
    titleEl.textContent = t.title;
    titleEl.classList.remove('scrolling');
    // check after render if it overflows
    requestAnimationFrame(() => {
        if (titleEl.scrollWidth > titleEl.parentElement.clientWidth) {
            titleEl.classList.add('scrolling');
        }
    });

    // artists with links
    artistEl.innerHTML = t.artists.map((a, i) => {
        const link = a.url
            ? `<a href="${a.url}" target="_blank" rel="noopener">${a.name}</a>`
            : `<span>${a.name}</span>`;
        return i < t.artists.length - 1
            ? link + '<span class="separator">&amp;</span>'
            : link;
    }).join('');

    // release link — append to artists if present
    if (t.releaseUrl) {
        titleEl.innerHTML = `<a href="${t.releaseUrl}" target="_blank" rel="noopener">${t.title}</a>`;
    } else {
        titleEl.textContent = t.title;
    }

    indexEl.textContent = `Track ${index + 1} of ${trackList.length}`;
    getButtons().forEach((b, i) => b.classList.toggle('active', i === index));

    seekSlider.value = 0;
    seekVal.textContent = '0:00';

    if (autoplay) startPlayback(0);
    else setPlaying(false);
}

function startPlayback(offset) {
    if (current === -1) return;
    const buf = buffers[current];
    if (!buf) { indexEl.textContent = 'Still loading...'; return; }

    if (ctx.state === 'suspended') ctx.resume();

    sourceNode = ctx.createBufferSource();
    sourceNode.buffer = buf;
    sourceNode.connect(gainNode);
    sourceNode.start(0, offset);
    sourceNode.onended = () => {
        // only auto-advance if we didn't manually stop
        if (playing) {
            const next = (current + 1) % trackList.length;
            loadTrack(next, true);
        }
    };

    startTime = ctx.currentTime;
    startOffset = offset;
    setPlaying(true);
}

function stopCurrent() {
    if (sourceNode) {
        sourceNode.onended = null;
        sourceNode.stop();
        sourceNode.disconnect();
        sourceNode = null;
    }
    startOffset = getCurrentTime();
    setPlaying(false);
}

function setPlaying(state) {
    playing = state;
    btnPlay.innerHTML = state ? '&#9646;&#9646;' : '&#9654;';
    barsEl.classList.toggle('playing', state);
}

// seek bar update loop
setInterval(() => {
    if (!playing || current === -1) return;
    const buf = buffers[current];
    if (!buf) return;
    const ct = getCurrentTime();
    seekSlider.value = (ct / buf.duration) * 100;
    seekVal.textContent = formatTime(ct);
}, 200);

// controls
btnPlay.addEventListener('click', () => {
    if (ctx.state === 'suspended') ctx.resume();
    if (current === -1) { loadTrack(0, true); return; }
    if (playing) {
        stopCurrent();
    } else {
        startPlayback(startOffset);
    }
});

btnPrev.addEventListener('click', () => {
    const prev = current <= 0 ? trackList.length - 1 : current - 1;
    loadTrack(prev, playing);
});

btnNext.addEventListener('click', () => {
    const next = current >= trackList.length - 1 ? 0 : current + 1;
    loadTrack(next, playing);
});

seekSlider.addEventListener('input', () => {
    const buf = buffers[current];
    if (!buf) return;
    const offset = (seekSlider.value / 100) * buf.duration;
    seekVal.textContent = formatTime(offset);
    if (playing) {
        stopCurrent();
        startPlayback(offset);
    } else {
        startOffset = offset;
    }
});

volSlider.addEventListener('input', () => {
    const v = volSlider.value / 100;
    gainNode.gain.value = v;
    volVal.textContent = volSlider.value + '%';
});