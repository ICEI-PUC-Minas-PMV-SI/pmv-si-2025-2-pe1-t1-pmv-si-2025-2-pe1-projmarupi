(function () {
    // Prevent redefinition
    if (window.ProgressService != undefined && window.ProgressService != null)
        return;

    const ProgressService = {}
    const moduleIds = ['iaua', 'idd', 'trilha4'];

    const BASE_URL = getBaseUrl();

    ProgressService.stepsByModule = {
        iaua: {
            down: {
                step: 0,
                name: "Início",
                continueText: "Continue a aprender sobre a história das árvores em bh.",
                href: BASE_URL + "trilha_01_AAU/down/start.html",
                tags: [
                    "Iniciante",
                    "Botânica",
                    "História",
                    "Urbanismo",
                ]
            },
            right: {
                step: 1,
                name: "Progresso",
                continueText: "Continue a aprender sobre a história das árvores em bh.",
                href: BASE_URL + "trilha_01_AAU/right/right.html",
                tags: [
                    "Iniciante",
                    "Botânica",
                    "História",
                    "Urbanismo",
                ]
            },
            up: {
                step: 2,
                name: "Edificar",
                continueText: "Continue a aprender sobre a história das árvores em bh.",
                href: BASE_URL + "trilha_01_AAU/up/up.html",
                tags: [
                    "Iniciante",
                    "Botânica",
                    "História",
                    "Urbanismo",
                ]
            },
            intro: {
                step: 3,
                name: "Introdução",
                continueText: "Continue a aprender sobre a história das árvores em bh.",
                href: BASE_URL + "trilha_01_AAU/left/01/intro.html",
                tags: [
                    "Iniciante",
                    "Botânica",
                    "História",
                    "Urbanismo",
                ]
            },
            arqueologia: {
                step: 4,
                name: "Arqueologia Arbórea",
                continueText: "Continue a aprender sobre a história das árvores em bh.",
                href: BASE_URL + "trilha_01_AAU/left/02/arqueologia.html",
                tags: [
                    "Iniciante",
                    "Botânica",
                    "História",
                    "Urbanismo",
                ]
            },
            mapa: {
                step: 5,
                name: "Passeio Arbóreo",
                continueText: "Continue a aprender sobre a história das árvores em bh.",
                href: BASE_URL + "trilha_01_AAU/left/03/mapa.html",
                tags: [
                    "Iniciante",
                    "Botânica",
                    "História",
                    "Urbanismo",
                ]
            },
            repertorio: {
                step: 6,
                name: "Repertório",
                continueText: "Continue a aprender sobre a história das árvores em bh.",
                href: BASE_URL + "trilha_01_AAU/left/04/repertorio.html",
                tags: [
                    "Iniciante",
                    "Botânica",
                    "História",
                    "Urbanismo",
                ]
            },
            queArvore: {
                step: 7,
                name: "Que Árvore é essa?",
                continueText: "Continue a aprender sobre a história das árvores em bh.",
                href: BASE_URL + "trilha_01_AAU/left/05/quearvore.html",
                tags: [
                    "Iniciante",
                    "Botânica",
                    "História",
                    "Urbanismo",
                ]
            },
            captchaIntro: {
                step: 8,
                name: "Captcha Clorofílico",
                continueText: "Continue a aprender sobre a história das árvores em bh.",
                href: BASE_URL + "trilha_01_AAU/left/08/captcha.html",
                tags: [
                    "Iniciante",
                    "Botânica",
                    "História",
                    "Urbanismo",
                ]
            },
            captchaDesafio: {
                step: 9,
                name: "Desafio Captcha Arbóreo",
                continueText: "Continue a aprender sobre a história das árvores em bh.",
                href: BASE_URL + "trilha_01_AAU/left/09/desafio.html",
                tags: [
                    "Iniciante",
                    "Botânica",
                    "História",
                    "Urbanismo",
                ]
            },
            avaliacao: {
                step: 10,
                name: "Avaliação",
                continueText: "Continue a aprender sobre a história das árvores em bh.",
                href: BASE_URL + "trilha_01_AAU/left/10/avaliacao.html",
                tags: [
                    "Iniciante",
                    "Botânica",
                    "História",
                    "Urbanismo",
                ]
            },
            inspiracao: {
                step: 11,
                name: "Inspiração",
                continueText: "Continue a aprender sobre a história das árvores em bh.",
                href: BASE_URL + "trilha_01_AAU/left/11/inspiracao.html",
                tags: [
                    "Iniciante",
                    "Botânica",
                    "História",
                    "Urbanismo",
                ]
            }
        },
        idd: {},
        trilha4: {
            easy_win: {
                step: 0,
                name: "Vencedor Fácil",
                continueText: "Venceu o jogo no modo Fácil",
                href: BASE_URL + "trilha_04/index.html",
                tags: ["Jogo da Memória", "Fácil"]
            },
            hard_win: {
                step: 1,
                name: "Vencedor Difícil",
                continueText: "Venceu o jogo no modo Difícil",
                href: BASE_URL + "trilha_04/index.html",
                tags: ["Jogo da Memória", "Difícil"]
            },
            speed: {
                step: 2,
                name: "Velocista",
                continueText: "Venceu em menos de 1 minuto",
                href: BASE_URL + "trilha_04/index.html",
                tags: ["Jogo da Memória", "Velocidade"]
            },
            efficient: {
                step: 3,
                name: "Eficiente",
                continueText: "Venceu com 20 movimentos ou menos",
                href: BASE_URL + "trilha_04/index.html",
                tags: ["Jogo da Memória", "Eficiência"]
            }
        }
    }

    ProgressService.calcTotalSteps = function (moduleId) {
        if (ProgressService.stepsByModule[moduleId] == undefined) {
            throw new Error(`Module ID:'${moduleId}' is not valid.`);
        }

        return Object.keys(ProgressService.stepsByModule[moduleId]).length;
    }

    ProgressService.getActualStepByPositon = function (moduleId, stepNumber) {
        if (moduleIds.indexOf(moduleId) === -1) {
            throw new Error(`Module ID:'${moduleId}' is not valid.`);
        }

        const moduleSteps = ProgressService.stepsByModule[moduleId];
        if (!moduleSteps || Object.keys(moduleSteps).length === 0) {
            throw new Error(`Module ID:'${moduleId}' has no steps defined.`);
        }

        const firstStepId = Object
            .keys(moduleSteps)
            .filter(key => key !== 'totalSteps')
            .filter(stepId => moduleSteps[stepId].step === stepNumber)
            .at(0);

        if (firstStepId == undefined || moduleSteps[firstStepId] == undefined) {
            throw new Error(`Step number:'${stepNumber}' is not valid for Module ID:'${moduleId}'.`);
        }

        return moduleSteps[firstStepId];
    }

    ProgressService.setActualStepByPositon = function (moduleId, stepNumber) {
        if (moduleIds.indexOf(moduleId) === -1) {
            throw new Error(`Module ID:'${moduleId}' is not valid.`);
        }

        const firstStepId = Object
            .keys(ProgressService.stepsByModule[moduleId])
            .filter(key => key !== 'totalSteps')
            .filter(stepId => ProgressService.stepsByModule[moduleId][stepId].step === stepNumber)
            .at(0);

        if (firstStepId == undefined) {
            throw new Error(`Step number:'${stepNumber}' is not valid for Module ID:'${moduleId}'.`);
        }

        ProgressService.setActualStep(moduleId, firstStepId);
    }

    ProgressService.setActualStep = function (moduleId, stepId) {
        if (moduleIds.indexOf(moduleId) === -1) {
            throw new Error(`Module ID:'${moduleId}' is not valid.`);
        }

        if (ProgressService.stepsByModule[moduleId][stepId] == undefined) {
            throw new Error(`Step ID:'${stepId}' is not valid for Module ID:'${moduleId}'.`);
        }

        var actualStep = ProgressService.getActualStep(moduleId);
        if (actualStep != undefined) {
            // Do not allow going back steps
            if (ProgressService.stepsByModule[moduleId][stepId].step < actualStep.step) {
                return;
            }
        }

        localStorage.setItem(`progress-${moduleId}-step`, stepId);
    }

    ProgressService.getActualStep = function (moduleId) {
        if (moduleIds.indexOf(moduleId) === -1) {
            throw new Error(`Module ID:'${moduleId}' is not valid.`);
        }

        const stepId = localStorage.getItem(`progress-${moduleId}-step`);
        if (stepId == null || stepId == undefined) {
            return null;
        }

        const moduleSteps = ProgressService.stepsByModule[moduleId];
        if (!moduleSteps || !moduleSteps[stepId]) {
            return null;
        }

        return {
            id: stepId,
            ...moduleSteps[stepId]
        };
    }

    ProgressService.getProgressPercentage = function (moduleId) {
        if (moduleIds.indexOf(moduleId) === -1) {
            throw new Error(`Module ID:'${moduleId}' is not valid.`);
        }
        
        const moduleSteps = ProgressService.stepsByModule[moduleId];
        if (!moduleSteps || Object.keys(moduleSteps).length === 0) {
            return 0;
        }
        
        // Special handling for trilha4: count all achievements (tokens)
        if (moduleId === 'trilha4') {
            const tokens = JSON.parse(localStorage.getItem('tokens-trilha4') || '[]');
            const totalSteps = ProgressService.calcTotalSteps(moduleId);
            return totalSteps > 0 ? (tokens.length / totalSteps) * 100 : 0;
        }
        
        const actualStep = ProgressService.getActualStep(moduleId);
        const totalSteps = ProgressService.calcTotalSteps(moduleId);

        if (actualStep == undefined) {
            return 0;
        }

        // steps start at 0, so we add 1 to actual step
        return ((actualStep.step + 1) / totalSteps) * 100;
    }

    ProgressService.getSteps = function (moduleId) {
        if (moduleIds.indexOf(moduleId) === -1) {
            throw new Error(`Module ID:'${moduleId}' is not valid.`);
        }

        const moduleSteps = ProgressService.stepsByModule[moduleId];
        if (!moduleSteps || Object.keys(moduleSteps).length === 0) {
            return [];
        }

        return Object
            .keys(moduleSteps)
            .filter(key => key !== 'totalSteps')
            .map(key => {
                return {
                    id: key,
                    ...moduleSteps[key],
                };
            });
    }

    ProgressService.resetProgress = function (moduleId) {
        if (moduleIds.indexOf(moduleId) === -1) {
            throw new Error(`Module ID:'${moduleId}' is not valid.`);
        }

        localStorage.removeItem(`progress-${moduleId}-step`);
    }

    ProgressService.resetAllProgress = function () {
        moduleIds.forEach(moduleId => {
            ProgressService.resetProgress(moduleId);
        });
    }

    window.ProgressService = ProgressService;

    function getBaseUrl() {
        const path = window.location.pathname;

        // Exemplo: /repo/index.html → ["", "repo", "index.html"]
        const parts = path.split('/').filter(Boolean);

        // Local (ex: /src/)
        if (parts.length === 1 && parts[0] === 'src') {
            return '/src/';
        }

        // GitHub Pages ou subpasta
        if (parts.length > 1) {
            return '/' + parts[0] + '/';
        }

        // raiz
        return '/';
    }
}());