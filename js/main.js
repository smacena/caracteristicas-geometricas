import { figuras, itens } from './dados.js';
import { config } from './config.js';
import { sortearRodada, alternar, montarLinhas, validarDados } from './jogo.js';
import { novoIdRodada, registrarRodada, enviarPendentes, pendentes, reservarNumero } from './registro.js';
import { iniciarCamera } from './camera.js';

const problemas = validarDados(figuras);
if (problemas.length) console.warn('Revise o banco de dados:\n' + problemas.join('\n'));

const telas = {
  inicio: document.getElementById('tela-inicio'),
  jogo: document.getElementById('tela-jogo'),
  fim: document.getElementById('tela-fim'),
};
const campoJogador = document.getElementById('jogador');
const imagem = document.getElementById('imagem');
const listaOpcoes = document.getElementById('opcoes');
const instrucao = document.getElementById('instrucao');
const textoInstrucao = instrucao.textContent;
const avisoEnvio = document.getElementById('aviso-envio');
const erroNumero = document.getElementById('erro-numero');
const rotuloJogador = document.getElementById('identificacao');
const botaoComecar = document.getElementById('comecar');
const botaoConfirmar = document.getElementById('confirmar');
const botaoProximo = document.getElementById('proximo');
const botaoCamera = document.getElementById('camera');
const botaoTelaCheia = document.getElementById('tela-cheia');

let rodada, marcadas, inicio, jogador;
let travado = false;
let aguardandoContinuar = false;

function mostrar(nome) {
  Object.entries(telas).forEach(([n, el]) => { el.hidden = n !== nome; });
}

function desenharOpcoes() {
  listaOpcoes.innerHTML = '';
  listaOpcoes.style.gridTemplateRows = `repeat(${rodada.opcoes.length}, 1fr)`;
  rodada.opcoes.forEach((opcao, i) => {
    const botao = document.createElement('button');
    botao.className = 'opcao';
    botao.textContent = opcao.texto;
    botao.dataset.chave = `opcao-${i}`;
    botao.dataset.dwell = config.permanenciaOpcaoMs;
    botao.addEventListener('click', () => aoMarcar(i));
    listaOpcoes.appendChild(botao);
  });
}

function atualizarMarcas() {
  [...listaOpcoes.children].forEach((botao, i) => {
    botao.classList.toggle('marcada', marcadas.has(i));
  });
}

function aoMarcar(indice) {
  if (travado) return;
  alternar(marcadas, indice);
  atualizarMarcas();
}

async function comecar() {
  const numero = campoJogador.value.replace(/\D/g, '');
  erroNumero.textContent = '';
  if (!numero) {
    erroNumero.textContent = 'Digite o seu número de identificação para começar.';
    campoJogador.focus();
    return;
  }

  botaoComecar.disabled = true;
  erroNumero.textContent = 'Verificando o número...';
  const situacao = await reservarNumero(numero, config.enderecoRegistro);
  botaoComecar.disabled = false;

  if (situacao === 'ocupado') {
    erroNumero.textContent = 'Esse número já foi usado por outra pessoa. Escolha outro número.';
    campoJogador.focus();
    return;
  }
  if (situacao === 'sem_conexao' || situacao === 'erro') {
    erroNumero.textContent = 'Não foi possível verificar o número agora. Confira a internet e tente de novo.';
    return;
  }
  erroNumero.textContent = '';

  jogador = numero;
  try {
    rodada = sortearRodada(itens, figuras, config);
  } catch (erro) {
    console.error(erro);
    alert('Não foi possível montar a rodada. Veja o console.');
    return;
  }
  marcadas = new Set();
  travado = false;
  aguardandoContinuar = false;
  botaoConfirmar.textContent = 'Confirmar';
  instrucao.textContent = textoInstrucao;
  imagem.src = rodada.item.imagem;
  desenharOpcoes();
  inicio = Date.now();
  rotuloJogador.textContent = `Nº ${jogador}`;
  rotuloJogador.hidden = false;
  mostrar('jogo');
}

function mostrarResultado() {
  [...listaOpcoes.children].forEach((botao, i) => {
    const opcao = rodada.opcoes[i];
    const acertou = marcadas.has(i) === opcao.correta;
    botao.classList.add(acertou ? 'acertou' : 'errou');
    const rotulo = document.createElement('span');
    rotulo.className = 'rotulo';
    rotulo.textContent = opcao.correta ? 'verdadeira' : 'falsa';
    botao.appendChild(rotulo);
  });
  instrucao.textContent = 'Verde: você acertou. Vermelho: você errou.';
}

function confirmar() {
  if (aguardandoContinuar) {
    aguardandoContinuar = false;
    mostrar('fim');
    return;
  }
  if (travado) return;
  travado = true;

  const linhas = montarLinhas(rodada, marcadas, {
    idRodada: novoIdRodada(),
    dataHora: new Date().toISOString(),
    jogador,
    tempoSegundos: Math.round((Date.now() - inicio) / 100) / 10,
  });
  avisoEnvio.textContent = '';
  registrarRodada(linhas, config.enderecoRegistro).then(() => {
    if (pendentes() > 0) {
      avisoEnvio.textContent =
        'Sem conexão agora. Mantenha esta página aberta: a resposta será enviada quando a internet voltar.';
    }
  });

  if (config.mostrarResultadoAoAluno) {
    mostrarResultado();
    botaoConfirmar.textContent = 'Continuar';
    aguardandoContinuar = true;
  } else {
    mostrar('fim');
  }
}

function proximoJogador() {
  campoJogador.value = '';
  erroNumero.textContent = '';
  rotuloJogador.hidden = true;
  mostrar('inicio');
}

[botaoComecar, botaoConfirmar, botaoProximo].forEach((b) => {
  b.dataset.dwell = config.permanenciaBotaoMs;
});

botaoComecar.addEventListener('click', comecar);
botaoConfirmar.addEventListener('click', confirmar);
botaoProximo.addEventListener('click', proximoJogador);
campoJogador.addEventListener('input', () => {
  campoJogador.value = campoJogador.value.replace(/\D/g, ''); // só números
});
campoJogador.addEventListener('keydown', (e) => { if (e.key === 'Enter') comecar(); });

botaoCamera.addEventListener('click', async () => {
  botaoCamera.disabled = true;
  botaoCamera.textContent = 'Carregando...';
  try {
    await iniciarCamera();
    botaoCamera.textContent = 'Câmera ligada';
  } catch (erro) {
    console.error(erro);
    botaoCamera.disabled = false;
    botaoCamera.textContent = 'Ativar câmera';
    alert('Não consegui ligar a câmera. Veja o console.');
  }
});

botaoTelaCheia.addEventListener('click', () => {
  const raiz = document.documentElement;
  const emTelaCheia = document.fullscreenElement || document.webkitFullscreenElement;
  if (emTelaCheia) {
    (document.exitFullscreen || document.webkitExitFullscreen).call(document);
  } else {
    (raiz.requestFullscreen || raiz.webkitRequestFullscreen).call(raiz);
  }
});

if (!config.enderecoRegistro) {
  console.warn('config.enderecoRegistro está vazio: as respostas ficam só neste aparelho. Veja o README.');
}
enviarPendentes(config.enderecoRegistro);
window.addEventListener('online', () => enviarPendentes(config.enderecoRegistro));

mostrar('inicio');