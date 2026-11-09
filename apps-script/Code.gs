// Google Apps Script que recebe as respostas do jogo e grava numa planilha.
// Cole este código em Extensões > Apps Script, dentro de uma planilha do Google.
// Passo a passo no README.
//
// Duas abas são criadas sozinhas:
//   "Respostas": uma linha por característica de cada rodada.
//   "Numeros":   os números de identificação já reservados, para dois alunos não usarem o mesmo.

const NOME_ABA = 'Respostas';
const NOME_ABA_NUMEROS = 'Numeros';
const CAMPOS = [
  'id_rodada', 'data_hora', 'id_jogador', 'item', 'figura', 'tempo_segundos',
  'posicao', 'caracteristica', 'correta', 'marcada', 'acertou',
];
const CAMPOS_NUMEROS = ['id_jogador', 'aparelho', 'data_hora', 'usado'];

// O jogo chama este endereço (GET) antes de começar: ?acao=reservar&id=123&aparelho=XYZ
function doGet(e) {
  const p = (e && e.parameter) || {};
  if (p.acao === 'reservar') {
    return resposta(reservar(String(p.id || ''), String(p.aparelho || '')));
  }
  return resposta('servidor ok');
}

// O jogo envia as respostas de uma rodada (POST).
function doPost(e) {
  const trava = LockService.getScriptLock();
  trava.waitLock(20000); // vários alunos podem enviar ao mesmo tempo
  try {
    const linhas = JSON.parse(e.postData.contents);
    const planilha = SpreadsheetApp.getActiveSpreadsheet();
    let aba = planilha.getSheetByName(NOME_ABA);

    if (!aba) {
      aba = planilha.insertSheet(NOME_ABA);
      aba.appendRow(CAMPOS);
      // id_rodada, data_hora e id_jogador como texto: a planilha não converte nem apaga zeros à esquerda
      aba.getRange(1, 1, aba.getMaxRows(), 3).setNumberFormat('@');
    }

    // Não grava a mesma rodada duas vezes (o celular pode reenviar se a conexão cair)
    const ultima = aba.getLastRow();
    const jaGravadas = new Set(
      ultima > 1 ? aba.getRange(2, 1, ultima - 1, 1).getValues().map((l) => String(l[0])) : []
    );
    const idRodada = String(linhas[0].id_rodada);
    if (jaGravadas.has(idRodada)) return resposta('repetida');

    const valores = linhas.map((l) => CAMPOS.map((c) => (l[c] === undefined ? '' : l[c])));
    aba.getRange(ultima + 1, 1, valores.length, CAMPOS.length).setValues(valores);

    marcarUsado(String(linhas[0].id_jogador || ''));
    return resposta('ok');
  } catch (erro) {
    return resposta('erro: ' + erro.message);
  } finally {
    trava.releaseLock();
  }
}

// ---- números de identificação ----

// "007" e "7" contam como o mesmo número.
function normalizar(id) {
  return String(id).replace(/^0+(?=\d)/, '');
}

function abaNumeros() {
  const planilha = SpreadsheetApp.getActiveSpreadsheet();
  let aba = planilha.getSheetByName(NOME_ABA_NUMEROS);
  if (!aba) {
    aba = planilha.insertSheet(NOME_ABA_NUMEROS);
    aba.appendRow(CAMPOS_NUMEROS);
    aba.getRange(1, 1, aba.getMaxRows(), 3).setNumberFormat('@');
  }
  return aba;
}

// Devolve o número da linha onde o id está, ou 0 se não existir.
function acharNumero(aba, id) {
  const ultima = aba.getLastRow();
  if (ultima < 2) return 0;
  const ids = aba.getRange(2, 1, ultima - 1, 1).getValues();
  const alvo = normalizar(id);
  for (let i = 0; i < ids.length; i++) {
    if (normalizar(ids[i][0]) === alvo) return i + 2;
  }
  return 0;
}

// Reserva um número para um aparelho. Respostas: ok, ocupado, invalido.
function reservar(id, aparelho) {
  if (!/^\d{1,8}$/.test(id)) return 'invalido';
  const trava = LockService.getScriptLock();
  trava.waitLock(20000);
  try {
    const aba = abaNumeros();
    const linha = acharNumero(aba, id);
    if (linha === 0) {
      aba.appendRow([id, aparelho, new Date().toISOString(), 0]);
      return 'ok';
    }
    // O mesmo aparelho pode tentar de novo enquanto o número ainda não foi usado numa rodada
    const dados = aba.getRange(linha, 1, 1, CAMPOS_NUMEROS.length).getValues()[0];
    if (String(dados[1]) === aparelho && Number(dados[3]) === 0) return 'ok';
    return 'ocupado';
  } finally {
    trava.releaseLock();
  }
}

// Depois que a rodada é gravada, o número fica definitivamente ocupado.
function marcarUsado(id) {
  if (!id) return;
  const aba = abaNumeros();
  const linha = acharNumero(aba, id);
  if (linha === 0) {
    aba.appendRow([id, '', new Date().toISOString(), 1]);
  } else {
    aba.getRange(linha, 4).setValue(1);
  }
}

function resposta(texto) {
  return ContentService.createTextOutput(texto);
}