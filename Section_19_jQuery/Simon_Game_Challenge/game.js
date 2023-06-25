const buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern;
var userClickedPattern;
var started;
var level;
var currentLevel;

/**********************/

function flashButtonAndPlaySound(buttonId) {
    $("#" + buttonId).fadeOut(250).fadeIn(250);
    let audio = new Audio('sounds/' + buttonId + '.mp3');
    audio.play();
}

function nextSequence() {
    level += 1;
    currentLevel = 0;
    userClickedPattern = [];
    $('#level-title').text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChoseColor = buttonColors[randomNumber];

    gamePattern.push(randomChoseColor);
    flashButtonAndPlaySound(randomChoseColor);
}

function checkAnswer() {
    if (started) {
        if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
            currentLevel += 1;

        } else {
            setTimeout(wrongSequence, 200);
            restart();
            return;
        }
        if (currentLevel > level) {
            setTimeout(rightSequence, 200);
            setTimeout(nextSequence, 900);
        }

    }
}

function restart() {
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    level = -1;
    currentLevel = 0;
}

function rightSequence() {
    $("body").addClass("right");
    setTimeout(() => { $("body").removeClass("right") }, 100);
}

function wrongSequence() {
    $('#level-title').text("Game Over, Press a key to Start");
    $("body").addClass("wrong");
    setTimeout(() => { $("body").removeClass("wrong") }, 300);
}

/**********************/

restart();

$(".btn").click((event) => {
    let userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    flashButtonAndPlaySound(userChosenColor);
    checkAnswer();
});

$("body").keypress((event) => {
    if (!started) {
        restart();
        started = true;
        nextSequence();
    }
});





