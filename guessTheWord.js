const wordsArray = ['SCHOOL', 'HOUSE', 'CAR', 'PENCIL', 'MOUSE'];
const hiddenLetters = document.querySelector('.hiddenLetters');
const lettersTyped = document.querySelector('.lettersTyped');
const inputBar = document.querySelector('.inputBar');
const guessButton = document.querySelector('.guessButton');
const guessText = document.querySelector('.guessText');
const guessesRemaining = document.querySelector('.guessesRemaining');

let randomWordFromArray; 
let currentInputValue;
let guessTextWithLetter;
let count = 10;

startApp();

function startApp(){
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
  } else {
    guessTextWithLetter.textContent = `Try again! The word doesn't have a letter ${currentInputValue}.`;
    guessTextWithLetter.classList.remove('hidden');
  }
}
function createTextwithGuessesCount(){
  const guessesRemainingText = document.createElement('p');
  guessesRemainingText.classList.add('guessesRemainingText');
  guessesRemaining.appendChild(guessesRemainingText);
  guessesRemainingText.textContent = `You have ${count} guesses remaining.`;
  
}





guessButton.addEventListener('click', () => {
  currentInputValue = inputBar.value;
  showInputLetters();
  replaceCirclesWithLetters();
  
  
})



