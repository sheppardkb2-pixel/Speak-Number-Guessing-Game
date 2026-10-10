const msgEl = document.getElementById('msg');

// Generate random number
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

let randomNum = getRandomNumber();
console.log('Random number:', randomNum);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

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


//Write what user speaks
function writeMessage(msg) {
    msgEl.innerHTML = ';
    <div>You said: </div>
    <span class="box">${msg}</span>
  ';
}


// See in the DOM what user has spoken
function writeMessage(msg) {
  msgEl.innerHTML = '

  const div = document.createElement('div');
  div.textContent = 'You said: ';

  const span = document.createElement('span');
  span.classList.add('box');
  span.textContent = msg;

    msgEl.append(div, span);
  }

// Check message against the secret number
function checkNumber(msg) {
  let num = Number(msg);  // This is now a let instead of const since I reassign the value below

  // Update the value of num if it's a single-digit number
  if (msg === 'one' || msg === 'won') {
    num = 1;
  } else if (msg === 'two') {
    num = 2;
  } else if (msg === 'three') {
    num = 3;
  } else if (msg === 'four') {
    num = 4;
  } else if (msg === 'five') {
    num = 5;
  } else if (msg === 'six') {
    num = 6;
  } else if (msg === 'seven') {
    num = 7;
  } else if (msg === 'eight') {
    num = 8;
  } else if (msg === 'nine') {
    num = 9;
  }

  // Check if the spoken content is a valid number
  if (Number.isNaN(num)) {
    const div = document.createElement('div');
    div.textContent = 'That is not a valid number';
    msgEl.append(div);

    return;
  }

   // Check if the spoken content is a valid number
  if (Number.isNaN(num)) {
    const div = document.createElement('div');
    div.textContent = 'That is not a valid number';
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
  } else if (num > randomNum) {
    const div = document.createElement('div');
    div.textContent = 'GO LOWER';
    msgEl.append(div);
  } else {
    // if (num < randomNum)
    const div = document.createElement('div');
    div.textContent = 'GO HIGHER';
    msgEl.append(div);
  }

  const feedback = document.createElement('div');
  feedback.textContent = num > randomNum ? 'GO LOWER' : 'GO HIGHER';
  msgEl.append(feedback);
}