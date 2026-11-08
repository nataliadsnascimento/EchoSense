
interface Props {
    onNext: () => void;
}

export function SplashScreenDesktop({ onNext }: Props) {
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-[#4A2E7A] via-[#2A1847] to-[#140C24] flex items-center justify-center p-12 font-sans text-white relative overflow-hidden">

            {/* Contêiner principal limitando a largura para telas muito grandes */}
            <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-16 z-10">

                {/* Coluna da Esquerda: Textos e Cartões */}
                <div className="flex-1 flex flex-col justify-center max-w-xl">
                    {/* Cabeçalho / Badges */}
                    <div className="flex items-center gap-4 mb-8">
                        <img src="src/assets/som.png" alt="EchoSense Logo" className="w-12 h-12 object-contain" />
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#cb19a5] animate-pulse"></span>
                            <span className="text-sm font-bold tracking-wide">Alerta</span>
                        </div>
                    </div>

                    {/* Título Principal */}
                    <h1 className="text-5xl font-bold tracking-tight leading-tight mb-4">
                        Sons que viram alerta.
                    </h1>
                    <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-md">
                        Tecnologia que transforma sons importantes em alertas visuais e de luz, trazendo mais autonomia para o seu dia a dia.
                    </p>

                    {/* Cartões Explicativos */}
                    <div className="flex flex-col gap-4">
                        <div className="bg-white text-gray-900 rounded-3xl p-5 shadow-xl flex flex-col gap-2 relative transform transition-transform hover:-translate-y-1">
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-base">Como funciona</span>
                                <span className="bg-[#EAE4F2] text-[#4A2E7A] text-xs font-bold px-3 py-1 rounded-full">Ativo</span>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                O aplicativo escuta sons vitais do ambiente (como campainhas, choros de bebê ou alarmes) e os converte instantaneamente em notificações visuais na sua tela.
                            </p>
                        </div>

                        {/* 👇 Transformámos a div num button e adicionámos o onClick={onNext} 👇 */}
                        <button
                            onClick={onNext}
                            className="w-full text-left bg-white text-gray-900 rounded-3xl p-5 shadow-xl flex items-center justify-between transform transition-all hover:-translate-y-1 hover:shadow-2xl hover:bg-gray-50 active:scale-[0.98] cursor-pointer"
                        >
                            <div>
                                <span className="font-bold text-sm block mb-1">Sons em destaque</span>
                                <span className="text-xs text-gray-600 block">Campainha, choro de bebê, alarme de incêndio, telefone, etc.</span>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-[#4A2E7A] flex items-center justify-center text-white shrink-0 shadow-md ml-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Coluna da Direita: Ícone em Destaque */}
                <div className="flex-1 flex justify-center items-center">
                    <img
                        src="src/assets/icon.png"
                        alt="Logo EchoSense"
                        className="w-full max-w-[420px] aspect-square object-contain rounded-[48px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-8 border-white/5"
                    />
                </div>

            </div>
        </div>
    );
}