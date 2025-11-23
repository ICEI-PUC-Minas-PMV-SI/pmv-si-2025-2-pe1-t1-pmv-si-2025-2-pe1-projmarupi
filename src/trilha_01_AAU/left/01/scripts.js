import "../../../js/tokens.js";
import "../../../js/progress.js";

document.addEventListener("DOMContentLoaded", () => {
  ProgressService.setActualStep("iaua", "intro");
  
  setTimeout(() => {
    TokenService.addToken("introduction", "iaua", true);
  }, 600);
});

const btn = document.querySelector("#btn");

btn.addEventListener("click", () => {
  window.location.href = "../02/arqueologia.html";
});