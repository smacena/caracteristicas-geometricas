// Ajustes do jogo. Edite aqui sem mexer no resto do código.
export const config = {
  // Quantas opções aparecem na tela.
  totalOpcoes: 10,

  // Mínimo de características verdadeiras e de falsas em cada rodada.
  // A quantidade de verdadeiras é sorteada entre os limites possíveis.
  minVerdadeiras: 2,
  minFalsas: 2,

  // Tempo (ms) com a mão sobre um botão para acioná-lo, no modo câmera.
  permanenciaOpcaoMs: 1000,
  permanenciaBotaoMs: 1800,

  // Se true, depois de confirmar o jogador vê, em cada opção, se acertou (verde) ou errou (vermelho)
  // e se a frase era verdadeira ou falsa. Depois clica em "Continuar".
  mostrarResultadoAoAluno: true,

  // Endereço (URL) da planilha do Google que recebe as respostas.
  // Veja apps-script/Code.gs e o README para criar e colar o endereço aqui.
  enderecoRegistro: 'https://script.google.com/macros/s/AKfycbyLJW5TIfVjCTLUL93HxLABbHpwwRDgaPA-edKfCFvwllVs1K9dFn2LMyQPqzqpivecsw/exec',
};