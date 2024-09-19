const songs = [
  {  'artist': "Beyonce",
      'track': "Don't Hurt Yourself",
      'image': "assets/img/lemonade.png",
      'src'  : "assets/audio/beyonce.mp3",
  },
  {  'artist': "Dua Lipa",
      'track': "Don't Start Now",
      'image': "assets/img/dontstartnow.png",
      'src'  : "assets/audio/dontstartnow.mp3",
  },
  {  'artist': "Animal Jazz",
      'track': "Чувства",
      'image': "assets/img/feelings.png",
      'src'  : "assets/audio/animal_jazz.mp3",
  },
];

window.addEventListener('DOMContentLoaded', () => {
  const audio = document.querySelector('.song');
  const playOrStopBtn = document.querySelector('#play-song');
  const prevBtn = document.querySelector('#prev-song');
  const nextBtn = document.querySelector('#next-song');
  const background = document.querySelector('.image-background');
  const imgPlayer = document.querySelector('.image__song');
  const artist = document.querySelector('.song__description_artist');
  const track = document.querySelector('.song__description_track');
  const currentTime = document.querySelector('.time__current');
  const durationTime = document.querySelector('.time__duration');

  let isPlay = false;
  let playNum = 0;



  function updateSong(number){
    let currentSong = songs[number];

    background.src = currentSong['image'];
    audio.src = currentSong['src'];
    imgPlayer.src = currentSong['image'];
    artist.textContent = currentSong['artist'];
    track.textContent = currentSong['track'];
  }

  audio.onloadedmetadata = function(){
      let time = Math.round(this.duration);
      let minutes = Math.floor( time / 60 );
      let seconds  = time - (minutes * 60);
      durationTime.textContent = `${minutes}:${seconds}`
  };


  function playOrStop() {
    if (!isPlay) {
      audio.play();
      isPlay = true;
      playOrStopBtn.src = "assets/svg/pause.png";
    } else {
      audio.pause();
      isPlay = false;
      playOrStopBtn.src = "assets/svg/play.png";
    }
  };

  function playNext() {
    playNum++;
    if( playNum < 0 ){
      playNum = 2;
    } else if( playNum > 2 ){
      playNum = 0;
    }
    updateSong(playNum);

    audio.play();
    isPlay = true;
    playOrStopBtn.src = "assets/svg/pause.png";
  };

  function playPrev() {
    playNum--;
    if( playNum < 0 ){
      playNum = 2;
    } else if( playNum > 2 ){
      playNum = 0;
    }
    updateSong(playNum);

    audio.play();
    isPlay = true;
    playOrStopBtn.src = "assets/svg/pause.png";
  };

  updateSong(playNum);
  console.log();

  playOrStopBtn.addEventListener('click', playOrStop);
  prevBtn.addEventListener('click', playPrev);
  nextBtn.addEventListener('click', playNext);

});

