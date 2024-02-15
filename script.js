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

        if (isNaN(row)){
            console.log('Error: unvalid coordinate - row is not a number');
            return false;
        }

        if (isNaN(column)){
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
        if(!_mark){
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
        if(!_mark){
            return false;
        }

        for (let i = 0; i<=2; i++) {
            //row check
            if( tiles[i][0]==_mark &&
                tiles[i][1]==_mark &&
                tiles[i][2]==_mark
            ){
                return [true, 'row', i+1];
            };

            //column check
            if( tiles[0][i]==_mark &&
                tiles[1][i]==_mark &&
                tiles[2][i]==_mark
            ){
                return [true, 'column', i+1];
            };
        }

        //diagonal check
        if( tiles[0][0]==_mark &&
            tiles[1][1]==_mark &&
            tiles[2][2]==_mark 
        ){
            return [true, 'diagonal', 1];
        };

        if( tiles[2][0]==_mark &&
            tiles[1][1]==_mark &&
            tiles[0][2]==_mark 
        ){
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
            console.log(mark+' turn');
            row = Number(prompt('row: '));
            column = Number(prompt('column: '));
            
            //Fills the tile, if an error happens a new round for the mark is played
            if(!fill(mark,row,column)){
                return false;
            }
            
            //Shows gameboard state
            console.log(tiles[0]);
            console.log(tiles[1]);
            console.log(tiles[2]);



            if(checkWin(mark)[0]){
                console.log(mark+' won!');
                return 'win';
            }

            return true;
        };
        
        reset();
        let round = 1;
        let row, column, result;
        while(round <= 9){
            //X plays first!
            if(round % 2 == 0){
                result = roundPlay('O');
            } else {
                result = roundPlay('X');
            }
            
            if (result == false){
                continue;
            }
            
            if (result == 'win'){
                break;
            }

            if (round == 9){
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