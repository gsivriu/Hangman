let images = ["2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg", "8.jpg"];
let clicks = 0;
let myWord = [];
let movesRemaining = 8;
let displayWord = "";
let showWord;
let startButton = 0;
const buttonContainer = document.getElementById("alphabetLetters");

  for (let i = 0; i < 26; ++i) {                              
    const button = document.createElement("button");
    button.innerHTML = String.fromCharCode(65 + i);             // giving each button its letter value
    button.addEventListener('click', function(event) {          // compare the button clicked with the word saved
        event.preventDefault();                                 // to not refresh the page after a button is clicked
        let updatedDisplayWord = displayWord.split(' ');        // separate each letter in an array
        let letterMatched = false;                              // decrement movesRemaining only if selected letter is not in word
        for (let j = 0; j < myWord.length; ++j) {
            if (button.innerHTML === myWord[j]) {
                updatedDisplayWord[j] = myWord[j];              // replace the "_" with the guessed letter
                letterMatched = true;
            } 
        }
        if (!letterMatched && startButton > 0) {
            --movesRemaining;   
            document.querySelector(".image").src = images[0];
            if (movesRemaining === 0) {
                document.querySelector(".image").src = images[7];
                alert("Game Over");
                location.reload();                                                       // stop the game
            } else {
                document.querySelector(".image").src = images[7 - movesRemaining];      // selects the updated image of the hangman depending on the moves remaining
            }
        }
        displayWord = updatedDisplayWord.join(' ');
        showWord.innerHTML = displayWord;
        if (!displayWord.includes("_") && movesRemaining > 0) {
            alert("You win! The word is " + document.getElementById('inputWord').value);
            location.reload();                                   // stop the game
        }       
    })
    buttonContainer.appendChild(button);
    }


function saveWord() {
   if (startButton < 1) {                                            // deactivate the start button after starting the game
   let word = document.getElementById('inputWord').value;            //store the desired word in 
   showWord = document.getElementById('wordDisplayed');               
   for (let i = 0; i < word.length; ++i) {
    if (i == 0 || i == word.length-1) {                                   
     displayWord += word[i] + " ";
    } else {
     displayWord += "_" + " ";
    }
   }
   myWord = word.split('');                                     
   showWord.innerHTML = displayWord;                                //show the modified word in the desired <div>
   ++startButton;
   }
}
