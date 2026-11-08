
import * as tf from "@tensorflow/tfjs";

let promessaModelo = null;

export async function carregarYamnet() {
  if (!promessaModelo) {
    promessaModelo = tf.loadGraphModel(
      "/models/yamnet/model.json"
    ).catch((erro) => {
      promessaModelo = null;
      throw erro;
    });
  }

  return promessaModelo;
}

export async function testarInferenciaYamnet(amostras) {
  if (!(amostras instanceof Float32Array) ||
      amostras.length < 15600) {
    throw new Error("Áudio inválido ou muito curto.");
  }

  const modelo = await carregarYamnet();


  const audioTensor = tf.tensor1d(amostras, "float32");

  let saidas = [];

  try {

    const resultado = await modelo.executeAsync({
      waveform: audioTensor
    });

    saidas = Array.isArray(resultado)
      ? resultado
      : [resultado];

    return saidas.map((saida) => ({
      formato: saida.shape,
      tipo: saida.dtype
    }));

  } finally {
    audioTensor.dispose();
    saidas.forEach((saida) => saida.dispose());
  }
}
