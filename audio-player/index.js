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
  const progress = document.querySelector('.progress');

  let isPlay = false;
  let playNum = 0;
  //Первоначальная загрузка трека на страницу
  loadSong(playNum);

  //Загрузка данных о треке на страницу
  function loadSong(number){
    let currentSong = songs[number];
    background.src = currentSong['image'];
    audio.src = currentSong['src'];
    imgPlayer.src = currentSong['image'];
    artist.textContent = currentSong['artist'];
    track.textContent = currentSong['track'];
  }

  //Показ длительности трека (после загрузки самого трека)
  audio.onloadedmetadata = function(){
    let [ minutes, seconds ] = convertTime(this.duration);
    durationTime.textContent = `${minutes}:${seconds}`;
    progress.max = this.duration;
  };

  //Конвертация из секунд в минуты и секунды
  function convertTime(date){
    let time = Math.round(date);
    let minutes = Math.floor( time / 60 );
    let seconds  = time - (minutes * 60);
    return [minutes, seconds];
  }

  //Вывод времени в корректном виде (0:00)
  function formatTime(minutes, seconds) {
    let format = '';
    if (minutes === 0){
      if (seconds < 10){
        format = `0:0${seconds}`;
      } else {
        format = `0:${seconds}`;
      }
    } else {
      if (seconds < 10){
        format = `${minutes}:0${seconds}`;
      } else {
        format = `${minutes}:${seconds}`;
      }
    }
    return format;
  }

  //Функция setInterval срабатывает через 0.5 секунд
  // и выводит текущее время проигрывая трека
  setInterval(() => {
    progress.value = audio.currentTime;
    let [ minutes, seconds ] = convertTime(audio.currentTime);
    currentTime.textContent = formatTime(minutes, seconds);
    changeLineColor();
    //Если трек закончился включается следующий
    if(audio.ended)
      playNext();
  }, 500);

  //Перемотка трека при изменении ползунка
  function rewind(event){
    let value = event.target.value;
    audio.currentTime = value;
  };

  //Изменение прогресса до и после ползунка
  function changeLineColor(){
    const value = (audio.currentTime / audio.duration) * 100;
    progress.style.background = 'linear-gradient(to right, black ' + value + '%, white ' + value + '%)';
  }

  function playOrStop() {
    if (!isPlay) {
      audio.play();
      isPlay = true;
      playOrStopBtn.src = "assets/svg/pause.png";
      imgPlayer.style.transform = 'scale(1.2)';
    } else {
      audio.pause();
      isPlay = false;
      playOrStopBtn.src = "assets/svg/play.png";
      imgPlayer.style.transform = 'scale(1)';
    }
  };

  function playNext() {
    playNum++;
    if( playNum < 0 ){
      playNum = 2;
    } else if( playNum > 2 ){
      playNum = 0;
    }
    loadSong(playNum);
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
    loadSong(playNum);
    audio.play();
    isPlay = true;
    playOrStopBtn.src = "assets/svg/pause.png";
  };

  playOrStopBtn.addEventListener('click', playOrStop);
  prevBtn.addEventListener('click', playPrev);
  nextBtn.addEventListener('click', playNext);
  progress.addEventListener('input', rewind);
  progress.addEventListener('input', changeLineColor());
});

