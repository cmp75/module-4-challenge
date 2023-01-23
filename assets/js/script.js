var questionsDisplay = document.querySelector("#questions");
var timerDisplay = document.querySelector("#time"); 
var answerOptions = document.querySelector("#answer-options"); 
var submitButton = document.querySelector("#submit"); 
var backButton = document.getElementById("go-back-button");
var startButton = document.querySelector("#btn-start");
var userInitialsInput = document.querySelector("#user-initials");
var rightWrong = document.querySelector("#right-wrong");

var currentQuestionIndex = 0;
var time = questions.length * 10; 
var timerId; 

function startQuiz() {
  var quizIntroInfo = document.querySelector("#quizBox");
  quizIntroInfo.setAttribute("class", "hide");
  questionsDisplay.removeAttribute("class");
  timerId = setInterval(countdown, 1000);
  timerDisplay.textContent = time;
  quizQuestions();
}

function countdown() {
  time--;
  timerDisplay.textContent = time;

  if (time <= 0) {
    quizEnd();
  }
}

function quizQuestions() {
  var currentQuestion = questions[currentQuestionIndex];
  var questionTitle = document.querySelector("#question-title");
  questionTitle.textContent = currentQuestion.title;
  answerOptions.innerHTML = "";
  currentQuestion.choices.forEach(function(choice, i) {
    var answerButton = document.createElement("button");
    answerButton.setAttribute("class", "answer-options button");
    answerButton.setAttribute("value", choice);
    answerButton.textContent = i + 1 + ". " + choice;
    answerButton.onclick = questionClick;
    answerOptions.appendChild(answerButton);
  });
}

function questionClick() {
  if (this.value !== questions[currentQuestionIndex].answer) {
    time -= 10;

  if (time < 0) {
      time = 0;
    }
    timerDisplay.textContent = time;
    rightWrong.textContent = "Wrong!";
    rightWrong.style.color = "gray";
    rightWrong.style.fontSize = "22px";
  } else { 
    time += 10;
    timerDisplay.textContent = time;
    rightWrong.textContent = "Correct!";
    rightWrong.style.color = "gray";
    rightWrong.style.fontSize = "22px";
  }

  rightWrong.setAttribute("class", "right-wrong");
  setTimeout(function() {
    rightWrong.setAttribute("class", "right-wrong hide");
  }, 1000);

  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    quizQuestions();
  }
}

function quizEnd() {
  clearInterval(timerId);
  var quizFinished = document.querySelector("#quiz-finished");
  quizFinished.removeAttribute("class");
  var finalScoreDisplay = document.querySelector("#final-score");
  finalScoreDisplay.textContent = time;
  questionsDisplay.setAttribute("class", "hide");
}

function saveHighscore() {
  var initials = userInitialsInput.value.trim();
  if (initials !== "") {
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];
    var newScore = {
      score: time,
      initials: initials
    };
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    window.location.href = "highscores.html";
  }
}

function pressEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
  }
}

userInitialsInput.onkeyup = pressEnter;
submitButton.onclick = saveHighscore;
startButton.onclick = startQuiz;







function printHighscores() {
  var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

  highscores.sort(function(a, b) {
    return b.score - a.score;
  });

  highscores.forEach(function(score) {
    var userScores = document.createElement("li");
    userScores.textContent = score.initials + " - " + score.score + " 🏅";

    var highscoresList = document.getElementById("highscores-list");
    highscoresList.appendChild(userScores);
  });
}

function clearHighscores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}
document.getElementById("clear").onclick = clearHighscores;

printHighscores();