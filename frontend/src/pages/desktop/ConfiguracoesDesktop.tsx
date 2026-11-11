
import { useState } from 'react';

import {
    Bell,
    ChevronDown,
    ChevronRight,
    Cloud,
    Flashlight,
    House,
    Monitor,
    UserRound,
    Vibrate
} from 'lucide-react';

import { SidebarDesktop } from '../../components/SidebarDesktop';

interface ConfiguracoesDesktopProps {
    userName?: string;
    userEmail?: string;
    onNavigate?: (pagina: string) => void;
    onLogout?: () => void;
}

type ChaveAlerta =
    | 'flash'
    | 'vibracao'
    | 'piscarTela'
    | 'piscarTelaExtra';

const dispositivos = [
    {
        id: 'flash' as const,
        titulo: 'Flash/LED',
        etiqueta: 'Hardware',
        descricao: 'Piscar o LED do celular sincronizado ao detectar sons',
        Icone: Flashlight
    },
    {
        id: 'vibracao' as const,
        titulo: 'Vibração',
        etiqueta: 'Mobile',
        descricao: 'Vibrar no smartphone ou relógio conectado',
        Icone: Vibrate
    },
    {
        id: 'piscarTela' as const,
        titulo: 'Piscar tela',
        etiqueta: 'Desktop',
        descricao: 'Sinal visual em tela cheia no monitor atual',
        Icone: Monitor
    },
    {
        id: 'piscarTelaExtra' as const,
        titulo: 'Piscar tela',
        etiqueta: 'Desktop',
        descricao: 'Sinal visual em tela cheia no monitor adicional',
        Icone: Monitor
    }
];

interface InterruptorProps {
    ligado: boolean;
    aoAlterar: () => void;
    rotulo: string;
}

function Interruptor({
    ligado,
    aoAlterar,
    rotulo
}: InterruptorProps) {
    return (
        <button
            type="button"
            role="switch"
            aria-label={rotulo}
            aria-checked={ligado}
            onClick={aoAlterar}
            className={`relative h-5 w-9 shrink-0 rounded-full transition-colors cursor-pointer ${
                ligado ? 'bg-[#58449E]' : 'bg-slate-300'
            }`}
        >
            <span
                className={`absolute top-[2px] h-4 w-4 rounded-full bg-white shadow-sm transition-all ${
                    ligado ? 'left-[18px]' : 'left-[2px]'
                }`}
            />
        </button>
    );
}

