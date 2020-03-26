let beatInterval;
let currBeatNum = 0;
let beatsPM = 120;
const totalBeats = 8;
const playPauseButton = document.querySelector("button.play");
const stopButton = document.querySelector("button.stop");
const beatsPMslider = document.querySelector("#BPM-slider");
const beatsPMdisplay = document.querySelector("#BPM-display > #value");
const drums = document.querySelectorAll("#container > *");

playPauseButton.addEventListener("click", playPauseToggle);
stopButton.addEventListener("click", stopBeat);
beatsPMslider.addEventListener("input", changeBPM);
drums.forEach(drum => {
  drum.addEventListener("click", drumChoiceToggle);
});

function startBeat(beatsPM) {
  beatInterval = setInterval(advanceBeat, (60 / beatsPM) * 1000);
  stopButton.disabled = false;
  beatsPMslider.disabled = !beatsPMslider.disabled;
}

function advanceBeat() {
  if (currBeatNum >= 1) {
    const lastBeatColumn = document.querySelectorAll(`.beat${currBeatNum}`);
    lastBeatColumn.forEach(beat => {
      beat.classList.remove("playing");
    });
  }

  currBeatNum === totalBeats ? (currBeatNum = 1) : currBeatNum++;

  const currBeatColumn = document.querySelectorAll(`.beat${currBeatNum}`);

  currBeatColumn.forEach(beat => {
    beat.classList.add("playing");
    if (beat.classList.contains("cued")) playSound(beat.dataset.drum);
  });
}

function pauseBeat() {
  clearInterval(beatInterval);
  stopButton.disabled = true;
  beatsPMslider.disabled = !beatsPMslider.disabled;
}

function stopBeat() {
  pauseBeat();
  const currBeatColumn = document.querySelectorAll(`.beat${currBeatNum}`);
  currBeatColumn.forEach(beat => {
    beat.classList.remove("playing");
  });

  if (playPauseButton.classList.contains("pause")) {
    playPauseToggle({ target: playPauseButton });
  }

  currBeatNum = 0;
}

function playSound(drumType) {
  console.log(drumType);
  const sound = document.querySelector(`#${drumType}`);
  sound.pause();
  sound.currentTime = 0;
  sound.play();
}

function drumChoiceToggle({ target: { classList } }) {
  classList.toggle("cued");
}

function playPauseToggle({ target: { classList } }) {
  if (classList.contains("play")) {
    classList.remove("play");
    classList.add("pause");
    startBeat(beatsPM);
  } else {
    classList.remove("pause");
    classList.add("play");
    pauseBeat();
  }
}

function changeBPM({ target: { value } }) {
  beatsPMdisplay.textContent = value;
  beatsPM = +value;
}
