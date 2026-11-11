
import { useState } from 'react';

import {
    Bell,
    ChevronDown,
    CloudOff,
    CloudUpload,
    House,
    UserRound,
    WifiOff,
    Clock3,
    AlertTriangle,
    RefreshCw,
    Info
} from 'lucide-react';

import { SidebarDesktop } from '../../components/SidebarDesktop';

interface SincronizacaoOfflineDesktopProps {
    userName: string;
    userEmail: string;
    onNavigate?: (pagina: string) => void;
    onLogout?: () => void;
}

// Dados ilustrativos para reproduzir a interface do Figma.
// A integração com os eventos reais será feita posteriormente.

const eventosPendentes = [
    {
        id: 1,
        nome: 'Alarme de incêndio',
        horario: 'Hoje, 10:45',
        confianca: '95%',
        Icone: AlertTriangle
    },
    {
        id: 2,
        nome: 'Campainha',
        horario: 'Hoje, 09:32',
        confianca: '91%',
        Icone: Bell
    },
    {
        id: 3,
        nome: 'Choro de bebê',
        horario: 'Ontem, 18:20',
        confianca: '89%',
        Icone: Bell
    }
];

export function SincronizacaoOfflineDesktop({
    userName,
    userEmail,
    onNavigate,
    onLogout
}: SincronizacaoOfflineDesktopProps) {

    const [mensagem, setMensagem] = useState('');

    function demonstrarSincronizacao() {
        setMensagem(
            'Esta é uma demonstração visual. A sincronização real será implementada posteriormente.'
        );
    }

    return (
        <div className="flex h-screen w-full overflow-hidden bg-[#F7F6FC] font-sans text-[#242132]">

            {/* CONTEÚDO PRINCIPAL */}

            <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">

                {/* CABEÇALHO */}

                <header className="flex min-h-[94px] flex-wrap items-center justify-between gap-4 bg-white px-8 py-5 lg:px-10">

                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Sincronização offline
                        </h1>

                        <p className="mt-1 text-xs text-[#9693A1]">
                            Gerencie seus eventos armazenados localmente
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

                        {/* ACESSO AO PERFIL */}

                        <button
                            type="button"
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

                {/* CONTEÚDO DA PÁGINA */}

                <main className="flex-1 p-6 lg:p-8">

                    <div className="mx-auto flex max-w-[1200px] flex-col gap-6">

                        {/* AVISO DE DESCONEXÃO */}

                        <section className="rounded-2xl border border-[#EFE7F4] bg-white p-7 shadow-sm">

                            <div className="flex flex-wrap items-start justify-between gap-4">

                                <div className="flex items-start gap-4">

                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F1EAFD] text-[#8B6ED5]">
                                        <CloudOff size={27} />
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-bold text-[#292438]">
                                            Você está offline
                                        </h2>

                                        <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#9690A1]">
                                            Sua conexão com a internet está indisponível.
                                            Os eventos detectados podem ser armazenados
                                            localmente e sincronizados quando a conexão
                                            for restabelecida.
                                        </p>
                                    </div>
                                </div>

                                <span className="inline-flex items-center gap-2 rounded-full bg-[#FFF0EE] px-3 py-2 text-xs font-semibold text-[#D96C63]">

                                    <WifiOff size={14} />

                                    Sem conexão
                                </span>
                            </div>
                        </section>

                        {/* RESUMO DA SINCRONIZAÇÃO */}

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                            {/* EVENTOS PENDENTES */}

                            <section className="rounded-2xl border border-[#EFEDF5] bg-white p-6 shadow-sm">

                                <div className="mb-5 flex items-center justify-between">

                                    <h2 className="text-base font-bold">
                                        Eventos pendentes
                                    </h2>

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F1EAFD] text-[#8B6ED5]">
                                        <CloudUpload size={21} />
                                    </div>
                                </div>

                                <p className="text-3xl font-bold text-[#6C47FF]">
                                    03
                                </p>

                                <p className="mt-2 text-xs text-[#9690A1]">
                                    Eventos aguardando sincronização
                                </p>
                            </section>

                            {/* STATUS */}

                            <section className="rounded-2xl border border-[#EFEDF5] bg-white p-6 shadow-sm">

                                <div className="mb-5 flex items-center justify-between">

                                    <h2 className="text-base font-bold">
                                        Status da sincronização
                                    </h2>

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F1EAFD] text-[#8B6ED5]">
                                        <Clock3 size={21} />
                                    </div>
                                </div>

                                <p className="text-lg font-semibold text-[#6C47FF]">
                                    Aguardando conexão
                                </p>

                                <p className="mt-2 text-xs text-[#9690A1]">
                                    Os eventos serão enviados quando
                                    a integração estiver disponível.
                                </p>
                            </section>
                        </div>

                        {/* LISTA DE EVENTOS */}

                        <section className="rounded-2xl border border-[#EFEDF5] bg-white p-6 shadow-sm">

                            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">

                                <div>
                                    <h2 className="text-base font-bold">
                                        Eventos aguardando sincronização
                                    </h2>

                                    <p className="mt-1 text-xs text-[#A09AA9]">
                                        Histórico de sons detectados sem conexão
                                    </p>
                                </div>

                                <span className="rounded-lg bg-[#F1EAFD] px-3 py-1.5 text-xs font-medium text-[#7B61C8]">
                                    3 pendentes
                                </span>
                            </div>

                            <div className="flex flex-col">

                                {eventosPendentes.map((evento) => {

                                    const Icone = evento.Icone;

                                    return (
                                        <div
                                            key={evento.id}
                                            className="flex flex-wrap items-center gap-4 border-b border-[#F0EDF5] py-4 last:border-b-0"
                                        >

                                            {/* ÍCONE */}

                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F0EAFD] text-[#8B6ED5]">

                                                <Icone size={20} />

                                            </div>

                                            {/* NOME E HORÁRIO */}

                                            <div className="min-w-0 flex-1">

                                                <h3 className="text-sm font-semibold text-[#292438]">
                                                    {evento.nome}
                                                </h3>

                                                <p className="mt-1 text-xs text-[#A09AA9]">
                                                    {evento.horario}
                                                </p>
                                            </div>

                                            {/* CONFIANÇA */}

                                            <span className="text-xs font-semibold text-[#7864B1]">
                                                {evento.confianca}
                                            </span>

                                            {/* STATUS */}

                                            <span className="rounded-full bg-[#FFF4DF] px-3 py-1.5 text-[11px] font-medium text-[#B68B43]">
                                                Pendente
                                            </span>
                                        </div>
                                    );
                                })}

                            </div>
                        </section>

                        {/* AÇÃO DE SINCRONIZAÇÃO */}

                        <section className="rounded-2xl border border-[#EFEDF5] bg-white p-6 shadow-sm">

                            <div className="flex flex-wrap items-center justify-between gap-5">

                                <div className="flex items-start gap-3">

                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F0EAFD] text-[#8B6ED5]">
                                        <RefreshCw size={21} />
                                    </div>

                                    <div>
                                        <h2 className="text-sm font-bold">
                                            Sincronizar eventos
                                        </h2>

                                        <p className="mt-1 max-w-md text-xs leading-relaxed text-[#A09AA9]">
                                            Envie os registros pendentes quando
                                            houver uma conexão disponível.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={demonstrarSincronizacao}
                                    className="flex items-center justify-center gap-2 rounded-xl bg-[#6C47FF] px-6 py-3 text-xs font-semibold text-white transition-colors hover:bg-[#5836E0] cursor-pointer"
                                >
                                    <RefreshCw size={16} />

                                    Sincronizar agora
                                </button>
                            </div>

                            {/* AVISO DEMONSTRATIVO */}

                            {mensagem && (
                                <div
                                    role="status"
                                    className="mt-5 flex items-start gap-2 rounded-xl bg-[#F1EAFD] p-4 text-xs text-[#6D54B1]"
                                >
                                    <Info size={17} className="shrink-0" />

                                    <span>{mensagem}</span>
                                </div>
                            )}
                        </section>

                    </div>
                </main>
            </div>

            {/* BARRA LATERAL REUTILIZADA */}

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
