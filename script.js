
// functions needed
// dom target element
// display question and choices
// compare user pick with correct answer


var pos = 0;
var correct = 0;
var choice = "";
var choices = "";

var quiz, quizStatus, question, choice, choices, chA, chB, chC;

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

function renderQuestion() {

    // show question and choices on the page
    quiz = get("quiz");

    console.log("quiz= " + quiz);
    console.log("pos= " + pos);
    console.log("myQuestions.length= " + myQuestions.length);
    console.log("correct= " + correct);

    // test completed when current postion more then question array
    if(pos >= myQuestions.length) {

        console.log(pos);
        console.log(myQuestions.length);
        console.log(correct);

        quiz.innerHTML = "<h2>You got "+correct+" of "+myQuestions.length+" questions correct</h2>";
        get("quizStatus").innerHTML = "Test completed";

        pos = 0;
        correct = 0;

        return false
    }

    // display question
    get ("quizStatus").innerHTML = "Question " + (pos+1) + " of " + myQuestions.length;

    question = myQuestions[pos].question;
    chA = myQuestions[pos].a;
    chB = myQuestions[pos].b;
    chC = myQuestions[pos].c;

    // dispay choices
    quiz.innerHTML = "<h3>" + question + "</h3>";
    // showing choices using addition assignment operation mean quiz.innerHTML= quiz.innerHTML + radio + chA
    // radio button must have the same name which allow only one to select
    quiz.innerHTML += "<label> <input type='radio' name='choices' value='a'> "+chA+"</label><br>";
    quiz.innerHTML += "<label> <input type='radio' name='choices' value='b'> "+chB+"</label><br>";
    quiz.innerHTML += "<label> <input type='radio' name='choices' value='c'> "+chC+"</label><br><br>";
    quiz.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";
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

// add evenlistener to show question when page load






window.addEventListener("load", renderQuestion);