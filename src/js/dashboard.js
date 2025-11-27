import "./tokens.js";
import "./progress.js";

// Module navigation
(function () {
  console.log("Dashboard.js: Module navigation IIFE starting...");
  const moduleButtons = document.querySelectorAll(".menu-container nav button");
  console.log("Dashboard.js: Found", moduleButtons.length, "module buttons");
  const mainContent = document.querySelector("main");
  const panelsKeys = ["apresentacao", "geral", "atividades"];

  const moduleContent = {
    iaua: {
      hide: false,
      title: "Arqueologia Arbórea Urbana",
      panels: {
        apresentacao: {
          title: "Introdução à Arqueologia Arbórea",
          description: "Explore a história das árvores em nossa cidade.",
        },
      },
    },
    idd: {
      hide: false,
      title: "Identidade",
      panels: {
        apresentacao: {
          title: "Identidade",
          description: "Uma jornada de descoberta pessoal e cultural.",
        },
      },
    },
    trilha4: {
      hide: false,
      title: "Diversão",
      panels: {
        apresentacao: {
          title: "Diversão",
          description: "Teste sua memória e desbloqueie conquistas.",
        },
      },
    },

    sbc: {
      hide: false,
      title: "Buscador de trilhas",
      panels: {
        apresentacao: {
          title: "Localizador de trilhas",
          description: "Encontre um Marupi perto de você.",
        },
      },
    },
  };

  function updateMainContent(moduleId) {
    const module = moduleContent[moduleId];
    if (!module) return;

    // Update page title
    const pageTitle = mainContent.querySelector("h1");
    if (pageTitle) pageTitle.textContent = module.title;

    // Update active tab content
    hideAllOtherModulesPanels(moduleId);

    // Show panels of the selected module
    panelsKeys.forEach((panelKey) => {
      const panelToShow = document.querySelector(
        `#panel-${panelKey}-${moduleId}`
      );
      if (panelToShow) {
        panelToShow.hidden = false;
      }
    });
  }

  function hideAllOtherModulesPanels(actualModuleId) {
    Object.keys(moduleContent)
      .filter((moduleId) => moduleId != actualModuleId)
      .forEach((moduleId) => {
        panelsKeys.forEach((panelKey) => {
          const panel = document.querySelector(
            `#panel-${panelKey}-${moduleId}`
          );
          if (panel) {
            panel.hidden = true;
          }
        });
      });
  }

  function navigateToModule(moduleId) {
    // Remove active state from all buttons
    moduleButtons.forEach((btn) => btn.classList.remove("is-active"));

    // Add active state to clicked button
    const clickedButton = document.querySelector(`#${moduleId} button`);
    if (clickedButton) clickedButton.classList.add("is-active");

    // Update content
    updateMainContent(moduleId);

    // Show tokens
    try {
      showTokens(moduleId);
    } catch (error) {
      console.warn("Error showing tokens for module", moduleId, error);
    }

    // Show Progress
    try {
      showProgress(moduleId);
    } catch (error) {
      console.warn("Error showing progress for module", moduleId, error);
    }

    // Show Activities
    try {
      showActivities(moduleId);
    } catch (error) {
      console.warn("Error showing activities for module", moduleId, error);
    }

    // Show Reminder
    try {
      showReminder(moduleId);
    } catch (error) {
      console.warn("Error showing reminder for module", moduleId, error);
    }

    // Set actual module id
    window.ActualModuleId = moduleId;
  }

  function showTokens(moduleId) {
    const tokensList = document.getElementById(`${moduleId}-token-list`);

    const tokens = TokenService.getTokensId(moduleId);
    if (tokens == undefined || tokens == null || tokens.length == 0) {
      return;
    }

    // Recent token
    const recentTokenId = tokens[tokens.length - 1];
    const recentTokenData = TokenService.getTokenData(recentTokenId, moduleId);
    if (recentTokenData) {
      const recentTokenContainer = document.querySelector(
        `#${moduleId}-recent-token .content`
      );
      if (recentTokenContainer) {
        recentTokenContainer.innerHTML = "";

        const tokenImage = createTokenImg(recentTokenData);
        recentTokenContainer.appendChild(tokenImage);
      }
    }
    // All tokens
    tokensList.innerHTML = "";
    tokens.forEach((tokenId) => {
      const tokenData = TokenService.getTokenData(tokenId, moduleId);
      if (tokenData) {
        const tokenItem = document.createElement("li");
        tokenItem.classList.add("token-item");

        const tokenImage = createTokenImg(tokenData);

        tokenItem.appendChild(tokenImage);
        tokensList.appendChild(tokenItem);
      }
    });

    function createTokenImg(tokenData) {
      const img = document.createElement("img");
      img.src = tokenData.imageUrl;
      img.alt = tokenData.name || "Token";
      img.style.width = "200px";
      img.style.height = "200px";
      return img;
    }
  }

  function showProgress(moduleId) {
    const progressBar = document.getElementById(`${moduleId}-progress`);

    const percentage = ProgressService.getProgressPercentage(moduleId);
    if (progressBar) {
      progressBar.style = `--value: ${Math.floor(percentage)}`;
    }
  }

  function showReminder(moduleId) {
    let actualStep = ProgressService.getActualStep(moduleId);
    const steps = ProgressService.getSteps(moduleId);

    const reminderCard = document.getElementById(`${moduleId}-reminder`);
    if (!reminderCard) return; // Module doesn't have a reminder card

    const title = reminderCard.querySelector("h3");
    const text = reminderCard.querySelector("p");

    if (!actualStep) {
      if (!steps || steps.length === 0) return; // No steps defined for this module
      actualStep = steps.at(0);

      title.textContent = actualStep.name;
      text.textContent = actualStep.continueText;
      // clear actions
      reminderCard
        .querySelectorAll("button")
        .forEach((button) => reminderCard.removeChild(button));
      const startBtn = document.createElement("button");
      startBtn.textContent = "Começar";
      startBtn.classList.add("btn");
      startBtn.classList.add("btn--primary");
      startBtn.onclick = () => (window.location.href = actualStep.href);

      reminderCard.appendChild(startBtn);
    } else {
      title.textContent = actualStep.name;
      text.textContent = actualStep.continueText;

      // clear actions
      reminderCard
        .querySelectorAll("button")
        .forEach((button) => reminderCard.removeChild(button));

      const continueBtn = document.createElement("button");
      continueBtn.textContent = "Retomar";
      continueBtn.classList.add("btn");
      continueBtn.classList.add("btn--primary");
      continueBtn.onclick = () => (window.location.href = actualStep.href);

      const resetBtn = document.createElement("button");
      resetBtn.textContent = "Reiniciar";
      resetBtn.classList.add("btn");
      resetBtn.classList.add("btn--secondary");
      resetBtn.onclick = () => {
        if (
          confirm(
            "Tem certeza que deseja reiniciar seu progresso nessa trilha? Você perdera todos os tokens ativos também!"
          )
        ) {
          ProgressService.resetProgress(window.ActualModuleId);
          TokenService.clearTokens(window.ActualModuleId);
          // gambiarra, foi mal
          // gambiarra nao! recurso!
          localStorage.removeItem("firstTryCaptcha");
          window.location.reload();
        }
      };

      reminderCard.appendChild(continueBtn);
      reminderCard.appendChild(resetBtn);
    }
  }

  function showActivities(moduleId) {
    const activitiesTable = document.getElementById(
      `${moduleId}-activities-table`
    );

    const steps = ProgressService.getSteps(moduleId);
    const actualStep = ProgressService.getActualStep(moduleId);
    if (steps == undefined || steps == null || steps.length == 0) {
      return;
    }

    activitiesTable.innerHTML = "";
    steps.forEach((step) => {
      const row = document.createElement("tr");

      const nameCell = document.createElement("td");
      nameCell.textContent = step.name || "Atividade sem nome";

      const tagsCell = document.createElement("td");
      tagsCell.innerHTML = step.tags
        .map((tag) => `<span class="chip">${tag}</span>`)
        .join(" ");

      const actionsCell = document.createElement("td");

      const anchor = document.createElement("a");
      anchor.href = step.href;

      if (actualStep == null || actualStep == undefined) {
        // No progress yet
        if (step.step == 0) {
          anchor.innerHTML = `<button class="btn btn--primary btn--small">Iniciar</button>`;
        } else {
          anchor.innerHTML = `<button class="btn btn--primary btn--small" disabled>Bloqueado</button>`;
        }
      } else if (actualStep && step.id === actualStep.id) {
        anchor.innerHTML = `<button class="btn btn--primary btn--small">Continuar</button>`;
      } else if (actualStep && step.step < actualStep.step) {
        anchor.innerHTML = `<button class="btn btn--secondary btn--small">Revisitar</button>`;
      } else {
        anchor.innerHTML = `<button class="btn btn--primary btn--small" disabled>Bloqueado</button>`;
      }
      actionsCell.appendChild(anchor);

      row.appendChild(nameCell);
      row.appendChild(tagsCell);
      row.appendChild(actionsCell);

      activitiesTable.appendChild(row);
    });
  }

  // Add click handlers to module buttons
  moduleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const moduleId = button.closest("li").id;
      console.log("Dashboard.js: Button clicked for module:", moduleId);
      navigateToModule(moduleId);
    });
  });
  console.log(
    "Dashboard.js: Event listeners attached to",
    moduleButtons.length,
    "buttons"
  );

  // Add tab change listener to update content
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const activeModuleId = document
        .querySelector(".menu-container nav button.is-active")
        ?.closest("li")?.id;
      if (activeModuleId) {
        setTimeout(() => updateMainContent(activeModuleId), 0);
      }
    });
  });

  window.navigateToModule = navigateToModule;

  // Initialize with first module
  console.log("Dashboard.js: Initializing with iaua module");
  navigateToModule("iaua");
  console.log("Dashboard.js: Initialization complete");
})();

