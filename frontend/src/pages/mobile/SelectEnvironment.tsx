import React, { useState } from 'react';
import logoIcon from '../../assets/som.png';

interface Props {
    onNext: () => void;
}

export function SelectEnvironment({ onNext }: Props) {
    const [selectedEnv, setSelectedEnv] = useState('casa');

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
            <div className="flex flex-col items-center my-auto z-10">
                <div className="text-center mb-5">
                    <h2 className="text-[20px] font-bold text-[#5D4A88] leading-tight">
                        Em qual ambiente<br />você está?
                    </h2>
                    <p className="text-gray-400 text-xs mt-1.5 max-w-[260px]">
                        Escolha o ambiente para que o EchoSense reconheça os sons mais importantes para você.
                    </p>
                </div>

                {/* Opções de Ambiente */}
                <div className="w-full flex flex-col gap-2.5">
                    <button
                        type="button"
                        onClick={() => setSelectedEnv('casa')}
                        className={`w-full bg-white p-3.5 rounded-2xl border transition-all flex items-center gap-3 shadow-sm ${selectedEnv === 'casa' ? 'border-[#5D4A88] ring-2 ring-[#5D4A88]/20' : 'border-gray-200'}`}
                    >
                        <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-[#5D4A88]">
                            🏠
                        </div>
                        <span className="font-bold text-xs text-[#5D4A88]">Estou em casa</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setSelectedEnv('trabalho')}
                        className={`w-full bg-white p-3.5 rounded-2xl border transition-all flex items-center gap-3 shadow-sm ${selectedEnv === 'trabalho' ? 'border-[#5D4A88] ring-2 ring-[#5D4A88]/20' : 'border-gray-200'}`}
                    >
                        <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-[#5D4A88]">
                            💼
                        </div>
                        <span className="font-bold text-xs text-[#5D4A88]">Estou no trabalho</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setSelectedEnv('outro')}
                        className={`w-full bg-white p-3.5 rounded-2xl border transition-all flex items-center gap-3 shadow-sm ${selectedEnv === 'outro' ? 'border-[#5D4A88] ring-2 ring-[#5D4A88]/20' : 'border-gray-200'}`}
                    >
                        <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-[#5D4A88]">
                            ➕
                        </div>
                        <span className="font-bold text-xs text-[#5D4A88]">Outro ambiente</span>
                    </button>
                </div>
            </div>

            {/* Botão Inferior */}
            <div className="flex flex-col items-center mb-1 z-10">
                <button
                    onClick={onNext}
                    className="w-full bg-[#5D4A88] hover:bg-[#4A2E7A] transition-colors text-white py-3.5 rounded-xl font-bold text-sm shadow-md"
                >
                    Continuar
                </button>
            </div>
        </div>
    );
}