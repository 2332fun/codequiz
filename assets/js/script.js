// AS A coding boot camp student
// I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
// SO THAT I can gauge my progress compared to my peers

// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and score

//array for questions, options, and correct answer
var objArray = [{
    question:"Placeholder question 1",
    btn1:"Button 1 Text question 1",
    btn2:"Button 2 Text question 1",
    btn3:"Button 3 Text question 1",
    btn4:"Button 4 Text question 1",
    answer: "Button 1 Text question 1"
},
{
    question:"Placeholder question 2",
    btn1:"Button 1 Text question 2",
    btn2:"Button 2 Text question 2",
    btn3:"Button 3 Text question 2",
    btn4:"Button 4 Text question 2",
    answer: "Button 3 Text question 2"
},
{
    question:"Placeholder question 3",
    btn1:"Button 1 Text question 3",
    btn2:"Button 2 Text question 3",
    btn3:"Button 3 Text question 3",
    btn4:"Button 4 Text question 3",
    answer: "Button 2 Text question 3"
},
{
    question:"Placeholder question 4",
    btn1:"Button 1 Text question 4",
    btn2:"Button 2 Text question 4",
    btn3:"Button 3 Text question 4",
    btn4:"Button 4 Text question 4",
    answer: "Button 4 Text question 4"
}];

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
// var currentHighScore = 0;

var goBackButton = function(event) {
    var btnClicked = event.target;
    console.log(btnClicked);
    //stop & reset timer
    //set currentHighScore to 0
    //hide highscore
    hiddenScore.className = "hidden";
    //unhide quizInitialPage
    quizInit.classList.remove("hidden");
    goBackBtn2.className = "hidden";
    questionNumber = 0;
};

var goBackButton2 = function(event) {
    var btnClicked = event.target;
    console.log(btnClicked);
    resultsPage.className = "hidden";
    quizInit.classList.remove("hidden");
    goBackBtn2.className = "hidden";
};

var submitButton = function(event) {
    var btnClicked = event.target;
    console.log(btnClicked);
    console.log("submit");
    var name = document.getElementById("name").value;

    //if the input is null, give an alert. if not, store the input
    if(document.getElementById("name").value == "")
    {
    alert("You can't leave an empty name.");
    }
    else {
    //hide highscore
    hiddenScore.className = "hidden";
    //unhide quizInitialPage
    quizInit.classList.remove("hidden");
    console.log(name);
    questionNumber = 0;
    }
};

//High Score Button: changes page to show locally stored high scores.
var hsButton = function(event) {
    var btnClicked = event.target;
    console.log(btnClicked);
    console.log("highscore");
    hiddenScore.className = "hidden";
    quizInit.className = "hidden";
    hiddenQuiz.className = "hidden";
    resultsPage.classList.remove("hidden");
    goBackBtn2.classList.remove("hidden");
};

var startButton = function(questionNumber) {
    //Start Button: when clicked, starts the quiz, initiates the timer countdown at 75.
    //set timer to 75 seconds
    //hide initial page by adding hidden class to quizInit
    quizInit.className = "hidden";
    

    //unhide quizOptions
    var quizOptions = document.getElementById("quizOptions");
    //remove hidden class from quizOptions
    quizOptions.classList.remove("hidden");
    //get quizQuestion element from document
    var quizQuestion = document.getElementById("quizQuestion");
    //make quizQuestion text = objArray's first object named question's text
    quizQuestion.textContent = objArray[questionNumber].question;

    //give btn1 text content = to objArray 0's btn1
    btn1.textContent = objArray[questionNumber].btn1;
    btn2.textContent = objArray[questionNumber].btn2;
    btn3.textContent = objArray[questionNumber].btn3;
    btn4.textContent = objArray[questionNumber].btn4;
};

    //when btn1 is clicked, listen to event, store event in answerButton function, call answerButton function
    btn1.addEventListener("click", function(event){
        answerButton(event);
    });
    btn2.addEventListener("click", function(event){
        answerButton(event);
    });
    btn3.addEventListener("click", function(event){
        answerButton(event);
    });
    btn4.addEventListener("click", function(event){
        answerButton(event);
    });
    //create variable answerButton to use event from btn1-4 click, make btnClicked = to the btn clicked in btn1-4
    var answerButton = function(event) {
        var btnClicked = event.target.textContent;
        console.log(btnClicked);
        //Correct Choice Button: when clicked, responds "correct!", takes to next question or highscore page
        if (btnClicked === objArray[questionNumber].answer) {
            console.log("correctresponse");
            result.classList.remove("hidden");
            result.textContent = "Correct Answer!";
            highScore ++;
            questionNumber ++;
            //go to next question by increasing questionNumber by 1, check if equal to array length, then go next question or end quiz
            if (questionNumber === objArray.length) {
                //show highscore
                hiddenScore.classList.remove("hidden");
                console.log(highScore);
                console.log(scoreH2.textContent);
                scoreH2.textContent = "All done! Your final score is " + highScore;
                //hide quizOptions
                hiddenQuiz.className = "hidden";
                //hide answer result
                result.className = "hidden";
            }
            else {
                startButton(questionNumber);
            }
        }
        //Wrong Choice Button: when clicked, responds "wrong!", lowers countdown by 10 seconds or highscore page
        else {
            console.log("wrongresponse");
            result.classList.remove("hidden");
            result.textContent = "Wrong Answer!";
            questionNumber ++;
            if (questionNumber === objArray.length) {
                console.log(highScore);
                console.log(scoreH2.textContent);
                scoreH2.textContent = "All done! Your final score is " + highScore;
                //show highscore
                hiddenScore.classList.remove("hidden");
                //hide quizOptions
                hiddenQuiz.className = "hidden";
                //hide answer result
                result.className = "hidden";
            }
            else {
                startButton(questionNumber);
            }
        }
    };

//button event listeners

startBtn.addEventListener("click", function() {
    startButton(questionNumber);
});

goBackBtn.addEventListener("click", function(event) {
    goBackButton(event);
});

goBackBtn2.addEventListener("click", function(event) {
    goBackButton2(event);
});

submitBtn.addEventListener("click", function(event) {
    submitButton(event);
});

hsBtn.addEventListener("click", function(event) {
    hsButton(event);
});

//STEP 3: Timer
//Starts at 0 on quiz screen
//Goes to 75 on start click
//Counts down 1 per second
//Lowers by 10 on Wrong Choice Button clicked
//Goes to "outoftime" screen when hits 0
//stops counting when quiz is finished within time limit

//STEP 4: High Score
//If completed before timer is out, grabs timer #, stores it as highscore
//Locally store highscore
//Allow user textinput Name
//Locally store name and highscore



// Set up highscores
// Set up local Storage
// Set up Timer
// Fill out questions
// Refactor