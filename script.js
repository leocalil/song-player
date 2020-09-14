// HTML DOM ELEMENTS TO JS VARIABLES
let image = document.querySelector('img');
let title = document.getElementById('title');
let artist = document.getElementById('artist');
let music = document.querySelector('audio');
let prevBtn = document.getElementById('prev');
let playBtn = document.getElementById('play');
let nextBtn = document.getElementById('next');

// Music list - via Array of objects
let songs = [
    {
        name: 'leobar-1',
        displayName: 'Fazendinha',
        artist: 'Leonardo e Raquel',
    },
    {
        name: 'leobar-2',
        displayName: 'Borboletinha',
        artist: 'Raquel',
    },
    {
        name: 'leobar-3',
        displayName: 'Twinkle Twinkle Little Star',
        artist: 'Leonardo',
    },
];
// Just for fun if needed
var myJSON = JSON.stringify(songs);

// Check if playing
let isPlaying = false;

// Play
function playSong(){
    music.play();
    isPlaying = true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title', 'Pausar');
}

// Pause
function pauseSong(){
    music.pause();
    isPlaying = false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title', 'Tocar');
}

// Event listeners
// Play or pause
playBtn.addEventListener('click', ()=>(isPlaying ? pauseSong() : playSong()));
// Next or previous
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);

// Update DOM
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Current song
let songIndex = 0;

// Previous Song
function prevSong(){
    songIndex--;
    if (songIndex<0) {
        songIndex=songs.length-1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next Song
function nextSong(){
    songIndex++;
    if (songIndex>songs.length-1) {
        songIndex=0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// On Load - select first song
loadSong(songs[songIndex]);

