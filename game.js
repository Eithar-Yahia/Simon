
var userClickedPattern=[];
var gamePattern=[];
var buttonColours=["red","blue","green","yellow"];
var level=0;
var started = false;

$(document).on('keypress',function() {
if (!started) {
$("#level-title").text("Level " + level);
nextSequence();
started=true;
}

});

$(".btn").click(function(event){
    var userChosenColour =  $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function  nextSequence() {
  userClickedPattern = [];
  level++;
//  alert(level);
  $("#level-title").text("Level " + level);

//  $("h1").text("Level "+level);

  //alert("level"+level);
  var randomNumber=Math.floor(Math.random() *4);
     var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour);
  // $("h1").text("Level "+level);

}
function  playSound(name) {

  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}
function animatePress(currentColour) {
//  alert(currentColour);
  //console.log($(#currentColour));
   $("#"+currentColour).addClass("pressed");
//$("#currentColour").addClass(".pressed");
setTimeout(function(){$("#"+currentColour).removeClass("pressed"); }, 100);
}
function checkAnswer(currentLevel) {
if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
  if (userClickedPattern.length === gamePattern.length){

    //5. Call nextSequence() after a 1000 millisecond delay.
    setTimeout(function () {
      nextSequence();
    }, 1000);

  }

}
 else {
   console.log("wrong");
   var audio = new Audio("sounds/wrong.mp3");
   audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");

startOver();

}
}
function startOver() {
  window.level=0;
  window.gamePattern=[];
  window.userClickedPattern=[];
  window.started = false;

}
