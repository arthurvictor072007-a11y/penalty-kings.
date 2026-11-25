import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';

// O servidor local entrega só os arquivos que fazem parte da tela.
const arquivos = new Map([
  ['/', ['index.html', 'text/html']],
  ['/index.html', ['index.html', 'text/html']],
  ['/style.css', ['style.css', 'text/css']],
  ['/tela.js', ['tela.js', 'text/javascript']],
  ['/jogo.js', ['jogo.js', 'text/javascript']]
]);

const porta = Number(process.env.PORT || 8080);
createServer(async (pedido, resposta) => {
  const caminho = pedido.url.split('?')[0];
  const arquivo = arquivos.get(caminho);
  if (!arquivo) {
    resposta.writeHead(404).end('Arquivo não encontrado.');
    return;
  }

  const [nome, tipo] = arquivo;
  try {
    const conteudo = await readFile(new URL('./public/' + nome, import.meta.url));
    resposta.writeHead(200, { 'Content-Type': tipo + '; charset=utf-8' });
    resposta.end(conteudo);
  } catch {
    resposta.writeHead(500).end('Erro ao carregar o arquivo.');
  }
}).listen(porta, '127.0.0.1', () => {
  console.log(`Penalty Kings em http://localhost:${porta}`);
});
