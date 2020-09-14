// HTML DOM ELEMENTS TO JS VARIABLES
let image = document.querySelector('img');
let title = document.getElementById('title');
let artist = document.getElementById('artist');
let music = document.querySelector('audio');
let progressContainer = document.getElementById('progress-container');
let progress = document.getElementById('progress');
let currentTimeEl = document.getElementById('current-time');
let duretionEl = document.getElementById('duration');
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

// Update Progress Bar & Time
function updateProgressBar(event){
        if (isPlaying){
        let {duration, currentTime} = event.srcElement; // Destructuring assignment
        // Update progress bar
        progressPercent = (currentTime/duration)*100;
        progress.style.width = `${progressPercent}%`;
        // Calculate display for duration 
        let durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds<10){
            durationSeconds = `0${durationSeconds}`;
        }
        // Delay switching duration element to avoid NaN
        if(durationSeconds){
            duretionEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // Calculate display for currentTime 
        let currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if(currentSeconds<10){
            currentSeconds = `0${currentSeconds}`;
        }
        if(currentSeconds){
            currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
        }
    }
}

// On Load - select first song
loadSong(songs[songIndex]);

// Set Progress Bar
function setProgressBar(event){
    let width = event.srcElement.clientWidth;
    let clickX = event.offsetX;
    let {duration} = music ; // Destructuring assignment
    let durationSecondsTarget = clickX/width*duration;
    music.currentTime = durationSecondsTarget;
}

// Event listeners
playBtn.addEventListener('click', ()=>(isPlaying ? pauseSong() : playSong()));
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', nextSong);
progressContainer.addEventListener('click',setProgressBar);
