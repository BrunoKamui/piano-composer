document.body.addEventListener('keyup', (event) => {
  playSound(event.code.toLocaleLowerCase());
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
