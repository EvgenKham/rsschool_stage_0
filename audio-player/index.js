
const audio = document.querySelector('.song');
const playBtn = document.querySelector('.play-btn');
const pauseBtn = document.querySelector('.pause-btn');

let isPlay = false;

function playAudio() {
  if (!isPlay){
    // audio.src = 'assets/audio/dontstartnow.mp3';
  audio.currentTime = 0;
  audio.play();
  isPlay = true;
  } else {

  }
}

function pauseAudio() {
  audio.pause();
  isPlay = false;
}

function playOrStop() {


}

playBtn.addEventListener('click', playAudio);
pauseBtn.addEventListener('click', pauseAudio);