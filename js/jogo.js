// Lógica do jogo, sem nada de tela.

export function embaralhar(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

// Sorteia um item e monta as opções da rodada.
// Quantidade de verdadeiras: sorteada entre o mínimo e o máximo que as regras e as listas permitem.
export function sortearRodada(itens, figuras, cfg) {
  const item = itens[Math.floor(Math.random() * itens.length)];
  const figura = figuras[item.figura];
  if (!figura) throw new Error(`Item "${item.nome}" aponta para uma figura que não existe: ${item.figura}`);

  const total = cfg.totalOpcoes;
  const minV = Math.max(cfg.minVerdadeiras, total - figura.falsas.length);
  const maxV = Math.min(total - cfg.minFalsas, figura.verdadeiras.length);
  if (minV > maxV) {
    throw new Error(`"${item.figura}" não tem frases suficientes para montar ${total} opções.`);
  }

  const qtdVerdadeiras = minV + Math.floor(Math.random() * (maxV - minV + 1));
  const verdadeiras = embaralhar(figura.verdadeiras).slice(0, qtdVerdadeiras);
  const falsas = embaralhar(figura.falsas).slice(0, total - qtdVerdadeiras);

  const opcoes = embaralhar([
    ...verdadeiras.map((texto) => ({ texto, correta: true })),
    ...falsas.map((texto) => ({ texto, correta: false })),
  ]);
  return { item, opcoes };
}

// Alterna a marcação de uma opção. "marcadas" é um Set de índices.
export function alternar(marcadas, indice) {
  if (marcadas.has(indice)) marcadas.delete(indice);
  else marcadas.add(indice);
}

// Gera uma linha por opção, no formato que vai para a planilha.
export function montarLinhas(rodada, marcadas, dados) {
  return rodada.opcoes.map((opcao, i) => {
    const marcou = marcadas.has(i);
    return {
      id_rodada: dados.idRodada,
      data_hora: dados.dataHora,
      id_jogador: dados.jogador,
      item: rodada.item.nome,
      figura: rodada.item.figura,
      tempo_segundos: dados.tempoSegundos,
      posicao: i + 1,
      caracteristica: opcao.texto,
      correta: opcao.correta ? 1 : 0,
      marcada: marcou ? 1 : 0,
      acertou: marcou === opcao.correta ? 1 : 0,
    };
  });
}

// Confere os dados na abertura: frase repetida ou presente nas duas listas da mesma figura.
export function validarDados(figuras) {
  const problemas = [];
  for (const [nome, fig] of Object.entries(figuras)) {
    const todas = [...fig.verdadeiras, ...fig.falsas];
    const vistas = new Set();
    for (const f of todas) {
      if (vistas.has(f)) problemas.push(`${nome}: frase repetida ou nas duas listas: "${f}"`);
      vistas.add(f);
    }
    if (fig.verdadeiras.length < 8 || fig.falsas.length < 8) {
      problemas.push(`${nome}: tem poucas frases (${fig.verdadeiras.length} verdadeiras, ${fig.falsas.length} falsas)`);
    }
  }
  return problemas;
}