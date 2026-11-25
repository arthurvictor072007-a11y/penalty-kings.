// Estas são as regras usadas pela tela e pelos testes.
export const TOTAL_DE_CHUTES = 5;
const cantos = ['esquerda', 'centro', 'direita'];

export function criarPartida() {
  return { gols: 0, defesas: 0, chutes: 0, encerrada: false };
}

// Só a escolha do goleiro é aleatória. Nos testes, escolhemos o canto diretamente.
export function sortearCanto() {
  const indice = Math.floor(Math.random() * cantos.length);
  return cantos[indice];
}

export function cobrarPenalti(partida, cantoDaBola, cantoDoGoleiro) {
  if (partida.encerrada) {
    throw new Error('A partida já terminou.');
  }

  // Se o goleiro acertar o canto, ele ganha o ponto. Se errar, é gol.
  const foiGol = cantoDaBola !== cantoDoGoleiro;
  if (foiGol) {
    partida.gols += 1;
  } else {
    partida.defesas += 1;
  }

  partida.chutes += 1;
  partida.encerrada = partida.chutes === TOTAL_DE_CHUTES;
  return foiGol;
}
