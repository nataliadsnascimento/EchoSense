
import * as tf from "@tensorflow/tfjs";
import { carregarYamnet } from "./yamnet.js";

let promessaClasses = null;

async function carregarClasses() {
  if (!promessaClasses) {
    promessaClasses = (async () => {
      const resposta = await fetch(
        "/models/yamnet/yamnet_class_map.csv"
      );

      if (!resposta.ok) {
        throw new Error("Erro ao carregar os nomes dos sons.");
      }

      const csv = await resposta.text();
      const classes = new Array(521);

      const linhas = csv.trim().split(/\r?\n/).slice(1);

      for (const linha of linhas) {
        const partes = linha.match(/^(\d+),[^,]*,(.*)$/);

        if (!partes) {
          throw new Error("Linha inválida no CSV.");
        }

        const indice = Number(partes[1]);
        const nome = partes[2]
          .trim()
          .replace(/^"|"$/g, "")
          .replace(/""/g, '"');

        classes[indice] = nome;
      }

      if (classes.filter(Boolean).length !== 521) {
        throw new Error("Lista de sons incompleta.");
      }

      return classes;
    })().catch((erro) => {
      promessaClasses = null;
      throw erro;
    });
  }

  return promessaClasses;
}

export async function classificarAudio(amostras) {
  if (!(amostras instanceof Float32Array) ||
      amostras.length < 15600) {
    throw new Error("Áudio inválido ou muito curto.");
  }

  const modelo = await carregarYamnet();
  const classes = await carregarClasses();

  const pontuacoes = tf.tidy(() => {
    const entrada = tf.tensor1d(amostras, "float32");

    const saidas = modelo.execute({
      waveform: entrada
    });

    const scores = Array.isArray(saidas)
      ? saidas[0]
      : saidas;

    if (scores.shape[1] !== 521) {
      throw new Error("Saída inesperada do YAMNet.");
    }

    const medias = scores.mean(0);

    return Array.from(medias.dataSync());
  });

  const resultados = pontuacoes.map((pontuacao, indice) => ({
    classe: classes[indice],
    pontuacao: Number(pontuacao.toFixed(4)),
    indice
  }));

  resultados.sort((a, b) => b.pontuacao - a.pontuacao);

  return resultados.slice(0, 5);
}
