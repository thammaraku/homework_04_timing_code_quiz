var pos = 0;
var correct = 0;
var test, test_status, question,choice, choices, chA, chB, chC;

// keep questions as objects in an array
const myQuestions = [
    {
        question: "Who invented JavaScript?",
        answer: {
            a: "Lebron James"
            b: "Ronaldo"
            c: "Brendan Eich"
        },
        correctAnswer: "c"
    },
    {
        question: "Which one of these is a JavaScript package manager?",
        answer: {
            a: "bpm"
            b: "npm"
            c: "abc"
        },
        correctAnswer: "b"
    }
    {
        question: "Which tool can you use to ensure code quality?",
        answer: {
            a: "Angular"
            b: "Angelo"
            c: "jQuery"
            d: "all correct"
        },
        correctAnswer: "a"
    }
];


function get() {
    return document.getElementById(x);
}

function renderQuestion() {

    // show question and choices on the page
    test = get("test");

    if(pos >= myQuestions.length) {

        test.innerHTML = "<h2>You got "+correct+" of "+questions.length+" questions correct</h2>";
        get("test_status").innerHTML = "Test completed";

        pos = 0;
        correct = 0;

        return false
    }

    get ("test_status").innerHTML = "Question " + (pos+1) + " of " + question.length;

    question = myQuestions[pos].question;
    chA = myQuestions[pos].a;
    chB = myQuestions[pos].b;
    chC = myQuestions[pos].c;

    test.innerHTML = "<h3>" + question + "</h3>";

    test.innerHTML += "<label> <input type='radio' name='choices' value='A'> "+chA+"</label><br>";
    test.innerHTML += "<label> <input type='radio' name='choices' value='B'> "+chB+"</label><br>";
    test.innerHTML += "<label> <input type='radio' name='choices' value='C'> "+chC+"</label><br><br>";
    test.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";

}