package com.penaltykings.game.model;
import java.util.UUID;
public class Game {
  private final UUID id; private int playerScore; private int keeperScore; private int shots;
  private boolean finished; private String lastResult; private Direction lastGoalkeeperDirection;
  public Game(UUID id){this.id=id;}
  public UUID getId(){return id;} public int getPlayerScore(){return playerScore;} public int getKeeperScore(){return keeperScore;}
  public int getShots(){return shots;} public boolean isFinished(){return finished;} public String getLastResult(){return lastResult;}
  public Direction getLastGoalkeeperDirection(){return lastGoalkeeperDirection;}
  public void register(Direction keeper, boolean goal){shots++; lastGoalkeeperDirection=keeper; if(goal) playerScore++; else keeperScore++; lastResult=goal?"GOAL":"SAVE"; if(shots>=5 && playerScore!=keeperScore) finished=true;}
  public void finish(){finished=true;}
}
