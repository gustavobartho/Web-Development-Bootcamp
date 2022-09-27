var randomNumber1 = Math.floor(Math.random() * 6) + 1;
document.querySelector(".img1").setAttribute('src', './images/dice' + randomNumber1 + '.png');

var randomNumber2 = Math.floor(Math.random() * 6) + 1;
document.querySelector(".img2").setAttribute('src', './images/dice' + randomNumber2 + '.png');

var title = document.querySelector("#title h1");
if (randomNumber1 > randomNumber2) {
    title.textContent = "😄 Player 1 Wins!";
}

if (randomNumber1 < randomNumber2) {
    title.textContent = "Player 2 Wins! 😄";
}

if (randomNumber1 === randomNumber2) {
    title.textContent = "Draw!";
}