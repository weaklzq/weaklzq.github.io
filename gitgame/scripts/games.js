const player = document.getElementById('player');
const coin = document.getElementById('coin');
const obstacles = [
    document.getElementById('obstacle1'),
    document.getElementById('obstacle2'),
    document.getElementById('obstacle3'),
    document.getElementById('obstacle4'),
    document.getElementById('obstacle5')
];
const scoreElement = document.getElementById('score');
const keysPressed = {}; // Для отслеживания нажатых клавиш
let playerX = 385;
let playerY = 385;
const step = 3;
const gameWidth = 800;
const gameHeight = 800;
const playerSize = 30;
const coinSize = 30;
const obstacleSize = 40;
const obstacleSpeed = 2;
let score = 0;

const hitbox = document.getElementById('hitbox');

function getHitbox() {
    const elements = [player, coin, ...obstacles];
    elements.forEach(element => {
        element.classList.toggle('hitbox');
    });
}
// Обработчик события для кнопки
hitbox.addEventListener('click', getHitbox);

// Звуки
const coinSound = new Audio('../sounds/coin_sound.mp3');
const hitSound = new Audio('../sounds/hit_sound.mp3');
const backgroundMusic = new Audio('../sounds/background.mp3');
coinSound.volume = 0.2;
hitSound.volume = 0.2;
backgroundMusic.volume = 0.1;
backgroundMusic.loop = true;
backgroundMusic.play();

// Инициализация препятствий
let obstaclePositions = initializeObstacles();

function initializeObstacles() {
    return obstacles.map(() => ({
        x: getRandomPosition(obstacleSize, gameWidth),
        y: getRandomPosition(obstacleSize, gameHeight),
        dx: Math.random() * 2 - 1, // Скорость по X (-1 до 1)
        dy: Math.random() * 2 - 1  // Скорость по Y (-1 до 1)
    }));
}

function resetGame() {
    // Сбрасываем позицию игрока в центр
    playerX = gameWidth / 2 - playerSize / 2;
    playerY = gameHeight / 2 - playerSize / 2;
    player.style.left = `${playerX}px`;
    player.style.top = `${playerY}px`;

    // Обнуляем счет
    score = 0;
    scoreElement.textContent = score;

    // Переразмещаем препятствия
    obstaclePositions = initializeObstacles();

    obstacles.forEach((obstacle, index) => {
        const pos = obstaclePositions[index];
        obstacle.style.left = `${pos.x}px`;
        obstacle.style.top = `${pos.y}px`;
    });

    // Очищаем нажатые клавиши
     for (let key in keysPressed) {
        keysPressed[key] = false;
    }
}

function getRandomPosition(size, limit) {
    return Math.floor(Math.random() * (limit - size));
}

function moveCoin() {
    const coinX = getRandomPosition(coinSize, gameWidth);
    const coinY = getRandomPosition(coinSize, gameHeight);
    coin.style.left = `${coinX}px`;
    coin.style.top = `${coinY}px`;
}

function checkCollision(rect1, rect2) {
    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
}

function movePlayer() {
    let moving = false;
    let dx = 0; // Изменение по X
    let dy = 0; // Изменение по Y

    // Движение вверх (W или стрелка вверх)
    if ((keysPressed['ArrowUp'] || keysPressed['w']) && playerY - step >= 0) {
        dy = -step;
        moving = true;
    }

    // Движение вниз (S или стрелка вниз)
    if ((keysPressed['ArrowDown'] || keysPressed['s']) && playerY + step + playerSize <= gameHeight) {
        dy = step;
        moving = true;
    }

    // Движение влево (A или стрелка влево)
    if ((keysPressed['ArrowLeft'] || keysPressed['a']) && playerX - step >= 0) {
        dx = -step;
        moving = true;
    }

    // Движение вправо (D или стрелка вправо)
    if ((keysPressed['ArrowRight'] || keysPressed['d']) && playerX + step + playerSize <= gameWidth) {
        dx = step;
        moving = true;
    }

    // Обновляем позицию игрока
    playerX += dx;
    playerY += dy;
    player.style.left = `${playerX}px`;
    player.style.top = `${playerY}px`;

    // Если игрок двигается, вычисляем угол поворота
    if (moving) {
        // Вычисляем угол на основе направления dx и dy
        const angle = Math.atan2(dy, dx) * (180 / Math.PI); // Переводим радианы в градусы
        player.style.transform = `rotate(${angle + 90}deg)`; // Добавляем 90 градусов для коррекции
    }

    const playerRect = player.getBoundingClientRect();
    const coinRect = coin.getBoundingClientRect();

    // Проверка столкновения с монетой
    if (checkCollision(playerRect, coinRect)) {
        moveCoin();
        score++;
        scoreElement.textContent = score;
        coinSound.play();
    }
}


