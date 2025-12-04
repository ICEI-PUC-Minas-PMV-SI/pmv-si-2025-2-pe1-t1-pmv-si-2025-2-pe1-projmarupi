const startGameButton = document.querySelector(".start-quiz");
const nextQuestionButton = document.querySelector(".next-question");
const questionsContainer = document.querySelector(".question-container");
const answersContainer = document.querySelector(".answers-container");
const questionText = document.querySelector(".question");

let currentQuestionIndex = 0;

startGameButton.addEventListener("click", startGame);
nextQuestionButton.addEventListener("click", () => {
  currentQuestionIndex++;
  displayNextQuestion();
});

const questions = [
  {
    question: "Por que o Edifício Martinelli é considerado assombrado?",
    answers: [
      { text: "Foi construído em um cemitério antigo.", correct: false },
      { text: "O espírito de uma jovem morta em um ritual.", correct: false },
      { text: "Houve um incêndio que matou várias pessoas.", correct: false },
      { text: "Todas as questões acima.", correct: true },
    ],
  },

  {
    question: "Qual é a altura aproximada do Martinelli?",
    answers: [
      { text: "50 metros", correct: false },
      { text: "105 metros", correct: true },
      { text: "200 metros", correct: false },
      { text: "80 metros", correct: false },
    ],
  },
];

function startGame() {
  startGameButton.classList.add("hide");
  questionsContainer.classList.remove("hide");
  currentQuestionIndex = 0;
  displayNextQuestion();
}

function displayNextQuestion() {
  resetState();
  if (currentQuestionIndex < questions.length) {
    showQuestion(questions[currentQuestionIndex]);
  } else {
    questionText.textContent = "Quiz Finalizado!";
    startGameButton.innerText = "Reiniciar Quiz";
    startGameButton.classList.remove("hide");
  }
}

function showQuestion(question) {
  questionText.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("button", "answer-button");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answersContainer.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextQuestionButton.classList.add("hide");
  while (answersContainer.firstChild) {
    answersContainer.removeChild(answersContainer.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;

  setStatusClass(document.body, correct);
  setStatusClass(selectedButton, correct);

  for (const button of answersContainer.children) {
    button.disabled = true;
  }

  if (questions.length > currentQuestionIndex + 1) {
    nextQuestionButton.classList.remove("hide");
  } else {
    startGameButton.innerText = "Reiniciar";
    startGameButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("incorrect");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("incorrect");
}
