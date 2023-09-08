const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".gameInfo");
const newGame = document.querySelector(".btn");

let currentPlayer ;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
 function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    //UI pr empty bhi karna padega boxes ko
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //one more thing is missing, initialise box with css properties again
        box.classList = `box box${index+1}`;
    });
    newGame.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();


function swapTurn(){
if(currentPlayer === "X"){
    currentPlayer = "O";
}else{
  currentPlayer = "X";
}
//newGame.classList.remove("active");
gameInfo.innerText = `Current Player - ${currentPlayer}`; 
}

//newGame.addEventListener("click",initGame);
function checkGameOver(){

    let answer = "";

    winningPositions.forEach((position) => {
    if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2] ]!== "" )
    && (gameGrid[position[0]]===  gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {
        if(gameGrid[position] === "X"){
            answer == "X"
        }else{
            answer == "O";
        }
        boxes.forEach((box) => {
            box.style.pointerEvents = "none";
        })

        //now we know X/O is a winner
        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");
    }
    });
 if(answer !== "" ) {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGame.classList.add("active");
        return;
    }

    //We know, NO Winner Found, let's check whether there is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "" )
            fillCount++;
    });

    //board is Filled, game is TIE
    if(fillCount === 9) {
        gameInfo.innerText = "Game Tied !";
        newGame.classList.add("active");
    }


}
 
function handleClick(index) {
    if(gameGrid[index] === "" ) {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        
        swapTurn();
        
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGame.addEventListener("click", initGame);