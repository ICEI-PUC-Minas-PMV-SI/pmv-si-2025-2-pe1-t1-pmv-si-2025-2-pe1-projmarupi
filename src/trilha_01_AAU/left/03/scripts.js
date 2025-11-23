import "../../../js/progress.js";

document.addEventListener("DOMContentLoaded", () => {
  ProgressService.setActualStep("iaua", "mapa");
});

const buttonsList = document.querySelectorAll(".btn-caminhar");

const btn_esc = document.querySelector("#btn-esc");

buttonsList.forEach((btn) => {
  btn.addEventListener("click", () => {
    window.location.href = "../04/repertorio.html";
  });
});

btn_esc.addEventListener("click", () => {
  window.location.href = "../02/arqueologia.html";
});
