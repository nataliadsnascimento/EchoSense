import { useState } from 'react';
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
        // Alterado para h-screen (altura total) e w-full (largura total) sem margens
        <div className="h-screen w-full flex font-sans overflow-hidden">

            {/* === COLUNA ESQUERDA (Painel Roxo Fixo - Tela Inteira) === */}
            <div className="w-[45%] lg:w-[40%] bg-[#4A2E7A] h-full p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden text-white">
                {/* Elementos decorativos de fundo */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-1/2 left-0 w-48 h-48 bg-[#cb19a5]/10 rounded-full blur-3xl -translate-x-1/2"></div>

                {/* Topo: Logo */}
                <div className="flex items-center gap-3 relative z-10">
                    <div className="bg-white p-2 rounded-xl">
                        <img src={logoIcon} alt="Logo" className="w-6 h-6 object-contain" />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg leading-none tracking-wide">EchoSense</h1>
                        <span className="text-[11px] text-purple-200">Sons que viram alerta</span>
                    </div>
                </div>

                {/* Centro: Onda Sonora */}
                <div className="flex-1 flex justify-center items-center relative z-10">
                    <svg width="280" height="280" viewBox="0 0 200 200" className="opacity-80">
                        <g fill="white" className="transition-all duration-500">
                            {[4, 12, 24, 40, 60, 80, 100, 120, 100, 80, 60, 40, 24, 12, 4].map((height, i) => (
                                <rect key={i} x={10 + i * 12} y={100 - height / 2} width="6" height={height} rx="3" fillOpacity={0.2 + (height/120)*0.8} />
                            ))}
                        </g>
                    </svg>
                </div>

                {/* Base: Textos */}
                <div className="relative z-10">
                    <h2 className="text-4xl font-bold mb-4 leading-tight">Sons que viram alerta.</h2>
                    <p className="text-base text-purple-200 mb-8 max-w-sm leading-relaxed">
                        Tecnologia que transforma sons importantes em alertas visuais e luz para sua segurança.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-purple-300">
                        <span className="w-2 h-2 bg-white rounded-full"></span>
                        Mais autonomia, mais segurança.
                    </div>
                </div>
            </div>

            {/* === COLUNA DIREITA (Conteúdo Dinâmico - Tela Inteira) === */}
            <div className="flex-1 bg-white h-full flex flex-col items-center justify-center p-12 lg:p-20 relative overflow-y-auto">
                <div className="bg-purple-50 text-[#5D4A88] text-xs font-bold px-4 py-2 rounded-full mb-8 uppercase tracking-wider">
                    Passo {step + 1}
                </div>

                <h2 className="text-4xl font-bold text-[#4A2E7A] text-center mb-6 leading-tight max-w-lg">
                    {steps[step].title}
                </h2>

                <p className="text-gray-500 text-base text-center mb-12 max-w-lg leading-relaxed">
                    {steps[step].desc}
                </p>

                <div className="flex-1 flex items-center justify-center w-full mb-12 min-h-[250px]">
                    <img
                        key={step}
                        src={steps[step].img}
                        alt={steps[step].title}
                        className="w-full max-w-[360px] object-contain animate-fade-in drop-shadow-xl"
                    />
                </div>

                {/* Bolinhas de Progresso */}
                <div className="flex gap-3 mb-10">
                    {steps.map((_, i) => (
                        <span
                            key={i}
                            className={`h-2.5 rounded-full transition-all duration-500 ${i === step ? 'w-10 bg-[#4A2E7A]' : 'w-2.5 bg-gray-200'}`}
                        ></span>
                    ))}
                </div>

                {/* Botões */}
                <div className="w-full max-w-sm flex flex-col gap-4">
                    <button
                        onClick={nextStep}
                        className="w-full bg-[#4A2E7A] hover:bg-[#382360] transition-colors text-white py-4 rounded-xl font-bold text-base shadow-lg"
                    >
                        {step === 3 ? 'Começar' : 'Próximo'}
                    </button>

                    {step < 3 && (
                        <button
                            onClick={onFinish}
                            className="w-full text-gray-500 hover:text-[#4A2E7A] py-3 font-bold text-sm transition-colors"
                        >
                            Pular
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}