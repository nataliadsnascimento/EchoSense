import React from 'react';
import onboarding2Img from '../assets/onboarding2.png';
import logoIcon from '../assets/som.png';

interface Props { onNext: () => void; onSkip: () => void; }

export function Onboarding2({ onNext, onSkip }: Props) {
    return (
        <div className="h-full bg-[#F8F7FA] flex flex-col font-sans max-w-md mx-auto relative overflow-hidden">
            <div className="h-4 bg-[#5D4A88] w-full"></div>
            <div className="flex-1 flex flex-col justify-between p-5">
                <div className="flex justify-between items-center mt-2">
                    <div></div>
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 p-2">
                        <img src={logoIcon} alt="Ícone EchoSense" className="w-full h-full object-contain" />
                    </div>
                </div>
                <div className="bg-white rounded-[32px] p-5 shadow-sm flex flex-col items-center text-center mt-4">
                    <h2 className="text-[20px] font-bold text-[#5D4A88] mb-2 leading-tight">
                        Detecção inteligente<br />com IA
                    </h2>
                    <p className="text-gray-500 text-xs mb-4 leading-relaxed px-2">
                        Utilizamos o modelo YAMNet para identificar sons como campainha, alarme, choro de bebê e muito mais.
                    </p>
                    <img src={onboarding2Img} alt="Ilustração de Inteligência Artificial" className="w-full max-h-[180px] object-contain" />
                </div>
                <div className="flex flex-col items-center mt-auto pt-4">
                    <div className="flex gap-2 mb-4">
                        <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                        <span className="w-2 h-2 rounded-full bg-[#5D4A88]"></span>
                        <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                    </div>
                    <button onClick={onNext} className="w-full bg-[#5D4A88] hover:bg-[#4A2E7A] transition-colors text-white py-3 rounded-xl font-bold text-sm mb-2 shadow-md">
                        Próximo
                    </button>
                    <button onClick={onSkip} className="text-[#5D4A88] font-bold text-sm py-2">
                        Pular
                    </button>
                </div>
            </div>
        </div>
    );
}