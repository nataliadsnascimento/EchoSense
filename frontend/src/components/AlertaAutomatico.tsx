
import { useEffect, useRef } from 'react';

import type { ResultadoSom } from '../hooks/useMonitoramentoAudio.js';

import {
    prepararLanterna,
    dispararAlertaCelular,
    desligarAlertasCelular
} from '../services/alertasCelular';

interface Props {
    ativo: boolean;
    resultados: ResultadoSom[];
    mostrarControles?: boolean;
    onDetection?: (novoSom: any) => void;
}

const CONFIANCA_MINIMA = 0.50;
const INTERVALO_ALERTAS = 12000;

export function AlertaAutomatico({
    ativo,
    resultados,
    onDetection
}: Props) {

    const ultimoAlerta = useRef(0);
    const resultadosAnteriores = useRef(resultados);

    useEffect(() => {
        let cancelado = false;

        if (ativo) {
            void prepararLanterna().then((disponivel) => {
                if (cancelado && disponivel) {
                    void desligarAlertasCelular();
                }
            });
        } else {
            void desligarAlertasCelular();
            ultimoAlerta.current = 0;
            resultadosAnteriores.current = resultados;
        }

        return () => {
            cancelado = true;
        };
    }, [ativo]);

    useEffect(() => {
        if (!ativo) return;

        if (resultadosAnteriores.current === resultados) {
            return;
        }

        resultadosAnteriores.current = resultados;

        const principal = resultados[0];

        if (!principal) return;

        if (principal.pontuacao < CONFIANCA_MINIMA) {
            return;
        }

        const agora = Date.now();
        if (
            agora - ultimoAlerta.current <
            INTERVALO_ALERTAS
        ) {
            return;
        }

        ultimoAlerta.current = agora;

        void dispararAlertaCelular();

        console.log(
            'Alerta acionado:',
            principal.classe,
            principal.pontuacao
        );

        if (onDetection) {
            onDetection({
                id: String(Date.now()),
                name: principal.classe || 'Som detectado',
                confidence: Math.round(principal.pontuacao * 100),
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                date: new Date().toLocaleDateString(),
                isAlarm: principal.pontuacao >= 0.85
            });
        }

    }, [ativo, resultados]);

    useEffect(() => {
        return () => {
            void desligarAlertasCelular();
        };
    }, []);

    return null;
}
