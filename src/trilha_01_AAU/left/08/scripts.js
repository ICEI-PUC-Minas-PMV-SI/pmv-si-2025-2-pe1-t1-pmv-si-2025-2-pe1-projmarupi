import "../../../js/progress.js";

document.addEventListener("DOMContentLoaded", () => {
    ProgressService.setActualStep("iaua", "captchaIntro");
});

const escButton = document.querySelector("#escape-btn");
const moveOnButton = document.querySelector("#move-on-btn");

escButton.addEventListener("click", () => {
  window.location.href = "../05/quearvore.html";
});

moveOnButton.addEventListener("click", () => {
  window.location.href = "../09/desafio.html";
});
