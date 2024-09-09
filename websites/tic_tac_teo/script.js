let turn = 'X';
let winner = null;
let board = ['', '', '', '', '', '', '', '', ''];
let gameStarted = false;

// Function to handle cell click
function cellClick(event) {
    if (!gameStarted) {
        gameStarted = true;
    }
    const cellId = event.target.id;
    const cellIndex = parseInt(cellId.split('-')[1]);
    if (board[cellIndex] === '') {
        board[cellIndex] = turn;
        event.target.textContent = turn;
        checkWinner();
        turn = (turn === 'X') ? 'O' : 'X';
        document.getElementById('turn').textContent = `Turn: ${turn}`;
    }
}

// Function to check winner
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < winningCombinations.length; i++) {
        const combination = winningCombinations[i];
        if (board[combination[0]] === board[combination[1]] && board[combination[1]] === board[combination[2]] && board[combination[0]] !== '') {
            winner = board[combination[0]];
            document.getElementById('winner').textContent = `Winner: ${winner}`;
            break;
        }
    }
    if (winner === null && board.every(cell => cell !== '')) {
        document.getElementById('winner').textContent = 'It\'s a tie!';
    }
}


// Function to reset game
function resetGame() {
    turn = 'X';
    winner = null;
    board = ['', '', '', '', '', '', '', '', ''];
    gameStarted = false;
    document.getElementById('turn').textContent = `Turn: ${turn}`;
    document.getElementById('winner').textContent = '';
    for (let i = 0; i < 9; i++) {
        document.getElementById(`cell-${i}`).textContent = '';
        document.getElementById(`cell-${i}`).style.backgroundColor = ''; // Reset cell background color
    }
}
// Add event listeners to cells
for (let i = 0; i < 9; i++) {
    document.getElementById(`cell-${i}`).addEventListener('click', cellClick);
}

// Add event listener to reset button
document.getElementById('reset-button').addEventListener('click', resetGame);