const btn_volta = document.querySelector("#btn-volta");
const btn_vai_ipe = document.querySelector("#vai-ipe");
const btn_vai_sibi = document.querySelector("#vai-sibi");

if (btn_volta) {
  btn_volta.addEventListener("click", () => {
    window.location.href = "../05/quearvore.html";
  });
}

if (btn_vai_ipe) {
  btn_vai_ipe.addEventListener("click", () => {
    window.location.href = "../07/carro_ipe.html";
  });
}

if (btn_vai_sibi) {
  btn_vai_sibi.addEventListener("click", () => {
    window.location.href = "../07/carro_sibi.html";
  });
}
