function Player(name, marker) {
    this.name = name;
    this.marker = marker;
}

function Gameboard() {
    let gameboard = [];
    //create 2d array
    function createGameboard() {
        for (let i = 0; i < 3; i++) {
            gameboard.push([]);
            for (let j = 0; j < 3; j++) {
                gameboard[i].push('');
            }
        }
    }
    //Checks if location is a valid move
    function validMove(player, x, y) {
        if (gameboard[x][y] === '') {
            updateBoard(player, x, y);
            return true;
        }
        return false;
    }

    function updateBoard(player, x, y) {
        gameboard[x][y] = player.marker;
    }

    function checkWin(player) {
        let marker = player.marker;
        //Three win conditions, 3 rows, 3 columns, 2 diagonals
        //check rows
        for (let i = 0; i < 3; i++) {
            if (gameboard[i][0] === marker && gameboard[i][1] === marker && gameboard[i][2] === marker) {
                return true;
            }
        }
        //check columns
        for (let i = 0; i < 3; i++) {
            if (gameboard[0][i] === marker && gameboard[1][i] === marker && gameboard[2][i] === marker) {
                return true;
            }
        }
        //check diagonals
        if (gameboard[0][0] === marker && gameboard[1][1] === marker && gameboard[2][2] === marker) {
            return true;
        }
        if (gameboard[0][2] === marker && gameboard[1][1] === marker && gameboard[2][0] === marker) {
            return true;
        }
        return false;
    }
}