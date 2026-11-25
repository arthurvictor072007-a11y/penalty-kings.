package com.penaltykings.game.service;

import com.penaltykings.game.model.*;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

// Guardo as partidas na memória e uso o ID pra encontrar o jogo de cada jogador.
@Service
public class GameService {
    private final Map<UUID, Game> games = new ConcurrentHashMap<>();
    private final Random random = new Random();

    // Cada jogo ganha um ID próprio e começa com o placar zerado.
    public NewGameResponse newGame() {
        UUID id = UUID.randomUUID();
        Game g = new Game(id);
        games.put(id, g);
        return new NewGameResponse(id, 0, 0, 0, false);
    }
    public KickResponse kick(UUID id, KickRequest req) {

        // Antes de contar o chute, confiro se a partida existe e se ainda está valendo.
        Game g = games.get(id);
        if (g == null) throw new NoSuchElementException("Jogo não encontrado");
        if (g.isFinished()) throw new IllegalStateException("Jogo já finalizado");

        // Sorteio um dos três cantos. Se o jogador escolher outro, é gol. A potência não entra nessa conta.
        Direction keeper = Direction.values()[random.nextInt(Direction.values().length)];
        boolean goal = req.direction() != keeper;
        g.register(keeper, goal);
        String message = goal?"GOOOOL! A bola entrou!":"DEFESA! O goleiro pegou!";

        // Com um ponto por chute, o total no quinto é ímpar. Por isso, o empate previsto aqui não acontece no fluxo normal.
        if (g.getShots() >= 5 && g.getPlayerScore() == g.getKeeperScore()) message = "EMPATE! Prorrogação em morte súbita.";
        if (g.isFinished()) message += g.getPlayerScore()>g.getKeeperScore()?" Você venceu!":" O goleiro venceu!";

        // Mando o placar atualizado e o lado do goleiro pra tela mostrar a cobrança.
        return new KickResponse(g.getLastResult(), message, keeper, g.getPlayerScore(), g.getKeeperScore(), g.getShots(), g.isFinished());
    }
}
