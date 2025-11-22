import "../../../js/tokens.js";

document.addEventListener("DOMContentLoaded", () => {
  localStorage.setItem("userActivityProgress", window.location.href);
  
  setTimeout(() => {
    TokenService.addToken("introduction", "iaua", true);
  }, 600);
});

const btn = document.querySelector("#btn");

btn.addEventListener("click", () => {
  window.location.href = "../02/arqueologia.html";
});