/* 
   Simple Pomodoro Timer - Beginner Friendly JavaScript
   
   This is a simplified version of the pomodoro timer.
   It has basic functionality:
   1. Timer counts down from 25/5/15 minutes
   2. Start/Pause/Reset controls
   3. Session counter
   
   Each part is explained with comments for beginners.
*/

// ============================================
// STEP 1: Set up timer variables
// ============================================
// These variables keep track of our timer state
let timeLeft = 25 * 60;  // 25 minutes in seconds (25 * 60)
let isRunning = false;    // Is the timer running?
let timerInterval = null; // The interval ID (for stopping)
let currentMode = 'focus'; // Which mode: focus, short-break, long-break
let sessions = 0; // How many sessions completed

// Timer durations in minutes
const FOCUS_TIME = 25;
const SHORT_BREAK = 5;
const LONG_BREAK = 15;

// ============================================
// STEP 2: Get references to HTML elements
// ============================================
// We need to grab the HTML elements to change them
const timerDisplay = document.getElementById('timer');
const modeLabel = document.getElementById('mode-label');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const focusBtn = document.getElementById('focus-btn');
const shortBreakBtn = document.getElementById('short-break-btn');
const longBreakBtn = document.getElementById('long-break-btn');
const sessionCount = document.getElementById('session-count');

// ============================================
// STEP 3: Set up button click events
// ============================================
// These run when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Set up button click events
    startBtn.addEventListener('click', toggleTimer);
    resetBtn.addEventListener('click', resetTimer);
    focusBtn.addEventListener('click', () => setMode('focus'));
    shortBreakBtn.addEventListener('click', () => setMode('shortBreak'));
    longBreakBtn.addEventListener('click', () => setMode('longBreak'));
    
    // Show initial time
    updateDisplay();
});

// ============================================
// STEP 4: Function to update the timer display
// ============================================
function updateDisplay() {
    // Convert seconds to minutes and seconds
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    
    // Add leading zeros if needed (e.g., 9 becomes 09)
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');
    
    // Show the time
    timerDisplay.textContent = minutes + ':' + seconds;
    
    // Update page title too
    document.title = minutes + ':' + seconds + ' - Pomodoro';
}

// ============================================
// STEP 5: Function to start or pause the timer
// ============================================
function toggleTimer() {
    if (isRunning) {
        // Timer is running - pause it
        pauseTimer();
    } else {
        // Timer is paused - start it
        startTimer();
    }
}

function startTimer() {
    isRunning = true;
    startBtn.textContent = 'Pause';
    
    // Start the interval - run every 1 second
    timerInterval = setInterval(function() {
        // Decrease time by 1 second
        timeLeft--;
        
        // Update the display
        updateDisplay();
        
        // Check if time is up
        if (timeLeft <= 0) {
            timerComplete();
        }
    }, 1000);  // 1000 milliseconds = 1 second
}

function pauseTimer() {
    isRunning = false;
    startBtn.textContent = 'Start';
    clearInterval(timerInterval);
}

// ============================================
// STEP 6: Function to reset the timer
// ============================================
function resetTimer() {
    // Stop the timer
    pauseTimer();
    
    // Reset time based on current mode
    if (currentMode === 'focus') {
        timeLeft = FOCUS_TIME * 60;
    } else if (currentMode === 'shortBreak') {
        timeLeft = SHORT_BREAK * 60;
    } else {
        timeLeft = LONG_BREAK * 60;
    }
    
    // Update display
    updateDisplay();
}

// ============================================
// STEP 7: Function to change the mode
// ============================================
function setMode(mode) {
    // Stop any running timer
    pauseTimer();
    
    // Set the mode
    currentMode = mode;
    
    // Set time based on mode
    if (mode === 'focus') {
        timeLeft = FOCUS_TIME * 60;
        modeLabel.textContent = 'Focus Time';
    } else if (mode === 'shortBreak') {
        timeLeft = SHORT_BREAK * 60;
        modeLabel.textContent = 'Short Break';
    } else {
        timeLeft = LONG_BREAK * 60;
        modeLabel.textContent = 'Long Break';
    }
    
    // Update display
    updateDisplay();
    
    // Update button styles
    focusBtn.classList.remove('active');
    shortBreakBtn.classList.remove('active');
    longBreakBtn.classList.remove('active');
    
    if (mode === 'focus') {
        focusBtn.classList.add('active');
    } else if (mode === 'shortBreak') {
        shortBreakBtn.classList.add('active');
    } else {
        longBreakBtn.classList.add('active');
    }
}

// ============================================
// STEP 8: Function called when timer completes
// ============================================
function timerComplete() {
    // Stop the timer
    pauseTimer();
    
    // Play a sound (simple beep)
    alert('Time is up!');
    
    // If it was a focus session, increment counter
    if (currentMode === 'focus') {
        sessions++;
        sessionCount.textContent = sessions;
    }
    
    // Reset the timer for current mode
    resetTimer();
}

// ============================================
// END OF SIMPLE POMODORO TIMER
// ============================================
/* 
   This is a beginner-friendly version of a pomodoro timer.
   It uses simple concepts:
   - Variables to store data
   - setInterval for the timer
   - Event listeners for button clicks
   - Simple DOM manipulation to change the page
   
   You can extend this by:
   - Adding localStorage to save sessions
   - Adding sound notifications
   - Adding auto-switch between focus and break
   - Adding a task list
*/
