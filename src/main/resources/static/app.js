// Nesta versão, o navegador guarda o placar e resolve as cobranças.
let power = 'MEDIUM';

let playerScore = 0;
let keeperScore = 0;
let shots = 0;
let gameFinished = false;

const $ = id => document.getElementById(id);

// Cada canto tem uma posição no campo pra desenhar a bola e o goleiro.
const positions = {
  LEFT: '28%',
  CENTER: '50%',
  RIGHT: '72%'
};

const directions = ['LEFT', 'CENTER', 'RIGHT'];

// Zero o placar e volto a bola e o goleiro pro meio.
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

  // Sorteio o canto do goleiro. Se ele for pro mesmo lado da bola, é defesa.
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

  // Cada chute dá um ponto. No quinto, a soma é ímpar e esse empate não acontece.
  if (shots >= 5 && playerScore === keeperScore) {
    message = 'EMPATE! Prorrogação em morte súbita.';
  }

  // A partir do quinto chute, encerro o jogo quando alguém está na frente.
  if (shots >= 5 && playerScore !== keeperScore) {
    gameFinished = true;

    message += playerScore > keeperScore
      ? ' Você venceu!'
      : ' O goleiro venceu!';
  }

  // Mostro os pontos, a mensagem e onde cada um foi nessa cobrança.
  $('playerScore').textContent = playerScore;
  $('keeperScore').textContent = keeperScore;
  $('shots').textContent = `${shots}/5`;
  $('message').textContent = message;

  $('keeper').style.left = positions[goalkeeperDirection];
  $('ball').style.left = positions[direction];

  // Dou tempo de atualizar o placar antes de abrir o aviso final.
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

// Clicar num canto já faz a cobrança.
document.querySelectorAll('[data-dir]').forEach(button => {
  button.onclick = () => kick(button.dataset.dir);
});

// Marco a potência escolhida na tela. O resultado do chute depende só do canto.
document.querySelectorAll('[data-power]').forEach(button => {
  button.onclick = () => {
    power = button.dataset.power;

    document.querySelectorAll('[data-power]').forEach(item => {
      item.classList.remove('active');
    });

    button.classList.add('active');
  };
});

// Ligo o botão de reinício e já abro a primeira partida.
$('newGame').onclick = newGame;

newGame();
