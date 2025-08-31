colors = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClick = [];
var start = false;
var level = 0;
$(document).keydown(function(){
    if (!start) {
        level = 0;
        nextSequence();      
        $("#level-title").text("Level " + level);
        start = true;

    }
});
function nextSequence(){
    level++
    $("#level-title").text("Level " + level);
    var randomNumber = Math.random()*4;
    randomNumber = Math.floor(randomNumber);
    
    var randomColorSelection = colors[randomNumber];
    gamePattern.push(randomColorSelection);
    
    playSequence();
}
$(document).ready(function(){$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClick.push(userChosenColor);
    var ses2 = new Audio("sounds/"+userChosenColor+".mp3");
    ses2.play();
    animatePress(userChosenColor);
    checkAnswer(userClick.length - 1);
})})
function playSound(name){
    var ses2 = new Audio("sounds/"+name+".mp3");
    ses2.play();
}
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}
function checkAnswer(currentLevel){
    if (userClick[currentLevel]=== gamePattern[currentLevel]){
        console.log("correct");
        if (userClick.length=== gamePattern.length) {
            setTimeout(() => {
                nextSequence();
                userClick =[];
            }, 1000);
        }
    }
    else {
        console.log("fail");
        var bipp = new Audio("sounds/wrong.mp3");
        bipp.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key To Restart 😭");
        startOver();
    }
}
function startOver(){
    level = 0;
    gamePattern = [];
    userClick =[];
    start = false;
}
function playSequence(){
    for (let i=0; i < gamePattern.length; i++){
        setTimeout(() => {
            let color = gamePattern[i];
            $("#" + color).fadeOut(100).fadeIn(100);
            new Audio("sounds/"+color+".mp3").play();
        }, i * 250 + i*250);
    }
}

