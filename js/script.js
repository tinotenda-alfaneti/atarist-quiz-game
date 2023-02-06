const answer = document.getElementById("answer");
const ansLab = document.getElementById("ans-label");
const check = document.getElementById("check");
const start = document.getElementById("reset-btn");
const decision = document.getElementById("decision");
const question = document.getElementById("question");
const totalCorrect = document.getElementById("t-correct");
const totalWrong = document.getElementById("t-wrong");
const skipsLeft = document.getElementById("t-skipped");
const next = document.getElementById("next");


//initial state of buttons
next.disabled = "disabled";
next.style.background = "white";
check.disabled = "disabled";
check.style.background = "white";

//initialize variables
let quizQuestion = getQuestion();
let correct = 0;
let wrong = 0;
let skips = 3;

//Event listeners
check.addEventListener("click", (e) => {
    checkAnswer(answer)
    answer.value = "";
    
});
next.addEventListener("click", (e) => {
    quizQuestion = getQuestion();
    updateQuestion("next");
    
});
start.addEventListener("click", (e) => {
    
    quizQuestion = getQuestion();
    updateQuestion("start");
    totalCorrect.innerText = 0;
    totalWrong.innerText = 0;
    correct = 0;
    wrong = 0
    next.removeAttribute("disabled");
    next.style.background = "#8F0B0B";
    check.removeAttribute("disabled");
    check.style.background = "#8F0B0B";

})

function checkAnswer(userAnswer) {
    const result = userAnswer.value === quizQuestion.correct_answer;
    if (result) {
        decision.innerText = "CORRECT";
        decision.style.color = "green";
        correct+=1;
        



    } else {
        decision.innerText = "WRONG";
        decision.style.color = "red";
        wrong+=1;
    }
    
    userAnswer.disabled = "disabled";
    check.disabled = "disabled";
    check.style.background = "white";
    updateScore();

};

function updateQuestion(opt) {

    if(skips <= 0 && check.disabled === false && opt != "start") {
        alert("You exahausted you skips. Please answer");
        return;
    }

    question.innerHTML = quizQuestion.question + " (True/False) ";
    if (opt === "next" && check.disabled === false) {
        decision.innerText = "YOU SKIPPED";
        decision.style.color = "red";
        skips-=1;
        updateScore();
    } else {
        decision.innerText = "";
        decision.style.color = "black";
        answer.removeAttribute("disabled");
        check.removeAttribute("disabled");
        check.style.background = "#8F0B0B";  
    }
    

};

function updateScore() {
    totalCorrect.innerText = correct;
    totalWrong.innerText = wrong;
    skipsLeft.innerText = skips;


}

function getQuestion() {
   return questionList[randomIndex()]; 
}

function randomIndex() {
    let count = 0; 
      for (let key in questionList) {
        count++;
      }
    return Math.floor(Math.random() * count);
}
 
