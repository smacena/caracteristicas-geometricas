// Google Apps Script que recebe as respostas do jogo e grava numa planilha.
// Cole este código em Extensões > Apps Script, dentro de uma planilha do Google.
// Passo a passo no README.

const NOME_ABA = 'Respostas';
const CAMPOS = [
  'id_rodada', 'data_hora', 'id_jogador', 'item', 'figura', 'tempo_segundos',
  'posicao', 'caracteristica', 'correta', 'marcada', 'acertou',
];

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
    return resposta('ok');
  } catch (erro) {
    return resposta('erro: ' + erro.message);
  } finally {
    trava.releaseLock();
  }
}

function resposta(texto) {
  return ContentService.createTextOutput(texto);
}