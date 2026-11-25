import { criarPartida, cobrarPenalti, sortearCanto, TOTAL_DE_CHUTES } from './jogo.js';

const botoesDeChute = document.querySelectorAll('[data-dir]');
const botoesDePotencia = document.querySelectorAll('[data-power]');
const posicoes = { esquerda: '28%', centro: '50%', direita: '72%' };
let partida;

function mostrarPlacar() {
  document.getElementById('playerScore').textContent = partida.gols;
  document.getElementById('keeperScore').textContent = partida.defesas;
  document.getElementById('shots').textContent = `${partida.chutes}/${TOTAL_DE_CHUTES}`;
}

// A tela só mostra o que aconteceu. Quem conta os pontos é a função cobrarPenalti.
function chutar(cantoDaBola) {
  const cantoDoGoleiro = sortearCanto();
  const foiGol = cobrarPenalti(partida, cantoDaBola, cantoDoGoleiro);
  document.getElementById('ball').style.left = posicoes[cantoDaBola];
  document.getElementById('keeper').style.left = posicoes[cantoDoGoleiro];
  mostrarPlacar();

  let mensagem = foiGol ? 'GOOOOL! A bola entrou!' : 'DEFESA! O goleiro pegou!';
  if (partida.encerrada) {
    mensagem += partida.gols > partida.defesas ? ' 🏆 Você venceu!' : ' O goleiro venceu!';
    for (const botao of botoesDeChute) botao.disabled = true;
  }
  document.getElementById('message').textContent = mensagem;
}

function novoJogo() {
  partida = criarPartida();
  mostrarPlacar();
  document.getElementById('ball').style.left = posicoes.centro;
  document.getElementById('keeper').style.left = posicoes.centro;
  document.getElementById('message').textContent = 'Novo jogo iniciado. Boa sorte!';
  for (const botao of botoesDeChute) botao.disabled = false;
}

for (const botao of botoesDeChute) {
  botao.onclick = () => chutar(botao.dataset.dir);
}

// A potência fica marcada na tela. O resultado depende apenas dos cantos escolhidos.
for (const botao of botoesDePotencia) {
  botao.onclick = () => {
    for (const opcao of botoesDePotencia) {
      const selecionada = opcao === botao;
      opcao.classList.toggle('active', selecionada);
      opcao.setAttribute('aria-pressed', String(selecionada));
    }
  };
}

document.getElementById('newGame').onclick = novoJogo;
novoJogo();
