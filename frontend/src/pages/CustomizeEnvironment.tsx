import React, { useState } from 'react';
import logoIcon from '../assets/som.png';

interface Props {
    onFinish: () => void;
}

export function CustomizeEnvironment({ onFinish }: Props) {
    const [sounds, setSounds] = useState({
        alarmeIncendio: true,
        telefoneTocando: true,
        impressoraConcluida: true,
        mensagemRecebida: false,
        maquinaCafe: false,
        outroSom: false,
    });

    const toggleSound = (key: keyof typeof sounds) => {
        setSounds(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="h-full bg-[#F8F7FA] flex flex-col justify-between font-sans relative overflow-hidden p-5">
            <div className="absolute top-0 left-0 right-0 h-4 bg-[#5D4A88]"></div>

            {/* Cabeçalho */}
            <div className="flex justify-between items-center mt-3 z-10">
                <div></div>
                <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 p-1.5">
                    <img src={logoIcon} alt="Ícone EchoSense" className="w-full h-full object-contain" />
                </div>
            </div>

            {/* Conteúdo Central */}
            <div className="flex flex-col items-center my-auto z-10 w-full">
                <div className="text-center mb-4">
                    <h2 className="text-[20px] font-bold text-[#5D4A88] leading-tight">
                        Personalize seu ambiente
                    </h2>
                    <p className="text-gray-400 text-xs mt-1 max-w-[280px]">
                        Selecione os sons que você deseja monitorar neste ambiente.
                    </p>
                </div>

                <div className="w-full bg-white rounded-[24px] p-4 shadow-sm border border-gray-100">
                    <span className="text-[10px] font-bold text-gray-400 block mb-2 uppercase tracking-wide">
                        Sons recomendados para <strong className="text-[#5D4A88]">Estou no trabalho</strong>
                    </span>

                    <div className="flex flex-col gap-2">
                        {[
                            { key: 'alarmeIncendio', label: 'Alarme de incêndio' },
                            { key: 'telefoneTocando', label: 'Telefone tocando' },
                            { key: 'impressoraConcluida', label: 'Impressora concluída' },
                            { key: 'mensagemRecebida', label: 'Mensagem recebida' },
                            { key: 'maquinaCafe', label: 'Máquina de café pronta' },
                            { key: 'outroSom', label: 'Outro som' },
                        ].map((item) => (
                            <label
                                key={item.key}
                                className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                            >
                                <span className="text-xs font-medium text-gray-700">{item.label}</span>
                                <input
                                    type="checkbox"
                                    checked={sounds[item.key as keyof typeof sounds]}
                                    onChange={() => toggleSound(item.key as keyof typeof sounds)}
                                    className="w-4 h-4 rounded text-[#5D4A88] focus:ring-[#5D4A88] accent-[#5D4A88]"
                                />
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* Botão Inferior */}
            <div className="flex flex-col items-center mb-1 z-10">
                <button
                    onClick={onFinish}
                    className="w-full bg-[#5D4A88] hover:bg-[#4A2E7A] transition-colors text-white py-3.5 rounded-xl font-bold text-sm shadow-md"
                >
                    Continuar
                </button>
            </div>
        </div>
    );
}