//Elements
let startBtn = document.querySelector(".start-btn");//start button
let startScreen = document.querySelector(".start-screen");//start screen
let gameInput = document.querySelector(".game-input");//input
let gameConsole = document.querySelector(".message-console .console-text")//console

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
    startScreen.style.transform = "translateY(-110vh)";
    gameInput.focus();
    setTimeout(function(){
        type("1... 2... 3... T!PE");
    }, 1000);

}


//Start button "click" event
startBtn.addEventListener("click", liftStartScreen, false);


