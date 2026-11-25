package com.penaltykings.game.model;

// Depois do chute, a tela recebe o resultado, o canto do goleiro, o placar e se o jogo acabou.
public record KickResponse(String result, String message, Direction goalkeeperDirection, int playerScore, int keeperScore, int shots, boolean finished) {
}
