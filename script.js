const board = document.getElementById('game-board');
const levelDisplay = document.getElementById('level');
const timerDisplay = document.getElementById('timer');
const clickCountDisplay = document.getElementById('click-count');

let currentLevel = 1;
let timer;
let timeLeft = 10;
let currentLed;
let clickCount = 0;

function createBoard() {
    for (let i = 0; i < 100; i++) {
        const led = document.createElement('div');
        led.classList.add('led');
        led.addEventListener('click', handleLedClick);
        board.appendChild(led);
    }
}

function handleLedClick(event) {
    if (event.target === currentLed) {
        clearInterval(timer);
        timeLeft = Math.max(5, 10 - currentLevel); // کاهش زمان با افزایش سطح
        currentLevel++;
        clickCount++;
        updateDisplays();
        lightRandomLed();
    }
}

function lightRandomLed() {
    const leds = document.querySelectorAll('.led');
    leds.forEach(led => led.style.backgroundColor = 'grey');

    const randomIndex = Math.floor(Math.random() * leds.length);
    currentLed = leds[randomIndex];
    currentLed.style.backgroundColor = getRandomColor();
    
    startTimer();
}

function getRandomColor() {
    const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);
            alert('زمان تمام شد!');
            resetGame();
        }
    }, 1000);
}

function resetGame() {
    currentLevel = 1;
    timeLeft = 10;
    clickCount = 0;
    updateDisplays();
    lightRandomLed();
}

function updateDisplays() {
    levelDisplay.textContent = currentLevel;
    timerDisplay.textContent = timeLeft;
    clickCountDisplay.textContent = clickCount;
}

createBoard();
lightRandomLed();
