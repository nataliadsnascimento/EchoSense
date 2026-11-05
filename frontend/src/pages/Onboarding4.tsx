import React from 'react';
import onboarding4Img from '../assets/onboarding4.png';
import logoIcon from '../assets/som.png';

interface Props { onFinish: () => void; onSkip: () => void; }

export function Onboarding4({ onFinish, onSkip }: Props) {
    return (
        <div className="h-full bg-[#F8F7FA] flex flex-col font-sans max-w-md mx-auto relative overflow-hidden">
            <div className="h-4 bg-[#5D4A88] w-full"></div>
            <div className="flex-1 flex flex-col justify-between p-5">
                <div className="flex justify-between items-center mt-2">
                    <button className="w-10 h-10 flex items-center justify-center text-[#5D4A88]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /></svg>
                    </button>
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 p-2">
                        <img src={logoIcon} alt="Ícone EchoSense" className="w-full h-full object-contain" />
                    </div>
                </div>
                <div className="bg-white rounded-[32px] p-5 shadow-sm flex flex-col items-center text-center mt-4">
                    <h2 className="text-[20px] font-bold text-[#5D4A88] mb-2 leading-tight">
                        Funciona online<br />e offline
                    </h2>
                    <p className="text-gray-500 text-xs mb-4 leading-relaxed px-2">
                        Os eventos são salvos mesmo sem internet e sincronizados assim que a conexão for restabelecida.
                    </p>
                    <img src={onboarding4Img} alt="Ilustração de Nuvem Offline" className="w-full max-h-[160px] object-contain" />
                </div>
                <div className="flex flex-col items-center mt-auto pt-4">
                    <button onClick={onFinish} className="w-full bg-[#5D4A88] hover:bg-[#4A2E7A] transition-colors text-white py-3 rounded-xl font-bold text-sm mb-2 shadow-md">
                        Começar
                    </button>
                    <button onClick={onSkip} className="text-[#5D4A88] font-bold text-sm py-2">
                        Pular
                    </button>
                </div>
            </div>
        </div>
    );
}
