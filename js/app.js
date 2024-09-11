document.addEventListener('DOMContentLoaded', function() {
    console.log(playGame());
});

function getComputerChoice() {
    const scissors = {
        name: 'scissors',
        defeats: 'paper'
    };
    const rock = {
        name: 'rock',
        defeats: 'scissors'
    };
    const paper = {
        name: 'paper',
        defeats: 'rock'
    };
    const choices = [scissors, rock, paper];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

function getHumanChoice() {
    let HumanChoice = prompt("Rock, Paper or Scissors?").toLocaleLowerCase();
    while (HumanChoice !== 'rock' && HumanChoice !== 'paper' && HumanChoice !== 'scissors') {
        alert('Invalid choice! Please choose Rock, Paper or Scissors.');
        HumanChoice = prompt("Rock, Paper or Scissors?");
    }
    return HumanChoice;
}

function playRound() {
    const computerChoice = getComputerChoice();
    const humanChoice = getHumanChoice();
    if (computerChoice.name === humanChoice) {
        return ['It\'s a tie!', 0];
    }
    if (computerChoice.defeats === humanChoice) {
        return ['Computer wins!', -1];
    }
    return ['Human wins!', 1];
}

function playGame() {
    roundScores = 0;
    for (let i = 0; i < 5; i++) {
        result = playRound();
        console.log(result[0]);
        roundScores += result[1];
    }
    if (roundScores !== 0) {
        if (roundScores > 0) {
            return 'Human wins the game!';
        }
        return 'Computer wins the game!';
    }
    return 'It\'s a tie!';
}