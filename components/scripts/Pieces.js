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

    renderFirstPiece(){
        let firstPiece = this.createPiece();
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




