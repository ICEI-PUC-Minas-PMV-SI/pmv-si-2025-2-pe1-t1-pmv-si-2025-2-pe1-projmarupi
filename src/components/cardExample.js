function registerCardComponent() {
  if (customElements.get("card-example")) return;
  customElements.define("card-example", MeuCard);
}

class MeuCard extends HTMLElement {
  connectedCallback() {
    const titulo = this.getAttribute("titulo") || "Sem título";
    const conteudo = this.getAttribute("conteudo") || "Sem conteúdo";

    this.innerHTML = `
      <div style="border:1px solid #ccc; padding:1rem; border-radius:8px;">
        <h3>${titulo}</h3>
        <p>${conteudo}</p>
      </div>
    `;
  }
}

registerCardComponent();