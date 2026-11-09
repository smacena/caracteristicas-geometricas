## Número de identificação

O jogador é identificado só por um número (o campo aceita apenas dígitos, de 1 a 8), sem nome. O número é obrigatório,
aparece no topo da tela durante o jogo e **não pode ser usado por duas pessoas**: antes de começar, o jogo pergunta à
planilha se o número está livre e o reserva. Depois que a rodada é enviada, o número fica definitivamente ocupado.
"007" e "7" contam como o mesmo número. A lista fica na aba "Numeros" da planilha.

Sem internet o jogo não começa (não dá para conferir o número). Em testes locais, com `enderecoRegistro` vazio, a
conferência é pulada.

# Características Geométricas

Jogo para ligar imagens (objetos do dia a dia, figuras planas e sólidos geométricos) às suas características.
Em cada rodada, o jogador vê uma imagem e 10 características: algumas verdadeiras e outras falsas. Marca as que
acha que valem para a imagem e confirma. Funciona por toque, mouse ou com a mão, pela câmera.

Depois de confirmar, o jogador vê em cada opção se acertou (verde) ou errou (vermelho) e se a frase era verdadeira
ou falsa (opção `mostrarResultadoAoAluno` em `js/config.js`). O jogador é identificado só por um número (o campo
aceita apenas dígitos), sem nome.

## Como testar no computador

    python3 -m http.server 8000

Abra http://localhost:8000. A câmera só funciona em `localhost` ou em HTTPS.

## Como colocar online (GitHub Pages)

No GitHub: Settings > Pages > Deploy from a branch > `main` > `/ (root)`. O endereço aparece em alguns minutos.
Os alunos abrem esse endereço no próprio celular (HTTPS, então a câmera também pode funcionar).

## Onde as respostas ficam: planilha do Google

Cada rodada confirmada é enviada, sozinha, a uma planilha do Google. Configuração (uma vez só):

1. Crie uma planilha nova no Google Planilhas.
2. Em Extensões > Apps Script, apague o que houver e cole o conteúdo de `apps-script/Code.gs`. Salve.
3. Implantar > Nova implantação > tipo "App da Web". Em "Executar como", escolha "Eu". Em "Quem tem acesso",
   escolha "Qualquer pessoa". Clique em Implantar e autorize quando o Google pedir.
4. Copie o endereço do app da Web (termina em `/exec`) e cole em `enderecoRegistro`, em `js/config.js`.
5. Faça uma rodada de teste e confira se 10 linhas apareceram na aba "Respostas".

A planilha tem uma linha por característica (10 por rodada). Para analisar, use Arquivo > Fazer download > CSV e
suba o arquivo em uma IA. Se o celular estiver sem internet, a rodada fica guardada nele e é reenviada quando a
conexão voltar (a planilha ignora rodadas repetidas).

Ao **alterar o `Code.gs`**, cole o código novo no editor e vá em Implantar > Gerenciar implantações > ícone de lápis >
Versão: "Nova versão" > Implantar. Assim o endereço continua o mesmo. Se criar uma implantação nova, o endereço muda.

Atenção: o endereço do app fica no código público do GitHub. Quem o encontrar poderia enviar linhas falsas; a
planilha só recebe dados e não os revela. Se alterar `Code.gs`, é preciso criar uma nova implantação.

## Ajustes

`js/config.js`: quantidade de opções, mínimo de verdadeiras e falsas, tempos da câmera, se o jogador vê o resultado
e o endereço da planilha. `js/dados.js`: características de cada figura e lista de itens. As frases precisam de
revisão do professor; ao abrir o jogo, o console do navegador avisa se alguma frase está repetida.

## Estrutura

- `js/jogo.js`: sorteio e regras, sem tela.
- `js/main.js`: telas e entrada.
- `js/camera.js`: detecção da mão (MediaPipe) e círculo de seleção.
- `js/registro.js`: envio das respostas e fila para quando não há internet.
- `apps-script/Code.gs`: código que recebe as respostas e grava na planilha.