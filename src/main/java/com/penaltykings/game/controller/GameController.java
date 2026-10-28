package com.penaltykings.game.controller;
import com.penaltykings.game.model.*; import com.penaltykings.game.service.GameService;
import org.springframework.http.*; import org.springframework.web.bind.annotation.*; import java.util.*;
@RestController @RequestMapping("/api/game")
public class GameController {
  private final GameService service; public GameController(GameService service){this.service=service;}
  @PostMapping("/new") public NewGameResponse newGame(){return service.newGame();}
  @PostMapping("/{gameId}/kick") public KickResponse kick(@PathVariable UUID gameId,@RequestBody KickRequest req){return service.kick(gameId,req);}
  @ExceptionHandler(NoSuchElementException.class) ResponseEntity<Map<String,String>> notFound(Exception e){return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error",e.getMessage()));}
  @ExceptionHandler(IllegalStateException.class) ResponseEntity<Map<String,String>> badState(Exception e){return ResponseEntity.badRequest().body(Map.of("error",e.getMessage()));}
}
