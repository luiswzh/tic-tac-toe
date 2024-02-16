const gameboard = (function () {
    const tiles = Array.from(new Array(3), () => [0, 0, 0]);

    //Get board current status
    const get = () => {
        return tiles.map((col) => col.slice()); //returns a copy of the board
    };

    //Fill tile with mark
    const fill = (mark, row, column) => {
        //Checks if row and column is valid
        if (!(typeof (row) == 'number' && typeof (column) == 'number')) {
            console.log('Error: unvalid coordinate - not a number');
            return false;
        }

        if (row < 1 || row > 3) {
            console.log('Error: unvalid coordinate - row out of bound');
            return false;
        }

        if (column < 1 || column > 3) {
            console.log('Error: unvalid coordinate - column out of bound');
            return false;
        }

        if (isNaN(row)) {
            console.log('Error: unvalid coordinate - row is not a number');
            return false;
        }

        if (isNaN(column)) {
            console.log('Error: unvalid coordinate - column is not a number');
            return false;
        }

        //Corrected coordinates
        const _row = row - 1;
        const _column = column - 1;

        //Checks if the inserted coordinates are valid
        //Checks if tile is marked
        const currentMark = tiles[_row][_column];
        if (currentMark == 'X' || currentMark == 'O') {
            console.log('Error: tile is already marked');
            return false;
        }

        //Checks if mark is valid
        const _mark = checkMark(mark);
        if (!_mark) {
            return false;
        }

        //fills tile
        tiles[_row][_column] = _mark;

        return true;
    };

    //Resets the board
    const reset = () => {
        tiles.forEach((a, i) => tiles[i].forEach((b, j) => tiles[i][j] = 0));
        return true;
    }

    //Checks if a mark won
    const checkWin = (mark) => {
        //row and column check
        const _mark = checkMark(mark);
        if (!_mark) {
            return false;
        }

        for (let i = 0; i <= 2; i++) {
            //row check
            if (tiles[i][0] == _mark &&
                tiles[i][1] == _mark &&
                tiles[i][2] == _mark
            ) {
                return [true, 'row', i + 1];
            };

            //column check
            if (tiles[0][i] == _mark &&
                tiles[1][i] == _mark &&
                tiles[2][i] == _mark
            ) {
                return [true, 'column', i + 1];
            };
        }

        //diagonal check
        if (tiles[0][0] == _mark &&
            tiles[1][1] == _mark &&
            tiles[2][2] == _mark
        ) {
            return [true, 'diagonal', 1];
        };

        if (tiles[2][0] == _mark &&
            tiles[1][1] == _mark &&
            tiles[0][2] == _mark
        ) {
            return [true, 'diagonal', 2];
        };

        return false;
    }

    //Internal mark input filter
    const checkMark = (mark) => {
        //Checks if the mark is valid
        if (typeof (mark) != 'string') {
            console.log('Error: unvalid mark - not a string');
            return false;
        }

        if (mark.length > 1) {
            console.log('Error: unvalid mark - not a single character');
            return false;
        }

        const _mark = mark.toUpperCase();

        if (!(_mark == 'X' || _mark == 'O')) {
            console.log('Error: unvalid mark - accepted marks are X and O');
            return false;
        }
        return _mark;

    }

    //Console game
    const play = () => {
        roundPlay = (mark) => {
            console.log(mark + ' turn');
            row = Number(prompt('row: '));
            column = Number(prompt('column: '));

            //Fills the tile, if an error happens a new round for the mark is played
            if (!fill(mark, row, column)) {
                return false;
            }

            //Shows gameboard state
            console.log(tiles[0]);
            console.log(tiles[1]);
            console.log(tiles[2]);



            if (checkWin(mark)[0]) {
                console.log(mark + ' won!');
                return 'win';
            }

            return true;
        };

        reset();
        let round = 1;
        let row, column, result;
        while (round <= 9) {
            //X plays first!
            if (round % 2 == 0) {
                result = roundPlay('O');
            } else {
                result = roundPlay('X');
            }

            if (result == false) {
                continue;
            }

            if (result == 'win') {
                break;
            }

            if (round == 9) {
                console.log('It\'s a tie!');
            }
            round++;
        }
        return 'thanks for playing!'
    }


    return {
        get,
        fill,
        reset,
        checkWin,
        play
    };
})();

