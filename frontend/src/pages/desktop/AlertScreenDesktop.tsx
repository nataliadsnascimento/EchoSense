import React, { useState } from 'react';
import { SidebarDesktop } from '../../components/SidebarDesktop';
import { Bell, Menu, Volume2 } from 'lucide-react';

interface AlertScreenDesktopProps {
    userName: string;
    userEmail: string;
    soundName?: string;
    confidence?: string;
    time?: string;
    icon?: string;
    onDismiss: () => void;
    onViewDetails: () => void;
    onNavigateToHome: () => void;
    onNavigateToHistory: () => void;
    onNavigateToDetect: () => void;
    onNavigateToAlerts?: () => void;
    onLogout: () => void;
}

export function AlertScreenDesktop({
    userName,
    userEmail,
    soundName = 'Campainha',
    confidence = '98%',
    time = '10:22:45',
    icon = '🔔',
    onDismiss,
    onViewDetails,
    onNavigateToHome,
    onNavigateToHistory,
    onNavigateToDetect,
    onNavigateToAlerts,
    onLogout
}: AlertScreenDesktopProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-[#070614] text-white overflow-hidden font-sans relative">
            {isSidebarOpen && (
                <div className="absolute inset-y-0 left-0 z-50 flex shadow-2xl transition-all duration-300">
                    <SidebarDesktop
                        activeTab="alertas"
                        userName={userName}
                        userEmail={userEmail}
                        onNavigate={(tab) => {
                            setIsSidebarOpen(false);
                            if (tab === 'inicio' || tab === 'home') onNavigateToHome();
                            if (tab === 'historico') onNavigateToHistory();
                            if (tab === 'detectar') onNavigateToDetect();
                            if (tab === 'alertas' && onNavigateToAlerts) onNavigateToAlerts();
                        }}
                        onNavigateToHome={onNavigateToHome}
                        onNavigateToHistory={onNavigateToHistory}
                        onNavigateToDetect={onNavigateToDetect}
                        onLogout={onLogout}
                    />
                    <div
                        className="fixed inset-0 bg-black/50 z-[-1]"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                </div>
            )}

            <main className="flex-1 p-8 flex flex-col justify-between overflow-y-auto">
                <header className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="bg-[#111029] border border-white/5 p-3 rounded-2xl text-purple-300 hover:text-white transition-colors cursor-pointer"
                            title="Abrir menu"
                        >
                            <Menu size={20} />
                        </button>

                        <div
                            onClick={onNavigateToHome}
                            className="flex items-center gap-3 cursor-pointer group"
                            title="Voltar ao início"
                        >
                            <div className="w-10 h-10 rounded-xl bg-white text-[#070614] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                                <Volume2 size={22} className="text-purple-600" />
                            </div>
                            <div>
                                <span className="font-bold text-base block leading-tight">EchoSense</span>
                                <span className="text-[11px] text-purple-300/60 block">Sons que viram alerta</span>
                            </div>
                        </div>
                    </div>

                    <div className="px-4 py-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-300 text-xs font-medium flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                        Alerta detectado
                    </div>
                </header>

                <div className="flex-1 flex flex-col items-center justify-center my-auto py-8">
                     <div className="px-5 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold uppercase tracking-wider mb-10 shadow-lg shadow-rose-900/20">
                          Alerta detectado
                     </div>

                     <div className="relative w-64 h-64 flex items-center justify-center mb-8">
                         <div className="absolute inset-0 rounded-full border-[6px] border-rose-500/40 scale-100 animate-pulse"></div>
                         <div className="absolute inset-6 rounded-full border-[10px] border-rose-600/70"></div>

                         <div className="w-32 h-32 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-2xl shadow-rose-600/50 text-5xl">
                              {icon}
                         </div>
                     </div>

                     <h1 className="text-3xl font-bold mb-2">{soundName}</h1>
                     <p className="text-xs text-purple-200/70 mb-8">
                          Confiança: {confidence} • {time}
                     </p>

                     <div className="w-full max-w-sm flex flex-col gap-3">
                         <button
                             onClick={onDismiss}
                             className="w-full py-3.5 rounded-xl font-bold text-xs text-white bg-[#dc2626] hover:bg-red-500 shadow-lg shadow-red-600/30 transition-all cursor-pointer"
                         >
                             Voltar
                         </button>

                         <button
                             onClick={onViewDetails}
                             className="w-full py-2.5 rounded-xl font-semibold text-xs text-rose-400 hover:text-rose-300 transition-colors cursor-pointer text-center"
                         >
                             Ver detalhes
                         </button>
                     </div>
                </div>

                <div className="h-4"></div>
            </main>
        </div>
    );
}