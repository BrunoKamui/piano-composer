let keyboardW = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
let keyboardB = [2, 3, 5, 6, 7, 9, 0];

let pianoKeyW = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C', 'D', 'E'];
let pianoKeyB = ['C#', 'D#', 'F#', 'G#', 'A#', 'C#', 'D#'];

let musicalW = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si', 'Do', 'Re', 'Mi'];
let musicalB = ['Do#', 'Re#', 'Fa#', 'Sol#', 'La#', 'Do#', 'Re#'];

let whiteKeys = document.querySelectorAll('.piano .white');
let blackKeys = document.querySelectorAll('.piano .black');

document.body.addEventListener('keyup', (event) => {
  playSound(event.code.toLocaleLowerCase());
});

document.querySelector('.composer button').addEventListener('click', () => {
  let song = document.querySelector('#song').value;

  if (song !== '') {
    let songArray = song.split('');
    playComposition(songArray);
    console.log(songArray);
  }
});

function playSound(sound) {
  let audioElement = document.querySelector(`#sound-${sound}`);
  let keyElement = document.querySelector(`div[data-key="${sound}"]`);

  if (audioElement) {
    audioElement.currentTime = 0;
    audioElement.play();
  }

  if (keyElement) {
    keyElement.classList.add('active');
    setTimeout(() => {
      keyElement.classList.remove('active');
    }, 300);
  }
}

function playComposition(songArray) {
  let wait = 0;

  songArray.forEach((item) => {
    setTimeout(() => {
      item == parseInt(item) ? playSound(`digit${item}`) : playSound(`key${item}`);
    }, wait);

    wait += 250;
  });
}

function displayKey() {
  let whiteKeyInfo = document.querySelectorAll('.piano .white p');
  keyboardW.forEach((item, index) => {
    whiteKeyInfo[index].innerHTML = item;
  });

  let blackKeyInfo = document.querySelectorAll('.piano .black p');
  keyboardB.forEach((item, index) => {
    blackKeyInfo[index].innerHTML = item;
  });
}
