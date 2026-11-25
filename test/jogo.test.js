import { test } from 'node:test';
import assert from 'node:assert/strict';
import { criarPartida, cobrarPenalti } from '../public/jogo.js';

test('uma partida nova começa com o placar zerado', () => {
  assert.deepEqual(criarPartida(), { gols: 0, defesas: 0, chutes: 0, encerrada: false });
});

test('cantos diferentes dão um gol ao jogador', () => {
  const partida = criarPartida();
  const foiGol = cobrarPenalti(partida, 'esquerda', 'direita');
  assert.equal(foiGol, true);
  assert.deepEqual(partida, { gols: 1, defesas: 0, chutes: 1, encerrada: false });
});

test('cantos iguais dão um ponto ao goleiro', () => {
  const partida = criarPartida();
  const foiGol = cobrarPenalti(partida, 'centro', 'centro');
  assert.equal(foiGol, false);
  assert.deepEqual(partida, { gols: 0, defesas: 1, chutes: 1, encerrada: false });
});

// Deixo o canto do goleiro fixo pra poder prever o placar de cada teste.
test('a partida continua no quarto chute e termina no quinto', () => {
  const partida = criarPartida();
  for (const canto of ['esquerda', 'centro', 'direita', 'centro']) {
    cobrarPenalti(partida, canto, 'centro');
  }
  assert.equal(partida.encerrada, false);
  cobrarPenalti(partida, 'esquerda', 'centro');
  assert.deepEqual(partida, { gols: 3, defesas: 2, chutes: 5, encerrada: true });
});

test('o sexto chute é bloqueado e o placar continua igual', () => {
  const partida = criarPartida();
  for (let chute = 1; chute <= 5; chute++) {
    cobrarPenalti(partida, 'direita', 'direita');
  }
  const placarFinal = { ...partida };
  assert.throws(() => cobrarPenalti(partida, 'esquerda', 'centro'), /partida já terminou/);
  assert.deepEqual(partida, placarFinal);
});
