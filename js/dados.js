// Banco de características.
//
// Cada figura/sólido tem uma lista de características VERDADEIRAS e outra de FALSAS.
// As falsas podem ser de outras figuras, desde que NÃO valham para esta.
// Cada lista deve ter pelo menos 8 frases (veja config.js: o sorteio usa 10 opções,
// com no mínimo 2 verdadeiras e 2 falsas).
//
// ATENÇÃO PARA A REVISÃO: uma falsa que também seja verdadeira faz o jogo ensinar errado.
// Ao abrir o jogo, o console do navegador avisa se uma frase aparece nas duas listas
// da mesma figura (veja validarDados em jogo.js).

export const figuras = {
  Cubo: {
    verdadeiras: [
      'Tem 6 faces',
      'Tem 12 arestas',
      'Tem 8 vértices',
      'Todas as faces são quadrados',
      'Todas as arestas têm a mesma medida',
      'É um poliedro',
      'É uma figura tridimensional',
      'Todas as suas faces são planas',
    ],
    falsas: [
      'Tem 4 faces',
      'Tem 5 faces',
      'Tem 8 faces',
      'Tem 6 vértices',
      'Tem superfície curva',
      'Tem um único vértice',
      'Não tem arestas',
      'Tem duas bases circulares',
      'Todas as faces são triângulos',
      'É uma figura plana',
    ],
  },

  Paralelepípedo: {
    verdadeiras: [
      'Tem 6 faces',
      'Tem 12 arestas',
      'Tem 8 vértices',
      'Todas as faces são retângulos',
      'As faces opostas são paralelas e iguais',
      'É um poliedro',
      'É uma figura tridimensional',
      'Todas as suas faces são planas',
    ],
    falsas: [
      'Tem 4 faces',
      'Tem 5 faces',
      'Tem 6 vértices',
      'Tem superfície curva',
      'Tem um único vértice',
      'Não tem arestas',
      'Tem duas bases circulares',
      'Todas as faces são triângulos',
      'Todas as arestas têm a mesma medida',
      'É uma figura plana',
    ],
  },

  Cilindro: {
    verdadeiras: [
      'Tem duas bases circulares',
      'Tem uma superfície lateral curva',
      'Tem duas faces planas',
      'Não tem vértices',
      'É um corpo redondo',
      'As duas bases são paralelas e iguais',
      'É uma figura tridimensional',
      'Não é um poliedro',
    ],
    falsas: [
      'Tem 6 faces',
      'Tem 12 arestas',
      'Tem 8 vértices',
      'Tem um vértice',
      'É um poliedro',
      'Tem uma única base circular',
      'Todas as faces são quadrados',
      'Todas as faces são triângulos',
      'É uma figura plana',
      'Todos os pontos da superfície estão à mesma distância do centro',
    ],
  },

  Cone: {
    verdadeiras: [
      'Tem uma base circular',
      'Tem um vértice',
      'Tem uma superfície lateral curva',
      'Tem uma única face plana',
      'É um corpo redondo',
      'Não é um poliedro',
      'É uma figura tridimensional',
      'Nenhuma de suas faces é um polígono',
    ],
    falsas: [
      'Tem duas bases circulares',
      'Não tem vértices',
      'Tem 6 faces',
      'Tem 12 arestas',
      'Tem 8 vértices',
      'É um poliedro',
      'Todas as faces são quadrados',
      'Todas as faces são triângulos',
      'É uma figura plana',
      'Todos os pontos da superfície estão à mesma distância do centro',
    ],
  },

  Esfera: {
    verdadeiras: [
      'Tem superfície curva',
      'Não tem arestas',
      'Não tem vértices',
      'Não tem nenhuma face plana',
      'Todos os pontos da superfície estão à mesma distância do centro',
      'É uma figura tridimensional',
      'É um corpo redondo',
      'Não é um poliedro',
    ],
    falsas: [
      'Tem 6 faces',
      'Tem 12 arestas',
      'Tem 8 vértices',
      'É um poliedro',
      'Tem duas bases circulares',
      'Tem um vértice',
      'Todas as faces são quadrados',
      'Todas as faces são triângulos',
      'É uma figura plana',
      'Tem uma base plana',
    ],
  },

  Pirâmide: {
    verdadeiras: [
      'Tem 5 faces',
      'Tem 8 arestas',
      'Tem 5 vértices',
      'Sua base é um quadrado',
      'Tem 4 faces laterais triangulares',
      'É um poliedro',
      'É uma figura tridimensional',
      'Suas faces laterais se encontram em um único vértice',
    ],
    falsas: [
      'Tem 4 faces',
      'Tem 6 faces',
      'Tem 12 arestas',
      'Tem 8 vértices',
      'Todas as faces são quadrados',
      'Tem superfície curva',
      'Tem duas bases circulares',
      'Não tem vértices',
      'É uma figura plana',
      'Tem duas bases iguais e paralelas',
    ],
  },

  'Prisma triangular': {
    verdadeiras: [
      'Tem 5 faces',
      'Tem 9 arestas',
      'Tem 6 vértices',
      'Tem duas bases triangulares',
      'Tem 3 faces laterais retangulares',
      'As duas bases são paralelas e iguais',
      'É um poliedro',
      'É uma figura tridimensional',
    ],
    falsas: [
      'Tem 6 faces',
      'Tem 12 arestas',
      'Tem 8 vértices',
      'Tem 4 faces',
      'Tem superfície curva',
      'Todas as faces são triângulos',
      'Não tem arestas',
      'Tem duas bases circulares',
      'É uma figura plana',
      'Tem um único vértice',
    ],
  },

  Quadrado: {
    verdadeiras: [
      'Tem 4 lados',
      'Tem 4 vértices',
      'Tem 4 ângulos retos',
      'Todos os lados têm a mesma medida',
      'Os lados opostos são paralelos',
      'É um polígono',
      'É um quadrilátero',
      'É uma figura plana',
    ],
    falsas: [
      'Tem 3 lados',
      'Tem 5 lados',
      'Tem 6 lados',
      'Tem um lado curvo',
      'Tem apenas um par de lados paralelos',
      'Tem exatamente 3 ângulos retos',
      'É uma figura tridimensional',
      'Tem 12 arestas',
      'Todos os pontos do contorno estão à mesma distância do centro',
      'É um polígono de 8 lados',
    ],
  },

  Retângulo: {
    verdadeiras: [
      'Tem 4 lados',
      'Tem 4 vértices',
      'Tem 4 ângulos retos',
      'Os lados opostos são paralelos',
      'Os lados opostos têm a mesma medida',
      'É um quadrilátero',
      'É um polígono',
      'É uma figura plana',
    ],
    falsas: [
      'Tem 3 lados',
      'Tem 5 lados',
      'Tem 6 vértices',
      'Tem um lado curvo',
      'Tem apenas um par de lados paralelos',
      'Tem exatamente 3 ângulos retos',
      'É uma figura tridimensional',
      'Tem 12 arestas',
      'Todos os pontos do contorno estão à mesma distância do centro',
      'É um polígono de 8 lados',
    ],
  },

  Triângulo: {
    verdadeiras: [
      'Tem 3 lados',
      'Tem 3 vértices',
      'Tem 3 ângulos internos',
      'A soma dos ângulos internos é 180°',
      'É um polígono',
      'É uma figura plana',
      'É o polígono com menor número de lados',
      'Todos os seus lados são segmentos de reta',
    ],
    falsas: [
      'Tem 4 lados',
      'Tem 5 vértices',
      'Tem 4 ângulos retos',
      'A soma dos ângulos internos é 360°',
      'Tem um lado curvo',
      'É uma figura tridimensional',
      'Tem 12 arestas',
      'Todos os pontos do contorno estão à mesma distância do centro',
      'Tem dois pares de lados paralelos',
      'É um quadrilátero',
    ],
  },

  Círculo: {
    verdadeiras: [
      'Não tem vértices',
      'Não é um polígono',
      'Todos os pontos do contorno estão à mesma distância do centro',
      'É uma figura plana',
      'Tem raio e diâmetro',
      'Seu contorno é uma curva fechada',
      'Não tem lados retos',
      'Tem centro',
    ],
    falsas: [
      'Tem 4 lados',
      'Tem 3 vértices',
      'Tem 4 ângulos retos',
      'É um polígono',
      'É uma figura tridimensional',
      'Tem 6 faces',
      'Tem 12 arestas',
      'É formado só por segmentos de reta',
      'Tem pelo menos um lado reto',
      'Tem 8 vértices',
    ],
  },

  Hexágono: {
    verdadeiras: [
      'Tem 6 lados',
      'Tem 6 vértices',
      'Tem 6 ângulos internos',
      'A soma dos ângulos internos é 720°',
      'É um polígono',
      'É uma figura plana',
      'Todos os seus lados são segmentos de reta',
      'Tem mais lados que um pentágono',
    ],
    falsas: [
      'Tem 4 lados',
      'Tem 5 lados',
      'Tem 3 vértices',
      'Tem 8 vértices',
      'Tem um lado curvo',
      'É uma figura tridimensional',
      'Tem 12 arestas',
      'É um quadrilátero',
      'A soma dos ângulos internos é 360°',
      'Tem 4 ângulos retos',
    ],
  },

  Losango: {
    verdadeiras: [
      'Tem 4 lados',
      'Tem 4 vértices',
      'Todos os lados têm a mesma medida',
      'Os lados opostos são paralelos',
      'As diagonais são perpendiculares',
      'É um quadrilátero',
      'É um polígono',
      'É uma figura plana',
    ],
    falsas: [
      'Tem 3 lados',
      'Tem 5 lados',
      'Tem 6 vértices',
      'Tem um lado curvo',
      'Tem apenas um par de lados paralelos',
      'É uma figura tridimensional',
      'Tem 12 arestas',
      'Todos os pontos do contorno estão à mesma distância do centro',
      'Tem 3 ângulos internos',
      'É um polígono de 8 lados',
    ],
  },
};

