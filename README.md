# Penalty Kings

Jogo de pênaltis em JavaScript. Cada partida tem cinco cobranças. Se o goleiro escolher o mesmo canto da bola, ele marca um ponto. Se escolher outro, o jogador marca. Quem fizer mais pontos vence.

## Como rodar

Use Node.js 20 ou superior. Na pasta que contém `package.json`, rode `npm start` e abra http://localhost:8080. O projeto usa apenas recursos do Node.js e do navegador.

## Como testar

Rode `npm test`. Os cinco testes conferem o placar inicial, um gol, uma defesa, o fim da partida no quinto chute e o bloqueio do sexto.

## Como explicar na apresentação

1. Em `public/tela.js`, um clique escolhe o canto da bola e chama a função que sorteia o canto do goleiro. A potência é uma seleção visual.
2. Em `public/jogo.js`, a função `cobrarPenalti` compara os dois cantos, soma um ponto e conta o chute. A tela usa o resultado para mostrar a bola, o goleiro e o placar.
3. Em `test/jogo.test.js`, o teste chama a mesma função e informa os dois cantos. Assim dá para repetir um gol ou uma defesa sem depender da sorte.

O HTML e o CSS em `public/` cuidam da estrutura e do visual. O arquivo `servidor.js` serve essa pasta no computador. Na Vercel, o navegador carrega os arquivos diretamente de `public/`.
