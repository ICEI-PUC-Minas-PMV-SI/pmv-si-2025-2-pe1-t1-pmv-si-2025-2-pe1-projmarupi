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
        },
        'sbc': {
            title: 'Sistema de Busca de Cidades',
            panels: {
                apresentacao: {
                    title: 'Sistema de Busca',
                    description: 'Encontre informações sobre cidades.',
                    content: `
                                <div class="panel-apresentacao">
                                    <div class="text-block">
                                        <p class="caption">MÓDULO SBC</p>
                                        <h1 class="headline">Sistema de Busca de Cidades</h1>
                                        <h2 class="subheadline">Explore dados e informações municipais</h2>
                                        <p class="body">
                                            Acesse e analise dados sobre diferentes cidades, 
                                            incluindo informações demográficas, ambientais e culturais.
                                            Descubra ferramentas poderosas para pesquisa e análise de dados municipais.
                                        </p>
                                    </div>
                                    <div class="text-block">
                                        <p class="caption">PRÓXIMOS PASSOS</p>
                                        <h2 class="subheadline" style="margin:0; margin-bottom: 5px;">
                                            Comece a explorar os municípios
                                        </h2>
                                        <p class="body" style="margin-bottom: 15px;">
                                            Aprenda a usar as ferramentas de busca e análise de dados municipais.
                                        </p>
                                        <button class="btn btn--primary">Começar</button>
                                    </div>
                                </div>`
                },
                geral: {
                    content: `
                                <div class="panel-geral">
                                    <div class="reminder">
                                        <img src="module1.png" alt="Module 1 img">
                                        <h3>Pesquisa de Municípios</h3>
                                        <p>Aprenda a utilizar as ferramentas de busca e análise.</p>
                                        <button class="btn btn--primary">Começar</button>
                                    </div>
                                    <div class="recent-token">
                                        <h2>Token mais recente</h2>
                                        <svg width="240" height="240" viewBox="0 0 240 240" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M121.961 1.44086C153.837 -2.19132 189.082 -0.365391 212.142 23.653C235.441 47.9209 245.857 87.4296 236.69 120.939C228.65 150.327 191.59 152.733 171.042 173.887C151.531 193.974 148.399 233.304 121.961 239.049C94.1074 245.102 69.2619 221.074 48.1188 200.599C25.392 178.589 -0.184408 153.886 0.00100215 120.939C0.185883 88.0866 26.4666 64.3295 49.01 42.2411C70.088 21.5885 93.6439 4.66742 121.961 1.44086Z"
                                                fill="#DDE1E6" />
                                        </svg>
                                    </div>
                                    <div class="progress">
                                        <h2>Progresso</h2>
                                        <div class="labels">
                                            <label><span class="finished"></span> Concluído</label>
                                            <label><span class="pending"></span> Pendente</label>
                                        </div>
                                        <div role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"
                                            style="--value: 45"></div>
                                    </div>
                                    <div class="tokens">
                                        <h2>Tokens</h2>
                                        <ul>
                                            <li>
                                                <svg width="240" height="240" viewBox="0 0 240 240" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                                        d="M121.961 1.44086C153.837 -2.19132 189.082 -0.365391 212.142 23.653C235.441 47.9209 245.857 87.4296 236.69 120.939C228.65 150.327 191.59 152.733 171.042 173.887C151.531 193.974 148.399 233.304 121.961 239.049C94.1074 245.102 69.2619 221.074 48.1188 200.599C25.392 178.589 -0.184408 153.886 0.00100215 120.939C0.185883 88.0866 26.4666 64.3295 49.01 42.2411C70.088 21.5885 93.6439 4.66742 121.961 1.44086Z"
                                                        fill="#DDE1E6" />
                                                </svg>
                                            </li>
                                            <li>
                                                <svg width="240" height="240" viewBox="0 0 240 240" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                                        d="M121.961 1.44086C153.837 -2.19132 189.082 -0.365391 212.142 23.653C235.441 47.9209 245.857 87.4296 236.69 120.939C228.65 150.327 191.59 152.733 171.042 173.887C151.531 193.974 148.399 233.304 121.961 239.049C94.1074 245.102 69.2619 221.074 48.1188 200.599C25.392 178.589 -0.184408 153.886 0.00100215 120.939C0.185883 88.0866 26.4666 64.3295 49.01 42.2411C70.088 21.5885 93.6439 4.66742 121.961 1.44086Z"
                                                        fill="#DDE1E6" />
                                                </svg>
                                            </li>
                                            <li>
                                                <svg width="240" height="240" viewBox="0 0 240 240" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                                        d="M121.961 1.44086C153.837 -2.19132 189.082 -0.365391 212.142 23.653C235.441 47.9209 245.857 87.4296 236.69 120.939C228.65 150.327 191.59 152.733 171.042 173.887C151.531 193.974 148.399 233.304 121.961 239.049C94.1074 245.102 69.2619 221.074 48.1188 200.599C25.392 178.589 -0.184408 153.886 0.00100215 120.939C0.185883 88.0866 26.4666 64.3295 49.01 42.2411C70.088 21.5885 93.6439 4.66742 121.961 1.44086Z"
                                                        fill="#DDE1E6" />
                                                </svg>
                                            </li>
                                            <li>
                                                <svg width="240" height="240" viewBox="0 0 240 240" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                                        d="M121.961 1.44086C153.837 -2.19132 189.082 -0.365391 212.142 23.653C235.441 47.9209 245.857 87.4296 236.69 120.939C228.65 150.327 191.59 152.733 171.042 173.887C151.531 193.974 148.399 233.304 121.961 239.049C94.1074 245.102 69.2619 221.074 48.1188 200.599C25.392 178.589 -0.184408 153.886 0.00100215 120.939C0.185883 88.0866 26.4666 64.3295 49.01 42.2411C70.088 21.5885 93.6439 4.66742 121.961 1.44086Z"
                                                        fill="#DDE1E6" />
                                                </svg>
                                            </li>
                                        </ul>
                                    </div>
                                </div>`
                },
                atividades: {
                    content: `
                                <div class="panel-atividades">
                                    <table class="tbl">
                                        <colgroup>
                                            <col class="col-atividade"><!-- grows -->
                                            <col class="col-tags">
                                            <col class="col-acoes"><!-- smallest -->
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th>Atividade</th>
                                                <th>Tags</th>
                                                <th>Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Busca Básica</td>
                                                <td>
                                                    <span class="chip">Pesquisa</span>
                                                    <span class="chip">Básico</span>
                                                </td>
                                                <td>
                                                    <button class="btn btn--primary btn--small">Começar</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Análise de Dados</td>
                                                <td>
                                                    <span class="chip">Análise</span>
                                                    <span class="chip">Dados</span>
                                                </td>
                                                <td>
                                                    <button class="btn btn--primary btn--small">Começar</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Visualização</td>
                                                <td>
                                                    <span class="chip">Gráficos</span>
                                                    <span class="chip">Mapas</span>
                                                </td>
                                                <td>
                                                    <button class="btn btn--primary btn--small">Começar</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>`
                }
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
                const module = moduleContent[moduleId];
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