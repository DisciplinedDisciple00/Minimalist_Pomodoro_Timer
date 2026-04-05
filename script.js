let time = 25 * 60;
let timerRunning = false;
let interval = null;
let alarmSound = new Audio("FAHH.mp3");

function updateDisplay() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;

  document.getElementById("timer").innerText =
    `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function startTimer() {
  if (timerRunning) return;

  timerRunning = true;

  interval = setInterval(() => {
    if (time <= 0) {
  clearInterval(interval);
  timerRunning = false;

  alarmSound.play();

  return;
}

    time--;
    updateDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
  timerRunning = false;
}

function resetTimer() {
  clearInterval(interval);
  timerRunning = false;
  time = 25 * 60;
  updateDisplay();
}

updateDisplay();