const btnVerifyList = document.querySelectorAll(".btn-verify");

btnVerifyList.forEach((btn) => {
  btn.addEventListener("click", () => {
    window.location.href = "../10/avaliacao.html";
  });
});
