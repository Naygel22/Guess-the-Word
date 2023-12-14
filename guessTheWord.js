const wordsArray = ['SCHOOL', 'HOUSE', 'CAR', 'PENCIL', 'MOUSE'];
const hiddenLetters = document.querySelector('.hiddenLetters');
const lettersTyped = document.querySelector('.lettersTyped');
const inputBar = document.querySelector('.inputBar');
const guessButton = document.querySelector('.guessButton');
const guessText = document.querySelector('.guessText');
const guessesRemaining = document.querySelector('.guessesRemaining');
const correctWordText = document.querySelector('.correctWordText');
const playAgainButton = document.querySelector('.playAgainButton');
const typeLettersText = document.querySelector('.typeLettersText');


let randomWordFromArray; 
let currentInputValue;
let guessTextWithLetter;
let count;

startApp();

function startApp(){
  count = 15;
  playAgainButton.classList.add('hidden');
  randomWordFromArray = randomWord();
  for(let i = 0; i < randomWordFromArray.length; i++){
    createCircle();
  }
  createTextwithGuessesCount()
}

function randomWord(){
  let randomIndex = Math.floor(Math.random() * wordsArray.length);
  console.log('Losowy indeks:', randomIndex);
  return wordsArray[randomIndex];
}

function createCircle(){
  const circle = document.createElement('div');
  circle.classList.add('circle');
  hiddenLetters.appendChild(circle);
}

function showInputLetters(){
  const oneLetterTyped = document.createElement('p');
  oneLetterTyped.classList.add('oneLetterTyped');
  lettersTyped.appendChild(oneLetterTyped);
  
  oneLetterTyped.textContent = currentInputValue;
  inputBar.value = '';
}

function replaceCirclesWithLetters() {
  let correctGuess = false;

  for (let i = 0; i < randomWordFromArray.length; i++) {
    const letter = randomWordFromArray[i];
    const circle = hiddenLetters.children[i];

    if (letter === currentInputValue) {
      correctGuess = true;
      // letter in place of circle
      const letterElement = document.createElement('div');
      letterElement.textContent = currentInputValue;
      hiddenLetters.replaceChild(letterElement, circle);
    }
  }

  // guess text with letter from input
  if (!guessTextWithLetter) {
    guessTextWithLetter = document.createElement('p');
    guessTextWithLetter.classList.add('guessTextWithLetter', 'hidden');
    guessText.appendChild(guessTextWithLetter);
  }

  if (correctGuess) {
    guessTextWithLetter.textContent = `Good Guess! The word has a letter ${currentInputValue}.`;
    guessTextWithLetter.classList.remove('hidden');

    const circlesLeft = document.querySelectorAll('.circle');
    if(circlesLeft.length === 0) {
      showEndElements();
    }
  } else {
    guessTextWithLetter.textContent = `Try again! The word doesn't have a letter ${currentInputValue}.`;
    guessTextWithLetter.classList.remove('hidden');
  }
}

function createTextwithGuessesCount(){
  const guessesRemainingText = document.createElement('p');
  guessesRemainingText.classList.add('guessesRemainingText');
  guessesRemaining.appendChild(guessesRemainingText);
  updateTextWithGuessesCount()
}

function updateTextWithGuessesCount() {
  const guessesRemainingText = document.querySelector('.guessesRemainingText');
  guessesRemainingText.textContent = `You have ${count} guesses remaining.`;

  if(count <= 0){
    showEndElements();
  }
}

function showEndElements() {
  playAgainButton.classList.remove('hidden');
  correctWordText.textContent = `The correct word was ${randomWordFromArray}`;
  correctWordText.classList.remove('hidden');
  lettersTyped.textContent = '';
   guessButton.classList.add('hidden');
   inputBar.classList.add('hidden');
   guessText.classList.add('hidden');
   guessesRemaining.classList.add('hidden');
   typeLettersText.classList.add('hidden');
   
  
  playAgainButton.addEventListener('click', () => {
    correctWordText.textContent = '';
    playAgainButton.classList.add('hidden');
    guessButton.classList.remove('hidden');
   inputBar.classList.remove('hidden');
   guessText.classList.remove('hidden');
   guessesRemaining.classList.remove('hidden');
   typeLettersText.classList.remove('hidden');
    while (hiddenLetters.firstChild) {
      hiddenLetters.removeChild(hiddenLetters.firstChild);
    }
    lettersTyped.textContent = '';
    guessTextWithLetter.classList.add('hidden');
    startApp();
  });
}
function onGuess() {
  const userGuess = inputBar.value;
  if (userGuess !== '') {
    currentInputValue = userGuess;
  showInputLetters();
  replaceCirclesWithLetters();
  count--;
  updateTextWithGuessesCount()
  }
}

guessButton.addEventListener('click', () => {
  onGuess();
});

document.addEventListener("keydown", function(event) {
  if(event.key === 'Enter') {
    onGuess();
  }
})
inputBar.addEventListener('input', (event) => {
  event.target.value = event.target.value.toUpperCase().replace(' ', '');
})