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
  hobbits: 'qwe-t-e-w-q----ety-i-u-t-e--rew-qwe-t-ewqwq----et-y-y-t-ewewwewq',
  pegasus:
    'e-t-u-y--5-w-q--e-t-5--w-q--e-t-u-y--5-w-i--------e-t-u-y--5-w-q--e-t-5--w-q--e-t-u-y--5-w-i------e--5-t-y-u-----u--y-y-t-y-t--5-----e-5-t-----5-t-y-----t-y-u--u----u-o-0-----e--5-t-y-u-----u--y-y-t-y-t--5-----e-5-t--5-e-t----u--y--t--5-5-w-e-------e-e55-tt-ww-q----i--uu-yu--y-y-w-5-w-o--i--uu-y-t----e5-t--5e-t--5t-y--t5-y--w-q-w-e--5--t------tyuu----y-u-y-t-5-e-eu-----5tyy----o-i-u-yu----tyu-----tyuu----y-u-y-t-5-e-eu-----5tyy--t5tyy-----i-u-y--e---5t-q---we-w----------e---5t-q---we-w----------u--u--u',
};

document.body.addEventListener('keyup', (event) => {
  playSound(event.code.toLocaleLowerCase());
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
  buttonLock();

  setTimeout(() => {
    playing = false;
    buttonUnlock();
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

function buttonLock() {
  playSamples.forEach((item) => {
    item.classList.add('lock');
  });
  composerBtn.classList.add('lock');
}

function buttonUnlock() {
  playSamples.forEach((item) => {
    item.classList.remove('lock');
  });
  composerBtn.classList.remove('lock');
}

displayKey(keyboardW, keyboardB);
