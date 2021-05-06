// Game Constants  //a+(b-a)*Math.round() //choose btw a and b
let inputDirection = {x: 0, y: 0};
const foodSound = new Audio('music/eat.mp3');
const gameOverSound = new Audio('music/game-over.mp3');
const moveSound = new Audio('music/move.mp3');
let speed = 8; //1/5sec
let score = 0;
lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }]; //array
food = {x: 6, y: 7}; //particle

//Game functions
main = (currentTime) => {
    window.requestAnimationFrame(main)
    if((currentTime - lastPaintTime)/1000 < 1/speed) {
        return;
    }
    lastPaintTime = currentTime;
    gameEngine();
    // console.log(currentTime)
}

isCollide = (snake) => {
    //if you bump into yourself
    for(let i = 1 ; i < snakeArr.length ; i++) {
        if(snake[i].x === snake[0].x  && snake[i].y === snake[0].y){
            return true;
        }
    }
   //if you bump into the wall
   if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
            return true;
      }

      return false;

}

gameEngine = () => {
    //part1: updating the snake array[].
    if((isCollide(snakeArr))){
        gameOverSound.play();
        moveSound.pause();
        inputDirection = {x: 0 , y: 0};
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x : 13, y: 15}];
        // musicSound.play()
        score = 0;
    }
    //if you eatan the food, increment the snake and regenerate the food.
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play()
        score +=1;
        if(score > highScore) {
            highscoreval = score;
            localStorage.setItem("highscore", JSON.stringify(highscoreval));
        }
        scoreBox.innerHTML = "Score: " + score; 
        snakeArr.unshift({x: snakeArr[0].x + inputDirection.x, y: snakeArr[0].y + inputDirection.y})
        let a = 2;
        let b = 16;

        food = {x: Math.round(a + (b-a)* Math.random()), y:  Math.round(a + (b-a)* Math.random())}
    }

    // Moving the snake
    for(let i = snakeArr.length - 2; i >= 0; i-- ) {
       
        snakeArr[i + 1] = {...snakeArr[i]}
    }
    snakeArr[0].x += inputDirection.x;
    snakeArr[0].y += inputDirection.y;

//part2: render/display the snake and food;

    // display the snake
    board.innerHTML = ""
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
       
        if(index === 0){
            snakeElement.classList.add('head');
        }else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement)
    })
    foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement)
}

//Main logic starts here
let highScore = localStorage.getItem("highscore");
if(highScore === null) {
    highscoreval = 0;
    localStorage.setItem("highscore", JSON.stringify(highscoreval));
    highscoreBox.innerHTML = "HighScore: " + highscoreval;
}else {
    highscoreval = JSON.parse(highScore)
    highscoreBox.innerHTML = "HighScore: " + highScore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDirection = {x: 0, y: 1} //Start the game
    moveSound.play();
    switch(e.key) {
        case "ArrowUp":
            inputDirection.x =  0;
            inputDirection.y = -1;
            console.log("ArrowUp")
            break;

        case "ArrowDown":
            inputDirection.x = 0;
            inputDirection.y = 1;
            console.log("ArrowDown")
            break;

        case "ArrowLeft":
            inputDirection.x = -1;
            inputDirection.y =  0;
            console.log("ArrowLeft")
            break;

        case "ArrowRight":
            inputDirection.x = 1;
            inputDirection.y = 0;
            console.log("ArrowRight")
            break;

            default:
                break;
        
    }
})