(function () {
    // Prevent redefinition
    if (window.TokenService != undefined && window.TokenService != null)
        return;

    const TokenService = {}
    const moduleIds = ['iaua', 'idd'];
    const BASE_URL = window.location.pathname.replace(/\/[^/]*$/, '') + '/';

    TokenService.tokensByModule = {
        'iaua': {
            introduction: {
                name: 'Árvore Ancestral',
                description: 'Conquistado por completar a Introdução à Arqueologia Arbórea.',
                imageUrl: BASE_URL + 'assets/tokens/iaua/tree_ancestor.png'
            },
            first: {
                name: 'Raízes do Conhecimento',
                description: 'Conquistado por acertar as questões de primeira.',
                imageUrl: BASE_URL + 'assets/tokens/iaua/roots_of_knowledge.png'
            },
            captchasFinished: {
                name: 'Guardião do Bosque',
                description: 'Conquistado por completar todos os captchas do módulo.',
                imageUrl: BASE_URL + 'assets/tokens/iaua/forest_guardian.png'
            },
            finished: {
                name: 'Guardião das Árvores',
                description: 'Conquistado por completar todas as atividades do módulo.',
                imageUrl: BASE_URL + 'assets/tokens/iaua/tree_guardian.png'
            }
        }
    }

    TokenService.addToken = function (tokenId, moduleId, notify = false) {
        if (!moduleIds.includes(moduleId)) {
            throw new Error(`Invalid module ID - ${moduleId}`);
        }

        if (!Object.keys(TokenService.tokensByModule[moduleId] || {}).includes(tokenId)) {
            throw new Error(`Invalid token ID: ${tokenId} for module ID: ${moduleId}`);
        }

        const tokens = TokenService.getTokensId(moduleId);
        if (tokens.includes(tokenId)) {
            return; // Token já adquirido
        }

        tokens.push(tokenId);
        localStorage.setItem(`tokens-${moduleId}`, JSON.stringify(tokens));

        if (notify) {
            const tokenData = TokenService.getTokenData(tokenId, moduleId);
            showTokenNotification({
                id: tokenId,
                ...tokenData
            });
        }
    }

    TokenService.removeToken = function (tokenId, moduleId) {
        if (!moduleIds.includes(moduleId)) {
            throw new Error(`Invalid module ID - ${moduleId}`);
        }

        const tokens = TokenService.getTokensId(`tokens-${moduleId}`);
        const tokenIndex = tokens.indexOf(tokenId);
        if (tokenIndex > -1) {
            tokens.splice(tokenIndex, 1);
            localStorage.setItem(`tokens-${moduleId}`, JSON.stringify(tokens));
        }
    }

    TokenService.clearTokens = function (moduleId) {
        if (!moduleIds.includes(moduleId)) {
            throw new Error(`Invalid module ID - ${moduleId}`);
        }

        localStorage.removeItem(`tokens-${moduleId}`);
    }

    TokenService.clearAllTokens = function () {
        moduleIds.forEach(moduleId => {
            TokenService.clearTokens(moduleId);
        });
    }

    TokenService.getTokensId = function (moduleId) {
        if (!moduleIds.includes(moduleId)) {
            throw new Error(`Invalid module ID: ${moduleId}`);
        }

        return TokenService.getOrCreateItems(`tokens-${moduleId}`);
    }

    TokenService.getOrCreateItems = function (localStorageKey) {
        const items = localStorage.getItem(localStorageKey);

        if (!items) {
            localStorage.setItem(localStorageKey, JSON.stringify([]));
            return [];
        }

        return JSON.parse(items);
    }

    TokenService.getTokenData = function (tokenId, moduleId) {
        if (!moduleIds.includes(moduleId)) {
            throw new Error(`Invalid module ID: ${moduleId}`);
        }

        const tokenData = TokenService.tokensByModule[moduleId][tokenId];
        if (!tokenData) {
            throw new Error(`Invalid token ID: ${tokenId} for module ID: ${moduleId}`);
        }

        return tokenData;
    }

    TokenService.getAvailableTokens = function (moduleId) {
        if (!moduleIds.includes(moduleId)) {
            throw new Error(`Invalid module ID: ${moduleId}`);
        }

        const tokenIds = TokenService.getTokensId(moduleId);
        const availableTokens = tokenIds.map(tokenId => {
            return {
                id: tokenId,
                ...TokenService.tokensByModule[moduleId][tokenId]
            };
        });

        return availableTokens;
    }

    // ---------- UI de notificação (toast) ----------
    function showTokenNotification(token) {
        if (!token) return;

        const containerId = 'token-toast-container';
        let container = document.getElementById(containerId);

        if (!container) {
            container = document.createElement('div');
            container.id = containerId;
            container.style.position = 'fixed';
            container.style.bottom = '16px';
            container.style.right = '16px';
            container.style.zIndex = '9999';
            container.style.display = 'flex';
            container.style.flexDirection = 'column';
            container.style.gap = '8px';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = 'token-toast';
        toast.style.background = 'rgba(22, 22, 22, 0.95)';
        toast.style.color = '#f5f5f5';
        toast.style.borderRadius = '8px';
        toast.style.padding = '8px 12px';
        toast.style.display = 'flex';
        toast.style.alignItems = 'center';
        toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.4)';
        toast.style.maxWidth = '320px';
        toast.style.fontFamily = 'Roboto, system-ui, sans-serif';
        toast.style.cursor = 'pointer';
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.2s ease-out, transform 0.2s ease-out';
        toast.style.transform = 'translateY(8px)';

        if (token.imageUrl) {
            const img = document.createElement('img');
            img.src = token.imageUrl;
            img.alt = token.name || 'Token';
            img.style.width = '48px';
            img.style.height = '48px';
            img.style.objectFit = 'contain';
            img.style.marginRight = '8px';
            toast.appendChild(img);
        }

        const textWrapper = document.createElement('div');

        const title = document.createElement('div');
        title.textContent = token.name || 'Novo token desbloqueado!';
        title.style.fontWeight = 'bold';
        title.style.fontSize = '14px';

        const desc = document.createElement('div');
        desc.textContent = token.description || '';
        desc.style.fontSize = '12px';
        desc.style.marginTop = '2px';

        textWrapper.appendChild(title);
        textWrapper.appendChild(desc);
        toast.appendChild(textWrapper);

        container.appendChild(toast);

        // animação de entrada
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        });

        // fechar ao clicar
        toast.addEventListener('click', () => {
            closeToast(toast);
        });

        // auto-remover depois de alguns segundos
        setTimeout(() => {
            closeToast(toast);
        }, 4000);
    }

    function closeToast(toast) {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(8px)';
        setTimeout(() => {
            if (toast.parentElement) {
                toast.parentElement.removeChild(toast);
            }
        }, 200);
    }

    window.TokenService = TokenService;
})();