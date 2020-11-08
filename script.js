
// functions needed
// dom target element
// display question and choices
// compare user pick with correct answer

var pos = 0;
var correct = 0;
var choice = "";
// var choices = "";

// var quizEl, quizStatus, question, choice, choices, chA, chB, chC, pForm;

welcomeEl = document.getElementById("welcome");
buttonEl = document.getElementById("start");
userInterEl = document.getElementById("userInter");
quizStatusEl = document.getElementById("quizStatus");
replayEl = document.getElementById("replay");
formEl = document.getElementById("form");
choices = document.getElementsByName("choices");
userInputEl = document.getElementById("userInput");
countDownEl = document.getElementById("countDown");
// var i = 0
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
    // renderQuestion();
});

function reStart() {
    timeLeft = 2;
    pos = 0;
    renderQuestion();
    timeStart();

}

function renderQuestion() {


    if (pos < myQuestions.length) {

        // userInterEl.textContent = "";

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

    console.log("timeLeft under renderQuestion is " + timeLeft)

    return timeLeft;

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
        userInterEl.textContent = "That's Correct!!";

    } else {
        // place holder to add reduce timer if wrong
        // correct--;
        userInterEl.textContent = "Wrong Answer!!!";

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
        renderQuestion();
    }

    // console.log("timeLeft under checkAnswer is " + timeLeft)

    return timeLeft;


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

    formEl.addEventListener("click", function(event) {
        event.preventDefault();
        
        console.log("event target is " + event.target.value);

        if (event.target.value == ("Submit")) {
            
            var name = document.querySelector("#initial").value;
            var score = timeLeft;

            console.log(name);
            console.log(score);


            if (!name) {
                alert("error Name cannot be blank");
            } else {
                alert("Registered successfully");

                localStorage.setItem("name", name);
                localStorage.setItem("score", score);
                renderLastRegistered();
            }
        }


    });


}

function timeStart() {

    renderQuestion();
    

    var timeInterval = setInterval(function () {

        // show how much time remaining
        countDownEl.textContent = timeLeft;
        timeLeft--;

            // show time up when no time remaining
            if ((timeLeft === 0) || (timeLeft < 0)) {
                // var timeLeft = 0;
                quizStatusEl.innerHTML ="";
                console.log("timeLeft under timeStart " + timeLeft);

                userInterEl.textContent = "Time Up!!" + "Your score is " + timeLeft;
                countDownEl.textContent = "Time Up!!";
                var pForm = document.createElement("div");
                formEl.appendChild(pForm);
                clearInterval(timeInterval);
                addInitial();

            } else if (pos >= myQuestions.length) {
                quizStatusEl.innerHTML ="";
                userInterEl.textContent = "All question answered. Your score is " + timeLeft;
                var pForm = document.createElement("div");
                countDownEl.textContent = "Done!!";
                formEl.appendChild(pForm);
                clearInterval(timeInterval);
                addInitial();
            }
        
            

    }, 1000);
    
}

function renderLastRegistered() {
    var name = localStorage.getItem("name");
    var score = localStorage.getItem("score");

    if (!name) {
        return;
    }
    // leadBoard.textContent = name;
    leadBoard.append(name +" - "+ score);
}