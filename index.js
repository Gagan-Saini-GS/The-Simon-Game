var gamePattern = [];
var buttonColors = ["green", "red", "yellow", "blue"];
var userClickedPattern = [];

$(".btn").on("click", function (event) {
  var userChosenColor = $(event.currentTarget).attr("id");
  userClickedPattern.push(userChosenColor);

  fadeAnimation("#" + userChosenColor);
  playSound(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
  //   if (userClickedPattern.length === gamePattern.length) {
  //   }
});

// Detecting keypress
var keypressed = false;
$(document).on("keypress", function () {
  if (keypressed === false) {
    nextSequence();
  }
  keypressed = true;
});

var level = 0;
function nextSequence() {
  var randomColorNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomColorNumber];
  gamePattern.push(randomChosenColor);

  $("h1").text("Level " + level);
  level++;
  fadeAnimation("." + randomChosenColor);
  playSound(randomChosenColor);
}

function playSound(name) {
  var song = new Audio("sounds/" + name + ".mp3");
  song.play();
}

function fadeAnimation(name) {
  $(name).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function checkAnswer(lastIndex) {
  console.log(userClickedPattern);
  console.log(gamePattern);
  var flag = true;
  if (userClickedPattern.length !== gamePattern.length) {
    flag = false;
  }

  //   if (userClickedPattern[lastIndex] === gamePattern[lastIndex]) {
  //     console.log("Success");
  //     while (userClickedPattern.length !== 0) {
  //       userClickedPattern.pop();
  //     }
  //     setTimeout(nextSequence, 1000);
  //   } else {
  //     var gameOverSound = new Audio("sounds/wrong.mp3");
  //     gameOverSound.play();
  //     $("body").addClass("game-over");

  //     setTimeout(function () {
  //       $("body").removeClass("game-over");
  //     }, 200);
  //     $("h1").text("Game Over, Press any key to restart");
  //     console.log("wrong");
  //     restart();
  //   }

  for (var i = 0; i <= lastIndex; i++) {
    if (userClickedPattern[i] === gamePattern[i]) {
      continue;
    } else {
      var gameOverSound = new Audio("sounds/wrong.mp3");
      gameOverSound.play();

      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("h1").text("Game Over, Press any key to restart");
      flag = false;

      restart(); // To restrat game
      break;
    }
  }

  if (flag) {
    while (userClickedPattern.length !== 0) {
      userClickedPattern.pop();
    }
    setTimeout(nextSequence, 1000);
  }
}

function restart() {
  level = 0;
  keypressed = false;
  while (userClickedPattern.length !== 0) {
    userClickedPattern.pop();
  }

  while (gamePattern.length !== 0) {
    gamePattern.pop();
  }
}