function updateObstacles() {
    obstacles.forEach((obstacle, index) => {
        const pos = obstaclePositions[index];
        pos.x += pos.dx * obstacleSpeed;
        pos.y += pos.dy * obstacleSpeed;

        // Проверка границ и изменение направления
        if (pos.x < 0 || pos.x + obstacleSize > gameWidth) {
            pos.dx *= -1;
        }
        if (pos.y < 0 || pos.y + obstacleSize > gameHeight) {
            pos.dy *= -1;
        }

        obstacle.style.left = `${pos.x}px`;
        obstacle.style.top = `${pos.y}px`;

        // Проверка столкновения с игроком
        const playerRect = player.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();

        if (checkCollision(playerRect, obstacleRect)) {
            hitSound.play();
            alert('You hit an obstacle! Restarting the game...');
            resetGame();
        }
    });
}

function gameLoop() {
    movePlayer(); // Обновляем движение игрока
    updateObstacles(); // Обновляем позицию препятствий
    requestAnimationFrame(gameLoop); // Следующий кадр
}

// Обработчики для нажатия и отпускания клавиш
document.addEventListener('keydown', (event) => {
    keysPressed[event.key] = true; // Сохраняем текущее состояние клавиши
});

document.addEventListener('keyup', (event) => {
    keysPressed[event.key] = false; // Обнуляем состояние клавиши
});

// Начальное размещение монеты
moveCoin();

// Запуск игрового цикла
gameLoop();

document.addEventListener('DOMContentLoaded', () => {
    const scoreElement = document.getElementById('score');
    const nicknameForm = document.getElementById('nicknameForm');
    const leaderboardTable = document.getElementById('leaderboard').getElementsByTagName('tbody')[0];
    let score = 0;
    let nickname = '';

    // Загрузка таблицы лидеров из LocalStorage
    const loadLeaderboard = () => {
        const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
        leaderboardTable.innerHTML = '';
        leaderboard.forEach(entry => {
            const row = leaderboardTable.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            cell1.textContent = entry.username;
            cell2.textContent = entry.score;
        });
    };

    // Сохранение таблицы лидеров в LocalStorage
    const saveLeaderboard = (username, score) => {
        const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
        leaderboard.push({ username, score });
        leaderboard.sort((a, b) => b.score - a.score); // Сортировка по убыванию
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
        loadLeaderboard();
    };

    // Обработка отправки формы
    nicknameForm.addEventListener('submit', (event) => {
        event.preventDefault();
        nickname = document.getElementById('nickname').value;
        nicknameForm.style.display = 'none';
        startGame();
    });

    // Функция для начала игры
    const startGame = () => {
        score = 0;
        scoreElement.textContent = score;
        // Ваш код для начала игры
    };

    // Функция для завершения игры
    const endGame = () => {
        saveLeaderboard(nickname, score);
        nicknameForm.style.display = 'block';
    };

    // Пример функции для обновления счета
    const updateScore = (points) => {
        score += points;
        scoreElement.textContent = score;
    };

    // Загрузка таблицы лидеров при загрузке страницы
    loadLeaderboard();
});
