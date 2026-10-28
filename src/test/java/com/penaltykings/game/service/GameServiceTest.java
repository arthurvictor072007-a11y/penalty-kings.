package com.penaltykings.game.service;
import org.junit.jupiter.api.Test; import com.penaltykings.game.model.*; import static org.junit.jupiter.api.Assertions.*;
class GameServiceTest {
  @Test void createsNewGame(){var s=new GameService(); var g=s.newGame(); assertNotNull(g.gameId()); assertEquals(0,g.playerScore()); assertEquals(0,g.keeperScore());}
  @Test void kickUpdatesGame(){var s=new GameService(); var g=s.newGame(); var r=s.kick(g.gameId(),new KickRequest(Direction.LEFT,Power.HIGH)); assertEquals(1,r.shots()); assertTrue(r.playerScore()+r.keeperScore()==1);}
}
