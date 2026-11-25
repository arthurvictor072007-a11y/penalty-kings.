package com.penaltykings.game.model;

import java.util.UUID;

// Aqui ficam o placar, o total de chutes e o resultado da última cobrança de uma partida.
public class Game {
    private final UUID id;
    private int playerScore;
    private int keeperScore;
    private int shots;
    private boolean finished;
    private String lastResult;
    private Direction lastGoalkeeperDirection;
    public Game(UUID id) {
        this.id = id;
    }

    // A API e os testes consultam estes dados pra acompanhar a partida.
    public UUID getId() {
        return id;
    }
    public int getPlayerScore() {
        return playerScore;
    }
    public int getKeeperScore() {
        return keeperScore;
    }
    public int getShots() {
        return shots;
    }
    public boolean isFinished() {
        return finished;
    }
    public String getLastResult() {
        return lastResult;
    }
    public Direction getLastGoalkeeperDirection() {
        return lastGoalkeeperDirection;
    }

    // Cada cobrança conta como um chute e dá um ponto pra quem levou a melhor.
    public void register(Direction keeper, boolean goal) {
        shots++;
        lastGoalkeeperDirection = keeper;
        if (goal) playerScore++;
        else keeperScore++;
        lastResult = goal?"GOAL":"SAVE";

        // A partir do quinto chute, o jogo termina se alguém estiver na frente.
        if (shots >= 5 && playerScore != keeperScore) finished = true;
    }

    // Permite encerrar a partida diretamente.
    public void finish() {
        finished = true;
    }
}
