let power = 'MEDIUM';

let playerScore = 0;
let keeperScore = 0;
let shots = 0;
let gameFinished = false;

const $ = id => document.getElementById(id);

const positions = {
  LEFT: '28%',
  CENTER: '50%',
  RIGHT: '72%'
};

const directions = ['LEFT', 'CENTER', 'RIGHT'];

function newGame() {
  playerScore = 0;
  keeperScore = 0;
  shots = 0;
  gameFinished = false;

  $('playerScore').textContent = 0;
  $('keeperScore').textContent = 0;
  $('shots').textContent = '0/5';
  $('message').textContent = 'Novo jogo iniciado. Boa sorte!';

  $('keeper').style.left = '50%';
  $('ball').style.left = '50%';
}

function kick(direction) {
  if (gameFinished) return;

  const goalkeeperDirection =
    directions[Math.floor(Math.random() * directions.length)];

  const goal = direction !== goalkeeperDirection;

  shots++;

  if (goal) {
    playerScore++;
  } else {
    keeperScore++;
  }

  let message = goal
    ? 'GOOOOL! A bola entrou!'
    : 'DEFESA! O goleiro pegou!';

  if (shots >= 5 && playerScore === keeperScore) {
    message = 'EMPATE! Prorrogação em morte súbita.';
  }

  if (shots >= 5 && playerScore !== keeperScore) {
    gameFinished = true;

    message += playerScore > keeperScore
      ? ' Você venceu!'
      : ' O goleiro venceu!';
  }

  $('playerScore').textContent = playerScore;
  $('keeperScore').textContent = keeperScore;
  $('shots').textContent = `${shots}/5`;
  $('message').textContent = message;

  $('keeper').style.left = positions[goalkeeperDirection];
  $('ball').style.left = positions[direction];

  if (gameFinished) {
    setTimeout(() => {
      alert(
        playerScore > keeperScore
          ? '🏆 Você venceu!'
          : '😅 O goleiro venceu!'
      );
    }, 100);
  }
}

document.querySelectorAll('[data-dir]').forEach(button => {
  button.onclick = () => kick(button.dataset.dir);
});

document.querySelectorAll('[data-power]').forEach(button => {
  button.onclick = () => {
    power = button.dataset.power;

    document.querySelectorAll('[data-power]').forEach(item => {
      item.classList.remove('active');
    });

    button.classList.add('active');
  };
});

$('newGame').onclick = newGame;

newGame();