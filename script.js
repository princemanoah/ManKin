let startButton = document.getElementById('start');
let stopButton = document.getElementById('stop');
let resetButton = document.getElementById('reset');
let lapButton = document.getElementById('lap');
let lapsContainer = document.getElementById('laps');

let hour = 0;
let minute = 0;
let second = 0;
let count = 0;
let timer = false;
let laps = []; // Array to store lap times

startButton.addEventListener('click', function () {
    if (!timer) {
        timer = true;
        startButton.disabled = true;
        stopWatch();
    }
});

stopButton.addEventListener('click', function () {
    timer = false;
    startButton.disabled = false;
});

resetButton.addEventListener('click', function () {
    timer = false;
    startButton.disabled = false;
    hour = 0;
    minute = 0;
    second = 0;
    count = 0;
    laps = []; // Reset laps
    updateDisplay();
    lapsContainer.innerHTML = ''; // Clear lap display
});

lapButton.addEventListener('click', function () {
    if (timer) {
        const lapTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}.${String(count).padStart(2, '0')}`;
        laps.push(lapTime); // Store the lap time
        displayLaps(); // Update the lap display
    }
});

function stopWatch() {
    if (timer) {
        count++;
        if (count == 100) {
            second++;
            count = 0;
        }
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
        updateDisplay();
        setTimeout(stopWatch, 10);
    }
}

function updateDisplay() {
    document.getElementById('hr').innerHTML = String(hour).padStart(2, '0');
    document.getElementById('min').innerHTML = String(minute).padStart(2, '0');
    document.getElementById('sec').innerHTML = String(second).padStart(2, '0');
    document.getElementById('count').innerHTML = String(count).padStart(2, '0');
}

function displayLaps() {
    lapsContainer.innerHTML = ''; // Clear previous laps
    laps.forEach((lap, index) => {
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap ${index + 1}: ${lap}`;
        lapsContainer.appendChild(lapElement);
    });
}