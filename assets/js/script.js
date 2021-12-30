//array for questions, options, and correct answer
var objArray = [
  {
    question: "Placeholder question 1",
    btn1: "Button 1 Text question 1",
    btn2: "Button 2 Text question 1",
    btn3: "Button 3 Text question 1",
    btn4: "Button 4 Text question 1",
    answer: "Button 1 Text question 1",
  },
  {
    question: "Placeholder question 2",
    btn1: "Button 1 Text question 2",
    btn2: "Button 2 Text question 2",
    btn3: "Button 3 Text question 2",
    btn4: "Button 4 Text question 2",
    answer: "Button 3 Text question 2",
  },
  {
    question: "Placeholder question 3",
    btn1: "Button 1 Text question 3",
    btn2: "Button 2 Text question 3",
    btn3: "Button 3 Text question 3",
    btn4: "Button 4 Text question 3",
    answer: "Button 2 Text question 3",
  },
  {
    question: "Placeholder question 4",
    btn1: "Button 1 Text question 4",
    btn2: "Button 2 Text question 4",
    btn3: "Button 3 Text question 4",
    btn4: "Button 4 Text question 4",
    answer: "Button 4 Text question 4",
  },
];

//option btn global variables
var btn1 = document.getElementById("btn1");
var btn2 = document.getElementById("btn2");
var btn3 = document.getElementById("btn3");
var btn4 = document.getElementById("btn4");

//page changing btn global variables
var startBtn = document.getElementById("startBtn");
var goBackBtn = document.getElementById("goBackBtn");
var goBackBtn2 = document.getElementById("goBackBtn2");
var submitBtn = document.getElementById("submitBtn");
var hsBtn = document.getElementById("hsBtn");

//hide/reveal global variables
var hiddenQuiz = document.getElementById("quizOptions");
var hiddenScore = document.getElementById("highScore");
var quizInit = document.getElementById("quizInitialPage");
var result = document.getElementById("result");
var scoreH2 = document.getElementById("scoreH2");
var resultsPage = document.getElementById("resultsPage");

//question counter global variable
var questionNumber = 0;

//highscore counter global variable
var highScore = 0;

var highScoreUl = document.getElementById("highScoreList");

// timer variables
var timeLeft = 75;
var timeInterval;
var timerEl = document.getElementById("timer");

var startButton = function () {
  //Start Button: when clicked, starts the quiz, hide initial page by adding hidden class to quizInit
  quizInit.className = "hidden";

  //unhide quizOptions
  var quizOptions = document.getElementById("quizOptions");
  //remove hidden class from quizOptions
  quizOptions.classList.remove("hidden");
  countdown();
  populateQuiz(questionNumber);
};

var populateQuiz = function () {
  //get quizQuestion element from document
  var quizQuestion = document.getElementById("quizQuestion");
  //make quizQuestion text = objArray's first object named question's text
  quizQuestion.textContent = objArray[questionNumber].question;

  //give btn1 text content = to objArray 0's btn1
  btn1.textContent = objArray[questionNumber].btn1;
  btn2.textContent = objArray[questionNumber].btn2;
  btn3.textContent = objArray[questionNumber].btn3;
  btn4.textContent = objArray[questionNumber].btn4;

  btn1.setAttribute("value", objArray[questionNumber].btn1);
  btn2.setAttribute("value", objArray[questionNumber].btn2);
  btn3.setAttribute("value", objArray[questionNumber].btn3);
  btn4.setAttribute("value", objArray[questionNumber].btn4);

  //when btn1 is clicked, listen to event, store event in answerButton function, call answerButton function
  btn1.addEventListener("click", answerButton);
  btn2.addEventListener("click", answerButton);
  btn3.addEventListener("click", answerButton);
  btn4.addEventListener("click", answerButton);
};

