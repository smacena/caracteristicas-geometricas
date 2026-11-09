// Registro das respostas.
// Cada rodada é enviada a uma planilha do Google (veja apps-script/Code.gs). Se não houver
// internet, a rodada fica numa fila no celular e é reenviada depois, sem perder nada.
export const CAMPOS = [
  'id_rodada', 'data_hora', 'id_jogador', 'item', 'figura', 'tempo_segundos',
  'posicao', 'caracteristica', 'correta', 'marcada', 'acertou',
];

const CHAVE_FILA = 'caracteristicas.fila';

function lerFila() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_FILA)) || [];
  } catch {
    return [];
  }
}

function gravarFila(fila) {
  try {
    localStorage.setItem(CHAVE_FILA, JSON.stringify(fila));
  } catch {
    // sem armazenamento disponível: segue sem fila
  }
}

export function pendentes() {
  return lerFila().length;
}

// Identificador único da rodada (a planilha usa para não gravar a mesma rodada duas vezes).
export function novoIdRodada() {
  return 'R' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 6).toUpperCase();
}

async function enviar(endereco, linhas) {
  // text/plain evita a verificação prévia (preflight) do navegador, que o Apps Script não responde
  const resposta = await fetch(endereco, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(linhas),
  });
  if (!resposta.ok) throw new Error(`Falha ao enviar: ${resposta.status}`);
}

// Tenta enviar tudo que está na fila. O que falhar continua na fila para a próxima tentativa.
export async function enviarPendentes(endereco) {
  if (!endereco) return;
  const enviados = new Set();
  for (const lote of lerFila()) {
    try {
      await enviar(endereco, lote);
      enviados.add(lote[0].id_rodada);
    } catch {
      // sem internet ou planilha fora do ar: fica para depois
    }
  }
  if (enviados.size > 0) {
    gravarFila(lerFila().filter((lote) => !enviados.has(lote[0].id_rodada)));
  }
}

export async function registrarRodada(linhas, endereco) {
  gravarFila([...lerFila(), linhas]);
  await enviarPendentes(endereco);
}