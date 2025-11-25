// Jogo da Memoria
var game;
var cards = [];
var flippedCards = [];
var matchedPairs = 0;
var moves = 0;
var timer = 0;
var timerInterval = null;
var isProcessing = false;
var gameStarted = false;

// Imagens padrao caso nao tenha PNGs
var defaultImages = [
    '🌳', '🌺', '🌻', '🌸', 
    '🦋', '🐝', '🌿', '🍃',
    '🌾', '🌵', '🌴', '🌷'
];

var difficulty = 'hard';
var imageFolder = './images/cards/';

var difficultySettings = {
    easy: 6,
    hard: 8
};

function MemoryGame() {
    this.init = function() {
        renderDifficultySelector();
        loadImages();
    }
}

function renderDifficultySelector() {
    var container = document.querySelector('.difficulty-selector');
    if (!container) return;
    
    container.innerHTML = `
        <label for="difficulty-select">Dificuldade:</label>
        <select id="difficulty-select">
            <option value="easy">Fácil (12 cartas)</option>
            <option value="hard" selected>Difícil (16 cartas)</option>
        </select>
    `;
    
    var select = document.getElementById('difficulty-select');
    select.addEventListener('change', function(e) {
        difficulty = e.target.value;
        resetGame();
    });
}

function loadImages() {
    var numPairs = difficultySettings[difficulty];
    var cardImages = [];
    var useEmoji = true;
    
    // Tenta carregar as imagens PNG
    var loadedCount = 0;
    for (var i = 1; i <= numPairs; i++) {
        var img = new Image();
        img.src = imageFolder + 'card' + i + '.png';
        img.onload = function() {
            loadedCount++;
            if (loadedCount === numPairs) {
                useEmoji = false;
                setupGame(cardImages, useEmoji);
            }
        };
        img.onerror = function() {
            loadedCount++;
            if (loadedCount === numPairs) {
                // Usa emojis se nao carregar todas as imagens
                cardImages = defaultImages.slice(0, numPairs);
                setupGame(cardImages, true);
            }
        };
        cardImages.push(imageFolder + 'card' + i + '.png');
    }
    
    // Se nao tem imagens, usa emojis direto
    if (numPairs === 0 || cardImages.length === 0) {
        cardImages = defaultImages.slice(0, numPairs);
        setupGame(cardImages, true);
    }
}

function setupGame(cardImages, useEmoji) {
    var numPairs = difficultySettings[difficulty];
    var imagesToUse = cardImages.slice(0, numPairs);
    
    // Cria os pares de cartas
    var cardPairs = imagesToUse.concat(imagesToUse);
    
    // Embaralha as cartas
    cards = shuffleArray(cardPairs).map(function(image, index) {
        return {
            id: index,
            image: image,
            flipped: false,
            matched: false
        };
    });
    
    renderGrid(useEmoji);
    attachEventListeners();
}

function shuffleArray(array) {
    var shuffled = array.slice();
    for (var i = shuffled.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
    }
    return shuffled;
}

function renderGrid(useEmoji) {
    var grid = document.querySelector('.memory-grid');
    if (!grid) return;
    
    var numPairs = difficultySettings[difficulty];
    var cols = Math.ceil(Math.sqrt(numPairs * 2));
    grid.style.gridTemplateColumns = 'repeat(' + cols + ', 1fr)';
    
    var html = '';
    for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        html += '<div class="memory-card" data-id="' + card.id + '">';
        html += '<div class="card-inner">';
        html += '<div class="card-back"></div>';
        html += '<div class="card-front">';
        if (useEmoji) {
            html += '<span style="font-size: 3rem;">' + card.image + '</span>';
        } else {
            html += '<img src="' + card.image + '" alt="Card">';
        }
        html += '</div></div></div>';
    }
    grid.innerHTML = html;
}

function attachEventListeners() {
    var grid = document.querySelector('.memory-grid');
    grid.addEventListener('click', function(e) {
        var cardElement = e.target.closest('.memory-card');
        if (cardElement) {
            handleCardClick(cardElement);
        }
    });
    
    var resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            resetGame();
        });
    }
}

function handleCardClick(cardElement) {
    if (isProcessing) return;
    
    var cardId = parseInt(cardElement.dataset.id);
    var card = cards[cardId];
    
    // Nao pode clicar em cartas ja viradas ou ja encontradas
    if (card.matched || card.flipped) return;
    
    // Inicia o cronometro no primeiro clique
    if (!gameStarted) {
        startTimer();
        gameStarted = true;
    }
    
    // Vira a carta
    flipCard(cardElement, card);
    
    // Checa se encontrou par quando tem 2 cartas viradas
    if (flippedCards.length === 2) {
        moves++;
        updateStats();
        checkForMatch();
    }
}

function flipCard(cardElement, card) {
    card.flipped = true;
    cardElement.classList.add('flipped');
    flippedCards.push({ element: cardElement, card: card });
}

