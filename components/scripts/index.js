//Elements
let startBtn = document.querySelector(".start-btn");//start button
let startScreen = document.querySelector(".start-screen");//start screen

//function that makes the start screen slide up off the viewport
const liftStartScreen = () => startScreen.style.transform = "translateY(-100vh)";

//Start button "click" event
startBtn.addEventListener("click", liftStartScreen, false);