(function () {
    //Initializing scripts

    //Name object
    let name = {
        'X': 'Player 1',
        'O': 'Player 2'
    };

    //Tile elements
    const tiles = document.querySelectorAll('.gameboard .tile');

    //Play button
    const playBtn = document.querySelector('.play');

    //Dialog elements
    const dialog = document.querySelector('dialog');
    const nameXInput = document.querySelector('#x-player');
    const nameOInput = document.querySelector('#o-player');
    const roundInput = document.querySelector('#rounds');
    const startBtn = document.querySelector('#start');
    
    const render = (function () {
        //Elements selectors
        //Scoreboard elements
        const nameXElement = document.querySelector('.x-player .name');
        const nameOElement = document.querySelector('.o-player .name');
        const scoreXElement = document.querySelector('.x-player .score');
        const scoreOElement = document.querySelector('.o-player .score');

        //Scoreboard updates
        const nameRender = (nameX, nameO) => {
            nameXElement.textContent = nameX;
            nameOElement.textContent = nameO;
            return true;
        };

        const scoreRender = (scoreX, scoreO) => {
            if (scoreX > 0){
                scoreXElement.textContent = String(scoreX);
            } else {
                scoreXElement.textContent = 'O';
            };
            if (scoreO > 0){
                scoreOElement.textContent = String(scoreO);
            } else {
                scoreOElement.textContent = 'O';
            };
            return true;
        };

        //Tiles render
        const tilesRender = (gameboard, mark, tiles) => {
            const flatGameboard = gameboard.flat();
            tiles.forEach((tile,i)=>{
                if(flatGameboard[i] == 'X'){
                    tile.innerHTML='<img src="./images/alpha-x.svg" alt="x-mark" class="x-mark"></img>';
                    return;
                }
                if(flatGameboard[i] == 'O'){
                    tile.innerHTML='<img src="./images/alpha-o.svg" alt="o-mark" class="o-mark">';
                    return;
                }
                if(mark == 'X'){
                    tile.innerHTML='<img src="./images/alpha-x.svg" alt="x-mark" class="x-mark-shadow">';
                    return;
                }
                if(mark == 'O'){
                    tile.innerHTML='<img src="./images/alpha-o.svg" alt="o-mark" class="o-mark-shadow">';
                    return;
                }
                alert('Error in tile rendering!');
            });
        };

        return {
            nameRender,
            scoreRender,
            tilesRender
        };
    })();

    const game = (function(gameboard, render, tiles){
        //Play a turn (tile handler)
        const playTurn = (tileID)=>{
            const id = tileID;
            let row, column;
            let winCheck;
            if(id>5){
                row = 3;
                column = id-5;
            } else if(id>2){
                row = 2;
                column = id-2;
            } else {
                row = 1;
                column = id+1;
            }

            return function(){
                if(currentPlayer=='X'){
                    gameboard.fill('X',row,column);
                }
                if(currentPlayer=='O'){
                    gameboard.fill('O',row,column);
                }
                tiles[id].removeEventListener('click',handlerArray[id]);
                
                winCheck = gameboard.checkWin(currentPlayer);
                if(winCheck[0]){
                    alert('Round '+roundCount+' winner is '+name[currentPlayer]+' ('+currentPlayer+')');
                    roundCount++;
                    score[currentPlayer]++;
                    render.scoreRender(score.X,score.O);
                    playRound();
                    return;
                }

                currentPlayer = (currentPlayer == 'X') ? 'O':'X';
                render.tilesRender(gameboard.get(),currentPlayer,tiles);
                turnCount++;

                if(turnCount>9){
                    alert('Round '+roundCount+' is a tie!');
                    roundCount++;
                    playRound();
                    return;
                }
            };
        }
        let score = new Object;
        let rounds, roundCount, turnCount;
        let currentPlayer;
        const handlerArray = [...Array(9).keys()].map(playTurn);

        //Set new game
        const playGame = (roundsNumber)=>{
            rounds=roundsNumber;
            roundCount=1;
            score.X=0;
            score.O=0;
            render.scoreRender(score.X,score.O);
            playRound();
        };

        //Play a round
        const playRound = ()=>{
            if(roundCount>rounds){
                showResults();
                tiles.forEach((tile,i)=>{
                    tile.removeEventListener('click', handlerArray[i]);
                });
                return;
            }
            turnCount=1;
            currentPlayer = (Math.floor(Math.random()*2))==0 ? 'X':'O';
            gameboard.reset();
            render.tilesRender(gameboard.get(),currentPlayer, tiles);
            tiles.forEach((tile,i)=>{
                tile.removeEventListener('click', handlerArray[i]);
                tile.addEventListener('click', handlerArray[i]);
            });
        };

        const showResults = ()=>{
            if(score.X > score.O){
                alert('FINAL RESULT: Player '+name.X+' (X) is the winner!');
            }else if (score.X == score.O){
                alert('FINAL RESULT: It\'s a tie');
            } else {
                alert('FINAL RESULT: Player '+name.O+' (O) is the winner!');
            }
        }
        
        
        return {
            playGame
        };

    })(gameboard, render, tiles);

    

    playBtn.addEventListener('click', () => {
        dialog.showModal();
    });

    startBtn.addEventListener('click', () => {
        if(roundInput.value<1){
            alert("You need to play at least 1 round!");
            return;
        }
        render.nameRender(nameXInput.value, nameOInput.value);
        name['X']=nameXInput.value;
        name['O']=nameOInput.value;
        game.playGame(Number(roundInput.value));
        playBtn.textContent = 'Restart';
        dialog.close();
    })


})();

