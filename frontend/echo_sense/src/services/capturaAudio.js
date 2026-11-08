
import {
  iniciarMicrofone,
  pararMicrofone
} from "./microfone.js";

import {
  prepararAudioParaYamnet
} from "./processamentoAudio.js";

export async function capturarAudioProcessado(
  duracaoMs = 2000,
  manterMicrofoneLigado = false
) {
  const stream = await iniciarMicrofone();

  try {
    if (typeof MediaRecorder === "undefined") {
      throw new Error("Gravação não suportada pelo navegador.");
    }

    const gravador = new MediaRecorder(stream);
    const partes = [];

    const audioBlob = await new Promise((resolve, reject) => {
      gravador.ondataavailable = (evento) => {
        if (evento.data.size > 0) {
          partes.push(evento.data);
        }
      };

      gravador.onerror = (evento) => {
        reject(evento.error || new Error("Erro na gravação."));
      };

      gravador.onstop = () => {
        if (partes.length === 0) {
          reject(new Error("Nenhum áudio foi capturado."));
          return;
        }

        resolve(new Blob(partes, { type: gravador.mimeType }));
      };

      gravador.start();

      setTimeout(() => {
        if (gravador.state === "recording") {
          gravador.stop();
        }
      }, duracaoMs);
    });

    const contexto = new AudioContext();

    try {
      const dados = await audioBlob.arrayBuffer();
      const audioBuffer = await contexto.decodeAudioData(dados);

      return await prepararAudioParaYamnet(audioBuffer);
    } finally {
      await contexto.close();
    }
  } finally {
    if (!manterMicrofoneLigado) {
      pararMicrofone();
    }
  }
}