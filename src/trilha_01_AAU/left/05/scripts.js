document.addEventListener("DOMContentLoaded", () => {
  localStorage.setItem("userActivityProgress", window.location.href);
});

const btn_esc = document.querySelector("#btn-esc");
const dockerItems = document.querySelectorAll(".docker-item");
const treeLinks = document.querySelectorAll(".tree-link-wrapper");

const treeUrls = [
  "https://www.google.com/search?tbm=isch&q=sapucaia+arvore",
  "https://www.google.com/search?tbm=isch&q=canafístula+arvore",
  "https://www.google.com/search?tbm=isch&q=manaca-da-serra+arvore",
  "https://www.google.com/search?tbm=isch&q=pau-brasil+arvore",
  "https://www.google.com/search?tbm=isch&q=jacarandá+mimoso+arvore",
  "https://www.google.com/search?tbm=isch&q=gameleira+arvore",
  "https://www.google.com/search?tbm=isch&q=flamboyant+arvore",
  "https://www.google.com/search?tbm=isch&q=resedá+arvore",
  "https://www.google.com/search?tbm=isch&q=murta+arvore",
  "https://www.google.com/search?tbm=isch&q=pata-de-vaca+arvore",
  "https://www.google.com/search?tbm=isch&q=magnolia+arvore",
  "https://www.google.com/search?tbm=isch&q=escumilha+africana+arvore",
  "https://www.google.com/search?tbm=isch&q=mangueira+arvore",
  "https://www.google.com/search?tbm=isch&q=pitangueira+arvore",
  "https://www.google.com/search?tbm=isch&q=palmeira+imperial+arvore",
  "https://www.google.com/search?tbm=isch&q=jatoba+arvore",
  "https://www.google.com/search?tbm=isch&q=pau+ferro+arvore",
  "https://www.google.com/search?tbm=isch&q=jequitiba+arvore",
  "https://www.google.com/search?tbm=isch&q=bougainville+arvore",
  "https://www.google.com/search?tbm=isch&q=goiabeira+arvore",
  "https://www.google.com/search?tbm=isch&q=ficus+arvore",
  "https://www.google.com/search?tbm=isch&q=abacateiro+arvore",
  "https://www.google.com/search?tbm=isch&q=tipuana+arvore",
  "https://www.google.com/search?tbm=isch&q=mulungu+arvore",
  "https://www.google.com/search?tbm=isch&q=oiti+arvore",
  "https://www.google.com/search?tbm=isch&q=ipe+tabaco+arvore",
  "https://www.google.com/search?tbm=isch&q=alfeneiro+arvore",
  "https://www.google.com/search?tbm=isch&q=ipê+roxo+arvore",
  "https://www.google.com/search?tbm=isch&q=ipe+branco+arvore",
  "https://www.google.com/search?tbm=isch&q=aroeira+salsa+arvore",
  "https://www.google.com/search?tbm=isch&q=palmeira+areca+arvore",
  "https://www.google.com/search?tbm=isch&q=licuri+arvore",
];

treeLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const targetUrl = link.getAttribute("data-url");
    window.location.href = targetUrl;
  });
});

treeUrls.sort(() => Math.random() - 0.5);

dockerItems.forEach((item, index) => {
  if (treeUrls[index]) {
    item.href = treeUrls[index];
    item.target = "_blank";
  }
});

btn_esc.addEventListener("click", () => {
  window.location.href = "../04/repertorio.html";
});
