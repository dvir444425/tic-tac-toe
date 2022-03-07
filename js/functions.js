
// Get the popup
let popup = document.getElementById("mypopup");
let flag = true; //When getting a random number, flag let us know when to stop(if the square is already full)
let player = 1;
let symbol = '';
let alreadyFullArray = ['nothing','td0','td0','td0','td0','td0','td0','td0','td0','td0'];
let alreadyFullSingleplayer = [0,0,0,0,0,0,0,0,0,0];
let howManyShapesDrawn = 0;
let computerTurn = 0;
let rowIndex = 1;
let columnIndex = 1;
let cellNum = 0;
let gameMode;
let popupButtonsHaveEL = false;
let gameTracking = {
    row1: [0,0,0,0],
    row2: [0,0,0,0],
    row3: [0,0,0,0]
};
let gameTrackingSymbol = {
    row1: [0,'e','e','e'],
    row2: [0,'e','e','e'],
    row3: [0,'e','e','e']
};
let alreadyFull;
let game = {
    turn: 1,
    winner: 'draw',
    gameStatus: 'playing'
};

// The function shows the welcome screen
const Welcome = () => {
    $( ".main" ).append( "<div class = 'welcome-div'></div>" );
    $( ".welcome-div" ).append( "<h1 id='title' class='welcome-title'>tic tac toe - win here or lose and go!</h1>" );
    $( ".welcome-div" ).append( "<button class='welcome-singleplayer-button popup-button' role='button'><span class='text'>Single Player</span></button>" );
    $( ".welcome-singleplayer-button" ).on( "click", playSingle );
    $( ".welcome-div" ).append( "<button class='welcome-multiplayer-button popup-button' role='button'><span class='text'>2 Players</span></button>" );
    $( ".welcome-multiplayer-button" ).on( "click", playMulti );
    $( ".welcome-div" ).append( "<p class='welcome-copyright'>©Developed by The Dviros Labs</p>" );
}

// activates singleplayer game
const playSingle = () => {
    $('.welcome-div').remove();
    gameMode = 'singleplayer';
    createScoreboard();
    createGameBoard();
    createDownMenu();
}

// activates multiplayer game
const playMulti = () => {
    $('.welcome-div').remove();
    gameMode = 'multiplayer';
    createScoreboard();
    createGameBoard();
    createDownMenu();
}

// Function activated when user clickes on one of the squares
const playedTurnMultiplayer = (event) => {
    cellNum = event.target.className[2];
    if(cellNum < 7 && cellNum > 3) {rowIndex = 2}
    else {if(cellNum < 7) {rowIndex = 1}
    else{rowIndex = 3}}

    if(cellNum == 2 || cellNum == 5 || cellNum == 8) {columnIndex = 2}
    else {if(cellNum == 1 || cellNum == 4 || cellNum == 7) {columnIndex = 1}
    else{columnIndex = 3}}

    if(alreadyFullArray[cellNum] == 'td0' && game.gameStatus == 'playing'){
        $(event.target).append( `<img class='td-img' src='css/images/player${player}.png'/>` );
        $(`.${event.target.className}`).addClass('no-after');
        howManyShapesDrawn++;
        
        if(rowIndex === 1){
            gameTrackingSymbol.row1[columnIndex] = `${player}`;
            gameTracking.row1[columnIndex] = `${cellNum}`;
        }
        else if(rowIndex === 2){
            gameTrackingSymbol.row2[columnIndex] = `${player}`;
            gameTracking.row2[columnIndex] = `${cellNum}`;
        }
        else{
            gameTrackingSymbol.row3[columnIndex] = `${player}`;
            gameTracking.row3[columnIndex] = `${cellNum}`;
        }

        alreadyFullArray[cellNum] = event.target.className;
        game.turn++;
        gameWinner();
        if(player === 1) {player++;}
        else{player--;}
        $( ".down-menu-indicator-label" ).text(`${player} PLAYER`);
    }
}

