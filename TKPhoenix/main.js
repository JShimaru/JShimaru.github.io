//Global Game Containers
const words = [];
const backupWords = [];
let position = 0;
const submittedWords = [];
const correctWords = [];
let correctWordsGoal = 5;
let level = 0;
let finalGoal = 2;
let piecePlace = 1;
let progress = 1;

//Use API's function to load random 25 word arrays per call


//Story Mode changes to Storymode image and loads game screen
//VS Mode changes to VS Screen image and ask for name input
//Challenge Mode changes to Storymode image and ask for catalog choice
//Quit function
function quit(){return `Thanks for Playing!`}
//Code for button click here
function buttonClick(){
let versus = document.getElementById(#vs)
let challenge = document.getElementById(#challenge)
let easy = document.getElementById(#easy).value;
let med = document.getElementById(#med).value;
let hard = document.getElementById(#hard).value;
if(versus.checked == true && easy){
    alert(`Starting Quick Play! First to 10!`)
    //change page to VS background
}else if(versus.checked == true && med){
    alert(`Starting Head to head! First to 25 words!`)
    //change page to VS background
}else if(versus.checked == true && hard){
    alert(`Starting First to Fall! Keep going until no hearts remain!`)
    //change page to VS background
}else if(challenge.checked == true){
    //change page to story mode page
    alert(`Challenge Mode! Choose your library:`)
    //Drop down list of Special API's
}else{
    alert(`Beginning Ascension...`)
    //Change page to story mode page
}
}
//end code for button clicks
//Timer and Hearts
const storyTimer = setTimeout(() => {
    alert(`Time's Up! Try again?`)
    //load dark cavern background
    //option to retry or quit
}, 30000);
const challengeTimer = setTimeout(() => {
    alert(`Time's Up! Check the score -`)
    //print correctWords.length
    //load global high score and personal high score
}, 6000);
let heart = 2;
//create piece function
function createPiece(letter){
    let name = letter.split("")
    let piece = name.shift()

    if(piece === undefined){
        alert(`Please enter a name!`)
    }else{
        //create bold text letter on piecePlace 0 index (Grid) 
    }
}
//restart Function
function restart(){
    level = 0;
    position = 0;
    piecePlace = 1;
    progress = 1;
    heart = 2;
}
//Check Word Function to be called by all Update functions
function checkWord(input){
    userWord = input;
    currentWord = words[position]

    if(userWord.toLowerCase() == currentWord.toLowerCase()){
        correctWords.push(userWord)
        submittedWords.push(userWord)
        position++
        //Print words[position] to screen position
    }else{
        submittedWords.push(userWord)
        heart--
        position++
        //Print words[position] to screen position
    }
}
//End CheckWord || Begin Move Piece function
function movePiece(){
    let progressBar = correctWordsGoal/10;
    let distance = progressBar*10;

    if(distance < 10 && correctWords.length <= 5){
        piecePlace+2
        progress+2
        //move piece image up two nodes
        //switch to even progress bar image
    }else if(distance = 10 && correctWords.length >= 2 && correctWords.length < distance && piecePlace != 10 && progress != 10){
        piecePlace++
        progress++
        //move piece image to next node
        //switch to next progress bar image
    }else if(distance > 10 && correctWords.length >= progressBar*progress && progress != 10){
        piecePlace++
        progress++
        //next progress bar image placed
    }
}
//End Move Piece || More Words Function
function moreWords(){
    if(words.length == position){
        words = backupWords;
        backupWords = [];
        //backupWords = API call for 25 more words
        position = 0;
    }
}
//Story Mode Update function when player submits word
function storyModeUpdate(submittedWord){
    //pause timer
    let word = submittedWord;
    checkWord(word);
    movePiece();
    
        if(heart == 0 && correctWords.length != correctWordsGoal){
            alert(`careful! No more misses or it's over!`)
        }else if(correctWords.length == correctWordsGoal){
            if(level != finalGoal){
                level++
                alert(`Destination set, onward?`)
                //option to continue, retry, or quit
            }else if(level == finalGoal){
                alert(`Goal achieved! You WIN!`)
                //option to continue, retry, or quit
            }
        }else if(heart < 0){
            //load dark carvern background
            alert(`Defeat! Game Over?`)
            //Option to retry or quit
        }
    moreWords();
}
//End of Story Mode Update Function
//Player input for Story mode function
function submitStoryWord(string){
    let word = string;
    storyModeUpdate(word);

    if(submittedWords.length == 1){
        storyTimer();
    }else{
        //resume timer
    }
}
