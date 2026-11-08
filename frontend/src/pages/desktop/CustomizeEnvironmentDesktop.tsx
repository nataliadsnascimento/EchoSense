import logoIcon from '../../assets/som.png';

interface Props {
    ambienteEscolhido: string;
    nomePersonalizado?: string;
    onFinish: () => void;
}

export function CustomizeEnvironmentDesktop({ ambienteEscolhido, nomePersonalizado, onFinish }: Props) {

    // Traduz o ID do ambiente para um título bonito
    const obterNomeAmbiente = () => {
        if (ambienteEscolhido === 'trabalho') return 'Trabalho';
        if (ambienteEscolhido === 'casa') return 'Em Casa';
        if (ambienteEscolhido === 'rua') return 'Na Rua';
        if (ambienteEscolhido === 'outro') return nomePersonalizado ? `Outro: ${nomePersonalizado}` : 'Ambiente Personalizado';
        return 'Trabalho';
    };

    // Descrições dinâmicas baseadas na escolha
    const obterDescricaoSons = () => {
        if (ambienteEscolhido === 'trabalho') return '3 sons selecionados: Alarme de incêndio, Telefone toscando e Impressora concluída.';
        if (ambienteEscolhido === 'casa') return '3 sons selecionados: Campainha da porta, Choro de bebê e Apito da panela de pressão.';
        if (ambienteEscolhido === 'rua') return '2 sons selecionados: Buzina de carro e Sirene de emergência.';
        return 'Sons personalizados selecionados para o seu monitoramento.';
    };

    return (
        <div className="h-screen w-full flex font-sans overflow-hidden">

            {/* === COLUNA ESQUERDA (Painel Roxo Fixo) === */}
            <div className="w-[45%] lg:w-[40%] bg-[#4A2E7A] h-full p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden text-white">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-1/2 left-0 w-48 h-48 bg-[#cb19a5]/10 rounded-full blur-3xl -translate-x-1/2"></div>

                <div className="flex items-center gap-3 relative z-10">
                    <div className="bg-white p-2 rounded-xl">
                        <img src={logoIcon} alt="Logo" className="w-6 h-6 object-contain" />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg leading-none tracking-wide">EchoSense</h1>
                        <span className="text-[11px] text-purple-200">Sons que viram alerta</span>
                    </div>
                </div>

                <div className="flex-1 flex justify-center items-center relative z-10">
                    <svg width="280" height="280" viewBox="0 0 200 200" className="opacity-80">
                        <g fill="white">
                            {[4, 12, 24, 40, 60, 80, 100, 120, 100, 80, 60, 40, 24, 12, 4].map((height, i) => (
                                <rect key={i} x={10 + i * 12} y={100 - height / 2} width="6" height={height} rx="3" fillOpacity={0.2 + (height/120)*0.8} />
                            ))}
                        </g>
                    </svg>
                </div>

                <div className="relative z-10">
                    <h2 className="text-4xl font-bold mb-4 leading-tight">Ambiente configurado!</h2>
                    <p className="text-base text-purple-200 mb-8 max-w-sm leading-relaxed">
                        Tecnologia que transforma sons importantes em alertas visuais e luz para sua segurança.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-purple-300">
                        <span className="w-2 h-2 bg-white rounded-full"></span>
                        Mais autonomia. Mais segurança.
                    </div>
                </div>
            </div>

            {/* === COLUNA DIREITA (Sucesso Dinâmico) === */}
            <div className="flex-1 bg-white h-full flex flex-col items-center justify-center px-16 lg:px-32 relative text-center">

                <div className="mb-6">
                    <h2 className="text-4xl font-bold text-[#4A2E7A] mb-2">Ambiente configurado!</h2>
                    <p className="text-gray-500 text-base">Seu perfil de monitoramento está pronto para começar.</p>
                </div>

                {/* Ícone de Sucesso Verde */}
                <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-emerald-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                {/* Nome do ambiente escolhido aparece aqui */}
                <h3 className="text-2xl font-bold text-[#4A2E7A] mb-2">{obterNomeAmbiente()}</h3>
                <p className="text-gray-500 text-sm max-w-sm mb-12 leading-relaxed">
                    {obterDescricaoSons()}
                </p>

                <div className="max-w-md mx-auto w-full">
                    <button
                        onClick={onFinish}
                        className="w-full bg-[#4A2E7A] hover:bg-[#382360] transition-colors text-white py-4 rounded-xl font-bold text-base shadow-lg cursor-pointer"
                    >
                        Ir para o painel
                    </button>
                </div>
            </div>
        </div>
    );
}