package com.penaltykings.game.model;
import java.util.UUID;
public record NewGameResponse(UUID gameId,int playerScore,int keeperScore,int shots,boolean finished) {}
