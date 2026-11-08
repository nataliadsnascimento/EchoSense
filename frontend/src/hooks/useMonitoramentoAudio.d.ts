export interface ResultadoSom {
  classe: string;
  pontuacao: number;
  indice: number;
}

export interface MonitoramentoAudio {
  ativo: boolean;
  resultados: ResultadoSom[];
  erro: string | null;
  iniciar: () => void;
  parar: () => Promise<void>;
}

export function useMonitoramentoAudio(): MonitoramentoAudio;
