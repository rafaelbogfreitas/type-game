class Console {
    constructor(){
        this.console = document.querySelector(".message-console .console-text")//console
        this.instructions = [
            "t!pe the name of the shape you see on the left of the screen and hit Enter",
            "If right you get 50 points for a piece and 150 for clearing the queue",
            "don't let the queue flood with pieces or you will LOSE! Hit the space bar!"
                 
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
        this.type(this.instructions.join("</br>> "))
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