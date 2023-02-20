document.body.addEventListener('keyup', (event) => {
  playSound(event.code.toLocaleLowerCase());
});

function playSound(sound) {
  let audioElement = document.querySelector(`#sound-${sound}`);
  if (audioElement) {
    audioElement.play();
  }
}
