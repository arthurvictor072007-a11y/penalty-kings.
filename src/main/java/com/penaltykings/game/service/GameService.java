package com.penaltykings.game.service;
import com.penaltykings.game.model.*;
import org.springframework.stereotype.Service;
import java.util.*; import java.util.concurrent.ConcurrentHashMap;
@Service
public class GameService {
  private final Map<UUID,Game> games=new ConcurrentHashMap<>(); private final Random random=new Random();
  public NewGameResponse newGame(){UUID id=UUID.randomUUID(); Game g=new Game(id); games.put(id,g); return new NewGameResponse(id,0,0,0,false);}
  public KickResponse kick(UUID id,KickRequest req){Game g=games.get(id); if(g==null) throw new NoSuchElementException("Jogo não encontrado"); if(g.isFinished()) throw new IllegalStateException("Jogo já finalizado");
    Direction keeper=Direction.values()[random.nextInt(Direction.values().length)]; boolean goal=req.direction()!=keeper; g.register(keeper,goal);
    String message=goal?"GOOOOL! A bola entrou!":"DEFESA! O goleiro pegou!";
    if(g.getShots()>=5 && g.getPlayerScore()==g.getKeeperScore()) message="EMPATE! Prorrogação em morte súbita.";
    if(g.isFinished()) message += g.getPlayerScore()>g.getKeeperScore()?" Você venceu!":" O goleiro venceu!";
    return new KickResponse(g.getLastResult(),message,keeper,g.getPlayerScore(),g.getKeeperScore(),g.getShots(),g.isFinished());
  }
}
