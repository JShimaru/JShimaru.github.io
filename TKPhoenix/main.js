//Global Game Containers and Board trackers
let words = [];
let backupWords = [];
let position = 0;
const submittedWords = [];
const correctWords = [];
let currentWord = words[position]
const levelIndex = ["0_Start.jpg","1_Beach.jpg","2_CrystalCavern.jpg"]
let correctWordsGoal = 5;
let level = 0;
const finalGoal = 2;
let piecePlace = 1;
let progress = 1;
let heart = 2;
//Targeted HTML Elements
const body = document.body;
const header = body.head;
const piece = document.querySelector("#piece")
const button = document.querySelector("#word-button")
const timer = document.querySelector("#timer")
const hearts = document.querySelector("#heart")
// const form = body.form;
// const submitWord = document.getElementById("submitWord");
const currentWordLocation = document.querySelector("#current-word")
//next level function
function nextLevel(){
    document.body.style.backgroundImage = url('./images/storyMode/'+levelIndex[level])
    wordGenerator();
    }
//Random Word API
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
     currentWordLocation.innerText = `${words[0]}`;
 }
//create piece function
function createPiece(letter){
    let name = letter.toString().split("")
    let pieceLetter = name.shift()

    if(pieceLetter === undefined){
        alert(`Please enter a name!`)
    }else{
        piece.innerText = `${pieceLetter}`
    }
}
//Start Function
async function Start(){
    await wordGenerator();
    level = 0;
    position = 0;
    piecePlace = 1;
    progress = 1;
    heart = 2;
    currentWordLocation.innerText = `${words[0]}`;
}
//Quit function
function quit(){alert(`Thanks for Playing!`)}
//Code for button click here
// function buttonClick(){
//    let story = document.getElementById("story")
//    let versus = document.getElementById("vs")
//    let challenge = document.getElementById("challenge")
    // let easy = document.getElementById("easy").value;
    // let med = document.getElementById("med").value;
    // let hard = document.getElementById("hard").value;

        // if(versus.checked == true && easy){
        //     alert(`Starting Quick Play! First to 10!`)
        //     //change page to VS background
        // }else if(versus.checked == true && med){
        //     alert(`Starting Head to head! First to 25 words!`)
        //     //change page to VS background
        // }else if(versus.checked == true && hard){
        //     alert(`Starting First to Fall! Keep going until no hearts remain!`)
        //     //change page to VS background
        // }else if(challenge.checked == true && easy || med || hard){
        //     //change page to story mode page
        //     alert(`Challenge Mode! Choose your library:`)
        //     //Drop down list of Special API's
//         if(med.checked == true){
//             correctWordsGoal += 5;
//             heart--
//             //clear(form)
//             header.innerHTML= "<h2>a world filled with magic and wonder!</h2>"
//             body.append(header)
//             alert(`Beginning Ascension...`)
//             document.body.style.backgroundImage= "url(`images/StoryMod/0_Start.jpg`)"      
//         }else if(hard.checked == true){
//             correctWordsGoal = 20;
//             heart = 0;
//             //clear(form)
//             header.innerHTML= "<h2>A world filled with magic and wonder!</h2>"
//             body.append(header)
//             alert(`Beginning Ascension...`)
//             document.body.style.backgroundImage= "url(`images/StoryMod/0_Start.jpg`)"
//         }else if(easy.checked == true){
//             piecePlace = 0;
//             progress = 0;
//             //clear(form)
//             header.innerHTML= "<h2>A world filled with magic and wonder!</h2>"
//             body.append(header)
//             alert(`Beginning Ascension...`)
//             document.body.style.backgroundImage= "url(`images/StoryMod/0_Start.jpg`)"
//         }
// }
//end code for button clicks
//Timers
const storyTimer = setInterval(() => {
    body.style.backgroundImage= "url(`images/StoryMod/0_Start.jpg`)"
    let result = confirm(`Time's Up! Try again?`)
    if(result == true){
    Start();
}else{
    alert("Defeat! Game Over... \n Thanks for playing!")
}
}, 300000);
// const challengeTimer = setTimeout(() => {
//     alert(`Time's Up! Check the score -`)
//     //print correctWords.length
//     //load global high score and personal high score
// }, 60000);
//Check Word Function to be called by all Update functions
function checkWord(input){
    console.log(input)
    userSubmittedWord = input.toString();
    console.log(userSubmittedWord)
    currentWord = words[position]
    console.log(currentWord)

    if(userSubmittedWord.toString().toLowerCase() == currentWord.toString().toLowerCase()){
        correctWords.push(userSubmittedWord)
        submittedWords.push(userSubmittedWord)
        position++
        currentWord = words[position]
        currentWordLocation.innerText = words[position]
    }else{
        submittedWords.push(userSubmittedWord)
        heart--
        hearts.innerText = heart;
        position++
        currentWord = words[position]
        currentWordLocation.innerText = words[position]
    }
}
//End CheckWord || Begin Move Piece function
function movePiece(){
    let progressBar = correctWordsGoal/10;
    let distance = progressBar*10;

    if(distance < 10 && correctWords.length > 0 && correctWords.length <= 5){
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
    if(words.length == position && backupWords.length > 0){
        words = backupWords;
        backupWords = [];
        position = 0;
        currentWord = words[position]
    }else if(words.length == position && backupWords.length == 0){
        wordGenerator();
        currentWord = words[position]
    }
}
//Story Mode Update function when player submits word
function storyModeUpdate(userWord){
    clearInterval(storyTimer)
    let word = userWord;
    checkWord(word);
    movePiece();
    
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
                restart();
            }else{
                quit();
            }
    moreWords();
    storyTimer();
}}
//End of Story Mode Update Function
//Player input for Story mode function
function submitUserWord(string){
    let word = string.stringify();
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
    clearInterval(storyTimer)    
}

button.addEventListener("click", (input) => {
    clearInterval(storyTimer)
    submitUserWord(input)
})
