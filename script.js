
// functions needed
// dom target element
// display question and choices
// compare user pick with correct answer

var pos = 0;
var correct = 0;
var choice = "";
var choices = "";

var quizEl, quizStatus, question, choice, choices, chA, chB, chC;

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

buttonEl.addEventListener("click", function() {
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
    if(pos < myQuestions.length) {

        // display question
        quizStatusEl.innerHTML = "Question " + (pos+1) + " of " + myQuestions.length;

        question = myQuestions[pos].question;
        chA = myQuestions[pos].a;
        chB = myQuestions[pos].b;
        chC = myQuestions[pos].c;

        // dispay choices
        quizEl.innerHTML = "<h3>" + question + "</h3>";
        // showing choices using addition assignment operation mean quizEl.innerHTML= quizEl.innerHTML + radio + chA
        // radio button must have the same name which allow only one to select
        quizEl.innerHTML += "<label> <input type='radio' name='choices' value='a'> "+chA+"</label><br>";
        quizEl.innerHTML += "<label> <input type='radio' name='choices' value='b'> "+chB+"</label><br>";
        quizEl.innerHTML += "<label> <input type='radio' name='choices' value='c'> "+chC+"</label><br><br>";
        quizEl.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";

    }

}


function checkAnswer() {

    choices = document.getElementsByName("choices");
    console.log("choices= " + choices);

    for(var i = 0; i < choices.length; i++) {
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
    if(choice == myQuestions[pos].answer) {
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
    var timeLeft = 5;
    var timeInterval = setInterval(function() {

        // show how much time remaining
        countDownEl.textContent = timeLeft;
        timeLeft--;

        if((timeLeft === 0) || (pos >= myQuestions.length)) {
            // show time up when no time remaining
            if (timeLeft === 0) {
                quizEl.textContent = "Time Up!!" + "Your score is " + timeLeft;
                countDownEl.textContent = "Time Up!!";
            } else if (pos >= myQuestions.length) {
                quizEl.textContent = "All question answered!!" + "Your score is " + timeLeft;
            }

            // record score
            quizStatusEl.innerHTML = "Put in your name";
            quizEl.innerHTML = "<label> <input type='text' name='username' id='name' placeholder='put in your name'> <input type='submit' id='submit' value='submit'>";

            // place holder when timeup show score
            // gameOver();

            // clearinterval is required otherwise timer will not stop
            clearInterval(timeInterval);
            // add button to play again
            // userInputEl.innerHTML += "<button onclick='reStart()'>Play Again</button>";
        }

    }, 1000);
    // countdown 1000 millisecond each
}



// function reStart() {
//     timeStart();
//     renderQuestion();
// }

var submitButton = get("quiz");
console.log(submitButton);
var leadBord = get("leadBoard");
console.log(leadBord);
quizEl = get("quiz");


// quizEl.addEventListener("click", function(event) {
//     event.preventDefault();
  
//     if(event.target.matches("submit")) {
//         var name = document.querySelector("#name").value;
//         if (name === "") {
//         displayMessage("error", "Name cannot be blank");
//         } else {
//         displayMessage("success", "Registered successfully");
    
//         localStorage.setItem("name", name);
//         renderLastRegistered();
//         }
    
//     };
// });

var name = "thamma"

        localStorage.setItem("name", name);
        renderLastRegistered();


function renderLastRegistered() {
    var name = localStorage.getItem("name");
  
    if (!name) {
      return;
    }
  
    leadBoard.textContent = name;
}