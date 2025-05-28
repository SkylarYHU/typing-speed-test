//  Sample sentence to type
const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "Practice makes perfect.",
  "JavaScript is fun and powerful.",
  "Typing speed test is a great project."
]

// DOM elements
const textDisplay = document.getElementById('text-display');
const textInput = document.getElementById('text-input');
const stats = document.getElementById('stats');
const submitBtn = document.getElementById('submit-btn')
const restartBtn = document.getElementById('restart-btn');

let currentText = "";
let startTime = null;
let timerStarted = false;
let testFinished = false;

// Pick random sentence
function getRandomSentence() {
  return sentences[Math.floor(Math.random() * sentences.length)];
}

// Start new test
// Initialize a new typing test
function startTest() {
  currentText = getRandomSentence() // Get a random sentence to type
  textDisplay.textContent = currentText; // Display the sentence on screen
  textInput.value = ""; // Clear the text input area
  stats.textContent = ""; // Clear any previous stats
  startTime = null; // Reset the start time
  timerStarted = false;  // Mark that the timer has not started
  textInput.focus(); // Automatically focus on the input box
}

// Listen for user input in the typing area
textInput.addEventListener("input", ()=> {
  if (testFinished) return; // If test is finished, ignore further input
  // Start the timer on the first input
  if(!timerStarted) {
    startTime = new Date();
    timerStarted = true;
  }


  const typedText = textInput.value; // Get the user's typed text
  const typedLength = typedText.length; // Number of characters typed
 

  // Counter for correctly typed characters
  let correctCount = 0;
   // String to store colored characters
  let coloredText = "";

  // Compare each character in the typed text to the original
  for(let i = 0; i < currentText.length; i++) {
    const typedChar = typedText[i] || ""; // Get the typed character (or empty if not typed)
    const originalChar = currentText[i]; // Get the correct character from the sentence

    // If character is not yet typed, just display the original character
    if(typedChar === "") {
      coloredText += originalChar;

    // If character is correct, wrap it in a span with 'correct' class
    } else if (typedChar === originalChar) {
      coloredText += `<span class='correct'>${originalChar}</span>`;
      correctCount++;
    } else {
      // If character is incorrect, wrap it in a span with 'incorrect' class
      coloredText += `<span class='incorrect'>${originalChar}</span>`;
    }
  }

  // Update the display with color-coded characters
  textDisplay.innerHTML = coloredText;

  // Calculate accuracy as correct chars over typed chars, rounded to percentage
  const accuracy = typedText.length > 0 ? Math.round((correctCount / typedText.length) * 100) : 0;

  // Show live stats
  stats.textContent = `WPM: calculating... Accuracy: ${accuracy}%`
});

// Function to finish the test and calculate final stats
function finishTest() {
  if(!timerStarted || testFinished) return;

  const typedText = textInput.value;
  const elapsedTime = (new Date() - startTime) / 1000;
  const typedLength = typedText.length;

  let correctCount = 0;
  for(let i = 0; i < typedLength; i++) {
    if(typedText[i] === currentText[i]) {
      correctCount++;
    }
  }

  const accuracy = typedLength > 0 ? Math.round((correctCount / typedLength) * 100) : 0;
  const minutes = elapsedTime / 60;
  const wordsTyped = typedText.trim().split(/\s+/).filter(w => w.length > 0).length;
  const wpm = minutes > 0 ? Math.round(wordsTyped / minutes) : 0;

  stats.textContent = `Finished! WPM: ${wpm}, Accuracy: ${accuracy}%`;

  timerStarted = false;
  testFinished = true;
  textInput.disabled = true; // disable further input after finish
}

submitBtn.addEventListener('click', finishTest);

textInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    finishTest();
  }
});
// Restart
restartBtn.addEventListener('click', startTest);

startTest();
