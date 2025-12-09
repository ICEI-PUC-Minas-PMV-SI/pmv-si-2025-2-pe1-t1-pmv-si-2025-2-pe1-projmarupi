function loadFloatingMenu() {
  const rootPath = "../";
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = rootPath + "menu/menu.css";
  document.head.appendChild(link);

  const menuHTML = `
      <div id="floating-menu-container" class="floating-container">
          <button id="floating-toggle" class="floating-btn" aria-label="Menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
          </button>
  
          <nav id="floating-dropdown" class="floating-dropdown">
              <div class="dropdown-header" style="justify-content: center; position: relative;">
                <a href="${rootPath}index.html" class="menu-link" style="padding: 0; background: transparent;">
                    <img 
                    src="${rootPath}assets/logo_creme.png" 
                    alt="Marupí" 
                    style="height: 40px; width: auto;" 
                  />
                </a>
                <button id="floating-close" class="close-btn" style="position: absolute; right: 12px;">&times;</button>
              </div>
              
              <ul>
                  <li>
                      <a href="${rootPath}dashboard.html?module=trilha4" class="menu-link">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                          Painel
                      </a>
                  </li>
                  </ul>
          </nav>
      </div>
    `;

  document.body.insertAdjacentHTML("afterbegin", menuHTML);

  const toggleBtn = document.getElementById("floating-toggle");
  const closeBtn = document.getElementById("floating-close");
  const container = document.getElementById("floating-menu-container");

  function toggleMenu() {
    container.classList.toggle("active");
  }

  document.addEventListener("click", function (event) {
    const isClickInside = container.contains(event.target);
    if (!isClickInside && container.classList.contains("active")) {
      container.classList.remove("active");
    }
  });

  toggleBtn.addEventListener("click", toggleMenu);
  closeBtn.addEventListener("click", toggleMenu);
}
document.addEventListener("DOMContentLoaded", loadFloatingMenu);
