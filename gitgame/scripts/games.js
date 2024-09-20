import '../styles/games.css';

// Звуки
const coinSound = new Audio('sounds/coin_sound.wav');
const hitSound = new Audio('sounds/hit_sound.wav');
const backgroundMusic = new Audio('sounds/background.wav');
coinSound.volume = 0.2;
hitSound.volume = 0.2;
backgroundMusic.volume = 0.1;
backgroundMusic.loop = true;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set, update, child, get, query, orderByChild, limitToFirst, limitToLast } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAubA02OcvxHWf63bJStwB1IqZTn4eunw0",
  authDomain: "project1-83e37.firebaseapp.com",
  databaseURL: "https://project1-83e37.europe-west1.firebasedatabase.app/",
  projectId: "project1-83e37",
  storageBucket: "project1-83e37.appspot.com",
  messagingSenderId: "879925774333",
  appId: "1:879925774333:web:f588e6a2756988ab6d7b94",
  measurementId: "G-PDXE0SBPNQ"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const leaderboardRef = ref(database, 'leaderboard');

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('nick');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = document.getElementById('name');
    const scoreElement = document.getElementById('score'); // Предполагаем, что элемент с фиксированным счётом имеет id 'score'
    const score = parseInt(scoreElement.textContent, 10); // Получаем текстовое содержимое и преобразуем его в число
    const playerName = input.value.trim();

    if (playerName && isValidPlayerName(playerName)) {
        writeUserData(playerName, score);
        backgroundMusic.play();
      } else {
        alert('Please enter a valid name.');
      }
  });
    // Получаем и отображаем таблицу лидеров при загрузке страницы
    displayLeaderboard();
});

function isValidPlayerName(name) {
    // Проверяем, что имя не пустое и не содержит недопустимых символов
    const invalidChars = /[.#$[\]]/;
    return !invalidChars.test(name);
}

const overlay = document.getElementById('overlay');
const modal = document.getElementById('modal');

function writeUserData(player, score) {
    const playerRef = ref(database, `leaderboard/${player}`);
    set(playerRef, {
        player: player,
        score: score,
        timestamp: Date.now()
  });
  alert('Contol keys: WASD or arrows! Are u ready?');
  alert('*the game sometimes has bugs, sorry(*');
  document.getElementById('name').setAttribute('disabled', true);

  overlay.classList.remove('overlay');
  modal.classList.remove('modal');
  document.getElementById('nick').classList.add('nick');

  // Начальное размещение монеты
    moveCoin();

// Запуск игрового цикла
    gameLoop();

} 

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
            alert('You hit an obstacle! Restart the game? BE READY:)');
            let input = document.getElementById('name');
            let playerName = input.value.trim();
            updateUserData(playerName, score);
            resetGame();
        }
    });
}

function updateUserData(player, score) {
    const playerRef = ref(database, `leaderboard/${player}`);

    get(playerRef).then((snapshot) => {
      if (snapshot.exists()) {
        const currentScore = snapshot.val().score;
        if (score > currentScore) {
          update(playerRef, {
            score: score,
            timestamp: Date.now()
          }).then(() => {
            displayLeaderboard(); // Обновляем таблицу лидеров после сохранения данных
          }).catch((error) => {
            console.error('Error updating score:', error);
            alert('Failed to update score.');
          });
        } 
      }
    }).catch((error) => {
      console.error('Error getting current score:', error);
      alert('Failed to get current score.');
    });
  }


  function displayLeaderboard() {
    const leaderboardBody = document.getElementById('leaderboardBody');
    leaderboardBody.innerHTML = ''; // Очищаем таблицу перед обновлением
  
    const leaderboardQuery = query(leaderboardRef, orderByChild('score'), limitToLast(10));
  
    get(leaderboardQuery).then((snapshot) => {
      if (snapshot.exists()) {
        let rank = 1;
        const leaderboardData = [];
        snapshot.forEach((childSnapshot) => {
          leaderboardData.push(childSnapshot.val());
        });
  
        // Сортируем данные по убыванию очков
        leaderboardData.sort((a, b) => b.score - a.score);
  
        leaderboardData.forEach((data) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${rank}</td>
            <td>${data.player}</td>
            <td>${data.score}</td>
          `;
          leaderboardBody.appendChild(row);
          rank++;
        });
      } else {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="3">No data available</td>';
        leaderboardBody.appendChild(row);
      }
    }).catch((error) => {
      console.error('Error getting leaderboard data:', error);
      const row = document.createElement('tr');
      row.innerHTML = '<td colspan="3">Failed to load data</td>';
      leaderboardBody.appendChild(row);
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

