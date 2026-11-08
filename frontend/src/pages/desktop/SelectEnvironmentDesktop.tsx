import { useState } from 'react';
import logoIcon from '../../assets/som.png';


interface Props {
    onNext: (ambiente: string, outroTexto?: string) => void;
}

export function SelectEnvironmentDesktop({ onNext }: Props) {
    // 1. Incluímos o 'outro' nas opções de ambiente
    const [ambienteAtivo, setAmbienteAtivo] = useState<'trabalho' | 'casa' | 'rua' | 'outro'>('trabalho');
    const [nomeOutroAmbiente, setNomeOutroAmbiente] = useState('');

    // 2. Sons específicos para cada ambiente (incluindo o personalizado)
    const recomendacoesPorAmbiente = {
        trabalho: [
            { key: 'alarme', label: 'Alarme de incêndio' },
            { key: 'telefone', label: 'Telefone toscando' },
            { key: 'impressora', label: 'Impressora concluída' },
            { key: 'mensagem', label: 'Mensagem recebida' },
            { key: 'cafe', label: 'Máquina de café pronta' }
        ],
        casa: [
            { key: 'campainha', label: 'Campainha da porta' },
            { key: 'bebe', label: 'Choro de bebê' },
            { key: 'panela', label: 'Apito da panela de pressão' },
            { key: 'microondas', label: 'Aviso do micro-ondas' },
            { key: 'pet', label: 'Latido ou miado de pet' }
        ],
        rua: [
            { key: 'buzina', label: 'Buzina de carro' },
            { key: 'sirene', label: 'Sirene de emergência' },
            { key: 'bicicleta', label: 'Campainha de bicicleta' },
            { key: 'pedestre', label: 'Sinal sonoro de travessia' }
        ],
        outro: [
            { key: 'geral1', label: 'Som de alerta genérico' },
            { key: 'geral2', label: 'Voz ou chamada pelo nome' },
            { key: 'geral3', label: 'Impacto ou barulho forte' }
        ]
    };

    // Estado para guardar os checkboxes selecionados de cada ambiente
    const [selecionados, setSelecionados] = useState<Record<string, Record<string, boolean>>>({
        trabalho: { alarme: true, telefone: true, impressora: true, mensagem: false, cafe: false },
        casa: { campainha: true, bebe: true, panela: true, microondas: false, pet: false },
        rua: { buzina: true, sirene: true, bicicleta: false, pedestre: false },
        outro: { geral1: true, geral2: true, geral3: false }
    });

    const toggleCheckbox = (key: string) => {
        setSelecionados(prev => ({
            ...prev,
            [ambienteAtivo]: {
                ...prev[ambienteAtivo],
                [key]: !prev[ambienteAtivo]?.[key]
            }
        }));
    };

    const itensAtuais = recomendacoesPorAmbiente[ambienteAtivo];
    const estadoAtualAmbiente = selecionados[ambienteAtivo] || {};

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
                    <h2 className="text-4xl font-bold mb-4 leading-tight">Personalize seu ambiente.</h2>
                    <p className="text-base text-purple-200 mb-8 max-w-sm leading-relaxed">
                        Tecnologia que transforma sons importantes em alertas visuais e luz para sua segurança.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-purple-300">
                        <span className="w-2 h-2 bg-white rounded-full"></span>
                        Mais autonomia. Mais segurança.
                    </div>
                </div>
            </div>

            {/* === COLUNA DIREITA (Seleção Dinâmica) === */}
            <div className="flex-1 bg-white h-full flex flex-col justify-center px-16 lg:px-32 relative overflow-y-auto">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-[#4A2E7A] mb-2">Personalize seu ambiente</h2>
                    <p className="text-gray-500 text-sm">Selecione o seu perfil e os sons que deseja monitorar.</p>
                </div>

                {/* BOTÕES PARA TROCAR DE AMBIENTE (Agora com "Outro") */}
                <div className="max-w-md mx-auto w-full grid grid-cols-4 gap-2 mb-4">
                    {[
                        { id: 'trabalho', label: '💼 Trabalho' },
                        { id: 'casa', label: '🏠 Em Casa' },
                        { id: 'rua', label: '🌳 Na Rua' },
                        { id: 'outro', label: '⚙️ Outro' }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setAmbienteAtivo(tab.id as any)}
                            className={`py-2.5 px-2 rounded-xl font-bold text-xs transition-all cursor-pointer truncate ${
                                ambienteAtivo === tab.id
                                    ? 'bg-[#4A2E7A] text-white shadow-md'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Se o utilizador escolheu "Outro", aparece um input para ele digitar o nome do ambiente */}
                {ambienteAtivo === 'outro' && (
                    <div className="max-w-md mx-auto w-full mb-4 animate-fade-in">
                        <input
                            type="text"
                            placeholder="Ex: Na faculdade, No ginásio..."
                            value={nomeOutroAmbiente}
                            onChange={(e) => setNomeOutroAmbiente(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#4A2E7A] focus:ring-1 focus:ring-[#4A2E7A] bg-gray-50"
                        />
                    </div>
                )}

                {/* Caixa de Opções Dinâmica */}
                <div className="max-w-md mx-auto w-full bg-white border border-gray-100 shadow-lg rounded-2xl p-6 mb-6">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Sons recomendados para</span>
                    <h3 className="font-bold text-[#4A2E7A] text-lg mb-4 pb-3 border-b border-gray-100 capitalize">
                        {ambienteAtivo === 'trabalho' && 'Estou no trabalho'}
                        {ambienteAtivo === 'casa' && 'Estou em casa'}
                        {ambienteAtivo === 'rua' && 'Estou na rua'}
                        {ambienteAtivo === 'outro' && (nomeOutroAmbiente ? `No(a) ${nomeOutroAmbiente}` : 'Outro ambiente personalizado')}
                    </h3>

                    <div className="flex flex-col gap-3">
                        {itensAtuais.map((item) => (
                            <label key={item.key} className="flex items-center gap-3 cursor-pointer group select-none">
                                <input
                                    type="checkbox"
                                    checked={!!estadoAtualAmbiente[item.key]}
                                    onChange={() => toggleCheckbox(item.key)}
                                    className="w-5 h-5 rounded border-gray-300 text-[#4A2E7A] focus:ring-[#4A2E7A] cursor-pointer accent-[#4A2E7A]"
                                />
                                <span className="text-sm text-gray-700 font-medium group-hover:text-gray-900">
                                    {item.label}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="max-w-md mx-auto w-full">
                    <button
                        onClick={() => onNext(ambienteAtivo, nomeOutroAmbiente)}
                        className="w-full bg-[#4A2E7A] hover:bg-[#382360] transition-colors text-white py-4 rounded-xl font-bold text-base shadow-lg cursor-pointer"
                    >
                        Continuar
                    </button>
                </div>
            </div>
        </div>
    );
}