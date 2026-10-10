const msgEl = document.getElementById('msg');

// Generate random number
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

<<<<<<< HEAD
const randomNum = getRandomNumber();
=======
let randomNum = getRandomNumber();
>>>>>>> dev
console.log('Number:', randomNum);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognition and game
recognition.start();

// Capture user speak
function onSpeak(event) {
  const msg = event.results[0][0].transcript;  // You can log the event to view the structure of the data
<<<<<<< HEAD
  console.log(msg);
}

// Speak result
recognition.addEventListener('result', onSpeak);
=======
  writeMessage(msg);
  checkNumber(msg);
  console.log(msg);
}

// Listen to and handle the speak event
recognition.addEventListener('result', onSpeak);

//Write what user speaks
function writeMessage(msg) {
   msgEl.innerHTML = `
    <div>You said: </div>
    <span class="box">${msg}</span>
  `;
}


// See in the DOM what user has spoken
function writeMessage(msg) {
  msgEl.innerHTML = ''; // This is fine, just clearing out old data, not passing in untrusted data

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

  // Edge cases
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
  console.log(msg);
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
    // Add event listener and handler to button
    button.addEventListener('click', () => window.location.reload());

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
}

// A the end of the Speech regonition, restart it so that the user can continue to speak
recognition.addEventListener('end', () => recognition.start());
>>>>>>> dev