// Function creates the playing game board
const createGameBoard = () => {
    $( ".main" ).append( "<div class = 'game-board'></div>" );
    $( ".game-board" ).append( "<table class = 'game-board-table'></table>" );
    let trCount = 1;
    for(let i=1; i<4; i++){
        $( ".game-board-table" ).append( `<tr class='tr${trCount}'></tr>` );
        for(let i=trCount*3-2; i<trCount*3+1; i++){
            $( `.tr${trCount}` ).append( `<td class='td${i}'></td>` );
            if(game.gameStatus == 'playing'){
                if(gameMode == 'singleplayer') {
                    $( `.td${i}` ).on( "click", playedTurnSingleplayer );
                } else if(gameMode == 'multiplayer'){
                    $( `.td${i}` ).on( "click", playedTurnMultiplayer );
                }
            }
        }
        trCount++;
    }
}

// Function checks if arrays are equal. returns true if yes
function arraysEqual(a, b) {
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
}

// Function checking if one of the players won
const gameWinner = () => {
    const rowWinnerPattern = {
        p1: [0,'1','1','1'],
        p2: [0,'2','2','2']
    };
    if(game.turn >= 5 && game.gameStatus == 'playing' || game.turn == 10){
        if( arraysEqual(rowWinnerPattern.p1, gameTrackingSymbol.row1) || arraysEqual(rowWinnerPattern.p1, gameTrackingSymbol.row2) || arraysEqual(rowWinnerPattern.p1, gameTrackingSymbol.row3) ) {
            game.winner = 1;
            game.gameStatus = 'game over';
        }
        if( arraysEqual(rowWinnerPattern.p2, gameTrackingSymbol.row1) || arraysEqual(rowWinnerPattern.p2, gameTrackingSymbol.row2) || arraysEqual(rowWinnerPattern.p2, gameTrackingSymbol.row3) ) {
            game.winner = 2;
            game.gameStatus = 'game over';
        }
        if(gameTrackingSymbol.row1[1] == '1' && gameTrackingSymbol.row2[1] == '1' && gameTrackingSymbol.row3[1] == '1' || gameTrackingSymbol.row1[2] == '1' && gameTrackingSymbol.row2[2] == '1' && gameTrackingSymbol.row3[2] == '1' || gameTrackingSymbol.row1[3] == '1' && gameTrackingSymbol.row2[3] == '1' && gameTrackingSymbol.row3[3] == '1' ){
            game.winner = 1;
            game.gameStatus = 'game over';
        }
        if(gameTrackingSymbol.row1[1] == '2' && gameTrackingSymbol.row2[1] == '2' && gameTrackingSymbol.row3[1] == '2' || gameTrackingSymbol.row1[2] == '2' && gameTrackingSymbol.row2[2] == '2' && gameTrackingSymbol.row3[2] == '2' || gameTrackingSymbol.row1[3] == '2' && gameTrackingSymbol.row2[3] == '2' && gameTrackingSymbol.row3[3] == '2' ){
            game.winner = 2;
            game.gameStatus = 'game over';
        }
        if(gameTrackingSymbol.row1[1] == '1' && gameTrackingSymbol.row2[2] == '1' && gameTrackingSymbol.row3[3] == '1' || gameTrackingSymbol.row1[3] == '1' && gameTrackingSymbol.row2[2] == '1' && gameTrackingSymbol.row3[1] == '1' ){
            game.winner = 1;
            game.gameStatus = 'game over';
        }
        if(gameTrackingSymbol.row1[1] == '2' && gameTrackingSymbol.row2[2] == '2' && gameTrackingSymbol.row3[3] == '2' || gameTrackingSymbol.row1[3] == '2' && gameTrackingSymbol.row2[2] == '2' && gameTrackingSymbol.row3[1] == '2' ){
            game.winner = 2;
            game.gameStatus = 'game over';
        }
    }

    // This if saves the wins and the draws locally
    if(game.gameStatus != 'playing' || game.turn == 10){
        
        let areThereAnySavedWinsPlayer1 = localStorage.getItem('areThereAnySavedWinsPlayer1');
        let areThereAnySavedWinsPlayer2 = localStorage.getItem('areThereAnySavedWinsPlayer2');
        let areThereAnySavedDraws = localStorage.getItem('areThereAnySavedDraws');

        if(game.winner == 1) { 
            if(areThereAnySavedWinsPlayer1 == 'yes'){
                let temp1 = localStorage.getItem('player1');
                temp1++;
                localStorage.setItem('player1', temp1); 
            }
            else{
                let temp1 = 1;
                localStorage.setItem('player1', temp1); 
                localStorage.setItem('areThereAnySavedWinsPlayer1', 'yes');
            }  
        } else if(game.winner == 2) { 
                    if(areThereAnySavedWinsPlayer2 == 'yes'){
                        let temp2 = localStorage.getItem('player2');
                        temp2++;
                        localStorage.setItem('player2', temp2); 
                    }
                    else{
                        let temp2 = 1;
                        localStorage.setItem('player2', temp2); 
                        localStorage.setItem('areThereAnySavedWinsPlayer2', 'yes');
                    }  
                } else {
                    if(areThereAnySavedDraws == 'yes'){
                        let tempDraw = localStorage.getItem('tempDraw');
                        tempDraw++;
                        localStorage.setItem('tempDraw', tempDraw); 
                    }
                    else{
                        let tempDraw = 1;
                        localStorage.setItem('tempDraw', tempDraw); 
                        localStorage.setItem('areThereAnySavedDraws', 'yes');
                    }  
                }
    }

    if(game.gameStatus != 'playing'){
        updateScoreboard();
        openPopup();
    } else if(game.turn == 10){
        updateScoreboard();
        openPopup();
    }
}

