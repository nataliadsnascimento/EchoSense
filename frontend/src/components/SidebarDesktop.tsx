
import React from 'react';
import logoIcon from '../assets/iconeBarra.png';

import {
    LayoutGrid,
    History,
    Volume2,
    Bell,
    Settings,
    HelpCircle,
    Info,
    LogOut,
    User
} from 'lucide-react';

interface SidebarDesktopProps {
    activeTab?: string;
    onNavigate?: (tab: string) => void;
    onNavigateToHistory?: () => void;
    onNavigateToDetect?: () => void;
    onLogout?: () => void;
    userName: string;
    userEmail: string;
}

export function SidebarDesktop({
    activeTab = 'inicio',
    onNavigate,
    onNavigateToHistory,
    onNavigateToDetect,
    onLogout,
    userName,
    userEmail
}: SidebarDesktopProps) {

    return (
        <aside className="w-[280px] lg:w-[300px] bg-[#111029] text-white h-full p-6 flex flex-col justify-between shrink-0 shadow-xl">

            <div>

                {/* Logo EchoSense */}
                <div className="flex items-center gap-3 mb-8">

                    <div className="bg-purple-600/30 p-2 rounded-xl border border-purple-500/30">
                        <img
                            src={logoIcon}
                            alt="Logo"
                            className="w-6 h-6 object-contain filter brightness-200"
                        />
                    </div>

                    <div>
                        <h2 className="font-bold text-base leading-none tracking-wide text-white">
                            EchoSense
                        </h2>

                        <span className="text-[10px] text-purple-300/70">
                            Sons que viram alerta
                        </span>
                    </div>

                </div>

                {/* MENU PRINCIPAL */}
                <div className="mb-6">

                    <span className="text-[10px] font-bold text-purple-300/40 uppercase tracking-wider block mb-3">
                        Principal
                    </span>

                    <div className="flex flex-col gap-1">

                        {/* Início */}
                        <button
                            onClick={() => onNavigate?.('inicio')}
                            className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl font-bold text-xs shadow-md transition-colors cursor-pointer ${
                                activeTab === 'inicio'
                                    ? 'bg-[#6C47FF] text-white'
                                    : 'text-purple-200/70 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            <LayoutGrid size={18} />
                            Início
                        </button>

                        {/* Histórico */}
                        <button
                            onClick={() => {
                                onNavigateToHistory?.();
                                onNavigate?.('historico');
                            }}
                            className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl font-semibold text-xs transition-colors cursor-pointer ${
                                activeTab === 'historico'
                                    ? 'bg-[#6C47FF] text-white'
                                    : 'text-purple-200/70 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            <History size={18} />
                            Histórico
                        </button>

                        {/* Detectar sons */}
                        <button
                            onClick={() => {
                                onNavigateToDetect?.();
                                onNavigate?.('detectar');
                            }}
                            className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl font-semibold text-xs transition-colors cursor-pointer ${
                                activeTab === 'detectar'
                                    ? 'bg-[#6C47FF] text-white'
                                    : 'text-purple-200/70 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            <Volume2 size={18} />
                            Detectar sons
                        </button>

                        {/* Alertas */}
                        <button
                            onClick={() => onNavigate?.('alertas')}
                            className={`flex items-center justify-between w-full px-4 py-3 rounded-2xl font-semibold text-xs transition-colors cursor-pointer ${
                                activeTab === 'alertas'
                                    ? 'bg-[#6C47FF] text-white'
                                    : 'text-purple-200/70 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <Bell size={18} />
                                Alertas
                            </div>

                            <span className="bg-purple-600/50 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                3
                            </span>
                        </button>

                    </div>
                </div>

                {/* MENU DE PREFERÊNCIAS */}
                <div>

                    <span className="text-[10px] font-bold text-purple-300/40 uppercase tracking-wider block mb-3">
                        Preferências
                    </span>

                    <div className="flex flex-col gap-1">

                        {/* Configurações */}
                        <button
                            onClick={() => onNavigate?.('configuracoes')}
                            className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl font-semibold text-xs transition-colors cursor-pointer ${
                                activeTab === 'configuracoes'
                                    ? 'bg-[#6C47FF] text-white'
                                    : 'text-purple-200/70 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            <Settings size={18} />
                            Configurações
                        </button>

                        {/* Ajuda e suporte */}
                        <button
                            onClick={() => onNavigate?.('ajuda')}
                            className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl font-semibold text-xs transition-colors cursor-pointer ${
                                activeTab === 'ajuda'
                                    ? 'bg-[#6C47FF] text-white'
                                    : 'text-purple-200/70 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            <HelpCircle size={18} />
                            Ajuda e suporte
                        </button>

                        {/* Sobre o app */}
                        <button
                            onClick={() => onNavigate?.('sobre')}
                            className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl font-semibold text-xs transition-colors cursor-pointer ${
                                activeTab === 'sobre'
                                    ? 'bg-[#6C47FF] text-white'
                                    : 'text-purple-200/70 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            <Info size={18} />
                            Sobre o app
                        </button>

                    </div>
                </div>

            </div>

            {/* ÁREA DO USUÁRIO */}
            <div className="flex flex-col gap-3 pt-4 border-t border-white/5">

                <div className="bg-white/5 rounded-2xl p-3 flex items-center gap-3">

                    <div className="w-9 h-9 rounded-xl bg-purple-600/30 text-purple-300 flex items-center justify-center font-bold">
                        <User size={18} />
                    </div>

                    <div className="overflow-hidden">

                        <strong className="text-xs text-white block truncate">
                            {userName}
                        </strong>

                        <span className="text-[10px] text-purple-300/60 block truncate">
                            {userEmail}
                        </span>

                    </div>

                </div>

                {/* Sair da conta */}
                <button
                    onClick={onLogout}
                    className="flex items-center gap-2 text-rose-400 hover:text-rose-300 text-xs font-bold px-2 py-1 transition-colors cursor-pointer"
                >
                    <LogOut size={16} />
                    Sair da conta
                </button>

            </div>

        </aside>
    );
}
