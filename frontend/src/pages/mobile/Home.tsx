
import { useState } from 'react';
import type { SoundItem } from './DetectedSounds';

interface HomeProps {
    userName?: string;
    onOpenSidebar: () => void;
    onNavigateToDetect: () => void;
    monitoramentoAtivo: boolean;
    onAlternarMonitoramento: () => void;
    sonsDetectados: SoundItem[];
    erroMonitoramento?: string | null;
}

export function Home({
    userName = 'Usuário',
    onOpenSidebar,
    onNavigateToDetect,
    monitoramentoAtivo,
    onAlternarMonitoramento,
    sonsDetectados,
    erroMonitoramento
}: HomeProps) {

    const [environment, setEnvironment] =
        useState<'casa' | 'trabalho'>('casa');

    // Mostra até quatro resultados recentes da IA.
    const ultimosSons = sonsDetectados.slice(0, 4);

    return (
        <div className="flex-1 bg-[#F8F7FA] flex flex-col font-sans p-4 pb-20 overflow-y-auto">

            {/* Cabeçalho */}
            <div className="flex items-center justify-between mb-4 mt-2">
                <button
                    onClick={onOpenSidebar}
                    className="p-1 text-gray-700 hover:text-[#5D4A88]"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>

                <h1 className="text-lg font-bold text-[#5D4A88]">
                    EchoSense
                </h1>

                <div className="w-6" />
            </div>

            {/* Saudação */}
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-[#5D4A88] font-bold">
                    👤
                </div>

                <div>
                    <span className="text-[10px] text-gray-400 font-semibold block uppercase">
                        Olá,
                    </span>

                    <h2 className="text-base font-bold text-gray-800">
                        {userName}! 👋
                    </h2>
                </div>
            </div>

            {/* Ambiente atual */}
            <div className="bg-white rounded-[20px] p-3.5 shadow-sm border border-gray-100 mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-[#5D4A88]">
                        {environment === 'casa' ? '🏠' : '💼'}
                    </div>

                    <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase">
                            Ambiente atual
                        </span>

                        <p className="text-xs font-bold text-gray-800 capitalize">
                            {environment === 'casa' ? 'Casa' : 'Trabalho'}
                        </p>
                    </div>
                </div>

                <button
                    onClick={() =>
                        setEnvironment(
                            environment === 'casa' ? 'trabalho' : 'casa'
                        )
                    }
                    className="text-xs font-bold text-[#5D4A88] hover:underline"
                >
                    Trocar ambiente ›
                </button>
            </div>

            {/* Monitoramento conectado ao YAMNet */}
            <div className="bg-white rounded-[24px] p-4 shadow-sm border border-gray-100 mb-3">

                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="text-xs font-bold text-gray-800">
                            Monitoramento de sons
                        </h3>

                        <p className="text-[10px] text-gray-400">
                            Detecção de sons pelo microfone.
                        </p>
                    </div>

                    <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                            monitoramentoAtivo
                                ? 'bg-green-100 text-green-700'
                                : 'bg-amber-100 text-amber-700'
                        }`}
                    >
                        <span
                            className={`w-1.5 h-1.5 rounded-full ${
                                monitoramentoAtivo
                                    ? 'bg-green-500'
                                    : 'bg-amber-500'
                            }`}
                        />

                        {monitoramentoAtivo ? 'Ativo' : 'Pausado'}
                    </span>
                </div>

                {!monitoramentoAtivo && (
                    <p className="text-[10px] text-gray-400 mb-3">
                        O microfone está desligado. Inicie a escuta
                        para identificar os sons do ambiente.
                    </p>
                )}

                {erroMonitoramento && (
                    <p
                        role="alert"
                        className="text-xs text-red-600 mb-3"
                    >
                        {erroMonitoramento}
                    </p>
                )}

                <button
                    type="button"
                    onClick={onAlternarMonitoramento}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs border ${
                        monitoramentoAtivo
                            ? 'bg-purple-50 border-purple-200 text-[#5D4A88]'
                            : 'bg-[#5D4A88] text-white border-transparent'
                    }`}
                >
                    {monitoramentoAtivo
                        ? '⏸ Pausar monitoramento'
                        : '▶ Retomar monitoramento'}
                </button>
            </div>

            {/* Resultados reais da IA */}
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-gray-800">
                    Últimos sons detectados
                </h3>

                <button
                    onClick={onNavigateToDetect}
                    className="text-[10px] font-bold text-[#5D4A88]"
                >
                    Ver todos
                </button>
            </div>

            <div className="flex flex-col gap-2">

                {ultimosSons.length === 0 ? (
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
                        <p className="text-xs text-gray-500">
                            Nenhum som detectado ainda.
                        </p>
                    </div>
                ) : (
                    ultimosSons.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex items-center gap-3"
                        >
                            <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-[#5D4A88]">
                                {item.icon}
                            </div>

                            <div>
                                <h4 className="text-xs font-bold text-gray-800">
                                    {item.name}
                                </h4>

                                <span className="text-[10px] text-gray-400">
                                    Confiança: {item.confidence} | {item.time}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