function checkForMatch() {
    isProcessing = true;
    var first = flippedCards[0];
    var second = flippedCards[1];
    
    if (first.card.image === second.card.image) {
        // Achou o par!
        setTimeout(function() {
            first.card.matched = true;
            second.card.matched = true;
            first.element.classList.add('matched');
            second.element.classList.add('matched');
            
            matchedPairs++;
            flippedCards = [];
            isProcessing = false;
            
            // Verifica se ganhou o jogo
            if (matchedPairs === cards.length / 2) {
                gameWon();
            }
        }, 500);
    } else {
        // Nao foi um par
        setTimeout(function() {
            first.card.flipped = false;
            second.card.flipped = false;
            first.element.classList.remove('flipped');
            second.element.classList.remove('flipped');
            
            flippedCards = [];
            isProcessing = false;
        }, 1000);
    }
}

function startTimer() {
    timerInterval = setInterval(function() {
        timer++;
        updateStats();
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function updateStats() {
    var movesElement = document.getElementById('moves-count');
    var timeElement = document.getElementById('time-count');
    
    if (movesElement) {
        movesElement.textContent = moves;
    }
    
    if (timeElement) {
        var minutes = Math.floor(timer / 60);
        var seconds = timer % 60;
        if (seconds < 10) seconds = '0' + seconds;
        timeElement.textContent = minutes + ':' + seconds;
    }
}

function gameWon() {
    stopTimer();
    
    // Verifica quais conquistas foram alcancadas
    checkAchievements();
    
    var message = document.querySelector('.game-message');
    
    if (message) {
        message.classList.remove('hidden');
        message.classList.add('success');
        
        var minutes = Math.floor(timer / 60);
        var seconds = timer % 60;
        if (seconds < 10) seconds = '0' + seconds;
        var timeStr = minutes + ':' + seconds;
        
        message.innerHTML = '<h2>🎉 Parabéns! Você venceu! 🎉</h2>' +
            '<p>Você completou o jogo em <strong>' + moves + '</strong> movimentos e <strong>' + timeStr + '</strong>!</p>' +
            '<button class="btn-game" onclick="resetGame()">Jogar Novamente</button>';
    }
}

function checkAchievements() {
    var tokensEarned = [];
    
    // Conquista: Vencer no modo Facil
    if (difficulty === 'easy') {
        if (!hasToken('easy_win')) {
            addToken('easy_win');
            setProgress('easy_win');
            tokensEarned.push('Vencedor Fácil');
        }
    }
    
    // Conquista: Vencer no modo Dificil
    if (difficulty === 'hard') {
        if (!hasToken('hard_win')) {
            addToken('hard_win');
            setProgress('hard_win');
            tokensEarned.push('Vencedor Difícil');
        }
    }
    
    // Conquista: Vencer em menos de 1 minuto
    if (timer < 60) {
        if (!hasToken('speed')) {
            addToken('speed');
            setProgress('speed');
            tokensEarned.push('Velocista');
        }
    }
    
    // Conquista: Vencer com 20 movimentos ou menos
    if (moves <= 20) {
        if (!hasToken('efficient')) {
            addToken('efficient');
            setProgress('efficient');
            tokensEarned.push('Eficiente');
        }
    }
    
    // Mostra notificacao se ganhou tokens
    if (tokensEarned.length > 0) {
        showTokenNotification(tokensEarned);
    }
}

function hasToken(tokenId) {
    var tokens = JSON.parse(localStorage.getItem('tokens-trilha4') || '[]');
    return tokens.indexOf(tokenId) !== -1;
}

function addToken(tokenId) {
    var tokens = JSON.parse(localStorage.getItem('tokens-trilha4') || '[]');
    if (tokens.indexOf(tokenId) === -1) {
        tokens.push(tokenId);
        localStorage.setItem('tokens-trilha4', JSON.stringify(tokens));
    }
}

function setProgress(stepId) {
    localStorage.setItem('progress-trilha4-step', stepId);
}

function showTokenNotification(tokensEarned) {
    var notification = document.createElement('div');
    notification.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #24a148; color: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); z-index: 1000; max-width: 300px;';
    
    var html = '<h3 style="margin: 0 0 10px 0;">🏆 Nova Conquista!</h3>';
    html += '<p style="margin: 0;">Você desbloqueou:</p><ul style="margin: 10px 0 0 0; padding-left: 20px;">';
    
    for (var i = 0; i < tokensEarned.length; i++) {
        html += '<li>' + tokensEarned[i] + '</li>';
    }
    
    html += '</ul>';
    notification.innerHTML = html;
    
    document.body.appendChild(notification);
    
    setTimeout(function() {
        notification.style.transition = 'opacity 0.5s';
        notification.style.opacity = '0';
        setTimeout(function() {
            document.body.removeChild(notification);
        }, 500);
    }, 4000);
}

function resetGame() {
    stopTimer();
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    timer = 0;
    isProcessing = false;
    gameStarted = false;
    
    var message = document.querySelector('.game-message');
    if (message) {
        message.classList.add('hidden');
        message.classList.remove('success');
    }
    
    updateStats();
    loadImages();
}

// Inicia o jogo quando a pagina carrega
document.addEventListener('DOMContentLoaded', function() {
    game = new MemoryGame();
    game.init();
});
