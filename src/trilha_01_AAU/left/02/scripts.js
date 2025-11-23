import "../../../js/progress.js";
document.addEventListener("DOMContentLoaded", () => {
    ProgressService.setActualStep("iaua", "arqueologia");
});

const btn = document.querySelector("#btn");
const btnBack = document.querySelector("#btn-back");

btn.addEventListener("click", () => {
  window.location.href = "../03/mapa.html";
});

btnBack.addEventListener("click", () => {
  window.location.href = "../01/intro.html";
});
