
const TAXA_YAMNET = 16000;

export async function prepararAudioParaYamnet(audioBuffer) {
  if (!(audioBuffer instanceof AudioBuffer) ||
      audioBuffer.length === 0) {
    throw new Error("Áudio inválido para processamento.");
  }

  const quantidadeAmostras = Math.round(
    audioBuffer.duration * TAXA_YAMNET
  );

  if (quantidadeAmostras === 0) {
    throw new Error("O áudio está muito curto.");
  }

  const contexto = new OfflineAudioContext(
    1,
    quantidadeAmostras,
    TAXA_YAMNET
  );

  const fonte = contexto.createBufferSource();
  fonte.buffer = audioBuffer;
  fonte.connect(contexto.destination);
  fonte.start(0);

  const audioProcessado = await contexto.startRendering();

  return audioProcessado.getChannelData(0);
}
