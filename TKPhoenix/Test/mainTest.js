//Global Game Containers and Board trackers
let words = ["gosport", "Baseball", "Ty","Kali", "Welcome"];
let backupWords = [];
let position = 0;
let submittedWords = [];
let correctWords = [];
let currentWord = words[position]
const levelIndex = ["0_Start.jpg","1_Beach.jpg","2_CrystalCavern.jpg"]
const correctWordsGoal = 5;
let level = 0;
const finalGoal = 2;
let piecePlace = 1;
let progress = 1;
let heart = 2;
//Targeted HTML Elements
const body = document.body;
const piece = document.querySelector("#piece")
const button = document.querySelector("#word-button")
// const form = body.form;
// const submitWord = document.getElementById("submitWord");
const currentWordLocation = document.querySelector("#current-word")

//Use API's function to load random 25 words arrays
async function wordGenerator(){
   await fetch(`https://random-word-api.herokuapp.com/word?number=25`)
        .then(res => res.json())
        .then(data => backupWords.push(...data))
           console.log(`This is backup Words: ${backupWords}`)
    await fetch(`https://random-word-api.herokuapp.com/word?number=25`)
        .then(res => res.json())
        .then(data => words.push(...data))
              console.log("This is words: " +words)
}

//Start Function
async function Start(){
    await wordGenerator();
    level = 0;
    position = 0;
    piecePlace = 1;
    progress = 1;
    heart = 2;
    currentWordLocation.innerText = `${words[position]}`;
}

//Check Word Function to be called by all Update functions
function checkWord(input){
    userSubmittedWord = input;

    if(userSubmittedWord.toString().to6LowerCase() === currentWord.toLowerCase()){
        correctWords.push(userSubmittedWord)
        submittedWords.push(userSubmittedWord)
        position++
        currentWord = words[position]
        currentWordLocation.innerText = words[position]
    }else{
        submittedWords.push(userSubmittedWord)
        heart--
        position++
        currentWord = words[position]
        currentWordLocation.innerText = words[position]
    }
}


//Story Mode Update function when player submits word
function storyModeUpdate(userWord){
    let word = userWord;
    checkWord(word);
    
        if(heart == 0 && correctWords.length != correctWordsGoal){
            alert(`careful! No more misses or it's over!`)
        }else if(correctWords.length == correctWordsGoal){
            if(level != finalGoal){
                level++
                let results = confirm(`Destination set, onward?`)
                if(results == true){
                    nextLevel();
                }else{
                    quit();
                }
            }else if(level == finalGoal){
                alert(`Goal achieved! You WIN! \n Thanks for playing!`)
            }
        }else if(heart < 0){
            document.body.style.backgroundImage= "url(`images/StoryMod/0_Start.jpg`)"
            let truth = confirm(`Defeat! Game Over?`)
            if(truth == true){
                Start();
            }else{
                quit();
            }
}
}

//Player input for Story mode function
function submitUserWord(string){
    let word = string;
    storyModeUpdate(word);
    currentWordLocation.innerText = currentWord 

    if(submittedWords.length == 1){
        storyTimer();
    }
}
//Game Start function for onLoad
window.onload = function() {
    let name = prompt(`Welcome, how shall we identify you?`)
    createPiece(name);
    wordGenerator();
    currentWordLocation.innerText = `${currentWord}`;
    clearInterval(storyTimer)    
}

button.addEventListener("click", (input) => {
    clearInterval(storyTimer)
    submitUserWord(input);
})



console.log(currentWord)
storyModeUpdate(gosport)
console.log(correctWords)
console.log(submittedWords)
console.log(position)