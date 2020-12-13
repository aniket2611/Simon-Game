// buttonColours and set it to hold the sequence "red", "blue", "green", "yellow"
var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level= 0;
var index = 0;
var answer = false;

$(document).on("keypress",function(){
    if(!answer ){
        answer=1;
        nextSequence();
    }
});
$(".btn").on("click",handler);
function nextSequence(){
    level+=1;
    index=0;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    // console.log(randomNumber);

    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    var buttonSelected = new Audio("sounds/"+randomChosenColor+".mp3");
    buttonSelected.play();
    $("#"+randomChosenColor).css("visibility","hidden");
    setTimeout(function(){
        makeVisible(randomChosenColor);
    },100);

}

function makeVisible(button){
    $("#"+button).css("visibility","visible");
}

function handler(){
    // console.log(event);

    var userChosenColor = this.getAttribute("id");
    userClickedPattern.push(userChosenColor);

    var buttonSelected = new Audio("sounds/"+userChosenColor+".mp3");
    buttonSelected.play();
    $("#"+userChosenColor).addClass("pressed");
    setTimeout(function(){
        $("#"+userChosenColor).removeClass("pressed");
    },100);

    checkAnswer(userChosenColor);
    // console.log(userClickedPattern);
    index+=1;
}

function checkAnswer(userChosenColor){
    if(userChosenColor == gamePattern[index])
        {
            if((index+1) == level)
                {
                    userClickedPattern = [];
                    setTimeout(nextSequence,1000);
                }
        }
    else
        {
            gamePattern = [];
            $("#level-title").text("Game over, Press A Key to Start");
            var sound = new Audio("sounds/wrong.mp3");
            sound.play();
            userClickedPattern = [];
            level=0;
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");

            },300);
            answer=0;
        }
}



