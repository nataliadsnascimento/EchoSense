
export interface SoundItem {
    id: number | string;
    name: string;
    confidence: string;
    time: string;
    icon: string;
}

interface DetectedSoundsProps {
    onBack: () => void;
    onSelectAlert: (alerta: SoundItem) => void;
    soundsList?: SoundItem[];
}

export function DetectedSounds({onBack, onSelectAlert, soundsList = []}: DetectedSoundsProps){

    const displaySounds = soundsList;

    return (
        <div className="flex-1 bg-[#F8F7FA] flex flex-col font-sans p-4 pb-20">
          <div className="flex items-center justify-between mb-4 mt-2">
            <button onClick={onBack} className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 font-bold">
              ‹
            </button>
            <div className="text-center">
              <h1 className="text-sm font-bold text-[#5D4A88]">Sons detectados</h1>
              <span className="text-[10px] text-gray-400">Em tempo real</span>
            </div>
            <div className="w-8" />
          </div>

          <div className="flex flex-col gap-2.5">
            {displaySounds.length === 0 && (
                <p className="text-center text-gray-500 text-sm mt-6">
                    Nenhum som detectado ainda.
                </p>
            )}
            {displaySounds.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectAlert(item)}
                  className="bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer hover:bg-purple-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-[#5D4A88]">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-gray-800">{item.name}</h3>
                      <span className="text-[10px] text-gray-400">Confiança: {item.confidence}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
    );
}