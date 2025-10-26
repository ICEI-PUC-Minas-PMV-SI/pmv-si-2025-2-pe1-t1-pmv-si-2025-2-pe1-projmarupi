const listBtnCorrectAnswers = document.querySelectorAll(".correct-answer");

listBtnCorrectAnswers.forEach((btn) => {
  btn.addEventListener("click", () => {
    window.location.href = "../11/inspiracao.html";
  });
});
