package com.penaltykings.game.model;
public record KickResponse(String result,String message,Direction goalkeeperDirection,int playerScore,int keeperScore,int shots,boolean finished) {}
