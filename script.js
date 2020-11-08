var pos = 0;
var correct = 0;
var choice = 0;
welcomeEl = document.getElementById("welcome");
buttonEl = document.getElementById("start");
userInterEl = document.getElementById("userInter");
quizStatusEl = document.getElementById("quizStatus");
replayEl = document.getElementById("replay");
formEl = document.getElementById("form");
scoreBoardEl = document.getElementById("scoreBoard");
resultEl = document.getElementById("result");
choices = document.getElementsByName("choices");
userInputEl = document.getElementById("userInput");
countDownEl = document.getElementById("countDown");
var timeLeft = 60;


// keep questions as objects in an array
const myQuestions = [
    {
        question: "Who invented JavaScript?",
        a: "Lebron James",
        b: "Ronaldo",
        c: "Brendan Eich",
        answer: "c"
    },
    {
        question: "Which one of these is a JavaScript package manager?",
        a: "bpm",
        b: "npm",
        c: "abc",
        answer: "b"
    },
    {
        question: "Which tool can you use to ensure code quality?",
        a: "Angular",
        b: "Angelo",
        c: "jQuery",
        answer: "a"
    },

    {
        question: "How do you create a function in JavaScript?",
        a: "function = myFunction()",
        b: "function myFunction()",
        c: "function : myFunction()",
        answer: "b"
    },

    {
        question: "The external JavaScript file must contain the <script> tag.",
        a: "True",
        b: "False",
        c: "don't know",
        answer: "a"
    }

];


function get(x) {
    return document.getElementById(x);
}


buttonEl.addEventListener("click", function () {
    welcomeEl.remove();
    timeStart();
});

function reStart() {

    timeLeft = 60;
    pos = 0;
    quizStatusEl.innerHTML ="";
    userInterEl.innerHTML ="";    
    formEl.innerHTML ="";
    replayEl.innerHTML = "";


    renderQuestion();
    timeStart();

}

function renderQuestion() {

    if (pos < myQuestions.length) {

        // display question
        quizStatusEl.innerHTML = "Question " + (pos + 1) + " of " + myQuestions.length;

        question = myQuestions[pos].question;
        chA = myQuestions[pos].a;
        chB = myQuestions[pos].b;
        chC = myQuestions[pos].c;

        // dispay choices
        quizStatusEl.innerHTML = "<h3>" + question + "</h3>";
        // showing choices using addition assignment operation mean quizEl.innerHTML= quizEl.innerHTML + radio + chA
        // radio button must have the same name which allow only one to select
        quizStatusEl.innerHTML += "<label> <input type='radio' name='choices' value='a' required> " + chA + "</label><br>";
        quizStatusEl.innerHTML += "<label> <input type='radio' name='choices' value='b'required> " + chB + "</label><br>";
        quizStatusEl.innerHTML += "<label> <input type='radio' name='choices' value='c'required> " + chC + "</label><br><br>";
        quizStatusEl.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";
    }

}


function checkAnswer() {
    
    for (var i = 0; i < choices.length; i++) {
        if (choices[i].checked) {
            console.log("choices[i].checked= " + choices[i].checked);
            console.log("choices= " + choices);

            choice = choices[i].value;
            console.log("choice= " + choice);
            console.log("choices[i].value= " + choices[i].value);

        }
    }

    if (choice == myQuestions[pos].answer) {
        // increase user score.
        correct++;
        resultEl.textContent = "That's Correct!!";
        setTimeout(function () {
            resultEl.textContent ="";
        }, 500);

    } else {

        resultEl.textContent = "Wrong Answer!!!";
        setTimeout(function () {
            resultEl.textContent ="";
        }, 500);

        timeLeft -= 10;
        if (timeLeft < 0) {
            timeLeft = 0;
        }

    }

    if (timeLeft < 0) {
        // stop here since no time left
        pos = myQuestions.length;
        
    } else {
        // increase position to next question
        pos++;
        setTimeout(function () {
            renderQuestion();
        }, 500);

    }

}

function addInitial() {

   // NEW LINE PURPOSE
   var pForm = document.createElement("div");
   formEl.appendChild(pForm);

   var userForm = document.createElement("input");
   userForm.setAttribute("type", "text");
   userForm.setAttribute("id", "initial");
   userForm.setAttribute("placeholder", "Put in your initial");
   formEl.appendChild(userForm);

   var submitButton = document.createElement("input");
   submitButton.setAttribute("type", "submit");
   submitButton.setAttribute("value", "Submit");
   submitButton.setAttribute("id", "submit");
   formEl.appendChild(submitButton);
   
   var replayButton = document.createElement("input");
   replayButton.setAttribute("type", "submit");
   replayButton.setAttribute("value", "Play Again");
   replayEl.appendChild(replayButton);
   replayButton.setAttribute("onclick", "reStart();");

   var clearScoreButton = document.createElement("input");
   clearScoreButton.setAttribute("type", "submit");
   clearScoreButton.setAttribute("value", "Clear Score");
   replayEl.appendChild(clearScoreButton);
   clearScoreButton.setAttribute("onclick", "clearScore();");


    formEl.addEventListener("click", function(event) {
        event.preventDefault();
        
        console.log("event target is " + event.target.value);

        if (event.target.value == ("Submit")) {

            var name = document.querySelector("#initial").value;

            console.log("name after submit " + name);
            var score = timeLeft;

            if (!name) {
                var name = "noname";
            }
                localStorage.setItem("name", name);
                localStorage.setItem("score", score);

                var initialEl = document.createElement("li");
                initialEl.textContent = name +" : "+ score;
                scoreBoardEl.appendChild(initialEl);
                event.target.value="";
        }
    });

    
}

function timeStart() {

    var timeInterval = setInterval(function () {

        // show how much time remaining
        countDownEl.textContent = timeLeft;
        timeLeft--;

            // show time up when no time remaining
            if ((timeLeft === 0) || (timeLeft < 0)) {
                quizStatusEl.innerHTML ="";
                console.log("timeLeft under timeStart " + timeLeft);

                userInterEl.textContent = "Time Up!!" + "Your score is " + timeLeft;
                countDownEl.textContent = "Time Up!!";
                clearInterval(timeInterval);
                addInitial();

            } else if (pos >= myQuestions.length) {
                quizStatusEl.innerHTML ="";
                userInterEl.textContent = "All questions are answered. Your score is " + timeLeft;
                countDownEl.textContent = "Done!!";
                clearInterval(timeInterval);
                addInitial();
            }
            
    }, 1000);

    renderQuestion();

    
}

function renderLastRegistered() {

    var name = localStorage.getItem("name");
    var score = localStorage.getItem("score");
    scoreBoard.append(name +" : "+ score);

}


function clearScore() {
    scoreBoard.textContent ="";
}
