// Add event when the buttons are clicked
document.querySelectorAll("button.drum").forEach((drum) => {
    drum.addEventListener('click', () => {
        handleClick(drum.className.split(' ')[0]);
        buttonAnimation(drum.className.split(' ')[0]);
    });
});

// Add event when a keyboard key is pressed
document.addEventListener('keydown', (event) => {
    handleClick(event.key);
    buttonAnimation(event.key);
})

function handleClick(currentKey) {
    let audioFile = './sounds/';
    switch (currentKey) {
        case 'w':
            audioFile += 'tom-1.mp3';
            break;
        case 'a':
            audioFile += 'tom-2.mp3';
            break;
        case 's':
            audioFile += 'tom-3.mp3';
            break;
        case 'd':
            audioFile += 'tom-4.mp3';
            break;
        case 'j':
            audioFile += 'snare.mp3';
            break;
        case 'k':
            audioFile += 'crash.mp3';
            break;
        case 'l':
            audioFile += 'kick-bass.mp3';
            break;
        default:
            return;
    }
    (new Audio(audioFile)).play();
}

function buttonAnimation(currentKey) {
    let activeButton = document.querySelector('.' + currentKey);
    activeButton.classList.add('pressed');
    setTimeout(() => activeButton.classList.remove('pressed'), 200);
}