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
    // pieces.renderFirstPiece();
    pieces.renderManualScreen();
    gameInput.focus();
    
    //renders instructions on the game console
    
    gameConsole.renderInstructions();

    //play theme song
    audio.theme.play();
    gameState.themePlaying = true;
   
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
            if(gameState.gameSpeed > 1000) {
                console.log("fez update!")
                gameState.updateSpeed()
            }
            gameInput.value = "";
        } else if (!checkAnswer() && gameState.start){
            pieces.renderPiece();
            gameConsole.type(gameConsole.getBadMessage());
            gameInput.classList.add("incorrect");
        }  
    } else if (which == 32 && gameState.introduction && !gameState.start){
        gameStart();
    }
},false)

//starts the game
const gameStart = () => {
    gameState.start = true;
    //audio
    if(gameState.themePlaying == false) {
        audio.theme.play();
    }
    //console
    gameConsole.console.style.color = "white";
    gameConsole.type("...1 ...2 ...3 ...T!PE</br></br>> Music by: Daft Punk</br>> Title: Dafunk</br>");
    //final screen
    endScreen.style.transform = "translateX(-110vw)";
    //text input
    gameInput.focus();
    gameInput.value = "";

    //time reset
    gameState.gameSpeed = 3000;

    //final screen img container clear
    pieces.clearCorrectPiecesContainer();

    //main piece container render if not occupied yet
    if(pieces.piecesQueue.length == 0) pieces.renderFirstPiece();
    //score render
    gameState.renderScore();
    //pieces render interval
    gameState.interval = setInterval(function(){
        pieces.renderPiece();
        gameState.checkGameOver();
    }, gameState.gameSpeed);
}//gameStart function


//compares the input value with the 'data-piece' attribute
const checkAnswer = () => {
    let mainPiece = document.querySelector(".main-piece-container img");
    return gameInput.value.toLowerCase().trim() == mainPiece.getAttribute("data-piece");
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

    //remove 'warning' class from pieces container
    pieces.container.classList.remove("warning");

    //restart audio
    audio.theme.pause();
    audio.theme.currentTime = 0;
    gameState.themePlaying = false;
}


//Play again button "click" event
playAgainBtn.addEventListener("click", gameStart, false);

//Input animation event listener
gameInput.addEventListener("animationend", function(){
    gameInput.classList.remove("incorrect");
    gameInput.classList.remove("correct");
})