export function ConfiguracoesDesktop({
    userName = 'Natália',
    userEmail = '',
    onNavigate,
    onLogout
}: ConfiguracoesDesktopProps) {

    // Estados apenas para demonstração visual
    const sensibilidades = ['Baixa', 'Média', 'Alta'];
    const confiancas = [50, 60, 70, 80, 90];

    const [indiceSensibilidade, setIndiceSensibilidade] = useState(1);
    const [indiceConfianca, setIndiceConfianca] = useState(2);

    const [sincronizacao, setSincronizacao] = useState(true);

    const [alertas, setAlertas] = useState<Record<ChaveAlerta, boolean>>({
        flash: true,
        vibracao: true,
        piscarTela: true,
        piscarTelaExtra: true
    });

    const [aviso, setAviso] = useState('');

    function alterarAlerta(id: ChaveAlerta) {
        setAlertas((anteriores) => ({
            ...anteriores,
            [id]: !anteriores[id]
        }));
    }

    return (
        <div className="flex min-h-screen w-full bg-[#F7F6FC] font-sans text-[#211F31]">

            {/* CONTEÚDO PRINCIPAL */}

            <div className="flex min-w-0 flex-1 flex-col">

                {/* CABEÇALHO */}

                <header className="flex min-h-[94px] flex-wrap items-center justify-between gap-4 bg-white px-8 py-5 lg:px-10">

                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Configurações
                        </h1>

                        <p className="mt-1 text-xs text-[#9693A1]">
                            Personalize como o EchoSense detecta e avisa
                        </p>
                    </div>

                    <div className="flex items-center gap-3">

                        {/* AMBIENTE ATUAL */}

                        <div className="flex items-center gap-2 rounded-xl bg-[#F0EDFA] px-3 py-2 text-[#6D54B1]">

                            <House size={16} />

                            <div className="text-[10px] leading-tight">
                                <div className="text-[#9A90BA]">
                                    Ambiente atual
                                </div>

                                <div className="font-semibold text-[#4D4476]">
                                    Casa
                                </div>
                            </div>

                            <ChevronDown size={14} />
                        </div>

                        {/* NOTIFICAÇÕES */}

                        <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[#F0EDF7] bg-white text-[#51476C]">

                            <Bell size={17} />

                            <span className="absolute right-[7px] top-[6px] h-1.5 w-1.5 rounded-full bg-[#E95767]" />
                        </div>

                        {/* BOTÃO PARA ABRIR PERFIL */}

                        <button
                            type="button"
                            aria-label="Abrir meu perfil"
                            onClick={() => onNavigate?.('perfil')}
                            className="flex items-center gap-2 rounded-xl px-2 py-2 transition-colors hover:bg-[#F4F0FC] cursor-pointer"
                        >

                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#DCCFF7] text-[#6E52B5]">
                                <UserRound size={16} />
                            </span>

                            <span className="max-w-24 truncate text-xs text-[#51485F]">
                                {userName.split(' ')[0]}
                            </span>

                            <ChevronDown
                                size={13}
                                className="text-[#898394]"
                            />
                        </button>
                    </div>
                </header>

                {/* PAINÉIS */}

                <main className="flex flex-1 flex-col px-6 pb-8 pt-6 lg:px-8">

                    <div className="grid flex-1 grid-cols-1 gap-6 xl:grid-cols-2">

                        {/* CONFIGURAÇÕES GERAIS */}

                        <section className="min-h-[610px] rounded-2xl border border-[#EFEDF5] bg-white p-6 shadow-sm">

                            <h2 className="mb-5 text-base font-bold">
                                Geral
                            </h2>

                            {/* SENSIBILIDADE */}

                            <button
                                type="button"
                                onClick={() =>
                                    setIndiceSensibilidade(
                                        (indiceSensibilidade + 1) %
                                        sensibilidades.length
                                    )
                                }
                                className="flex w-full items-center justify-between border-b border-[#F0EDF3] py-5 text-left text-sm hover:text-[#6C47FF] cursor-pointer"
                            >
                                <span className="font-medium">
                                    Sensibilidade de detecção
                                </span>

                                <span className="flex items-center gap-3 text-xs text-[#938E9A]">
                                    {sensibilidades[indiceSensibilidade]}
                                    <ChevronRight size={17} />
                                </span>
                            </button>

                            {/* CONFIANÇA MÍNIMA */}

                            <button
                                type="button"
                                onClick={() =>
                                    setIndiceConfianca(
                                        (indiceConfianca + 1) %
                                        confiancas.length
                                    )
                                }
                                className="flex w-full items-center justify-between border-b border-[#F0EDF3] py-5 text-left text-sm hover:text-[#6C47FF] cursor-pointer"
                            >
                                <span className="font-medium">
                                    Confiança mínima
                                </span>

                                <span className="flex items-center gap-3 text-xs text-[#938E9A]">
                                    {confiancas[indiceConfianca]}%
                                    <ChevronRight size={17} />
                                </span>
                            </button>

                            {/* OUTROS */}

                            <h3 className="mb-5 mt-7 text-base font-bold">
                                Outros
                            </h3>

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F0EAFD] text-[#8E70DE]">
                                    <Cloud size={19} />
                                </div>

                                {/* BOTÃO PARA ABRIR SINCRONIZAÇÃO OFFLINE */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        onNavigate?.('sincronizacao-offline')
                                    }
                                    className="min-w-0 flex-1 text-left cursor-pointer"
                                >
                                    <p className="text-sm font-medium hover:text-[#6C47FF]">
                                        Sincronização automática
                                    </p>

                                    <p className="mt-0.5 text-[11px] text-[#A29DA9]">
                                        Enviar eventos ao restaurar a conexão
                                    </p>
                                </button>

                                {/* INTERRUPTOR INDEPENDENTE */}

                                <Interruptor
                                    ligado={sincronizacao}
                                    aoAlterar={() =>
                                        setSincronizacao(!sincronizacao)
                                    }
                                    rotulo="Sincronização automática"
                                />
                            </div>
                        </section>

                        {/* ALERTAS E DISPOSITIVOS */}

                        <section className="flex min-h-[610px] flex-col rounded-2xl border border-[#EFEDF5] bg-white p-6 shadow-sm">

                            <h2 className="mb-5 text-base font-bold">
                                Alertas e Dispositivos Sincronizados
                            </h2>

                            <div className="space-y-6">

                                {dispositivos.map(({
                                    id,
                                    titulo,
                                    etiqueta,
                                    descricao,
                                    Icone
                                }) => (

                                    <div
                                        key={id}
                                        className="flex items-center gap-3"
                                    >

                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F0EAFD] text-[#8E70DE]">
                                            <Icone size={18} />
                                        </div>

                                        <div className="min-w-0 flex-1">

                                            <div className="flex flex-wrap items-center gap-2">

                                                <span className="text-sm font-medium">
                                                    {titulo}
                                                </span>

                                                <span className="rounded-md bg-[#F1EDFA] px-1.5 py-0.5 text-[10px] text-[#A38CC8]">
                                                    {etiqueta}
                                                </span>
                                            </div>

                                            <p className="mt-0.5 text-[11px] text-[#A29DA9]">
                                                {descricao}
                                            </p>
                                        </div>

                                        <Interruptor
                                            ligado={alertas[id]}
                                            aoAlterar={() =>
                                                alterarAlerta(id)
                                            }
                                            rotulo={`Ativar ${titulo}`}
                                        />
                                    </div>
                                ))}

                            </div>

                            {/* TESTAR ALERTAS */}

                            <div className="mt-auto pt-8">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setAviso(
                                            'Modo de demonstração: os alertas reais serão integrados posteriormente.'
                                        )
                                    }
                                    className="w-full rounded-xl border border-[#E7E3ED] bg-white px-4 py-3 text-xs font-semibold text-[#272433] hover:bg-[#F8F6FC] cursor-pointer"
                                >
                                    Testar alertas
                                </button>

                                {aviso && (
                                    <p
                                        role="status"
                                        className="mt-2 text-center text-xs text-[#7C6C9A]"
                                    >
                                        {aviso}
                                    </p>
                                )}
                            </div>
                        </section>
                    </div>
                </main>
            </div>

            {/* BARRA LATERAL */}

            <SidebarDesktop
                activeTab="configuracoes"
                userName={userName}
                userEmail={userEmail}
                onNavigate={onNavigate}
                onLogout={onLogout}
            />
        </div>
    );
}
