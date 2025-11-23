import "../../../js/tokens.js";
import "../../../js/progress.js";

document.addEventListener("DOMContentLoaded", () => {
  ProgressService.setActualStep("iaua", "captchaDesafio");

  const allGridItems = document.querySelectorAll(".grid-item");
  const btnsVerifyList = document.querySelectorAll(".btn-verify");
  const btnsInfos = document.querySelectorAll(".btn-info");
  const dockerItems = document.querySelectorAll(".docker-footer .docker-item");

  const teleportLocations = [
    "https://www.google.com/maps?layer=c&cbll=-19.92998,-43.94932",
    "https://www.google.com/maps?layer=c&cbll=-19.91536,-43.93621",
    "https://www.google.com/maps?layer=c&cbll=-19.89058,-43.91333",
    "https://www.google.com/maps?layer=c&cbll=-19.92615,-43.92824",
    "https://www.google.com/maps?layer=c&cbll=-19.92429,-43.93485",
    "https://www.google.com/maps?layer=c&cbll=-20.00021,-43.99822",
  ];

  allGridItems.forEach((item) => {
    item.addEventListener("click", () => {
      item.classList.toggle("selected");
    });
  });

  function checkAllCardsForWin() {
    const successfulHeaders = document.querySelectorAll(".card-header.success");
    const failHeaders = document.querySelectorAll(".card-header.error");

    if (successfulHeaders.length === 3) {
      const firstTry = localStorage.getItem("firstTryCaptcha");
      if (firstTry == null || firstTry === undefined || firstTry === "") {
        TokenService.addToken("first", "iaua", true);
        localStorage.setItem("firstTryCaptcha", "false");
      }
      setTimeout(() => {
        window.location.href = "../10/avaliacao.html";
      }, 1200);
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

  teleportLocations.sort(() => Math.random() - 0.5);
  dockerItems.forEach((item, index) => {
    const locIndex = index % teleportLocations.length;
    item.href = teleportLocations[locIndex];
    item.target = "_blank";
    item.title = "Conheça aleatoriamente uma árvore incrível em sua cidade!";
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
