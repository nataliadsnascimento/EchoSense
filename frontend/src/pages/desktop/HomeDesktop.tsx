import React from 'react';
import { SidebarDesktop } from '../../components/SidebarDesktop';

interface HomeDesktopProps {
    userName: string;
    userEmail: string;
    onNavigateToHistory: () => void;
    onNavigateToDetect: () => void;
    onLogout: () => void;
}

export function HomeDesktop({
    userName,
    userEmail,
    onNavigateToHistory,
    onNavigateToDetect,
    onLogout
}: HomeDesktopProps) {
    return (
        <div className="flex h-screen bg-[#0B0A1E] text-white overflow-hidden">
            <SidebarDesktop
                activeTab="inicio"
                userName={userName}
                userEmail={userEmail}
                onNavigateToHistory={onNavigateToHistory}
                onNavigateToDetect={onNavigateToDetect}
                onLogout={onLogout}
            />
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold">Bem-vindo(a), {userName}!</h1>
                    <p className="text-sm text-purple-300/70">Painel de monitoramento e alertas em tempo real.</p>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-[#111029] p-6 rounded-2xl border border-white/5 shadow-lg">
                        <h3 className="font-bold text-sm text-purple-300 mb-2">Status do Sistema</h3>
                        <p className="text-2xl font-extrabold text-emerald-400">Ativo</p>
                    </div>
                </div>
            </main>
        </div>
    );
}