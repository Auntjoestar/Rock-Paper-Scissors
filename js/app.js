import * as Choices from './choices.js';

document.addEventListener('DOMContentLoaded', function() {
    loadGame();
});

function loadGame() {
    const selectionView = document.getElementById('selection-view');
    const loadingView = document.getElementById('loading-view');
    const resultView = document.getElementById('result-view');
    const playButton = document.querySelector('#play');
    const playerScoreDisplay = document.querySelector('#player-score');
    const computerScoreDisplay = document.querySelector('#computer-score');
    const winner = document.querySelector('#winner');

    const playerScore = localStorage.getItem('playerScore');
    const computerScore = localStorage.getItem('computerScore');

    if (playerScore >= 5 || computerScore >= 5) {
        localStorage.setItem('playerScore', 0);
        localStorage.setItem('computerScore', 0);
        playerScoreDisplay.textContent = 0;
        computerScoreDisplay.textContent = 0;
    }

    selectionView.style.display = 'block';
    loadingView.style.display = 'none';
    resultView.style.display = 'none';
    playButton.style.display = 'none';

    winner.textContent = '';
    
    playerScoreDisplay.textContent = localStorage.getItem('playerScore') || 0;
    computerScoreDisplay.textContent = localStorage.getItem('computerScore') || 0;

    humanChoice();
}

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

            // use onclick instead of addEventListener to prevent multiple event listeners.
            playButton.onclick = () => playRound(selectedChoice);
        });
    });
}

function playRound(humanChoice) {
    const selectionView = document.getElementById('selection-view');
    const loadingView = document.getElementById('loading-view');
    const resultView = document.getElementById('result-view');
    const playerScoreDisplay = document.querySelector('#player-score');
    const computerScoreDisplay = document.querySelector('#computer-score');

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
            let computerScore = parseInt(localStorage.getItem('computerScore'));
            computerScore += 1;
            localStorage.setItem('computerScore', computerScore);
            computerScoreDisplay.textContent = computerScore;
            displayResult('You lose!', humanChoice, computerChoice);
            return;
        }

        let humanScore = parseInt(localStorage.getItem('playerScore'));
        humanScore += 1;
        localStorage.setItem('playerScore', humanScore);
        playerScoreDisplay.textContent = humanScore;
        displayResult('You win!', humanChoice, computerChoice);
    }, threeSeconds);
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
    const winner = document.querySelector('#winner');

    const playAgainButton = document.querySelector('#play-again');

    selectionView.style.display = 'none';
    loadingView.style.display = 'none';
    resultView.style.display = 'block';

    player.textContent = humanChoice;
    computer.textContent = computerChoice.name;
    result.textContent = message;

    if (localStorage.getItem('playerScore') >= 5) {
        winner.textContent = 'You win the game!';
    }
    else if (localStorage.getItem('computerScore') >= 5) {
        winner.textContent = 'Computer wins the game!';
    }

    playAgainButton.onclick = playAgain;
}

function playAgain() {
    const selectionView = document.getElementById('selection-view');
    const loadingView = document.getElementById('loading-view');
    const resultView = document.getElementById('result-view');
    const humanChoice = document.querySelector('#selection');
    const playButton = document.querySelector('#play');
    const winner = document.querySelector('#winner');

    selectionView.style.display = 'block';
    loadingView.style.display = 'none';
    resultView.style.display = 'none';
    humanChoice.textContent = '';
    playButton.style.display = 'none';
    winner.textContent = '';

    const playerScoreDisplay = document.querySelector('#player-score');
    const computerScoreDisplay = document.querySelector('#computer-score');
    
    if (localStorage.getItem('playerScore') >= 5) {
        localStorage.setItem('playerScore', 0);
        localStorage.setItem('computerScore', 0);
        playerScoreDisplay.textContent = 0;
        computerScoreDisplay.textContent = 0;
    }
    else if (localStorage.getItem('computerScore') >= 5) {
        localStorage.setItem('playerScore', 0);
        localStorage.setItem('computerScore', 0);
        playerScoreDisplay.textContent = 0;
        computerScoreDisplay.textContent = 0;
    }

    playerScoreDisplay.textContent = localStorage.getItem('playerScore');
    computerScoreDisplay.textContent = localStorage.getItem('computerScore');
}
