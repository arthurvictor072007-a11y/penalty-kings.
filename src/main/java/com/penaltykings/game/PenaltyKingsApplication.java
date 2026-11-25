package com.penaltykings.game;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// O jogo começa aqui. O Spring procura o serviço e o controlador neste pacote e nos pacotes abaixo.
@SpringBootApplication
public class PenaltyKingsApplication {
    public static void main(String[] args) {
        SpringApplication.run(PenaltyKingsApplication.class, args);
    }
}
