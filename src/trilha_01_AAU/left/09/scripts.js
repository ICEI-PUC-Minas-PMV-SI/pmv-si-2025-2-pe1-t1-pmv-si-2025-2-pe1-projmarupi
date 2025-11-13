document.addEventListener("DOMContentLoaded", () => {
  const allGridItems = document.querySelectorAll(".grid-item");
  const btnsVerifyList = document.querySelectorAll(".btn-verify");
  const btnsInfos = document.querySelectorAll(".btn-info");

  allGridItems.forEach((item) => {
    item.addEventListener("click", () => {
      item.classList.toggle("selected");
    });
  });

  function checkAllCardsForWin() {
    const successfulHeaders = document.querySelectorAll(".card-header.success");
    const failHeaders = document.querySelectorAll(".card-header.error");

    if (successfulHeaders.length === 3) {
      setTimeout(() => {
        window.location.href = "../10/avaliacao.html";
      }, 500);
    } else if (failHeaders.length === 3) {
      alert("Precisamos aprender um pouco mais!");
      window.location.href = "../05/quearvore.html";
    }
  }

  btnsVerifyList.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".card");
      const cardHeader = card.querySelector(".card-header");
      const correct = card.getAttribute("correctChar");
      const gridItems = card.querySelectorAll(".grid-item");
      let allCorrect = true;
      let hasSelectedOneAtLeast = false;

      cardHeader.classList.remove("error", "success");
      btn.classList.remove("success");

      gridItems.forEach((item) => {
        const img = item.querySelector("img");
        const src = img.getAttribute("src");
        const filename = src.split("/").pop();

        const isCorrectImage = filename.startsWith(correct);
        const isSelected = item.classList.contains("selected");

        if (isSelected) {
          hasSelectedOneAtLeast = true;
        }

        if (isCorrectImage && !isSelected) {
          allCorrect = false;
        }

        if (!isCorrectImage && isSelected) {
          allCorrect = false;
        }
      });

      if (!hasSelectedOneAtLeast) {
        allCorrect = false;
      }

      if (allCorrect) {
        cardHeader.classList.add("success");
        btn.classList.add("success");
        btn.textContent = "parabéns";
      } else {
        cardHeader.classList.add("error");
        btn.textContent = "verificar";
      }

      checkAllCardsForWin();
    });
  });

  btnsInfos[0].addEventListener("click", () => {
    window.location.href = "../06/sibipiruna.html";
  });

  btnsInfos[1].addEventListener("click", () => {
    window.location.href = "../06/acacia.html";
  });

  btnsInfos[2].addEventListener("click", () => {
    window.location.href = "../06/ipe.html";
  });
});
