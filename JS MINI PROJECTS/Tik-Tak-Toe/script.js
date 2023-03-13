const gameInfo = document.querySelector("[data-game-info]");
const boxes = document.querySelectorAll(".box");
const btn = document.querySelector("[data-btn]");
const bg = document.querySelectorAll(".bg")
const video = document.querySelector("[data-video]")

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0 , 1 , 2],
    [3 , 4 , 5],
    [6 , 7 , 8],
    [0 , 3 , 6],
    [1 , 4 , 7],
    [2 , 5 , 8],
    [0 , 4 , 8],
    [2 , 4 , 6]
];

function initGame(){
    
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box , index) => {
        box.innerHTML = " "
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`
    })

    bg.forEach((element)=>{
        element.classList.add("active")
    })

    btn.classList.remove("active");
    video.classList.remove("active")
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function handleGame(index) {
    if(gameGrid[index] === "" ) {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
       
        swap();
       
        checkGameOver();
    }
}

function checkGameOver(){
    let winner = "";


    winningPositions.forEach((position) => {

        if( (gameGrid[position[0]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && 
               (gameGrid[position[0]] === gameGrid[position[2]])) {


                if(gameGrid[position[0]] === "X") 
                    winner = "X";
                else {
                    winner = "O";
                } 

                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });

    if(winner !== "" ) {
        gameInfo.innerText = `Winner is - ${winner}`;
        celebration()
        // btn.classList.add("active");
        return;
    }

    let count = 0
    gameGrid.forEach((box)=>{
        if(box !== ""){
            count++
        }
    })

    if(count == 9){
        gameInfo.innerText = `Game Tie`;
        btn.classList.add("active");
    }
}

winningPositions.forEach((position) => {
    //all 3 boxes should be non-empty and exactly same in value
    if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
        && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {

            //check if winner is X
            if(gameGrid[position[0]] === "X") 
                answer = "X";
            else {
                answer = "O";
            } 
                

            //disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            //now we know X/O is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
});

function swap() {
    if(currentPlayer === "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleGame(index);
    })
});

btn.addEventListener("click", initGame);

function celebration(){

    bg.forEach((element)=>{
        element.classList.remove("active")
    })

    video.classList.add("active")
    btn.classList.add("active")
    gameInfo.classList.add("active")
}