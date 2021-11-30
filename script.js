console.log("This is Musical")
let songIndex = 0;
let audioElement = new Audio('public/songs/1.mp3');
let mainPlay = document.getElementById('mainPlay');
let previousBtn = document.getElementById('previous')
let nextBtn = document.getElementById('next')
let mainProgressBar = document.getElementById('mainProgressBar');
let gif1 = document.getElementById('gif1');
let gif2 = document.getElementById('gif2');
let songItemPlaying = Array.from(document.getElementsByClassName('songItemPlay'));
let songItemName = Array.from(document.getElementsByClassName('songItem'));
let mainSong1 = document.getElementById('mainSongPlaying1');
let mainSong2 = document.getElementById('mainSongPlaying2');
let volBar = document.getElementById('volumeBar');
let volBtn = document.getElementById('vol');
let songs = [{
        songName: "Believer - Imagine Dragons",
        filePath: 'public/songs/1.mp3',
        coverPath: "public/covers/believer.jpg"
    },
    {
        songName: "Believer - Cover By Tommee Profitt",
        filePath: "public/songs/2.mp3",
        coverPath: "public/covers/believer-tp.jpg"
    },
    {
        songName: "Dream - Road Trip Remix",
        filePath: "public/songs/3.mp3",
        coverPath: "public/covers/dreamroadtrip.jpg"
    },
    {
        songName: "Unstoppable - TheScore",
        filePath: "public/songs/4.mp3",
        coverPath: "public/covers/unstoppable.jpg"
    },
    {
        songName: "Stronger - TheScore",
        filePath: "public/songs/5.mp3",
        coverPath: "public/covers/stronger.jpg"
    },
    {
        songName: "SpiderMan - Sam Raimi Theme",
        filePath: "public/songs/6.mp3",
        coverPath: "public/covers/spider-man.jpg"
    },
    {
        songName: "Warriors - Imagine Dragons",
        filePath: "public/songs/7.mp3",
        coverPath: "public/covers/warriors2016.jpg"
    },
    {
        songName: "Warriors - 2WEI Cover",
        filePath: "public/songs/8.mp3",
        coverPath: "public/covers/warriors2wei.jpg"
    },
];

mainPlay.addEventListener('click', playBtn)
nextBtn.addEventListener('click', nextSong);
previousBtn.addEventListener('click', previousSong);
volBar.addEventListener('change', volChange);
songItemPlaying.forEach((element) => {
    element.addEventListener('click', makePlay);
});

songItemName.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("jSName")[0].innerText = songs[i].songName;
});


audioElement.addEventListener('timeupdate', () => {
        progress = parseInt((audioElement.currentTime / audioElement.duration) * 1000);
        mainProgressBar.value = progress;
        if (mainProgressBar.value == 1000) {
            nextSong()
        };
    }

);
mainProgressBar.addEventListener('change', () => {
    audioElement.currentTime = mainProgressBar.value * audioElement.duration / 1000;
});

const makeAllPlays = () => {
    songItemPlaying.forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
        gif1.style.opacity = 0;
        gif2.style.opacity = 0;
    });
};


function playBtn() {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        mainPlay.classList.remove('fa-play-circle');
        mainPlay.classList.add('fa-pause-circle');
        gif1.style.opacity = 1;
        gif2.style.opacity = 1;

    } else {
        audioElement.pause();
        mainPlay.classList.remove('fa-pause-circle');
        mainPlay.classList.add('fa-play-circle');
        gif1.style.opacity = 0;
        gif2.style.opacity = 0;
    };
};

function volChange() {
    audioElement.volume = volBar.value / 100;
    if (volBar.value < 50) {
        volBtn.classList.remove('fa-volume-up');
        volBtn.classList.add('fa-volume-down');
    } else {
        volBtn.classList.remove('fa-volume-down');
        volBtn.classList.add('fa-volume-up');

    };
};

function previousSong() {
    if (songIndex <= 0) {
        songIndex = 9;
    } else {
        songIndex -= 1;
    };
    audioElement.src = `public/songs/${songIndex + 1}.mp3`;
    mainSong1.innerText = songs[songIndex].songName;
    mainSong2.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    mainPlay.classList.remove('fa-play-circle');
    mainPlay.classList.add('fa-pause-circle');
};

function nextSong() {
    if (songIndex >= 9) {
        songIndex = 0;
    } else {
        songIndex += 1;
    };
    audioElement.src = `public/songs/${songIndex + 1}.mp3`;
    mainSong1.innerText = songs[songIndex].songName;
    mainSong2.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    mainPlay.classList.remove('fa-play-circle');
    mainPlay.classList.add('fa-pause-circle');
}

function makePlay(e) {
    makeAllPlays();
    mainSong1.innerText = songs[songIndex].songName;
    mainSong2.innerText = songs[songIndex].songName;
    songIndex = parseInt(e.target.id);
    e.target.classList.remove('fa-play-circle');
    e.target.classList.add('fa-pause-circle');
    gif1.style.opacity = 1;
    gif2.style.opacity = 1;
    audioElement.currentTime = 0;
    audioElement.src = `public/songs/${songIndex + 1}.mp3`;
    audioElement.play();
    mainPlay.classList.remove('fa-play-circle');
    mainPlay.classList.add('fa-pause-circle');
}