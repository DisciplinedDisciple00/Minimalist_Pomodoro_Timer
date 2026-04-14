const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

let mode = "work";
let TOTAL_TIME = WORK_TIME;

let startTime = null;
let remainingTime = TOTAL_TIME;
let timerRunning = false;
let interval = null;
let alarmSound = new Audio("countdown_vecna.mp3");

function updateDisplay(timeLeft) {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;

  document.getElementById("timer").innerText =
    `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function startTimer() {
  if (timerRunning) return;

  timerRunning = true;

  startTime = Date.now() - (TOTAL_TIME - remainingTime) * 1000;

  interval = setInterval(() => {

    let elapsed = Math.floor((Date.now() - startTime) / 1000);
    remainingTime = TOTAL_TIME - elapsed;

    if (remainingTime <= 0) {
      clearInterval(interval);
      timerRunning = false;

      updateDisplay(0);
      alarmSound.play();

      return;
    }

    updateDisplay(remainingTime);

  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
  timerRunning = false;
}

function updateModeUI() {
  let modeText = document.getElementById("mode");

  if (mode === "work") {
    modeText.innerText = "Work Time";
  } else {
    modeText.innerText = "Break Time";
  }
}

function resetTimer() {
  clearInterval(interval);
  timerRunning = false;

  mode = "work";
  TOTAL_TIME = WORK_TIME;
  remainingTime = TOTAL_TIME;

  updateDisplay(remainingTime);
  updateModeUI();
}

function setMode(selectedMode) {
  clearInterval(interval);
  timerRunning = false;

  mode = selectedMode;

  if (mode === "work") {
    TOTAL_TIME = WORK_TIME;
  } else {
    TOTAL_TIME = BREAK_TIME;
  }

  remainingTime = TOTAL_TIME;

  updateDisplay(remainingTime);
  updateModeUI();
}

updateDisplay(TOTAL_TIME);