// Function activated when user clickes on one of the squares - for singleplayer
const playedTurnSingleplayer = (event) => {    

    $(`.${event.target.className}`).off( "click" );
    if( game.turn == 9 && howManyShapesDrawn === 8 && game.gameStatus == 'playing'){
        $(event.target).append( `<img class='td-img' src='css/images/player${player}.png'/>` );
        $(`.${event.target.className}`).addClass('no-after');
        $(`.${event.target.className}`).off( "click" );
        howManyShapesDrawn++;
        game.turn = 10;
        alreadyFullArray[event.target.className[2]] = `td${event.target.className[2]}`;

        if(event.target.className[2] == 1) {gameTrackingSymbol.row1[1] = `${player}`}
        if(event.target.className[2] == 2) {gameTrackingSymbol.row1[2] = `${player}`}
        if(event.target.className[2] == 3) {gameTrackingSymbol.row1[3] = `${player}`}
        if(event.target.className[2] == 4) {gameTrackingSymbol.row2[1] = `${player}`}
        if(event.target.className[2] == 5) {gameTrackingSymbol.row2[2] = `${player}`}
        if(event.target.className[2] == 6) {gameTrackingSymbol.row2[3] = `${player}`}
        if(event.target.className[2] == 7) {gameTrackingSymbol.row3[1] = `${player}`}
        if(event.target.className[2] == 8) {gameTrackingSymbol.row3[2] = `${player}`}
        if(event.target.className[2] == 9) {gameTrackingSymbol.row3[3] = `${player}`}

        gameWinner();
        return;
    }

    if(game.gameStatus != 'playing'){
        return;
    }

    if(player === 1 && game.turn < 10 ){

        cellNum = event.target.className[2];
        alreadyFullSingleplayer[cellNum] = 1;

        // rowIndex gets a value to tell us in which row was the cell
        if(cellNum < 7 && cellNum > 3) {rowIndex = 2}
        else {if(cellNum < 7) {rowIndex = 1}
        else{rowIndex = 3}}

        // columnIndex gets a value to tell us in which column was the cell
        if(cellNum == 2 || cellNum == 5 || cellNum == 8) {columnIndex = 2}
        else {if(cellNum == 1 || cellNum == 4 || cellNum == 7) {columnIndex = 1}
        else{columnIndex = 3}}

        if(alreadyFullArray[cellNum] == 'td0' && game.gameStatus == 'playing'){
            $(event.target).append( `<img class='td-img' src='css/images/player${player}.png'/>` );
            $(`.${event.target.className}`).addClass('no-after');
            $(`.${event.target.className}`).off( "click" );
            howManyShapesDrawn++;
            
            if(rowIndex === 1){
                gameTrackingSymbol.row1[columnIndex] = `${player}`;
                gameTracking.row1[columnIndex] = `${cellNum}`;
            }
            else if(rowIndex === 2){
                gameTrackingSymbol.row2[columnIndex] = `${player}`;
                gameTracking.row2[columnIndex] = `${cellNum}`;
            }
            else{
                gameTrackingSymbol.row3[columnIndex] = `${player}`;
                gameTracking.row3[columnIndex] = `${cellNum}`;
            }

            alreadyFullArray[cellNum] = event.target.className;
            alreadyFullSingleplayer[cellNum] = 1;
            game.turn++;
            gameWinner();
            if(player === 1) {player++;}
            else{player--;}
        }
    }
     // refers to when player 1 already played, and now it is the computer's turn
        while(flag && game.gameStatus == 'playing'){
            computerTurn = Math.floor(Math.random()*9+1);
            if(alreadyFullSingleplayer[computerTurn] == 0){
                alreadyFullSingleplayer[computerTurn] = 2;
                flag = false;
            }
        }
        flag = true;
        cellNum = computerTurn;

        // rowIndex gets a value to tell us in which row was the cell
        if(cellNum < 7 && cellNum > 3) {rowIndex = 2}
        else {if(cellNum < 7) {rowIndex = 1}
        else{rowIndex = 3}}

        // columnIndex gets a value to tell us in which column was the cell
        if(cellNum == 2 || cellNum == 5 || cellNum == 8) {columnIndex = 2}
        else {if(cellNum == 1 || cellNum == 4 || cellNum == 7) {columnIndex = 1}
        else{columnIndex = 3}}
        
        
        if(alreadyFullArray[cellNum] == 'td0' && game.gameStatus == 'playing'){
            $(`.td${computerTurn}`).append( `<img class='td-img' src='css/images/player${player}.png'/>` );
            $(`.td${computerTurn}`).addClass('no-after');
            $(`.td${computerTurn}`).off( "click" );
            howManyShapesDrawn++;

            if(rowIndex === 1){
                gameTrackingSymbol.row1[columnIndex] = `${player}`;
                gameTracking.row1[columnIndex] = `${cellNum}`;
            }
            else if(rowIndex === 2){
                gameTrackingSymbol.row2[columnIndex] = `${player}`;
                gameTracking.row2[columnIndex] = `${cellNum}`;
            }
            else{
                gameTrackingSymbol.row3[columnIndex] = `${player}`;
                gameTracking.row3[columnIndex] = `${cellNum}`;
            }

            alreadyFullArray[cellNum] = event.target.className;
            alreadyFullSingleplayer[cellNum] = 1;
            game.turn++;
            gameWinner();
            if(player === 1) {player++;}
            else{player--;}
        }
}

