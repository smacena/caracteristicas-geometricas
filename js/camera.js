import { HandLandmarker, FilesetResolver } from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/vision_bundle.mjs';

const SUAVIZACAO = 0.3; // 0.2 = mais suave e lento; 0.5 = mais rápido e trêmulo

// Qualquer elemento com data-dwell="<ms>" pode ser acionado segurando o círculo sobre ele.
// O acionamento é um clique comum, então toque, mouse e câmera usam o mesmo código.
export async function iniciarCamera() {
  const video = document.getElementById('video');
  const cursor = document.getElementById('cursor');

  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: 'user', width: 640, height: 480 },
    audio: false,
  });
  video.srcObject = stream;
  await video.play();

  const fileset = await FilesetResolver.forVisionTasks(
    'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm'
  );
  const detector = await HandLandmarker.createFromOptions(fileset, {
    baseOptions: {
      modelAssetPath:
        'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
    },
    runningMode: 'VIDEO',
    numHands: 1,
  });

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let chaveAtual = null;
  let desde = 0;
  let acionado = false;
  let ultimoTempoVideo = -1;

  function quadro() {
    if (video.currentTime !== ultimoTempoVideo) {
      ultimoTempoVideo = video.currentTime;
      const resultado = detector.detectForVideo(video, performance.now());
      const mao = resultado.landmarks[0];

      if (mao) {
        const ponta = mao[8]; // ponta do indicador
        x += ((1 - ponta.x) * window.innerWidth - x) * SUAVIZACAO; // espelhado
        y += (ponta.y * window.innerHeight - y) * SUAVIZACAO;

        cursor.style.display = 'block';
        cursor.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;

        const el = document.elementFromPoint(x, y);
        const alvo = el && el.closest('[data-dwell]');
        const chave = alvo ? (alvo.dataset.chave || alvo.id) : null;

        if (chave !== chaveAtual) {
          chaveAtual = chave;
          desde = performance.now();
          acionado = false;
        }

        let progresso = 0;
        if (alvo && !acionado) {
          progresso = (performance.now() - desde) / Number(alvo.dataset.dwell);
          if (progresso >= 1) {
            acionado = true; // para acionar de novo, é preciso sair e voltar
            progresso = 0;
            alvo.click();
          }
        }
        cursor.style.setProperty('--p', `${progresso * 360}deg`);
      } else {
        cursor.style.display = 'none';
        chaveAtual = null;
      }
    }
    requestAnimationFrame(quadro);
  }
  quadro();
}