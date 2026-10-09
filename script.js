const msgEl = document.getElementById('msg');

// Generate random number
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

const randomNum = getRandomNumber();
console.log('Number:', randomNum);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognition and game
recognition.start();

// Capture user speak
function onSpeak(event) {
    console.log(event);
  const msg = event.results[0][0].transcript;  // You can log the event to view the structure of the data
  
  console.log(msg);
}

// Listen to and handle the speak event
recognition.addEventListener('result', onSpeak);