class Choice {
    constructor(name, defeats) {
        this.name = name;
        this.defeats = defeats;
    }
}

const rock = new Choice('rock', 'scissors');
const paper = new Choice('paper', 'rock');
const scissors = new Choice('scissors', 'paper');

const choices = [rock, paper, scissors];

export { choices };