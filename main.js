//The following code  creates a start button that initiates the stopwatch and toggle itself to pause button.
let milliseconds = 0;
let seconds = 0;
let minutes = 0;

let displayMilliseconds = 0;
let displaySeconds = 0;
let displayMinutes = 0;

let interval = null;
let stopwatchStatus = "paused";

const stopWatchValue = document.querySelectorAll("h1")[1];
const startButton = document.querySelectorAll("button")[0];

startButton.addEventListener("click", startStopwatch);

function stopWatch() {
  milliseconds++;

  if (milliseconds / 100 === 1) {
    milliseconds = 0;
    seconds++;

    if (seconds / 60 === 1) {
      seconds = 0;
      minutes++;
    }
  }

  if (milliseconds < 10) {
    displayMilliseconds = "0" + milliseconds;
  } else {
    displayMilliseconds = milliseconds;
  }

  if (seconds < 10) {
    displaySeconds = "0" + seconds;
  } else {
    displaySeconds = seconds;
  }

  if (minutes < 10) {
    displayMinutes = "0" + minutes;
  } else {
    displayMinutes = minutes;
  }

  stopWatchValue.innerHTML = `${displayMinutes}:${displaySeconds}:${displayMilliseconds}`;
}

function startStopwatch() {
  if (stopwatchStatus === "paused") {
    interval = window.setInterval(stopWatch, 10);
    startButton.innerHTML = "Pause";
    startButton.classList.add("btn-warning");
    startButton.classList.remove("btn-primary");
    stopwatchStatus = "started";
  } else {
    window.clearInterval(interval);
    startButton.innerHTML = "Start";
    startButton.classList.add("btn-primary");
    startButton.classList.remove("btn-warning");
    stopwatchStatus = "paused";
  }
}

//The following code creates the clear button that is responsible to clear the stopwatch and the name input if needed.
const clearButton = document.querySelectorAll("button")[1];
clearButton.addEventListener("click", clearStopwatchAndInputAndSession);

const dragNameInput = document.querySelector("input");

function clearStopwatchAndInputAndSession() {
  stopWatchValue.innerHTML = "00:00:00";
  dragNameInput.value = "";
}

//The following code creates the restart button that is responsible to restart the drag race and clear the session storage.
const restartButton = document.querySelectorAll("button")[3];
restartButton.addEventListener("click", restartDragRace);

function restartDragRace() {
  sessionStorage.clear();
  document.querySelector("ul").innerHTML = "";
}

//The following code creates the button add that storages the information with name and time, and adds it to the Ranking List
const addButton = document.querySelectorAll("button")[2];
addButton.addEventListener("click", getNameAndTime);

function storageNameAndTime() {}

function getNameAndTime() {
  document.querySelector("ul").innerHTML = "";

  const ul = document.querySelector("ul");

  const name = dragNameInput.value;
  const time = stopWatchValue.innerText;

  sessionStorage.setItem(name, time);

  const sortedDrags = [];

  for (var drag in sessionStorage) {
    sortedDrags.push([drag, sessionStorage[drag]]);
  }

  sortedDrags.sort().splice(-6);

  console.log(sessionStorage);

  for (drag of sortedDrags) {
    const li = document.createElement("li");
    const span = document.createElement("span");

    li.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );

    let dragName = drag[0];
    let dragTime = drag[1];

    span.innerText = dragTime;

    li.append(dragName, span);
    ul.append(li);
  }

  dragNameInput.value = "";
  stopWatchValue.innerHTML = "00:00:00";
  console.log(milliseconds);
}
