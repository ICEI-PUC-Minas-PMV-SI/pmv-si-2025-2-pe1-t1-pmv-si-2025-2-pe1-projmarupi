"use strict";

const btnBack = document.querySelector("#btn-back");

if (btnBack) {
  btnBack.addEventListener("click", () => {
    window.location.href = "repertorio.html";
  });
}
