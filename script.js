
// functions needed
// dom target element
// display question and choices
// compare user pick with correct answer

var pos = 0;
var correct = 0;
var choice = "";
var choices = "";

var quizEl, quizStatus, question, choice, choices, chA, chB, chC, pForm;

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
        d: "all correct",
        answer: "a"
    }
];


function get(x) {
    return document.getElementById(x);
}

// fucntion to start
// add evenlistener to show question when press start
// window.addEventListener("load", renderQuestion)

welcomeEl = get("welcome");
buttonEl = get("start");

buttonEl.addEventListener("click", function () {
    welcomeEl.remove();
    timeStart();
    renderQuestion();
    // reStart();
});


function renderQuestion() {
    // show question and choices on the page
    quizEl = get("quiz");
    quizStatusEl = get("quizStatus");

    // test completed when current postion more then question array
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
        quizStatusEl.innerHTML += "<label> <input type='radio' name='choices' value='a'> " + chA + "</label><br>";
        quizStatusEl.innerHTML += "<label> <input type='radio' name='choices' value='b'> " + chB + "</label><br>";
        quizStatusEl.innerHTML += "<label> <input type='radio' name='choices' value='c'> " + chC + "</label><br><br>";
        quizStatusEl.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";
    }
}


function checkAnswer() {

    choices = document.getElementsByName("choices");
    console.log("choices= " + choices);

    for (var i = 0; i < choices.length; i++) {
        if (choices[i].checked) {
            console.log("choices[i].checked= " + choices[i].checked);
            console.log("choices= " + choices);

            choice = choices[i].value;
            console.log("choice= " + choice);
            console.log("choices[i].value= " + choices[i].value);

        }
    }

    console.log("choice= " + choice);
    console.log("myQuestions[pos].answer= " + myQuestions[pos].answer);
    // check if choice match with correct key answer from array
    if (choice == myQuestions[pos].answer) {
        // increase user score.
        correct++;
    } else {
        // place holder to add reduce timer if wrong
        // correct--;
    }

    // increase position to next question
    pos++;
    renderQuestion();
}

var userInputEl = document.getElementById("userInput");
var countDownEl = document.getElementById("countDown");
var i = 0

function timeStart() {
    // game time 60 seconds
    var timeLeft = 20;
    var timeInterval = setInterval(function () {

        // show how much time remaining
        countDownEl.textContent = timeLeft;
        timeLeft--;

        if ((timeLeft === 0) || (pos >= myQuestions.length)) {
            quizStatusEl.innerHTML ="";
            // show time up when no time remaining
            if (timeLeft === 0) {
                quizEl.textContent = "Time Up!!" + "Your score is " + timeLeft;
                countDownEl.textContent = "Time Up!!";
                clearInterval(timeInterval);

            } else if (pos >= myQuestions.length) {
                quizEl.textContent = "All question answered. Your score is " + timeLeft;
                clearInterval(timeInterval);

            }
            // clearinterval is required otherwise timer will not stop
            clearInterval(timeInterval);

            // NEW LINE PURPOSE
            var pForm = document.createElement("div");
            quizEl.appendChild(pForm);


            var userForm = document.createElement("input");
            userForm.setAttribute("type", "text");
            userForm.setAttribute("id", "initial");
            userForm.setAttribute("placeholder", "Put in your initial");
            quizEl.appendChild(userForm);

            var submitButton = document.createElement("input");
            submitButton.setAttribute("type", "submit");
            submitButton.setAttribute("value", "Submit");
            quizEl.appendChild(submitButton);
            
        }

    }, 1000);
    // countdown 1000 millisecond each
}



function reStart() {
    timeStart();
    renderQuestion();
}


quizEl = document.getElementById("quiz");
quizEl.addEventListener("click", function(event) {
    event.preventDefault();
    
    console.log("event target is " + event.target.value);

    if(event.target.value == ("Submit")) {
        var name = document.querySelector("#initial").value;

        console.log(name);

        // if (name === "") {
        // displayMessage("error", "Name cannot be blank");
        // } else {
        // displayMessage("success", "Registered successfully");

        localStorage.setItem("name", name);
        renderLastRegistered();
        // }

        var replayButton = document.createElement("input");
        replayButton.setAttribute("type", "button");
        replayButton.setAttribute("value", "Play again");
        replayButton.setAttribute("onclick", "reStart();");

        // NEW LINE PURPOSE
        var pForm = document.createElement("div");
        quizEl.appendChild(pForm);

        quizEl.appendChild(replayButton);

    };
});


function renderLastRegistered() {
    var name = localStorage.getItem("name");

    if (!name) {
        return;
    }

    // leadBoard.textContent = name;
    leadBoard.append(name);
}