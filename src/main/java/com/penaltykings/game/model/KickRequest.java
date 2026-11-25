package com.penaltykings.game.model;

// Quando o jogador chuta, a tela manda o canto escolhido e a potência neste formato.
public record KickRequest(Direction direction, Power power) {
}
