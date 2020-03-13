class Console {
    constructor(){
        this.console = document.querySelector(".message-console .console-text")//console
        this.instructions = [
            "T!pe the name of the shape you see on the left of the screen and hit Enter",
            "If right you get 50 points for a piece and 150 for clearing the queue",
            "Don't let the queue flood with pieces or you will LOSE! ", 
            'Hit the <span style="color:orange;">space bar</span>, when ready to start!'
        ]
        this.positiveSentences = [
            "Well Done!",
            "Not enough, but you will get there!",
            "That's my boy!",
            "Wicked!"
        ]
        this.negativeSentences = [
            "You are a joke...",
            "Oh boy...",
            "An eleven years old types faster than you...",
            "Jesus!",
            "What's wrong with you!"

        ]
    }

    //function that creates the ilusion of typing
    type(str) {
        let newStr = "";
        str.split("").forEach( (letter, i) => {
            setTimeout(function(){
                gameConsole.console.innerHTML = newStr += letter;
                if(i == str.split("").length - 1) gameState.introduction = true;
            }, i * 50);
        })
    }

    //prints the instructions in the game console
    renderInstructions() {
        this.type(this.instructions.join("</br></br>> "))
    }

    //returns a random positive message
    getGoodMessage() {
        this.console.style.color = "green";
        return this.positiveSentences[Math.floor(Math.random() * this.positiveSentences.length)]
    }

    //return a random negative message
    getBadMessage() {
        this.console.style.color = "red";
        return this.negativeSentences[Math.floor(Math.random() * this.negativeSentences.length)]
    }
}

const gameConsole = new Console();
class PiecesQueue {
    
    constructor(){
        this.piecesQueue = [];
        this.correctPieces = [];
        this.piecesSrc = [
            [
                "./images/dark-ball.svg",
                "./images/gray-ball.svg",
                "./images/light-ball.svg",
                "./images/orange-ball.svg",
                "./images/striped-ball.svg",
                "./images/gray-striped-ball.svg"
            ],
            [
                "./images/dark-triangle.svg",
                "./images/gray-triangle.svg",
                "./images/light-triangle.svg",
                "./images/orange-triangle.svg",
                "./images/striped-triangle.svg",
                "./images/gray-striped-triangle.svg"
            ],
            [
                "./images/dark-square.svg",
                "./images/gray-square.svg",
                "./images/light-square.svg",
                "./images/orange-square.svg",
                "./images/striped-square.svg",
                "./images/gray-striped-square.svg"
            ],
            [
                "./images/dark-rectangle.svg",
                "./images/gray-rectangle.svg",
                "./images/light-rectangle.svg",
                "./images/orange-rectangle.svg",
                "./images/striped-rectangle.svg",
                "./images/gray-striped-rectangle.svg"
            ],
            [
                "./images/dark-hexagon.svg",
                "./images/gray-hexagon.svg",
                "./images/light-hexagon.svg",
                "./images/orange-hexagon.svg",
                "./images/striped-hexagon.svg",
                "./images/gray-striped-hexagon.svg"
            ],
            [
                "./images/dark-trapeze.svg",
                "./images/gray-trapeze.svg",
                "./images/light-trapeze.svg",
                "./images/orange-trapeze.svg",
                "./images/striped-trapeze.svg",
                "./images/gray-striped-trapeze.svg"
            ]
       ];
        this.piecesNames = [
            "circle",
            "triangle",
            "square",
            "rectangle",
            "hexagon",
            "trapeze"
        ]; 
        this.container = document.querySelector(".pieces-container");       
        this.mainContainer = document.querySelector(".main-piece-container");
        this.imgContainer = document.querySelector(".container-img");
    }

    //creates randomly an object with all data needed to create a piece image
    createRandomPieceObj(){
        let namesIndex = Math.floor(Math.random() * this.piecesNames.length);
        let srcIndex = Math.floor(Math.random() * this.piecesSrc[namesIndex].length);
        let pieceObj =  {
            id: Math.floor(Math.random() * 1000),
            name: this.piecesNames[namesIndex],
            src: this.piecesSrc[namesIndex][srcIndex]
        }

        this.piecesQueue.push(pieceObj);

        this.piecesQueue.length > 7 ?
        this.container.classList.add("warning") :
        this.container.classList.remove("warning");

        return pieceObj; 
    }

    //creates a piece image tag using the object returned by 'createRandomPieceObj'
    createPiece(){
        let pieceObj = this.createRandomPieceObj();

        let piece = new Image();
        piece.src = pieceObj.src;
        piece.classList.add("slideIn");
        piece.alt = pieceObj.name;
        piece.setAttribute('data-piece', pieceObj.name);

        return piece;
    }

    renderPiece(){
        let piece = this.createPiece();
        
        if(this.piecesQueue.length == 1) {
            this.mainContainer.appendChild(piece);
        } else {
            this.container.appendChild(piece);
        }
            
    }

    //renders a manual with pieces names
    renderManualScreen(){
        let container = document.createElement("div");
        container.classList.add("manual-screen");

        this.piecesNames.map((a, i) => {
            //create a wrapper div for each pair img/name
            let imgNameDiv = document.createElement("div");
            imgNameDiv.classList.add("manual-screen-wrap");
            //creates a div with the name of the piece
            let divName = document.createElement("div");
            divName.classList.add("manual-screen-name");
            divName.innerHTML = this.piecesNames[i];

            //creates an image element and adds a class
            let image = new Image();
            image.classList.add("manual-screen-img");
            image.src = this.piecesSrc[i][i];

            //appends the img and the text to the container
            imgNameDiv.appendChild(image);
            imgNameDiv.appendChild(divName);
            container.appendChild(imgNameDiv);
        })

        this.mainContainer.appendChild(container);
    }

    renderFirstPiece(){
        let firstPiece = this.createPiece();
        this.mainContainer.innerHTML = "";
        this.mainContainer.appendChild(firstPiece);
        console.log(this.piecesQueue)
    }

    pushNewPiece(obj) {
        this.piecesQueue.push(obj);
    }

    shiftPiece() {

        let mainPiece = document.querySelector(".main-piece-container img");
        let secondPiece = document.querySelector(".pieces-container img:first-child");

        this.correctPieces.push(this.piecesQueue[0]);

        this.piecesQueue.shift();
        
        if(this.piecesQueue.length >= 1){
            secondPiece.classList.remove("slideIn");
            this.container.removeChild(secondPiece);
            this.mainContainer.appendChild(secondPiece);
        }
        
        this.mainContainer.removeChild(mainPiece);

    }

    clearQueue() {
        this.mainContainer.innerHTML = "";
        this.container.innerHTML = "";
        this.piecesQueue = [];
    }

    renderCorrectPieces() {
        this.correctPieces.forEach(obj => {
            let img = new Image();
            img.src = obj.src;
            this.imgContainer.appendChild(img);
        })
    }

    clearCorrectPiecesContainer(){
        this.correctPieces = [];
        this.imgContainer.innerHTML = "";
    }

    
    info(){
        console.log(`
        Queue lenght: ${this.getQueueLength()}
        Pieces Sources length: ${this.piecesSrc.length}
        Pieces on Queue: ${JSON.stringify(this.piecesQueue)}
        `)
    }

    getQueueLength(){
        return this.piecesQueue.length;
    }
}

const pieces = new PiecesQueue();





//helper function to create audio
const createAudio = str => {
    let audio = new Audio();
    audio.src = str;

    return audio;
}

let audio = {
    theme: createAudio("./audio/dafunk.mp3"),
}
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