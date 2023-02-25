let keyboardW = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
let keyboardB = [2, 3, 5, 6, 7, 9, 0];

let pianoKeyW = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C', 'D', 'E'];
let pianoKeyB = ['C#', 'D#', 'F#', 'G#', 'A#', 'C#', 'D#'];

let musicalW = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si', 'Do', 'Re', 'Mi'];
let musicalB = ['Do#', 'Re#', 'Fa#', 'Sol#', 'La#', 'Do#', 'Re#'];

let whiteKeys = document.querySelectorAll('.piano .white');
let blackKeys = document.querySelectorAll('.piano .black');

let tempo = '1';
let playing = false;

const songs = {
  chariots: 'qrtyt--e----qrtyt------qrtyt--e---erewq---iuytu-ty-rt--iuytu-----i--iuytu-ty-rt-erewq',
  naruto: 'uye-------y-i-o---y---------i-----u-i-o-t-p----oio-------o-p-y-i----u---y---e-t-------i-o-i-u---e-u-y',
  simpsons: 't--u-9-po--u-t-w222w---222wr--t--u-9-po--u-t-w222w---222w5--t',
  countdown: 'uyu---e------iii-u--y------iui---e---w----yyy-t-5-y-t------uyu---e------iii-u--y------iui---e---w----yyy-t-5-y-t-----5ty----tyu-y-t-5-e---i---u----------uiuyu',
  pegasus:
    'etuy-5wq-et5-wq-etuy-5wi------etuy-5wq-et5-wq-etuy-5wi----e-5tyu------u-yytyt-5-----e5t-----5ty-----tyu-u--uo0---e-5tyu------u-yytyt-5-----e5t-5et--u-y-t-55we-------ee55ttwwq--i-uuyuy-y-w5wo-i-u-yt----e5t-5et-5ty-t5y-wqwe--5--t----tyuu----tyu-y-t-5-e-eu------5tyy----o-i-u-yu----tyu------tyuu----y-u-y-t-5-e-eu------5tyy--t5tyy--------i-u-y-e----5-t-q----w-e-w----------------e----5-t-q----w-e-w--------------u---u---u',
};

document.body.addEventListener('keyup', (event) => {
  playSound(event.code.toLocaleLowerCase());
});

whiteKeys.forEach((item) => {
  item.addEventListener('click', () => {
    let playKey = item.getAttribute('data-key');
    playSound(playKey);
  });
});

blackKeys.forEach((item) => {
  item.addEventListener('click', () => {
    let playKey = item.getAttribute('data-key');
    playSound(playKey);
  });
});

let playSamples = document.querySelectorAll('.play-sample');
playSamples.forEach((item) => {
  let data = item.getAttribute('data-key');
  let playSpeed = item.getAttribute('tempo');
  let sampleArray = songs[data].split('');

  item.addEventListener('click', () => {
    if (playing === false) {
      playComposition(sampleArray, playSpeed);
    }
  });
});

document.querySelector('.tempo').addEventListener('click', (element) => {
  let tempoSelected = element.target;
  if (tempoSelected.checked) {
    tempo = tempoSelected.value;
  }
});

let composerBtn = document.querySelector('.composer button');
composerBtn.addEventListener('click', () => {
  let song = document.querySelector('#song').value;
  if (song !== '') {
    let songArray = song.split('');
    if (playing === false) {
      playComposition(songArray, tempo);
    }
  }
});

let checkbox = document.querySelector('#highlight');
checkbox.addEventListener('change', () => {
  whiteKeys.forEach((item) => {
    item.classList.toggle('highlight');
  });
  blackKeys.forEach((item) => {
    item.classList.toggle('highlight');
  });
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
  playing = true;
  toggleLockButton();

  setTimeout(() => {
    playing = false;
    toggleLockButton();
  }, wait);
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

function toggleLockButton() {
  playSamples.forEach((item) => {
    item.classList.toggle('lock');
  });
  composerBtn.classList.toggle('lock');
}

displayKey(keyboardW, keyboardB);
