import React from 'react';
import onboarding1Img from '../assets/onboarding1.png';
import logoIcon from '../assets/som.png';

interface Props { onNext: () => void; onSkip: () => void; }

export function Onboarding1({ onNext, onSkip }: Props) {
    return (
        <div className="h-full bg-[#F8F7FA] flex flex-col font-sans max-w-md mx-auto relative overflow-hidden">
            <div className="h-4 bg-[#5D4A88] w-full"></div>
            <div className="flex-1 flex flex-col justify-between p-5">
                <div className="flex justify-between items-center mt-2">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 p-2">
                        <img src={logoIcon} alt="Ícone EchoSense" className="w-full h-full object-contain" />
                    </div>
                    <div className="bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 text-[10px] font-bold text-[#5D4A88]">
                        1 de 4
                    </div>
                </div>
                <div className="bg-white rounded-[32px] p-5 shadow-sm flex flex-col items-center text-center mt-4">
                    <h2 className="text-[20px] font-bold text-[#5D4A88] mb-2 leading-tight">
                        Bem-vindo ao<br />EchoSense!
                    </h2>
                    <p className="text-gray-500 text-xs mb-4 leading-relaxed px-2">
                        Nosso objetivo é transformar sons importantes do ambiente em alertas visuais e luminosos para mais segurança e autonomia.
                    </p>
                    <img src={onboarding1Img} alt="Ilustração de boas-vindas" className="w-full max-h-[180px] object-contain" />
                </div>
                <div className="flex flex-col items-center mt-auto pt-4">
                    <div className="flex gap-2 mb-4">
                        <span className="w-2 h-2 rounded-full bg-[#5D4A88]"></span>
                        <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                        <span className="w-2 h-2 rounded-full bg-gray-300"></span>
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