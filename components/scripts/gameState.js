let gameState = {
    gameSpeed: 3000,
    interval: null,
    score:0,
    scoreBoard: document.querySelector(".score"),
    bonusBoard: document.querySelector(".points-scored"),
    introduction: false,
    start: false,
    themePlaying: false,
    
    renderBonus(){
        
        pieces.piecesQueue.length == 0 ? 
        this.bonusBoard.innerHTML = "+150" : 
        this.bonusBoard.innerHTML = "+50";

        this.bonusBoard.classList.add('foldUp');

        this.bonusBoard.addEventListener('animationend', function(){
            gameState.bonusBoard.classList.remove("foldUp");
        })
    },

    renderScore(){
        this.scoreBoard.innerHTML = this.score;
    },

    updateScore(){
        pieces.piecesQueue.length == 0 ?
        this.score += 150 :
        this.score += 50;

        this.renderScore();
    },

    //switches the score to update the time of setInterval
    updateSpeed() {
    console.log(gameState.speed)
    clearInterval(gameState.interval);
    gameState.gameSpeed = gameState.gameSpeed - 100;
    gameState.interval = setInterval(function(){
        pieces.renderPiece();
        gameState.checkGameOver();
    }, gameState.gameSpeed);
    console.log(gameState.gameSpeed)
    },

    clearScore(){
        this.score = 0;
    },

    createInterval(){
        clearInterval(this.interval);
        this.interval = setInterval(function(){
            pieces.renderPiece();
            gameState.checkGameOver();
        }, this.gameSpeed)
    },

    checkGameOver(){
        if(pieces.piecesQueue.length >= 11) gameOver();
        else console.log("Game still on!");
    }
}
