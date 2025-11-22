import './tokens.js';

// Module navigation
(function () {
    const moduleButtons = document.querySelectorAll('.menu-container nav button');
    const mainContent = document.querySelector('main');
    const panelsKeys = ['apresentacao', 'geral', 'atividades'];

    const moduleContent = {
        'iaua': {
            hide: false,
            title: 'Arqueologia Arborea Urbana',
            panels: {
                apresentacao: {
                    title: 'Introdução à Arqueologia Arbórea',
                    description: 'Explore a história das árvores em nossa cidade.',
                },
            }
        },
        'idd': {
            hide: false,
            title: 'Identidade',
            panels: {
                apresentacao: {
                    title: 'Identidade',
                    description: 'Uma jornada de descoberta pessoal e cultural.',
                },
            }
        }
    };

    function updateMainContent(moduleId) {
        const module = moduleContent[moduleId];
        if (!module) return;

        // Update page title
        const pageTitle = mainContent.querySelector('h1');
        if (pageTitle) pageTitle.textContent = module.title;

        // Update active tab content
        hideAllOtherModulesPanels(moduleId);

        // Show panels of the selected module
        panelsKeys.forEach(panelKey => {
            const panelToShow = document.querySelector(`#panel-${panelKey}-${moduleId}`);
            if (panelToShow) {
                panelToShow.hidden = false;
            }
        });
    }

    function hideAllOtherModulesPanels(actualModuleId) {
        Object.keys(moduleContent)
            .filter(moduleId => moduleId != actualModuleId)
            .forEach(moduleId => {
                panelsKeys.forEach(panelKey => {
                    const panel = document.querySelector(`#panel-${panelKey}-${moduleId}`);
                    if (panel) {
                        panel.hidden = true;
                    }
                });
            });
    }

    function navigateToModule(moduleId) {
        // Remove active state from all buttons
        moduleButtons.forEach(btn => btn.classList.remove('is-active'));

        // Add active state to clicked button
        const clickedButton = document.querySelector(`#${moduleId} button`);
        if (clickedButton) clickedButton.classList.add('is-active');

        // Update content
        updateMainContent(moduleId);

        // Show tokens
        showTokens(moduleId);
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
            const recentTokenContainer = document.querySelector(`#${moduleId}-recent-token .content`);
            if (recentTokenContainer) {
                recentTokenContainer.innerHTML = '';

                const tokenImage = createTokenImg(recentTokenData);
                recentTokenContainer.appendChild(tokenImage);
            }
        }
        // All tokens
        tokensList.innerHTML = '';
        tokens.forEach(tokenId => {
            const tokenData = TokenService.getTokenData(tokenId, moduleId);
            if (tokenData) {
                const tokenItem = document.createElement('li');
                tokenItem.classList.add('token-item');

                const tokenImage = createTokenImg(tokenData)

                tokenItem.appendChild(tokenImage);
                tokensList.appendChild(tokenItem);
            }
        });

        function createTokenImg(tokenData) {
            const img = document.createElement('img');
            img.src = tokenData.imageUrl;
            img.alt = tokenData.name || 'Token';
            img.style.width = '200px';
            img.style.height = '200px';
            return img;
        }
    }

    // Add click handlers to module buttons
    moduleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const moduleId = button.closest('li').id;
            navigateToModule(moduleId);
        });
    });

    // Add tab change listener to update content
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const activeModuleId = document.querySelector('.menu-container nav button.is-active')
                ?.closest('li')?.id;
            if (activeModuleId) {
                setTimeout(() => updateMainContent(activeModuleId), 0);
            }
        });
    });

    window.navigateToModule = navigateToModule;

    // Initialize with first module
    navigateToModule('iaua');
})();

// Tabs behavior + animated underline
(function () {
    const root = document.getElementById('tabs-demo');
    const tablist = root.querySelector('.tablist');
    const inkbar = root.querySelector('.inkbar');
    const tabs = Array.from(tablist.querySelectorAll('.tab:not(.more)'));
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
        tabs.forEach(t => {
            const active = t === tab;
            t.classList.toggle('is-active', active);
            t.setAttribute('aria-selected', String(active));
            t.tabIndex = active ? 0 : -1;

            const panelId = t.getAttribute('aria-controls');
            const panel = root.querySelector('#' + panelId);
            if (panel) panel.hidden = !active;
        });

        positionInkbar(tab);
    }

    // Click support
    tabs.forEach(tab => {
        tab.addEventListener('click', () => activate(tab));
    });

    // Recalc on resize/scroll
    window.addEventListener('resize', () => {
        const active = tabs.find(t => t.classList.contains('is-active')) || tabs[0];
        positionInkbar(active);
    });

    tablist.addEventListener('scroll', () => {
        const active = tabs.find(t => t.classList.contains('is-active')) || tabs[0];
        positionInkbar(active);
    });

    window.switchTab = activate;
    // Init
    activate(tabs[0]);
})();