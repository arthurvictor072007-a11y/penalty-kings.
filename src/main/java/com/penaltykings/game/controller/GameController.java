package com.penaltykings.game.controller;

import com.penaltykings.game.model.*;
import com.penaltykings.game.service.GameService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

// As chamadas da tela chegam por /api/game. Quem cuida das regras da partida é o serviço.
@RestController
@RequestMapping("/api/game")
public class GameController {
    private final GameService service;
    public GameController(GameService service) {
        this.service = service;
    }

    // Abre uma partida e devolve o ID que a tela vai usar nos chutes.
    @PostMapping("/new")
    public NewGameResponse newGame() {
        return service.newGame();
    }

    // Pega o ID da partida na URL e a direção e a potência no corpo do pedido.
    @PostMapping("/{gameId}/kick")
    public KickResponse kick(@PathVariable UUID gameId, @RequestBody KickRequest req) {
        return service.kick(gameId, req);
    }

    // Se esse ID não existe, a API devolve 404 e uma mensagem pra tela.
    @ExceptionHandler(NoSuchElementException.class)
    ResponseEntity<Map<String, String>> notFound(Exception e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
    }

    // Se a partida já acabou, a API recusa o chute com o código 400.
    @ExceptionHandler(IllegalStateException.class)
    ResponseEntity<Map<String, String>> badState(Exception e) {
        return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
    }
}
