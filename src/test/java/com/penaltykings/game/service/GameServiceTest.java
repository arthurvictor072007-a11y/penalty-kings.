package com.penaltykings.game.service;

import org.junit.jupiter.api.Test;
import com.penaltykings.game.model.*;
import static org.junit.jupiter.api.Assertions.*;
class GameServiceTest {

    // Abro uma partida e confiro se ela ganhou um ID e se os dois placares começaram em zero.
    @Test void createsNewGame() {
        var s = new GameService();
        var g = s.newGame();
        assertNotNull(g.gameId());
        assertEquals(0, g.playerScore());
        assertEquals(0, g.keeperScore());
    }

    // Chuto pra esquerda. Como o goleiro escolhe um canto por sorteio, tanto gol quanto defesa valem neste teste.
    @Test void kickUpdatesGame() {
        var s = new GameService();
        var g = s.newGame();
        var r = s.kick(g.gameId(), new KickRequest(Direction.LEFT, Power.HIGH));

        // Confiro que foi só um chute e que só um dos dois ganhou ponto.
        assertEquals(1, r.shots());
        assertTrue(r.playerScore()+r.keeperScore() == 1);
    }
}
