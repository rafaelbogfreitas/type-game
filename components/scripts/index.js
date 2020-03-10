//Elements
let startBtn = document.querySelector(".start-btn");//start button
let startScreen = document.querySelector(".start-screen");//start screen
let gameInput = document.querySelector(".game-input");//input
let endScreen = document.querySelector(".final-screen");//final screen
let endScreenScore = document.querySelector(".stats-score")//total score final screen
let piece = document.querySelector(".pieces-container img");//first piece in top container
let playAgainBtn = document.querySelector(".play-again-btn");




//function that makes the start screen slide up off the viewport
const liftStartScreen = () => {
    startScreen.style.transform = "translateY(-110vh)";
    gameState.renderScore();
    pieces.renderFirstPiece();
    gameInput.focus();
    
    //renders instructions on the game console
    
    gameConsole.renderInstructions();
   
}


//Start button "click" event
startBtn.addEventListener("click", liftStartScreen, false);


//keyboard 'keydown' event listener
gameInput.addEventListener('keydown', function({which}){
    if(which == 13){
        if(checkAnswer() && gameState.start){
            gameConsole.type(gameConsole.getGoodMessage());
            gameInput.classList.add("correct");
            pieces.shiftPiece();
            gameState.renderBonus();
            gameState.updateScore();
            if(gameState.score % 150 == 0) updateSpeed();
            gameInput.value = "";
        } else if (!checkAnswer() && gameState.start){
            gameConsole.type(gameConsole.getBadMessage());
            gameInput.classList.add("incorrect");
        }  
    } else if (which == 32 && gameState.introduction){
        gameStart();
    }
},false)

//starts the game
const gameStart = () => {
    gameState.start = true;
    gameConsole.type("T!PE");
    endScreen.style.transform = "translateX(-110vw)";
    gameInput.focus();
    gameInput.value = "";
    pieces.clearCorrectPiecesContainer();

    if(pieces.piecesQueue.length == 0) pieces.renderFirstPiece();

    gameState.renderScore();
    gameState.interval = setInterval(function(){
        pieces.renderPiece();
        gameState.checkGameOver();
    }, gameState.gameSpeed);
}

//switches the score to update the time of setInterval
const updateSpeed = () => {
    clearInterval(gameState.interval);
    gameState.gameSpeed = gameState.gameSpeed - 500;
    gameState.interval = setInterval(function(){
        pieces.renderPiece();
        gameState.checkGameOver();
    }, gameState.gameSpeed);
    console.log(gameState.gameSpeed)
}

//compares the input value with the 'data-piece' attribute
const checkAnswer = () => {
    let mainPiece = document.querySelector(".main-piece-container img");
    return gameInput.value.toLowerCase() == mainPiece.getAttribute("data-piece");
}

//finishes the game and displays the total score scree
const gameOver = () => {
    pieces.renderCorrectPieces();
    endScreenScore.innerHTML = gameState.score;
    endScreen.style.transform = "translateX(0)";
    gameState.gameSpeed = 5000;
    pieces.clearQueue();
    gameState.clearScore();
    clearInterval(gameState.interval);
}


//Play again button "click" event
playAgainBtn.addEventListener("click", gameStart, false);

//Input animation event listener
gameInput.addEventListener("animationend", function(){
    gameInput.classList.remove("incorrect");
    gameInput.classList.remove("correct");
})