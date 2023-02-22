let keyboardWhite = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
let keyboardBlack = [2, 3, 5, 6, 7, 9, 0];

let pianoKeyWhite = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C', 'D', 'E'];
let pianoKeyBlack = ['C#', 'D#', 'F#', 'G#', 'A#', 'C#', 'D#'];

let musicalNoteWhite = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si', 'Do', 'Re', 'Mi'];
let musicalNoteBlack = ['Do#', 'Re#', 'Fa#', 'Sol#', 'La#', 'Do#', 'Re#'];

let whiteKeys = document.querySelector('.piano .white-keys').children;
let blackKeys = document.querySelector('.piano .black-keys').children;

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
