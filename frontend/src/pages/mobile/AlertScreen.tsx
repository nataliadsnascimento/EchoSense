
interface AlertScreenProps {
    soundName?: string;
    confidence?: string;
    time?: string;
    onDismiss: () => void;
    onViewDetails: () => void;
}

export function AlertScreen({
    soundName = "Campainha",
    confidence = "88%",
    time = "10:22:45",
    onDismiss,
    onViewDetails
}: AlertScreenProps) {
    return(
        <div className="flex-1 bg-[#0D0914] text-white flex flex-col justify-between p-5 font-sans h-full">
          {/* Botão Voltar Topo */}
          <div className="flex items-center justify-between mt-2">
            <button onClick={onDismiss} className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
              ‹
            </button>
            <div className="bg-red-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
               Alerta detectado
            </div>
            <div className="w-8" />
          </div>

          {/* Ícone Pulsante */}
          <div className="flex flex-col items-center justify-center my-auto">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-44 h-44 bg-red-600/20 rounded-full animate-ping" />
              <div className="w-36 h-36 bg-red-600/30 rounded-full border border-red-500/40 flex items-center justify-center">
                <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center shadow-xl">
                  <span className="text-4xl">🔔</span>
                </div>
              </div>
            </div>

            <h1 className="text-2xl font-bold mt-6 tracking-tight">{soundName}</h1>
            <p className="text-xs text-gray-400 mt-1 font-mono">
                Confiança: {confidence} • {time}
            </p>
          </div>

          {/* Botão Entendi */}
          <div className="flex flex-col gap-2 mb-2">
            <button
              onClick={onDismiss}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3.5 rounded-xl font-bold text-sm shadow-md"
            >
              Entendi
            </button>
            <button
              onClick={onViewDetails}
              className="w-full py-2 text-xs text-gray-400 text-center font-semibold"
            >
              Ver detalhes
            </button>
          </div>
        </div>
    );
}