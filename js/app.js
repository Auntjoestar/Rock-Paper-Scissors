import * as Choices from './choices.js';
document.addEventListener('DOMContentLoaded', function() {
    const selectionView = document.getElementById('selection-view');
    const loadingView = document.getElementById('loading-view');
    const resultView = document.getElementById('result-view');
    const playButton = document.querySelector('#play');

    selectionView.style.display = 'block';
    loadingView.style.display = 'none';
    resultView.style.display = 'none';
    playButton.style.display = 'none';

    humanChoice();

    const selectedChoice = document.querySelector('#selection');

    
});

function humanChoice() {
    const choices = document.querySelectorAll('.choices');
    choices.forEach(choice => {
        choice.addEventListener('click', function() {
            const selectedChoice = choice.getAttribute('data-choice');
            const showSelected = document.querySelector('#selection');
            const playButton = document.querySelector('#play');

            showSelected.textContent = selectedChoice;
            playButton.style.display = 'block';
            

            playRound(selectedChoice);
        });
    });
}

function playRound(humanChoice) {
    const playButton = document.querySelector('#play');
    const selectionView = document.getElementById('selection-view');
    const loadingView = document.getElementById('loading-view');
    const resultView = document.getElementById('result-view');

    playButton.addEventListener('click', function () {
        playButton.style.display = 'none';
        selectionView.style.display = 'none';
        loadingView.style.display = 'block';
        resultView.style.display = 'none';

        const computerChoice = getComputerChoice();

        
        let threeSeconds = 3000;

        setTimeout(() => {
        if (humanChoice === computerChoice.name) {
            displayResult('It\'s a tie!', humanChoice, computerChoice);
            return;
        }
        if (humanChoice === computerChoice.defeats) {
            displayResult('You lose!', humanChoice, computerChoice);
            return;
        }
        displayResult('You win!', humanChoice, computerChoice);
        return;
        }, threeSeconds);
    }); 

}

function getComputerChoice() {
    const randomChoice = Math.floor(Math.random() * Choices.choices.length);
    return Choices.choices[randomChoice];
}

function displayResult(message, humanChoice, computerChoice) {
    const selectionView = document.getElementById('selection-view');
    const loadingView = document.getElementById('loading-view');
    const resultView = document.getElementById('result-view');

    const player = document.querySelector('#player');
    const computer = document.querySelector('#computer');
    const result = document.querySelector('#result');

    const playAgainButton = document.querySelector('#play-again');

    selectionView.style.display = 'none';
    loadingView.style.display = 'none';
    resultView.style.display = 'block';

    player.textContent = humanChoice;
    computer.textContent = computerChoice.name;
    result.textContent = message;

    playAgainButton.addEventListener('click', function() {
        playAgain();
    });
}

function playAgain() {
    const selectionView = document.getElementById('selection-view');
    const loadingView = document.getElementById('loading-view');
    const resultView = document.getElementById('result-view');
    const playAgainButton = document.querySelector('#play-again');
    const humanChoice = document.querySelector('#selection');

    selectionView.style.display = 'block';
    loadingView.style.display = 'none';
    resultView.style.display = 'none';
    playAgainButton.style.display = 'none';
    humanChoice.textContent = '';

}