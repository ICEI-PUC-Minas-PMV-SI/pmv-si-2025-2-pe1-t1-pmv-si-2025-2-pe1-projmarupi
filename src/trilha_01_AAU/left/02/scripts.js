document.addEventListener("DOMContentLoaded", () => {
  localStorage.setItem("userActivityProgress", window.location.href);
});

const btn = document.querySelector("#btn");
const btnBack = document.querySelector("#btn-back");

btn.addEventListener("click", () => {
  window.location.href = "../03/mapa.html";
});

btnBack.addEventListener("click", () => {
  window.location.href = "../01/intro.html";
});
