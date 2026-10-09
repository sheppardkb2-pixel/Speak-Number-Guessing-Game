const msgEl = document.getElementById('msg');

function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

let randomNum = getRandomNumber();
console.log('Number:', randomNum);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (!window.SpeechRecognition) {
  msgEl.textContent = 'Speech recognition is not supported in this browser.';
} else {
  const recognition = new window.SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.continuous = false;
}
// Start recognition and game
recognition.start();
document.getElementById
recognition.addEventListener('end', () => recognition.start());

// Capture user speak
function onSpeak(event) {
  const msg = event.results[0][0].transcript;  // You can log the event to view the structure of the data
  writeMessage(msg);
  checkNumber(msg);
  console.log(msg)
}

// Listen to and handle the speak event
recognition.addEventListener('result', onSpeak);


// See in the DOM what user has spoken
function writeMessage(msg) {
  msgEl.innerHTML = '';

  const div = document.createElement('div');
  div.textContent = 'You said: ';

  const span = document.createElement('span');
  span.classList.add('box');
  span.textContent = msg;

  msgEl.append(div, span);
}

// Check message against the secret number
function checkNumber(msg) {
  const wordToNumber = {
    one: 1,
    won: 1,
    two: 2,
    to: 2,
    too: 2,
    three: 3,
    four: 4,
    for: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    ate: 8,
    nine: 9,
    ten: 10,
  };

  const spoken = String(msg).trim().toLowerCase();
  let num = Number(spoken);

  if (wordToNumber[spoken] !== undefined) {
    num = wordToNumber[spoken];
  }

  if (Number.isNaN(num)) {
    const div = document.createElement('div');
    div.textContent = 'Please say a valid number.';
    msgEl.append(div);
    return;
  }

  // Check if number is in range
  if (num < 1 || num > 100) {
    const div = document.createElement('div');
    div.textContent = 'Number must be between 1 and 100.';
    msgEl.append(div);
    return;
  }

  // Check the number and provide feedback
  if (num === randomNum) {
    const h2 = document.createElement('h2');
    h2.textContent = `Congratulations! You have guessed the number ${num} correctly!`;

    const button = document.createElement('button');
    button.classList.add('play-again');
    button.id = 'play-again';
    button.textContent = 'Play Again';
    button.addEventListener('click', () => {
      randomNum = getRandomNumber();
      msgEl.innerHTML = '';
      console.log('Number:', randomNum);
    });

    msgEl.append(h2, button);
    return;
  }

  const feedback = document.createElement('div');
  feedback.textContent = num > randomNum ? 'GO LOWER' : 'GO HIGHER';
  msgEl.append(feedback);
}