import React from 'react';

export function SplashScreen() {
    return (
        <div className="h-full bg-gradient-to-b from-[#4A2E7A] via-[#2A1847] to-[#140C24] flex flex-col justify-between p-5 text-white font-sans max-w-md mx-auto relative overflow-hidden">
            {/* Cabeçalho Topo */}
            <div className="flex justify-between items-center z-10 mt-1">
                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-[#cb19a5] animate-pulse"></span>
                    <span className="text-xs font-medium tracking-wide">Alerta</span>
                </div>
                <img src="src/assets/som.png" alt="EchoSense Logo" className="w-10 h-10 object-contain" />
            </div>

            {/* Seção Central (Logo e Textos) */}
            <div className="my-auto text-left z-10 flex flex-col justify-center">
                <div className="w-full flex justify-center mb-8">
                    <img
                        src="src/assets/icon.png"
                        alt="Logo EchoSense"
                        // Aqui está a principal mudança: tamanho fixo quadrado para não distorcer
                        className="w-56 h-56 object-contain rounded-[32px] shadow-2xl border-4 border-white/5"
                    />
                </div>

                <h1 className="text-3xl font-bold tracking-tight">
                    Sons que viram alerta.
                </h1>
                <p className="text-gray-300 text-sm leading-relaxed max-w-[280px] mt-3">
                    Tecnologia que transforma sons importantes em alertas visuais e luz.
                </p>
            </div>

            {/* Seção Inferior (Cartões explicativos) */}
            <div className="flex flex-col gap-2 z-10 mb-1">
                <div className="bg-white text-gray-900 rounded-2xl p-3 shadow-lg flex flex-col gap-1 relative">
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-sm">Como funciona</span>
                        <span className="bg-[#EAE4F2] text-[#4A2E7A] text-[10px] font-bold px-2 py-0.5 rounded-full">Ativo</span>
                    </div>
                    <p className="text-[11px] text-gray-600 leading-normal mt-0.5">
                        O app escuta sons importantes, como campainha, choro de bebê ou alarme, e converte cada evento em alertas visuais e sinais de luz.
                    </p>
                </div>

                <div className="bg-white text-gray-900 rounded-2xl p-3 shadow-lg flex items-center justify-between">
                    <div>
                        <span className="font-bold text-xs block">Sons importantes em destaque</span>
                        <span className="text-[10px] text-gray-600 mt-0.5 block">Campainha, choro de bebê, alarme, etc.</span>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-[#4A2E7A] flex items-center justify-center text-white shrink-0 shadow-sm ml-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}