let currentPlayer = 'X';
        let gameBoard = ['', '', '', '', '', '', '', '', ''];
        let gameActive = true;

        // Initialize board
        function createBoard() {
            const board = document.getElementById('board');
            board.innerHTML = '';
            for (let i = 0; i < 9; i++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.setAttribute('data-index', i);
                cell.addEventListener('click', handleCellClick);
                board.appendChild(cell);
            }
        }
        // Handle human player move
        function handleCellClick(e) {
            const index = e.target.getAttribute('data-index');
            
            if (gameBoard[index] !== '' || !gameActive || currentPlayer === 'O') return;

            makeMove(index, 'X');
            
            if (checkWin()) {
                const audio = document.getElementById('audio');
                document.getElementById('status').textContent = 'You win!';
                gameActive = false;
                return;
            }
            if (checkDraw()) {
                document.getElementById('status').textContent = 'Draw!';
                gameActive = false;
                return;
            }

            currentPlayer = 'O';
            document.getElementById('status').textContent = "AI's turn...";
            
            setTimeout(aiMove, 500); // Delay AI move for better UX
        }

        // AI move logic (medium difficulty)
        function aiMove() {
            // Try to win if possible
            let move = findWinningMove('O');
            if (move === null) {
                // Block human win if possible
                move = findWinningMove('X');
                if (move === null) {
                    // Choose random available cell
                    const emptyCells = gameBoard
                        .map((cell, index) => cell === '' ? index : null)
                        .filter(cell => cell !== null);
                    move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
                }
            }
            
            makeMove(move, 'O');
            
            if (checkWin()) {
                document.getElementById('status').textContent = 'AI wins!';
                gameActive = false;
                return;
            }
            
            if (checkDraw()) {
                document.getElementById('status').textContent = 'Draw!';
                gameActive = false;
                return;
            }
            
            currentPlayer = 'X';
            document.getElementById('status').textContent = 'Your turn (X)';
        }

        function findWinningMove(player) {
            const winCombinations = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
                [0, 4, 8], [2, 4, 6] // Diagonals
            ];

            for (const combo of winCombinations) {
                const [a, b, c] = combo;
                if (gameBoard[a] === player && gameBoard[b] === player && gameBoard[c] === '') return c;
                if (gameBoard[a] === player && gameBoard[c] === player && gameBoard[b] === '') return b;
                if (gameBoard[b] === player && gameBoard[c] === player && gameBoard[a] === '') return a;
            }
            return null;
        }

        function makeMove(index, player) {
            gameBoard[index] = player;
            document.querySelectorAll('.cell')[index].textContent = player;
        }

        function checkWin() {
            const winCombinations = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
                [0, 4, 8], [2, 4, 6] // Diagonals
            ];

            for (const combo of winCombinations) {
                const [a, b, c] = combo;
                if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                    highlightWinner(combo);
                    return true;
                }
            }
            return false;
        }

        function highlightWinner(combo) {
            combo.forEach(index => {
                document.querySelectorAll('.cell')[index].classList.add('winning-cell');
            });
        }

        function checkDraw() {
            return !gameBoard.includes('');
        }

        function resetGame() {
            gameBoard = ['', '', '', '', '', '', '', '', ''];
            currentPlayer = 'X';
            gameActive = true;
            document.getElementById('status').textContent = 'Your turn (X)';
            document.querySelectorAll('.cell').forEach(cell => {
                cell.textContent = '';
                cell.classList.remove('winning-cell');
            });
        }

        // Initialize the game
        createBoard();

        document.addEventListener('DOMContentLoaded', () => {


            VANTA.BIRDS({
              el: "#vanta-background",
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.00,
              minWidth: 200.00,
              scale: 1.00,
              scaleMobile: 1.00,
              backgroundColor: 0xc6dadb,
              birdSize: 1.70,
              wingSpan: 28.00,
              separation: 23.00
            });
              document.querySelector('.sound-button').addEventListener('click', () => {
                const audio = document.getElementById('sound-effect');
                audio.play();
                document.location.href = 'html-bird.html';
              });
            });