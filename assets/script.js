let keyboardW = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
let keyboardB = [2, 3, 5, 6, 7, 9, 0];

let pianoKeyW = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C', 'D', 'E'];
let pianoKeyB = ['C#', 'D#', 'F#', 'G#', 'A#', 'C#', 'D#'];

let musicalW = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si', 'Do', 'Re', 'Mi'];
let musicalB = ['Do#', 'Re#', 'Fa#', 'Sol#', 'La#', 'Do#', 'Re#'];

let whiteKeys = document.querySelectorAll('.piano .white');
let blackKeys = document.querySelectorAll('.piano .black');

let tempo = '1';

document.body.addEventListener('keyup', (event) => {
  playSound(event.code.toLocaleLowerCase());
});

document.querySelector('.tempo').addEventListener('click', (element) => {
  let tempoSelected = element.target;
  if (tempoSelected.checked) {
    tempo = tempoSelected.value;
    console.log(tempo);
  }
});

document.querySelector('.composer button').addEventListener('click', () => {
  let song = document.querySelector('#song').value;
  if (song !== '') {
    let songArray = song.split('');
    playComposition(songArray, tempo);
    console.log(tempo);
  }
});

document.querySelector(`.options-radio`).addEventListener('click', (element) => {
  let input = element.target;
  if (input.checked) {
    switch (input.value) {
      case '0':
        displayKey(pianoKeyW, pianoKeyB);
        break;
      case '2':
        displayKey(musicalW, musicalB);
        break;
      case '3':
        hideKey();
        break;
      default:
        displayKey(keyboardW, keyboardB);
        break;
    }
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

function playComposition(songArray, tempo) {
  let wait = 0;
  songArray.forEach((item) => {
    setTimeout(() => {
      item == parseInt(item) ? playSound(`digit${item}`) : playSound(`key${item}`);
    }, wait);

    wait += 250 / tempo;
  });
}

function displayKey(displayWhite, displayBlack) {
  let whiteKeyInfo = document.querySelectorAll('.piano .white p');
  displayWhite.forEach((item, index) => {
    whiteKeyInfo[index].innerHTML = item;
  });

  let blackKeyInfo = document.querySelectorAll('.piano .black p');
  displayBlack.forEach((item, index) => {
    blackKeyInfo[index].innerHTML = item;
  });
}

function hideKey() {
  let whiteKeyInfo = document.querySelectorAll('.piano .white p');
  whiteKeyInfo.forEach((item) => {
    item.innerHTML = '';
  });

  let blackKeyInfo = document.querySelectorAll('.piano .black p');
  blackKeyInfo.forEach((item) => {
    item.innerHTML = '';
  });
}

displayKey(keyboardW, keyboardB);
