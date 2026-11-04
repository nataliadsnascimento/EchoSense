
import { capturarAudioProcessado } from "./capturaAudio.js";
import { classificarAudio } from "./classificacaoAudio.js";
import { pararMicrofone } from "./microfone.js";

let monitorando = false;
let tarefaAtual = null;

export function iniciarMonitoramento(
  aoDetectar,
  aoErro = console.error
) {
  if (monitorando || tarefaAtual) {
    return;
  }

  monitorando = true;

  tarefaAtual = (async () => {
    try {
      while (monitorando) {

        const audio = await capturarAudioProcessado(
          2000,
          true
        );

        if (!monitorando) break;

        const resultados = await classificarAudio(audio);

        if (monitorando) {
          aoDetectar(resultados);
        }
      }
    } catch (erro) {
      aoErro(erro);
    } finally {
      monitorando = false;
      pararMicrofone();
      tarefaAtual = null;
    }
  })();
}

export async function pararMonitoramento() {
  monitorando = false;

  if (tarefaAtual) {
    await tarefaAtual;
  }
}

export function monitoramentoAtivo() {
  return monitorando;
}
