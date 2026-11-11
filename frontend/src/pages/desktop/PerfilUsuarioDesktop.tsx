
import { useState } from 'react';

import {
    Bell,
    ChevronDown,
    ChevronRight,
    House,
    UserRound,
    Pencil,
    LockKeyhole,
    MonitorSmartphone,
    SlidersHorizontal,
    X
} from 'lucide-react';

import { SidebarDesktop } from '../../components/SidebarDesktop';

interface PerfilUsuarioDesktopProps {
    userName: string;
    userEmail: string;
    onNavigate?: (pagina: string) => void;
    onLogout?: () => void;
}

const opcoesPerfil = [
    {
        id: 'editar',
        titulo: 'Editar perfil',
        descricao: 'Nome, e-mail e foto',
        Icone: Pencil
    },
    {
        id: 'senha',
        titulo: 'Alterar senha',
        descricao: 'Atualize sua senha de acesso',
        Icone: LockKeyhole
    },
    {
        id: 'dispositivos',
        titulo: 'Dispositivos',
        descricao: '3 dispositivos conectados',
        Icone: MonitorSmartphone
    },
    {
        id: 'preferencias',
        titulo: 'Preferências',
        descricao: 'Idioma e acessibilidade',
        Icone: SlidersHorizontal
    }
];

export function PerfilUsuarioDesktop({
    userName,
    userEmail,
    onNavigate,
    onLogout
}: PerfilUsuarioDesktopProps) {

    // Controle visual. A integração será realizada depois.
    const [opcaoSelecionada, setOpcaoSelecionada] = useState<string | null>(null);

    const opcaoAberta = opcoesPerfil.find(
        (opcao) => opcao.id === opcaoSelecionada
    );

    return (
        <div className="flex h-screen w-full overflow-hidden bg-[#F7F6FC] font-sans text-[#242132]">

            {/* CONTEÚDO PRINCIPAL */}
            <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">

                {/* CABEÇALHO */}
                <header className="flex min-h-[94px] flex-wrap items-center justify-between gap-4 bg-white px-8 py-5 lg:px-10">

                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Meu perfil
                        </h1>

                        <p className="mt-1 text-xs text-[#9693A1]">
                            Gerencie suas informações pessoais e preferências
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

                        {/* USUÁRIO */}
                        <div className="flex items-center gap-2">

                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#DCCFF7] text-[#6E52B5]">
                                <UserRound size={16} />
                            </div>

                            <span className="max-w-24 truncate text-xs text-[#51485F]">
                                {userName.split(' ')[0]}
                            </span>

                            <ChevronDown
                                size={13}
                                className="text-[#898394]"
                            />
                        </div>
                    </div>
                </header>

                {/* CONTEÚDO DA PÁGINA */}
                <main className="flex-1 p-6 lg:p-8">

                    <div className="grid w-full grid-cols-1 items-start gap-6 lg:grid-cols-[330px_minmax(0,1fr)]">

                        {/* CARTÃO DO PERFIL */}
                        <section className="min-h-[340px] rounded-2xl border border-[#EFEDF5] bg-white p-7 shadow-sm">

                            {/* FOTO DO USUÁRIO */}
                            <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-[#C4B5F0] text-[#6652AA]">

                                <UserRound
                                    size={49}
                                    strokeWidth={1.3}
                                />
                            </div>

                            {/* NOME */}
                            <h2 className="text-xl font-bold text-[#242132]">
                                {userName}
                            </h2>

                            {/* E-MAIL */}
                            <p className="mt-2 break-all text-sm text-[#9693A1]">
                                {userEmail}
                            </p>

                            {/* STATUS DA CONTA */}
                            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#E8F7ED] px-3 py-1.5 text-xs font-medium text-[#4A9B70]">

                                <span className="h-1.5 w-1.5 rounded-full bg-[#57AD7A]" />

                                Conta ativa
                            </div>
                        </section>

                        {/* CARTÃO CONTA E PREFERÊNCIAS */}
                        <section className="min-h-[340px] rounded-2xl border border-[#EFEDF5] bg-white px-6 py-5 shadow-sm">

                            <h2 className="mb-4 text-base font-bold text-[#242132]">
                                Conta e preferências
                            </h2>

                            <div className="flex flex-col">

                                {opcoesPerfil.map((opcao) => {

                                    const Icone = opcao.Icone;

                                    return (
                                        <button
                                            key={opcao.id}
                                            type="button"
                                            onClick={() => setOpcaoSelecionada(opcao.id)}
                                            className="flex w-full items-center gap-4 border-b border-[#F0EDF5] px-1 py-4 text-left transition-colors last:border-b-0 hover:bg-[#FAF9FD] cursor-pointer"
                                        >

                                            {/* ÍCONE */}
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F0EAFD] text-[#8B6ED5]">

                                                <Icone size={19} />

                                            </div>

                                            {/* INFORMAÇÕES */}
                                            <div className="min-w-0 flex-1">

                                                <h3 className="text-sm font-semibold text-[#292438]">
                                                    {opcao.titulo}
                                                </h3>

                                                <p className="mt-1 text-xs text-[#A09AA9]">
                                                    {opcao.descricao}
                                                </p>

                                            </div>

                                            {/* SETA */}
                                            <ChevronRight
                                                size={18}
                                                className="shrink-0 text-[#ABA5B5]"
                                            />
                                        </button>
                                    );
                                })}

                            </div>
                        </section>
                    </div>
                </main>
            </div>

            {/* BARRA LATERAL DO PROJETO */}
            <SidebarDesktop
                activeTab="configuracoes"
                userName={userName}
                userEmail={userEmail}
                onNavigate={onNavigate}
                onLogout={onLogout}
            />

            {/* MODAL VISUAL DAS OPÇÕES */}
            {opcaoAberta && (

                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-[#111029]/60 p-4"
                    role="presentation"
                    onClick={() => setOpcaoSelecionada(null)}
                >

                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="titulo-modal-perfil"
                        onClick={(evento) => evento.stopPropagation()}
                        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
                    >

                        <div className="flex items-center justify-between gap-4">

                            <h2
                                id="titulo-modal-perfil"
                                className="text-lg font-bold text-[#242132]"
                            >
                                {opcaoAberta.titulo}
                            </h2>

                            <button
                                type="button"
                                aria-label="Fechar"
                                onClick={() => setOpcaoSelecionada(null)}
                                className="rounded-lg p-2 text-[#7F778D] hover:bg-[#F0EAFD] cursor-pointer"
                            >
                                <X size={19} />
                            </button>
                        </div>

                        <p className="mt-3 text-sm text-[#8C8499]">
                            {opcaoAberta.descricao}
                        </p>

                        <p className="mt-5 rounded-xl bg-[#F7F5FC] p-4 text-sm text-[#6E5C92]">
                            Esta opção está preparada visualmente.
                            A integração será realizada posteriormente
                            pela equipe.
                        </p>

                        <button
                            type="button"
                            onClick={() => setOpcaoSelecionada(null)}
                            className="mt-6 w-full rounded-xl bg-[#6C47FF] px-4 py-3 text-sm font-semibold text-white hover:bg-[#5836E0] cursor-pointer"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
