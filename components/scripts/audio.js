//helper function to create audio
const createAudio = str => {
    let audio = new Audio();
    audio.src = str;

    return audio;
}

let audio = {
    theme: createAudio("./audio/dafunk.mp3"),
}