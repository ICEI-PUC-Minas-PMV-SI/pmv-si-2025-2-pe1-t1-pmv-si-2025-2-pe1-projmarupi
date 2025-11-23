import "../../../js/progress.js";

document.addEventListener("DOMContentLoaded", () => {
  ProgressService.setActualStep("iaua", "repertorio");
});

const btn = document.querySelector("#btn");

btn.addEventListener("click", () => {
  window.location.href = "../05/quearvore.html";
});
