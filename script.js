//squares represents a list of objects, used in almost every function. 
let squares = document.querySelectorAll(".square");
//easy_mode will follow the mode currently playing.
var easy_mode = true;

//generates 3 random numbers for rgb.
//returns 3 random numbers. format of return [x,y,z]
function _rand_color(){
    var red = Math.floor(Math.random()*255);
    var green = Math.floor(Math.random()*255);
    var blue = Math.floor(Math.random()*255);
    return [red,green,blue]
}

//picks random rgb color to find and displays it in the header
//returns the choosen color for future uses .
//return format > "rgb[x,y,z]"
function chosen_color(){
   let display = _rand_color()
   display = 'RGB('+display+')'
   document.getElementById("newgame").innerHTML = display;
   return display
}

//applys all changes needed for easy mode 
function easyMode(){
    reset()
    change_diff('easy')
    easy_mode = true;
    change_colors(3);

}

//applys all changes needed for hard mode
function hardMode(){
    reset()
    change_diff('hard')
    change_colors(6); 
    easy_mode = false;
}

//defines number of squares to show
function change_diff(difficulty){
    if (difficulty=='easy'){
        for(var i = 3; i<squares.length; i++){
            squares[i].style.display ='none';
        }
    } else {
        for(var i = 3; i<squares.length; i++){
        squares[i].style = squares[0].style;

        }
    }
}

//changes the color of all needed squares to random colors
//including chosen color to random square.
function change_colors(squares_num){
    window.random_square = Math.floor(Math.random()*squares_num);
    window.chosen = chosen_color();
    squares[random_square].style.background = chosen;
    for (var i = 0; i<random_square; i++){
        squares[i].style.background = 'rgb(' +_rand_color()+')';
    }
    for (var i = random_square+1; i<squares.length; i++){
        squares[i].style.background = 'rgb(' +_rand_color()+')';
    }
}


//check if the clicked square is the square we are looking for.
//if it's the right square > call success function
//else > remove square element
//also stops the interval and start a new one
// argument > index of clicked square in squares list  
function color_check(square_Num){
    var massage = document.getElementById("massage");
    stopInterval();
    if (square_Num == window.random_square){
        massage.innerHTML = "Correct!";
        success(); 
    }else{
        massage.innerHTML = "Try again!";
        squares[square_Num].removeAttribute("style");
    }
}


//removes the countdown and paints all the squares and header in chosen color.
function success(){
    clearInterval(window.timer);
    document.getElementById("counter").innerHTML = "";
    document.getElementById("container").style.pointerEvents = 'none';
    window.x = document.getElementById("divHeader")
    x.style.background = window.chosen;
    if (easy_mode){
        for (i=0 ; i<3 ; i++){
            squares[i].style.background = window.chosen;
        }
    }else{
        for (i=0 ; i<6 ; i++){
            squares[i].style.background = window.chosen;
        }
    }

}

//returns the page to the start point 
function reset(){
    stopInterval();
    document.getElementById("divHeader").removeAttribute("style");
    document.getElementById("massage").innerHTML = "";
    document.getElementById("container").style.pointerEvents = 'auto';
}

//sets a 60 seconds countdown to choose a square.
//if count gets to 0 > sets an alert and starts a new game.
function countDown(){
    var count = 60;
    window.timer = setInterval(function() {
        count -= 1;
        document.getElementById("counter").innerHTML = count;
        if(count == 0) {
            clearInterval(timer);
            pressNewGame();
            alert("You Should Be Faster Next Game")
        }
    }, 1000);
}

// stops and resets the countdown
function stopInterval(){
    clearInterval(window.timer)
    countDown()
}

//starts a new game with the last mode.
//uses a global boolean variable
function pressNewGame(){
    if (easy_mode==true){
        easyMode();
    }else {
        hardMode();
    }
}