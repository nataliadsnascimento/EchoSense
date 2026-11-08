
import { createRoot } from "react-dom/client";
import { useMonitoramentoAudio } from "../hooks/useMonitoramentoAudio.js";

function TesteMonitoramento() {
  const {
    ativo,
    resultados,
    erro,
    iniciar,
    parar
  } = useMonitoramentoAudio();

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>EchoSense - Teste da IA</h1>

      <p>
        Status: {ativo ? "Monitorando sons" : "Desligado"}
      </p>

      <button onClick={iniciar} disabled={ativo}>
        Iniciar monitoramento
      </button>

      <button onClick={() => void parar()} disabled={!ativo}>
        Parar monitoramento
      </button>

      {erro && <p style={{ color: "red" }}>Erro: {erro}</p>}

      <h2>Sons identificados:</h2>

      {resultados.length === 0 && (
        <p>Nenhum resultado disponível.</p>
      )}

      <ul>
        {resultados.map((resultado) => (
          <li key={resultado.indice}>
            {resultado.classe} - Pontuação:{" "}
            {resultado.pontuacao.toFixed(4)}
          </li>
        ))}
      </ul>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <TesteMonitoramento />
);
