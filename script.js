        const chooseXObtn = document.querySelector(".chooseXO-btn");
        const chooseXO = document.querySelector(".chooseXO");
        function displayXO(){
            chooseXO.classList.toggle("closed");
            console.log("display work")
        }

        chooseXObtn.addEventListener("click",displayXO);


        const gameBoard = (() => {
            let winner;
            let getWinner = () => winner;
            let gameboard = [["","",""],
                            ["","",""],
                            ["","",""]];
            
            const getBoard = () => gameboard;
            const getPosition = (row,column) => gameboard[row][column];
            const setPosition = (row,column,el) => {gameboard[row][column] = el; render();}
            const resetBoard = () => {
                gameboard = [["","",""],
                ["","",""],
                ["","",""]];
            };
            const getEmptyFieldsId = () => {
                let fields = [];
                for (let row = 0; row < gameboard.length; row++) {
                    for (let col = 0; col < gameboard[row].length; col++) {
                        const field = gameboard[row][col];
                        if (field == "") {
                            fields.push([row, col]);
                        }
                    }
                }
                return fields;
            };
            const setFieldForAiLogic = (row,column, player) => {
                if (player == undefined) {
                    board[row][column] = "";
                    return;
                }
                board[row][column] = player.getMark();
            }
        
            return{
            getBoard,
            getWinner,
            getPosition,
            setPosition,
            resetBoard,
            getEmptyFieldsId
        }

        })();

        const Player = (name,mark) =>
        {
        const getName = () => name;
        const getMark = () => mark;
        const setMark = (mark) => {
            return new Promise((resolve) => {
            this.mark = mark;
            resolve();
        });
        }
    return{
        getName,
        getMark,
        setMark
    }
}
        

        const gameController = (()=>{

            let humanPlayer = Player("Player1","X");
            let aiPlayer = Player("AI","O");
            let turn= true;
            let board;
            let winner = null;
           const setTurn = (falseortrue) => turn =falseortrue;
            const getWinner = () => winner;
            const whoseTurn = () => turn?humanPlayer:aiPlayer;
            const switchTurn = () => turn = turn?false:true;
            const startGame = () => {
                gameBoard.resetBoard();
                board = gameBoard.getBoard();
                render();
                winner = null;
                // Check who has the 'X' mark and let that player start
                if (humanPlayer.getMark() === 'X') {
                    console.log("x called turn true");
                    turn = true; // Human starts
                } else {
                    console.log("o called turn = false");

                    turn = false; // AI starts
                }
                // If AI starts, make a move for AI
                if (!turn) {
                    let arr = _getbestMove(gameBoard.getBoard());
                    console.log(arr)
                    gameBoard.setPosition(arr[0], arr[1], whoseTurn().getMark());
                    switchTurn();
                }
                // If Human starts, wait for their move
                else {
                    // Wait for human to make a move
                }
            }
            
            
            const handleMove = (moveRow, moveColumn) => {
                if(!isGameOver(gameBoard.getBoard()) && whoseTurn().getMark() === "X"){
                    gameBoard.setPosition(moveRow, moveColumn, whoseTurn().getMark());
                    switchTurn();
                    // If it's now AI's turn and the game is not over, make a move for AI
                    if (!isGameOver(gameBoard.getBoard()) && whoseTurn().getMark() === "O") {
                        let arr = _getbestMove(gameBoard.getBoard());
                        console.log(arr)
                        gameBoard.setPosition(arr[0], arr[1], whoseTurn().getMark());
                        switchTurn();
                    }
                }
            }
            
            const changeMark = (mark) => {
                if(mark == "X"){
                    humanPlayer.setMark('X');
                    aiPlayer.setMark("O");
                    turn=true;
                }
                else if(mark == "O"){
                    humanPlayer.setMark("O");
                    aiPlayer.setMark("X");
                    turn=false;
                }
                else throw 'incorrect sign';
            }
            
            const isGameOver = (board) =>
            {
                //check row and columns
                for(let i = 0; i<3; i++){
                    if(board[i][0] !== "" && board[i][0] === board[i][1] && board[i][1]===board[i][2]){
                        winner = board[i][0];
                        return winner;

                    }

                    else if(board[0][i] !== "" && board[0][i] === board[1][i] && board[1][i] === board[2][i] ){
                        winner = board[0][i];
                        return winner;

                    }

                }

                //check diagonals
                
                if(board[0][0] !== "" && board[0][0]===board[1][1] && board[1][1] === board[2][2]){
                    winner = board[0][0];
                    return winner;

                }
                else if(board[2][0]!=="" && board[2][0] === board[1][1]&& board[1][1] === board[0][2] ){
                    winner = board[2][0];
                    return winner;
                }
                
                //if draw
                let isDraw = true;

                for(let i = 0;i<3;i++){
                    for(let j=0; j<3;j++){
                        if(board[i][j] === ""){
                            isDraw = false;
                        }
                    }
                }  
                if(isDraw){
                    return "draw";
                }

                // game still continues
                return null;
            }

            return{
                whoseTurn,
                startGame,
                handleMove,
                isGameOver,
                getWinner,
                changeMark
            }
        }

        )();

        function render(){
            const tiles = document.querySelectorAll(".tile");
            tiles.forEach(
                (tile) => {
                    
                    tile.innerHTML 
                    = gameBoard.getPosition(tile.getAttribute("data-row"),tile.getAttribute("data-col"))}
            );

        };

        // Announce the winner or draw
        function announceResult(result) {
            const message = result === 'draw' ? 'It\'s a draw!' : `${result} wins!`;
            // Display the message in an alert or a div

            setTimeout(() => {
                alert(message);
            }, 100);
            }




        const tiles = document.querySelectorAll(".tile");
        tiles.forEach((tile) => {
            const row = tile.getAttribute("data-row");
            const col = tile.getAttribute("data-col");
        });

        // Add this event listener to the "Restart" button to start a new game
        const restart = document.querySelector(".restart");
        restart.addEventListener("click", () => {
            gameController.startGame();
            render();

        });
        // Add an event listener to each tile
        tiles.forEach((tile) => {
        tile.addEventListener("click", () => {
            // Get the row and column of the clicked tile
            const row = tile.getAttribute("data-row");
            const col = tile.getAttribute("data-col");

            // Make a move on the game board

            if(tile.innerHTML ==""){
            gameController.handleMove(row, col);
            }
            // Check if the game is over
            const result = gameController.isGameOver(gameBoard.getBoard());
            if (result) {
            // Announce the result of the game
            announceResult(result);
            

            }
            
        

        });
        });

    
        function _getbestMove(currentBoard) {
            let bestVal = +Infinity
            let bestMove = [-1,-1]

            for (let i = 0; i<3;i++){
                for (let j = 0;j<3;j++){
                    if (currentBoard[i][j] !== "X" & currentBoard[i][j] !== "O"){
                        let temp = currentBoard[i][j]
                        // console.log(temp)
                        currentBoard[i][j] = 'O'
                        let moveVal = _minimax(currentBoard, 9, true)
                        // console.log("move val", moveVal, bestVal)
                        currentBoard[i][j] = temp
                        if (moveVal < bestVal){
                            bestMove = [i,j]
                            bestVal = moveVal
                        }
                    }
                }
            }
            // console.log("best Val:", bestVal)
            
            return bestMove
        }


        function _minimax(currentBoard, depth, isMaximixingPlayer) {
            // console.log(currentBoard, depth, isMaximixingPlayer)
            let winSymbol = gameController.isGameOver(currentBoard)
            if (depth === 0 | winSymbol === "X" | winSymbol === "O" | winSymbol === "draw") {
                let gameOutcome = gameController.isGameOver(currentBoard)
                if (gameOutcome === 'X') {
                    return 10
                } else if (gameOutcome === 'O') {
                    return -10
                } else {
                    return 0
                }
            } 
                    
            if (isMaximixingPlayer) {
                let maxEval = -Infinity
                for (let i = 0; i<3;i++){
                    for (let j = 0;j<3;j++){
                        if (currentBoard[i][j] !== "X" & currentBoard[i][j] !== "O"){
                            let temp = currentBoard[i][j]
                            currentBoard[i][j] = 'X'
                            let val = _minimax(currentBoard, depth-1, false)
                            // console.log(val)
                            currentBoard[i][j] = temp

                            if (val > maxEval){    
                                maxEval = val;
                            }
                        }
                    }
                }
                return maxEval;



                // let maxEval = -Infinity
                // for (let i = 0; i<3;i++) {
                //     if (currentBoard[i][0] !== "x" & currentBoard[i][0] !== "o") {
                //         let tempBoard = JSON.parse(JSON.stringify(currentBoard));
                //         tempBoard[i][0] = 'o'
                //         let eval = _minimax(tempBoard,depth-1,false)
                //         maxEval = Math.max(maxEval, eval)
                                            
                //     }

                //     if (currentBoard[i][1] !== "x" & currentBoard[i][1] !== "o") {
                //         let tempBoard = JSON.parse(JSON.stringify(currentBoard));
                //         tempBoard[i][1] = 'o'
                //         let eval = _minimax(tempBoard,depth-1,false)
                //         maxEval = Math.max(maxEval, eval)                        
                //     }

                //     if (currentBoard[i][2] !== "x" & currentBoard[i][2] !== "o") {
                //         let tempBoard = JSON.parse(JSON.stringify(currentBoard));
                //         tempBoard[i][2] = 'o'
                //         let eval = _minimax(tempBoard,depth-1,false)
                //         maxEval = Math.max(maxEval, eval)                        
                //     }
                // }
                // // console.log(countLogs, maxEval, currentBoard)
                // // countLogs++; 
                // return maxEval
            } else {
                let minEval = +Infinity
                for (let i = 0; i<3;i++){
                    for (let j = 0;j<3;j++){
                        if (currentBoard[i][j] !== "X" & currentBoard[i][j] !== "O"){
                            let temp = currentBoard[i][j]
                            currentBoard[i][j] = 'O'
                            let val = _minimax(currentBoard, depth-1, true)
                            currentBoard[i][j] = temp

                            if (val < minEval){    
                                minEval = val;
                            }
                        }
                    }
                }
                return minEval

                // let minVal = +Infinity
                // for (let i = 0; i<3;i++) {
                //     if (currentBoard[i][0] !== "x" & currentBoard[i][0] !== "o") {
                //         let tempBoard = JSON.parse(JSON.stringify(currentBoard));
                //         tempBoard[i][0] = 'x'
                //         let eval = _minimax(tempBoard,depth-1,true)
                //         minVal = Math.min(minVal, eval)                        
                //     }

                //     if (currentBoard[i][1] !== "x" & currentBoard[i][1] !== "o") {
                //         let tempBoard = JSON.parse(JSON.stringify(currentBoard));
                //         tempBoard[i][1] = 'x'
                //         let eval = _minimax(tempBoard,depth-1,true)
                //         minVal = Math.min(minVal, eval)                        
                //     }

                //     if (currentBoard[i][2] !== "x" & currentBoard[i][2] !== "o") {
                //         let tempBoard = JSON.parse(JSON.stringify(currentBoard));
                //         tempBoard[i][2] = 'x'
                //         let eval = _minimax(tempBoard,depth-1,true)
                //         minVal = Math.min(minVal, eval)                        
                //     }
                // }
                // // console.log(countLogs, minVal, currentBoard)
                // // countLogs++;
                // return minVal
            }

        }
        const O_btn = document.querySelector("#O-btn");
    const X_btn = document.querySelector("#X-btn");

    X_btn.addEventListener("click", function () {
        gameController.changeMark(this.innerHTML);
        gameController.startGame();
    console.log("X button clicked");
    });

    O_btn.addEventListener("click", function () {
        gameController.changeMark(this.innerHTML);
        gameController.startGame();
    console.log("O button clicked");
    });

