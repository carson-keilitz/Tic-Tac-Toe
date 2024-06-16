class Player {
    constructor(name, marker) {
        this.name = name
        this.marker = marker
    }

    changeMarker() {
        if (this.marker === 'X') {
            this.marker = 'O';
        }
        else {
            this.marker = 'X';
        }
    }
}

class Gameboard {
    constructor() {
        this.gameboard = []
        this.player1 = new Player('Player 1', 'X');
        this.player2 = new Player('Player 2', 'O');
        this.currentPlayer = 1;
        this.createGameboard();
        this.moveCount = 0;
    }
    //create 2d array
    createGameboard() {
        for (let i = 0; i < 3; i++) {
            this.gameboard.push([]);
            for (let j = 0; j < 3; j++) {
                this.gameboard[i].push('');
            }
        }
        console.log("Created gameboard")
    }
    //Checks if location is a valid move
    validMove(player, x, y) {
        if (this.gameboard[y][x] === '') {
            this.updateBoard(player, x, y);
            return true;
        }
        return false;
    }

    updateBoard(player, x, y) {
        this.gameboard[y][x] = player.marker;
        let id = y * 3 + x
        let button = document.getElementById(id)
        let optionX = `
        <svg width="158" height="158" viewBox="0 0 158 158" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M97.5473 79.0041L155.581 20.9743C157.641 18.9135 157.641 15.5788 155.581 13.5187L144.49 2.42358C143.502 1.43645 142.161 0.880661 140.762 0.880661C139.363 0.880661 138.022 1.43645 137.035 2.42358L79.001 60.4578L20.9675 2.42358C19.9797 1.43645 18.6392 0.880661 17.2397 0.880661C15.8406 0.880661 14.4997 1.43645 13.5123 2.42358L2.42121 13.5187C0.36048 15.5788 0.36048 18.9135 2.42121 20.9743L60.4548 79.0044L2.42698 137.027C0.367263 139.088 0.367263 142.423 2.42698 144.483L13.5187 155.578C14.5059 156.565 15.8467 157.121 17.2462 157.121C18.6456 157.121 19.9861 156.565 20.9743 155.578L79.0007 97.5507L137.027 155.578C138.015 156.565 139.356 157.121 140.755 157.121C142.155 157.121 143.495 156.565 144.483 155.578L155.574 144.483C157.634 142.423 157.634 139.088 155.574 137.027L97.5473 79.0041Z" fill="#A5A5A5" stroke="#A5A5A5" stroke-width="0.00156251"/>
        </svg>
        `;
    
        let optionO = `
            <svg width="158" height="158" viewBox="0 0 158 158" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_1_42)">
                <circle cx="79" cy="79" r="79" fill="#A5A5A5"/>
                <circle cx="79" cy="79" r="58" fill="#EDD7AC"/>
                </g>
                <defs>
                <clipPath id="clip0_1_42">
                <rect width="158" height="158" fill="white"/>
                </clipPath>
                </defs>
            </svg>
        `;
        // Example usage (replace this with your actual logic)
        let svg = (this.gameboard[y][x] === 'X') ? optionX : optionO;
        
        console.log(svg)
        button.innerHTML = svg;
        if (this.checkWin(player) ) {
            this.manageModal(player.name + ' wins!')
        }
        else if (this.moveCount === 8) {
            this.manageModal('It is a tie!')
        }
            else {
            console.log('No winner yet');
            this.moveCount += 1
            console.log(this.moveCount)
            this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
        }
    }

    checkWin(player) {
        let marker = player.marker;
        //Three win conditions, 3 rows, 3 columns, 2 diagonals
        //check rows
        for (let i = 0; i < 3; i++) {
            if (this.gameboard[i][0] === marker && this.gameboard[i][1] === marker && this.gameboard[i][2] === marker) {
                return true;
            }
        }
        //check columns
        for (let i = 0; i < 3; i++) {
            if (this.gameboard[0][i] === marker && this.gameboard[1][i] === marker && this.gameboard[2][i] === marker) {
                return true;
            }
        }
        //check diagonals
        if (this.gameboard[0][0] === marker && this.gameboard[1][1] === marker && this.gameboard[2][2] === marker) {
            return true;
        }
        if (this.gameboard[0][2] === marker && this.gameboard[1][1] === marker && this.gameboard[2][0] === marker) {
            return true;
        }
        return false;
    }



    resetBoard() {
        this.gameboard = []
        const buttons = document.querySelectorAll('.game-board-position')
        buttons.forEach(button => {
            // delete inner html
            button.innerHTML = '';
        })
        this.createGameboard();
        this.moveCount = 0;
    }

    addButtonListeners() {
        const playerButtons = document.querySelectorAll('.choose-player-button')
        playerButtons.forEach(button => {
            console.log("Add button listener")
            button.addEventListener('click', () => {
                if (button.id === 'X' && this.player1.marker !== 'X') {
                    this.player1.changeMarker();
                    this.player2.changeMarker();
                    this.resetBoard()
                    this.currentPlayer = 1
                }
                else if (button.id === 'O' && this.player1.marker !== 'O') {
                    this.player1.changeMarker();
                    this.player2.changeMarker();
                    this.resetBoard();
                    this.currentPlayer = 1
                }
                else {
                    this.resetBoard();
                    this.currentPlayer = 1
                }
            })
        })
        console.log("Finish button listeners")
    }

    addBoardListeners() {
        console.log("Adding board listeners")
        const boardButtons = document.querySelectorAll('.game-board-position')
        boardButtons.forEach(button => {
            button.addEventListener('click', () => {
                console.log("Board button clicked")
                let y = Math.floor(button.id / 3);
                let x = (button.id % 3);
                // Check if it is valid move
                if (this.validMove(this.currentPlayer === 1 ? this.player1 : this.player2, x, y)) {
                    console.log("Valid move")
                    console.log(`buttonId: ${button.id} y: ${y}, x: ${x}`)
                }

            })
        })
    }

    addResetButtonListener() {
        const resetButton = document.querySelector('.reset-game-button')
        resetButton.addEventListener('click', () => this.resetBoard())
    }

    manageModal(result) {
        const winner = document.querySelector('.winner')
        winner.innerText = result
        winner.showModal();
        // pause for 2 seconds
        winner.addEventListener('click', (e) => {
            const dialogDimensions = winner.getBoundingClientRect()
            if (
                e.clientX < dialogDimensions.left ||
                e.clientX > dialogDimensions.right ||
                e.clientY < dialogDimensions.top ||
                e.clientY > dialogDimensions.bottom
            ) {
                this.resetBoard();
                this.currentPlayer = this.player1.marker === 'X' ? 1 : 2;
                winner.close()
            }
        })
    }
}

function closeModal() {
    const modal = document.querySelector('.winner')
    modal.style.display = 'none';
}




const game = new Gameboard();
game.addButtonListeners();
game.addBoardListeners();
game.addResetButtonListener();


