(function () {
    // Prevent redefinition
    if (window.TokenService != undefined && window.TokenService != null)
        return;

    const TokenService = {}
    const moduleIds = ['iaua', 'idd'];

    TokenService.tokensByModule = {
        'iaua': {
            introduction: {
                name: 'Árvore Ancestral',
                description: 'Conquistado por completar a Introdução à Arqueologia Arbórea.',
                imageUrl: 'assets/tokens/tree_ancestor.png'
            },
            first: {
                name: 'Raízes do Conhecimento',
                description: 'Conquistado por acertar as questões de primeira.',
                imageUrl: 'assets/tokens/roots_of_knowledge.png'
            },
            captchasFinished: {
                name: 'Guardião do Bosque',
                description: 'Conquistado por completar todos os captchas do módulo.',
                imageUrl: 'assets/tokens/forest_guardian.png'
            },
            finished: {
                name: 'Guardião das Árvores',
                description: 'Conquistado por completar todas as atividades do módulo.',
                imageUrl: 'assets/tokens/tree_guardian.png'
            }
        }
    }

    TokenService.addToken = function (tokenId, moduleId) {
        if (!moduleIds.includes(moduleId)) {
            throw new Error(`Invalid module ID - ${moduleId}`);
        }

        if (!Object.keys(tokensByModule[moduleId] || {}).includes(tokenId)) {
            throw new Error(`Invalid token ID: ${tokenId} for module ID: ${moduleId}`);
        }

        const tokens = TokenService.getTokensId(`tokens-${moduleId}`);
        tokens.push(tokenId);
        localStorage.setItem(`tokens-${moduleId}`, JSON.stringify(tokens));
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
            localStorage.removeItem(`tokens-${moduleId}`);
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

    window.TokenService = TokenService;
})();