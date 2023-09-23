const body = document.querySelector("body");

body.addEventListener("click", startOrStopSound);

function startOrStopSound() {
  const myAudioPlayer = document.querySelector("#audioPlayer");

  if (myAudioPlayer.paused) myAudioPlayer.play();
  else myAudioPlayer.pause();
}

const express = require('express');
const app = express();

app.use(express.static('public'));

const PORT = 678;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});