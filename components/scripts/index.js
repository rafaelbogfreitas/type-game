//Elements
let startBtn = document.querySelector(".start-btn");//start button
let startScreen = document.querySelector(".start-screen");//start screen
let gameInput = document.querySelector(".game-input");//input
let endScreen = document.querySelector(".final-screen");//final screen
let endScreenScore = document.querySelector(".stats-score")//total score final screen
let gameConsole = document.querySelector(".message-console .console-text")//console
let piece = document.querySelector(".pieces-container img");//first piece in top container
let playAgainBtn = document.querySelector(".play-again-btn");

//function that creates the ilusion of typing
const type = str => {
    let newStr = "";
    str.split("").forEach( (letter, i) => {
        setTimeout(function(){
            gameConsole.innerHTML = newStr += letter;
        }, i * 100);
    })
}

//function that makes the start screen slide up off the viewport
const liftStartScreen = () => {
    gameStart();
}


//Start button "click" event
startBtn.addEventListener("click", liftStartScreen, false);

//keyboard 'keydown' event listener
gameInput.addEventListener('keydown', function({which}){
    if(which == 13){
        pieces.shiftPiece();
        gameState.renderBonus();
        gameState.updateScore();
        gameState.updateSpeed();
        console.log(pieces.piecesQueue.length)
    }
},false)

//starts the game
const gameStart = () => {
    startScreen.style.transform = "translateY(-110vh)";
    endScreen.style.transform = "translateX(-110vw)";
    gameInput.focus();
    setTimeout(function(){
        type("1... 2... 3... T!PE");
    }, 1000);
    pieces.renderFirstPiece();
    gameState.renderScore();
    gameState.interval = setInterval(function(){
        pieces.renderPiece();
        gameState.checkGameOver();
    }, gameState.gameSpeed);
}

//finishes the game and displays the total score scree
const gameOver = () => {
    endScreenScore.innerHTML = gameState.score;
    endScreen.style.transform = "translateX(0)";
    gameState.gameSpeed = 5000;
    pieces.clearQueue();
    gameState.clearScore();
    clearInterval(gameState.interval);
}


//Play again button "click" event
playAgainBtn.addEventListener("click", gameStart, false);