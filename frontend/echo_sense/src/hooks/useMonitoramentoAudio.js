
import { useState, useEffect, useCallback, useRef } from "react";

import {
  iniciarMonitoramento,
  pararMonitoramento,
  monitoramentoAtivo
} from "../services/monitoramento.js";

export function useMonitoramentoAudio() {
  const [ativo, setAtivo] = useState(false);
  const [resultados, setResultados] = useState([]);
  const [erro, setErro] = useState(null);

  const montado = useRef(false);

  useEffect(() => {
    montado.current = true;

    return () => {
      montado.current = false;
      void pararMonitoramento();
    };
  }, []);

  const iniciar = useCallback(() => {
    if (monitoramentoAtivo()) {
      setAtivo(true);
      return;
    }

    setErro(null);

    iniciarMonitoramento(
      (novosResultados) => {
        if (montado.current) {
          setResultados(novosResultados);
        }
      },
      (falha) => {
        if (montado.current) {
          setErro(
            falha instanceof Error
              ? falha.message
              : String(falha)
          );
          setAtivo(false);
        }
      }
    );

    setAtivo(monitoramentoAtivo());
  }, []);

  const parar = useCallback(async () => {
    await pararMonitoramento();

    if (montado.current) {
      setAtivo(false);
    }
  }, []);

  return {
    ativo,
    resultados,
    erro,
    iniciar,
    parar
  };
}