// The function creates the score board
const createScoreboard = () => {
    
    let areThereAnySavedWinsPlayer1 = localStorage.getItem('areThereAnySavedWinsPlayer1');
    let areThereAnySavedWinsPlayer2 = localStorage.getItem('areThereAnySavedWinsPlayer2');
    let areThereAnySavedDraws = localStorage.getItem('areThereAnySavedDraws');
    let player1Wins = 0;
    let player2Wins = 0;
    let gameDraws = 0;

    if(areThereAnySavedWinsPlayer1 == 'yes'){
        player1Wins = localStorage.getItem('player1');
    }

    if(areThereAnySavedWinsPlayer2 == 'yes'){
        player2Wins = localStorage.getItem('player2');
    }

    if(areThereAnySavedDraws == 'yes'){
        gameDraws = localStorage.getItem('tempDraw');
    }
    
    $( ".main" ).append( "<div class = 'score-board'></div>" );

    $( ".score-board" ).append( "<img class = 'score-board-player2-img' src = 'css/images/player2.png'/>" );
    $( ".score-board" ).append( `<label class = 'score-board-player2-label'>${player2Wins} wins</label>` );
    
    $( ".score-board" ).append( "<img class = 'score-board-player1-img' src = 'css/images/player1.png'/>" );
    $( ".score-board" ).append( `<label class = 'score-board-player1-label'>${player1Wins} wins</label>` );

    $( ".score-board" ).append( "<img class = 'score-board-draws-img' src = 'css/images/libra.png'/>" );
    $( ".score-board" ).append( `<label class = 'score-board-draws-label'>${gameDraws} draws</label>` );
}

// updates the scoreboard scores
const updateScoreboard = () => {
    if(localStorage.getItem('player1') >= 1) $(".score-board-player1-label").text(`${localStorage.getItem('player1')} wins`);
    if(localStorage.getItem('player2') >= 1) $(".score-board-player2-label").text(`${localStorage.getItem('player2')} wins`);
    if(localStorage.getItem('tempDraw') >= 1) $(".score-board-draws-label").text(`${localStorage.getItem('tempDraw')} draws`);
}

