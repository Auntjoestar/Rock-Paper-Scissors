import * as Choices from './choices.js';
document.addEventListener('DOMContentLoaded', function() {
    const selectionView = document.getElementById('selection-view');
    const loadingView = document.getElementById('loading-view');
    const resultView = document.getElementById('result-view');
    const playButton = document.querySelector('#play');
    const playerScoreDisplay = document.querySelector('#player-score');
    const computerScoreDisplay = document.querySelector('#computer-score');

    selectionView.style.display = 'block';
    loadingView.style.display = 'none';
    resultView.style.display = 'none';
    playButton.style.display = 'none';
    
    playerScoreDisplay.textContent = localStorage.getItem('playerScore');
    computerScoreDisplay.textContent = localStorage.getItem('computerScore');

    humanChoice();
});


if (localStorage.getItem('playerScore') === null) {
    localStorage.setItem('playerScore', 0);
}

if (localStorage.getItem('computerScore') === null) {
    localStorage.setItem('computerScore', 0);
}

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

        const playerScoreDisplay = document.querySelector('#player-score');
        const computerScoreDisplay = document.querySelector('#computer-score');

        const computerChoice = getComputerChoice();

        
        let threeSeconds = 3000;

        setTimeout(() => {
        if (humanChoice === computerChoice.name) {
            displayResult('It\'s a tie!', humanChoice, computerChoice);
            return;
        }
        if (humanChoice === computerChoice.defeats) {
            const computerScore = parseInt(localStorage.getItem('computerScore'));
            localStorage.setItem('computerScore', computerScore + 1);
            computerScoreDisplay.textContent = localStorage.getItem('computerScore');
            displayResult('You lose!', humanChoice, computerChoice);
            return;
        }
        
        const humanScore = parseInt(localStorage.getItem('playerScore'));
        localStorage.setItem('playerScore', humanScore + 1);
        playerScoreDisplay.textContent = localStorage.getItem('playerScore');
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
    const humanChoice = document.querySelector('#selection');

    selectionView.style.display = 'block';
    loadingView.style.display = 'none';
    resultView.style.display = 'none';
    humanChoice.textContent = '';

    humanChoice();
}