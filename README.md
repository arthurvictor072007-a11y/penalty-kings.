# Penalty Kings
Jogo de cobrança de pênaltis desenvolvido em Java 17 + Spring Boot + Maven, com frontend HTML/CSS/JavaScript.

## Executar
1. Abra esta pasta no VS Code.
2. No terminal, confirme que `pom.xml` está nesta pasta.
3. Execute `mvn spring-boot:run`.
4. Abra http://localhost:8080

## API
POST /api/game/new
POST /api/game/{gameId}/kick
Body: {"direction":"LEFT","power":"HIGH"}
