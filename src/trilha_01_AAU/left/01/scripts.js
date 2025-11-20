document.addEventListener("DOMContentLoaded", () => {
  localStorage.setItem("userActivityProgress", window.location.href);
});

const btn = document.querySelector("#btn");

btn.addEventListener("click", () => {
  window.location.href = "../02/arqueologia.html";
});
