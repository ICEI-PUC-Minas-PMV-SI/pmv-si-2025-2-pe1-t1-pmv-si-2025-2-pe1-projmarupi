document.addEventListener("DOMContentLoaded", () => {
  const allAnswers = document.querySelectorAll(".nested-row");

  function checkWinCondition() {
    const successfulHeaders = document.querySelectorAll(".card-row-1.success");
    const wrongHeaders = document.querySelectorAll(".card-row-1.error");
    if (successfulHeaders.length === 2) {
      setTimeout(() => {
        window.location.href = "../11/inspiracao.html";
      }, 500);
    } else if (wrongHeaders.length == 2) {
      alert("Talvez seja melhor ler dessa vez!");
      window.location.href = "../01/intro.html";
    }
  }

  allAnswers.forEach((answer) => {
    answer.addEventListener("click", () => {
      const card = answer.closest(".card");
      const cardHeader = card.querySelector(".card-row-1");

      const answersInThisCard = card.querySelectorAll(".nested-row");
      answersInThisCard.forEach((item) =>
        item.classList.remove("selected", "wrong", "success")
      );
      cardHeader.classList.remove("success", "error");
      if (answer.classList.contains("correct-answer")) {
        cardHeader.classList.add("success");
        answer.classList.add("success");
      } else {
        cardHeader.classList.add("error");
        answer.classList.add("wrong");
      }
      checkWinCondition();
    });
  });
});