// Itens que podem aparecer na tela. Um objeto do dia a dia usa as listas da figura
// indicada em "figura". Cada item tem o caminho da imagem e o nome (só para registro).
export const itens = [
  // Sólidos
  { nome: 'Cubo', figura: 'Cubo', imagem: 'img/solidos/cubo.gif' },
  { nome: 'Paralelepípedo', figura: 'Paralelepípedo', imagem: 'img/solidos/paralelepipedo.gif' },
  { nome: 'Cilindro', figura: 'Cilindro', imagem: 'img/solidos/cilindro.gif' },
  { nome: 'Cone', figura: 'Cone', imagem: 'img/solidos/cone.gif' },
  { nome: 'Esfera', figura: 'Esfera', imagem: 'img/solidos/esfera.gif' },
  { nome: 'Pirâmide', figura: 'Pirâmide', imagem: 'img/solidos/piramide.gif' },
  { nome: 'Prisma triangular', figura: 'Prisma triangular', imagem: 'img/solidos/prisma-triangular.gif' },

  // Figuras planas
  { nome: 'Quadrado', figura: 'Quadrado', imagem: 'img/planas/quadrado.svg' },
  { nome: 'Retângulo', figura: 'Retângulo', imagem: 'img/planas/retangulo.svg' },
  { nome: 'Triângulo', figura: 'Triângulo', imagem: 'img/planas/triangulo.svg' },
  { nome: 'Círculo', figura: 'Círculo', imagem: 'img/planas/circulo.svg' },
  { nome: 'Hexágono', figura: 'Hexágono', imagem: 'img/planas/hexagono.svg' },
  { nome: 'Losango', figura: 'Losango', imagem: 'img/planas/losango.svg' },

  // Objetos do dia a dia (sólidos)
  { nome: 'Dado', figura: 'Cubo', imagem: 'img/objetos/dado.gif' },
  { nome: 'Caixa de leite', figura: 'Paralelepípedo', imagem: 'img/objetos/caixa-de-leite.gif' },
  { nome: 'Tijolo', figura: 'Paralelepípedo', imagem: 'img/objetos/tijolo.gif' },
  { nome: 'Lata', figura: 'Cilindro', imagem: 'img/objetos/lata.gif' },
  { nome: 'Chapéu de festa', figura: 'Cone', imagem: 'img/objetos/chapeu-de-festa.gif' },
  { nome: 'Bola', figura: 'Esfera', imagem: 'img/objetos/bola.gif' },
  { nome: 'Laranja', figura: 'Esfera', imagem: 'img/objetos/laranja.gif' },
  { nome: 'Barraca', figura: 'Prisma triangular', imagem: 'img/objetos/barraca.gif' },
  { nome: 'Pirâmide do Egito', figura: 'Pirâmide', imagem: 'img/objetos/piramide-do-egito.gif' },

  // Objetos do dia a dia (figuras planas)
  { nome: 'Relógio', figura: 'Círculo', imagem: 'img/objetos-planos/relogio.svg' },
  { nome: 'Janela', figura: 'Retângulo', imagem: 'img/objetos-planos/janela.svg' },
  { nome: 'Placa de atenção', figura: 'Triângulo', imagem: 'img/objetos-planos/placa-atencao.svg' },
];