//create variable answerButton to use event from btn1-4 click, make btnClicked = to the btn clicked in btn1-4
var answerButton = function () {
  //Correct Choice Button: when clicked, responds "correct!", takes to next question or highscore page
  if (this.value === objArray[questionNumber].answer) {
    console.log("correctresponse");
    result.className = "border-top";
    result.textContent = "Correct Answer!";
    highScore++;

    if (timeLeft < 0) {
      timeLeft = 0;
    }
  }
  //Wrong Choice Button: when clicked, responds "wrong!", lowers countdown by 10 seconds or highscore page
  else {
    console.log("wrongresponse");
    timeLeft -= 10;
    result.className = "border-top";
    result.textContent = "Wrong Answer!";

    if (timeLeft < 0) {
      timeLeft = 0;
    }
  }

  questionNumber++;

  console.log(questionNumber);

  //check if equal to array length, then go next question or end quiz
  if (questionNumber === objArray.length) {
    endQuiz();
  } else {
    console.log("Next Q");
    populateQuiz();
  }
};

function countdown() {
  timeInterval = setInterval(function () {
    if (timeLeft > 1) {
      timerEl.textContent = timeLeft + " seconds remaining";
      timeLeft--;
    } else if (timeLeft === 1) {
      timerEl.textContent = timeLeft + " second remaining";
      timeLeft--;
    } else {
      endQuiz();
    }
  }, 1000);
}
//button event listeners

var endQuiz = function () {
  if (timeLeft > 0) {
    scoreH2.textContent = "Finished! Your final score is " + highScore;
  }
  else {
    scoreH2.textContent = "Out of time! Your final score is " + highScore;
  };
  clearInterval(timeInterval);
  timerEl.textContent = "";
  hiddenScore.classList.remove("hidden");

  //hide quizOptions
  hiddenQuiz.className = "hidden";
  //hide answer result
  result.className = "hidden";
};

//submit name and highscore and return to the quizInit page
var submitButton = function () {
  var nameEl = document.querySelector("#name");
  var name = nameEl.value.trim();

  //if the input is null, give an alert. if not, store the input
  if (nameEl.value !== "") {
    var allScores = JSON.parse(window.localStorage.getItem("allScores")) || [];

    var user = {
      initials: name,
      score: highScore,
    };

    allScores.push(user);
    console.log(allScores);
    localStorage.setItem("allScores", JSON.stringify(allScores));


    for(var i=0;i<allScores.length; i++){
      var list1 = document.createElement("li");
      if (allScores[i].score === 1) {
        list1.textContent =
        allScores[i].initials + " scored " + allScores[i].score + " point!"
      } else {
        list1.textContent =
        allScores[i].initials + " scored " + allScores[i].score + " points!"
      }
      highScoreUl.appendChild(list1);
    };
  }
};

//go back to quizInit page without submitting name/highscore
var goBackButton = function (event) {
  var btnClicked = event.target;
  console.log(btnClicked);
  //stop & reset timer
  //hide highscore
  hiddenScore.className = "hidden";
  //unhide quizInitialPage
  quizInit.classList.remove("hidden");
  goBackBtn2.className = "hidden";
  questionNumber = 0;
  highScore = 0;
};
//High Score Button: changes page to show locally stored high scores.
var hsButton = function () {
  hiddenScore.className = "hidden";
  quizInit.className = "hidden";
  hiddenQuiz.className = "hidden";
  resultsPage.classList.remove("hidden");
  goBackBtn2.classList.remove("hidden");
};

//go back to the main quiz Init page from the resultsPage
var goBackButton2 = function (event) {
  var btnClicked = event.target;
  console.log(btnClicked);
  resultsPage.className = "hidden";
  quizInit.classList.remove("hidden");
  goBackBtn2.className = "hidden";
};
startBtn.addEventListener("click", startButton);

goBackBtn.addEventListener("click", function (event) {
  goBackButton(event);
});

goBackBtn2.addEventListener("click", function (event) {
  goBackButton2(event);
});

submitBtn.addEventListener("click", submitButton);

hsBtn.addEventListener("click", hsButton);
