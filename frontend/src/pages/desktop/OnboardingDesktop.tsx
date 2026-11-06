// src/pages/desktop/OnboardingDesktop.tsx
import React, { useState } from 'react';
import logoIcon from '../../assets/som.png';
import onboarding1Img from '../../assets/onboarding1.png';
import onboarding2Img from '../../assets/onboarding2.png';
import onboarding3Img from '../../assets/onboarding3.png';
import onboarding4Img from '../../assets/onboarding4.png';

interface Props {
    onFinish: () => void;
}

export function OnboardingDesktop({ onFinish }: Props) {
    const [step, setStep] = useState(0);

    const steps = [
        {
            title: "Bem-vindo ao EchoSense!",
            desc: "Nosso objetivo é transformar sons importantes do ambiente em alertas visuais e luminosos para mais segurança e autonomia.",
            img: onboarding1Img
        },
        {
            title: "Detecção inteligente com IA",
            desc: "Utilizamos o modelo YAMNet para identificar sons como campainha, alarme, choro de bebê e muito mais.",
            img: onboarding2Img
        },
        {
            title: "Alertas visuais e luminosos",
            desc: "Ao detectar um som importante, o app emite alertas visuais e aciona o flash/LED do seu smartphone.",
            img: onboarding3Img
        },
        {
            title: "Funciona online e offline",
            desc: "Os eventos são salvos mesmo sem internet e sincronizados assim que a conexão for restabelecida.",
            img: onboarding4Img
        }
    ];

    const nextStep = () => {
        if (step < 3) setStep(step + 1);
        else onFinish();
    };

    return (
        <div className="min-h-screen w-full bg-[#F8F7FA] flex flex-col font-sans relative overflow-hidden">
            {/* Cabeçalho */}
            <header className="w-full bg-white px-8 py-5 shadow-sm flex justify-between items-center z-10">
                <div className="flex items-center gap-3">
                    <img src={logoIcon} alt="EchoSense" className="w-10 h-10 object-contain" />
                    <span className="font-bold text-[#5D4A88] text-xl tracking-tight">EchoSense</span>
                </div>
                <div className="bg-[#F8F7FA] px-4 py-2 rounded-full border border-gray-200 text-sm font-bold text-[#5D4A88]">
                    Passo {step + 1} de 4
                </div>
            </header>

            {/* Conteúdo Principal */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-6xl bg-white rounded-[40px] shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[550px]">

                    {/* Lado Esquerdo: Textos e Botões */}
                    <div className="flex-1 p-12 lg:p-16 flex flex-col justify-center">
                        <h2 className="text-4xl lg:text-5xl font-bold text-[#5D4A88] mb-6 leading-tight">
                            {steps[step].title}
                        </h2>
                        <p className="text-gray-500 text-lg leading-relaxed mb-12 max-w-md">
                            {steps[step].desc}
                        </p>

                        <div className="mt-auto">
                            {/* Bolinhas de Progresso */}
                            <div className="flex gap-3 mb-10">
                                {steps.map((_, i) => (
                                    <span
                                        key={i}
                                        className={`h-2.5 rounded-full transition-all duration-500 ${i === step ? 'w-10 bg-[#5D4A88]' : 'w-2.5 bg-gray-300'}`}
                                    ></span>
                                ))}
                            </div>

                            {/* Botões de Ação */}
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={nextStep}
                                    className="bg-[#5D4A88] hover:bg-[#4A2E7A] transition-colors text-white py-4 px-10 rounded-2xl font-bold text-lg shadow-md"
                                >
                                    {step === 3 ? 'Começar' : 'Próximo'}
                                </button>

                                {/* O botão pular só aparece nos passos 1 a 3 */}
                                {step < 3 && (
                                    <button
                                        onClick={onFinish}
                                        className="text-[#5D4A88] hover:bg-gray-50 py-4 px-8 rounded-2xl font-bold text-lg transition-colors"
                                    >
                                        Pular
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Lado Direito: Imagem com Fundo Decorativo */}
                    <div className="flex-1 bg-gray-50/50 flex items-center justify-center p-12 border-l border-gray-100 relative">
                        <div className="absolute w-[400px] h-[400px] bg-[#5D4A88]/5 rounded-full blur-3xl"></div>
                        <img
                            key={step} // O key força a re-renderização para aplicar transições se adicionares CSS animation
                            src={steps[step].img}
                            alt={steps[step].title}
                            className="w-full max-w-[320px] lg:max-w-[400px] object-contain z-10 drop-shadow-2xl animate-fade-in"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}