let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let laps = [];

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

startStopButton.addEventListener('click', function() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateDisplay, 1000);
        startStopButton.textContent = 'Stop';
        running = true;
    } else {
        clearInterval(timerInterval);
        difference = new Date().getTime() - startTime;
        startStopButton.textContent = 'Start';
        running = false;
    }
});

resetButton.addEventListener('click', function() {
    clearInterval(timerInterval);
    display.textContent = '00:00:00';
    startStopButton.textContent = 'Start';
    difference = 0;
    running = false;
    laps = [];
    lapsList.innerHTML = '';
});

lapButton.addEventListener('click', function() {
    if (running) {
        const lapTime = new Date().getTime() - startTime;
        laps.push(formatTime(lapTime));
        updateLaps();
    }
});

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    display.textContent = formatTime(difference);
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(unit) {
    return ('0' + unit).slice(-2);
}

function updateLaps() {
    lapsList.innerHTML = laps.map((lap, index) => `<li>Lap ${index + 1}: ${lap}</li>`).join('');
}
