// Initialize variables
let startTime = 0, elapsedTime = 0, interval;
let isRunning = false;
let lapCount = 0;

// Get DOM elements
const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const laps = document.getElementById('laps');

// Add event listeners to buttons
startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);

// Function to start the stopwatch
function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    interval = setInterval(updateTime, 10);
    isRunning = true;
    toggleButtons(true);
}

// Function to pause or resume the stopwatch
function pauseStopwatch() {
    if (isRunning) {
        clearInterval(interval);
    } else {
        startTime = Date.now() - elapsedTime;
        interval = setInterval(updateTime, 10);
    }
    isRunning = !isRunning;
    pauseButton.textContent = isRunning ? 'Pause' : 'Resume';
}

// Function to reset the stopwatch
function resetStopwatch() {
    clearInterval(interval);
    elapsedTime = 0;
    lapCount = 0;
    isRunning = false;
    display.textContent = "00:00:00.000";
    laps.innerHTML = '';
    toggleButtons(false, true);
}

// Function to record a lap time
function recordLap() {
    lapCount++;
    const lapTime = formatTime(elapsedTime);
    const lapEntry = document.createElement('div');
    lapEntry.textContent = `Lap ${lapCount}: ${lapTime}`;
    laps.appendChild(lapEntry);
}

// Function to update the displayed time
function updateTime() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

// Function to format time as HH:MM:SS.mmm
function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return (
        (hours < 10 ? '0' + hours : hours) + ':' +
        (minutes < 10 ? '0' + minutes : minutes) + ':' +
        (seconds < 10 ? '0' + seconds : seconds) + '.' +
        (milliseconds < 10 ? '0' + milliseconds : milliseconds)
    );
}

// Function to toggle button states
function toggleButtons(started, reset = false) {
    startButton.disabled = started;
    pauseButton.disabled = !started;
    resetButton.disabled = reset;
    lapButton.disabled = !started;
}
