const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false}
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            {text: "Vatican City", correct: true},
            {text: "Bhutan", correct: false},
            {text: "Nepal", correct: false},
            {text: "Shri Lanka", correct: false}
        ]
    },
    {
        question: "Which is largest desert in the world?",
        answers: [
            {text: "Kalahari", correct: false},
            {text: "Gobi", correct: false},
            {text: "Sahara", correct: false},
            {text: "Antarctica", correct: true}
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            {text: "Asia", correct: false},
            {text: "Australia", correct: true},
            {text: "Arctic", correct: false},
            {text: "Africa", correct: false}
        ]
    }
];

const questElement = document.getElementById("question")
const ansBtn = document.getElementById("answer-buttons")
const nextBtn = document.getElementById("next-btn")

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.textContent = "Next";
    showQuestion()
}
function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questElement.innerText = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn")
        ansBtn.appendChild(button)
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
    })
}
function resetState() {
    nextBtn.style.display = "none";
    while(ansBtn.firstChild) {
        ansBtn.removeChild(ansBtn.firstChild)
    }
}
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true"
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++
    } else {
        selectedBtn.classList.add("incorrect")
    }
    Array.from(ansBtn.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct")
        }
        button.disabled = true;
    })
    nextBtn.style.display = "block"
}
function showScore(){
    resetState();
    questElement.textContent = `You scored ${score} out of ${questions.length}`
    nextBtn.textContent = "Play again?"
    nextBtn.style.display = "block"
}
function handleNextBtn(){
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length) {
        showQuestion()
    } else {
        showScore()
    }
}
nextBtn.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length) {
        handleNextBtn()
    } else {
        startQuiz()
    }
})
startQuiz()