// Tabs behavior + animated underline
(function () {
  const root = document.getElementById("tabs-demo");
  const tablist = root.querySelector(".tablist");
  const inkbar = root.querySelector(".inkbar");
  const tabs = Array.from(tablist.querySelectorAll(".tab:not(.more)"));
  const panels = Array.from(root.querySelectorAll('[role="tabpanel"]'));

  function positionInkbar(target) {
    const rect = target.getBoundingClientRect();
    const parentRect = tablist.getBoundingClientRect();
    const left = rect.left - parentRect.left + tablist.scrollLeft;
    inkbar.style.left = `${left}px`;
    inkbar.style.width = `${rect.width}px`;
  }

  function activate(tab) {
    // Update active state
    tabs.forEach((t) => {
      const active = t === tab;
      t.classList.toggle("is-active", active);
      t.setAttribute("aria-selected", String(active));
      t.tabIndex = active ? 0 : -1;

      const panelId = t.getAttribute("aria-controls");
      const panel = root.querySelector("#" + panelId);
      if (panel) panel.hidden = !active;
    });

    positionInkbar(tab);
  }

  // Click support
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => activate(tab));
  });

  // Recalc on resize/scroll
  window.addEventListener("resize", () => {
    const active =
      tabs.find((t) => t.classList.contains("is-active")) || tabs[0];
    positionInkbar(active);
  });

  tablist.addEventListener("scroll", () => {
    const active =
      tabs.find((t) => t.classList.contains("is-active")) || tabs[0];
    positionInkbar(active);
  });

  const params = new URLSearchParams(window.location.search);
  const tabName = params.get("tab");
  let initialTab = tabs[0];

  if (tabName) {
    const foundTab = document.getElementById(`tab-${tabName}`);
    if (foundTab) {
      initialTab = foundTab;
    }
  }
  if (initialTab) {
    activate(initialTab);
  }
  window.activateTab = activate;
})();
