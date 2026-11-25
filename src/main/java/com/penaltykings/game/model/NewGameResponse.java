package com.penaltykings.game.model;

import java.util.UUID;

// No começo da partida, a API devolve o ID do jogo junto com os contadores zerados.
public record NewGameResponse(UUID gameId, int playerScore, int keeperScore, int shots, boolean finished) {
}