// create down menu
const createDownMenu = () => {
    $( ".main" ).append( "<div class = 'down-menu'></div>" );
    $( ".down-menu" ).append( "<button class = 'down-menu-restart-button'><img src='/css/images/restart.png' /></button>" );
    $( '.down-menu-restart-button' ).on( "click", homeMenu );
    $( ".down-menu" ).append( `<label class = 'down-menu-indicator-label'>turn number</label>` );
    $( ".down-menu-indicator-label" ).text(`${player} PLAYER`);
    $( ".down-menu" ).append( "<button class = 'down-menu-settings-button'><img src='/css/images/settings.png' /></button>" );
}

// The function restarts the whole game
const restartGame = () => {
    localStorage.clear();
    flag = true; //When getting a random number, flag let us know when to stop(if the square is already full)
    player = 1;
    symbol = '';
    alreadyFullArray = ['nothing','td0','td0','td0','td0','td0','td0','td0','td0','td0'];
    alreadyFullSingleplayer = [0,0,0,0,0,0,0,0,0,0];
    howManyShapesDrawn = 0;
    computerTurn = 0;
    rowIndex = 1;
    columnIndex = 1;
    cellNum = 0;
    gameTracking = {
        row1: [0,0,0,0],
        row2: [0,0,0,0],
        row3: [0,0,0,0]
    };
    gameTrackingSymbol = {
        row1: [0,'e','e','e'],
        row2: [0,'e','e','e'],
        row3: [0,'e','e','e']
    };
    alreadyFull;
    game = {
        turn: 1,
        winner: 'draw',
        gameStatus: 'playing'
    };
}

// The function starts a new game
const newGame = () => {
    popup.style.display = "none";
    flag = true; //When getting a random number, flag let us know when to stop(if the square is already full)
    player = 1;
    symbol = '';
    alreadyFullArray = ['nothing','td0','td0','td0','td0','td0','td0','td0','td0','td0'];
    alreadyFullSingleplayer = [0,0,0,0,0,0,0,0,0,0];
    howManyShapesDrawn = 0;
    computerTurn = 0;
    rowIndex = 1;
    columnIndex = 1;
    cellNum = 0;
    gameTracking = {
        row1: [0,0,0,0],
        row2: [0,0,0,0],
        row3: [0,0,0,0]
    };
    gameTrackingSymbol = {
        row1: [0,'e','e','e'],
        row2: [0,'e','e','e'],
        row3: [0,'e','e','e']
    };
    alreadyFull;
    game = {
        turn: 1,
        winner: 'draw',
        gameStatus: 'playing'
    };
    
    $('.game-board').remove();
    $('.down-menu').remove();
    createGameBoard();
    createDownMenu();
}

// The function goes to home menu and resets the game
const homeMenu = () => {
    popup.style.display = "none";
    restartGame();
    $('.score-board').remove();
    $('.game-board').remove();
    $('.down-menu').remove();
    Welcome();
}

// this function defines the popup
const openPopup = () => {

    // adds event listeners to the buttons
    if(popupButtonsHaveEL == false){
        $( '.popup-new-game-button' ).on( "click", newGame );
        $( '.popup-home-menu-button' ).on( "click", homeMenu );
        popupButtonsHaveEL = true;
    }

    // Get the <span> element that closes the popup
    let span = document.getElementsByClassName("close")[0];

    // Open the popup 
    popup.style.display = "block";
    
    // When the user clicks on <span> (x), close the popup
    span.onclick = function() {
    popup.style.display = "none";
    }

    // When the user clicks anywhere outside of the popup, close it
    window.onclick = function(event) {
        if (event.target == popup) {
            popup.style.display = "none";
        }
    }

    // insert into popup header the winner name
    let winSymbol;
    let winString = 'It`s a draw!';
    if(game.winner == 2) {
        winSymbol = 'O';
        winString = `${winSymbol} is the winner!`;
    } else if(game.winner == 1) {
        winSymbol = 'X';
        winString = `${winSymbol} is the winner!`;
    }
    $('.popup-winner-name').text(`${winString}`);
}

export { Welcome };