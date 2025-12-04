const cardsData = [
  {
    title: "O Edifício Martinelli",
    step: "01/06",
    image: "./images/martinelli_01.jpg",
    description:
      "Foi o primeiro arranha-céu de São Paulo, com 105 metros de altura. E palco de histórias de luxo... e horror.",
  },
  {
    title: "O Edifício Martinelli",
    step: "02/06",
    image: "./images/noiva_fantasma_do_martinelli.png",
    description:
      "A lenda mais famosa envolve a 'Noiva Fantasma' que aparece nos andares superiores, buscando vingança.",
  },
  {
    title: "O Edifício Martinelli",
    step: "03/06",
    image: "./images/encontrar_corpo_martinelli.png",
    description:
      "Outro caso famoso é o de um crime cometido no local, onde o corpo da vítima foi encontrado dias depois.",
  },
  {
    title: "O Edifício Martinelli",
    step: "04/06",
    image: "./images/terraco_martinelli.png",
    description:
      "Dizem que o espírito de uma jovem, morta em um ritual, assombra o último andar.",
  },
  {
    title: "O Edifício Martinelli",
    step: "05/06",
    image: "./images/castelinho-rua-apa-sp-antiga2.jpg",
    description: "Que tal marcar uma visitinha?",
  },
  {
    title: "Quiz Edifício Martinelli",
    step: "06/06",
    image: "./images/quiz_martinelli.png",
    description: "Que tal testar seus conhecimentos dessa lenda?",
  },
];

let currentIndex = 0;
const title = document.querySelector(".card-title");
const step = document.querySelector(".step-number");
const img = document.querySelector(".card-image-container img");
const info = document.querySelector(".card-description");
const backBtn = document.querySelector("#btnBack");
const nextBtn = document.querySelector("#btnNext");

function updateCard() {
  const currentCard = cardsData[currentIndex];
  title.textContent = currentCard.title;
  step.textContent = currentCard.step;
  img.src = currentCard.image;
  img.alt = currentCard.title;
  info.textContent = currentCard.description;

  backBtn.disabled = currentIndex === 0;
  backBtn.style.opacity = currentIndex === 0 ? "0.5" : "1";

  if (currentIndex === cardsData.length - 1) {
    nextBtn.textContent = "Quiz";
    nextBtn.disabled = false;
    nextBtn.style.opacity = "1";
  } else {
    nextBtn.textContent = "Avançar";
    nextBtn.disabled = false;
    nextBtn.style.opacity = "1";
  }
}

nextBtn.addEventListener("click", () => {
  if (currentIndex === cardsData.length - 1) {
    window.location.href = "../02/quiz.html";
  } else {
    currentIndex++;
    updateCard();
  }
});

backBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCard();
  }
});

updateCard();
