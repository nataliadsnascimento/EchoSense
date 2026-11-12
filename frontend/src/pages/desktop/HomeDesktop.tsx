import React, { useState } from 'react';
import { SidebarDesktop } from '../../components/SidebarDesktop';

import {
    Bell,
    ShieldCheck,
    RefreshCw,
    ChevronRight,
    Filter,
    ArrowUpRight,
    Activity,
    Volume2,
    Sliders,
    Home as HomeIcon,
    Menu
} from 'lucide-react';

interface AlertItem {
    id: string;
    sound: string;
    time: string;
    confidence: string;
    level: 'Alto' | 'Médio' | 'Crítico' | 'Baixo';
    isNew?: boolean;
}

interface HomeDesktopProps {
    userName: string;
    userEmail: string;
    currentEnvironment?: string;
    deviceCount?: number;
    alerts?: AlertItem[];
    frequentSounds?: { name: string; percentage: number; color: string }[];
    onNavigateToHistory: () => void;
    onNavigateToDetect: () => void;
    onLogout: () => void;
}

export function HomeDesktop({
    userName,
    userEmail,
    currentEnvironment = 'casa',
    deviceCount = 3,
    alerts = [
        { id: '1', sound: 'Campainha', time: 'Hoje, 19:23', confidence: '98%', level: 'Alto', isNew: true },
        { id: '2', sound: 'Choro de bebê', time: 'Hoje, 08:15', confidence: '97%', level: 'Médio' },
        { id: '3', sound: 'Alarme', time: 'Ontem, 23:47', confidence: '98%', level: 'Crítico' },
        { id: '4', sound: 'Porta batendo', time: 'Ontem, 19:30', confidence: '93%', level: 'Médio' },
        { id: '5', sound: 'Cachorro latindo', time: 'Ontem, 18:06', confidence: '91%', level: 'Baixo' },
    ],
    frequentSounds = [
        { name: 'Campainha', percentage: 45, color: 'bg-purple-500' },
        { name: 'Choro de bebê', percentage: 30, color: 'bg-purple-400' },
        { name: 'Alarme', percentage: 15, color: 'bg-rose-500' },
    ],
    onNavigateToHistory,
    onNavigateToDetect,
    onLogout
}: HomeDesktopProps) {
    const firstName = userName.split(' ')[0];

    // Estado para controlar se a barra lateral está aberta ou fechada no desktop
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-[#070614] text-white overflow-hidden font-sans relative">
            {/* Barra lateral retrátil (aparece ao clicar no ícone de menu) */}
            {isSidebarOpen && (
                <div className="absolute inset-y-0 left-0 z-50 flex shadow-2xl transition-all duration-300">
                    <SidebarDesktop
                        activeTab="inicio"
                        userName={userName}
                        userEmail={userEmail}
                        onNavigateToHistory={onNavigateToHistory}
                        onNavigateToDetect={onNavigateToDetect}
                        onLogout={onLogout}
                    />
                    {/* Fundo escuro translúcido para fechar ao clicar fora */}
                    <div
                        className="fixed inset-0 bg-black/50 z-[-1]"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                </div>
            )}

            <main className="flex-1 p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        {/* Botão de Menu para abrir a barra lateral no desktop */}
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="bg-[#111029] border border-white/5 p-3 rounded-2xl text-purple-300 hover:text-white transition-colors cursor-pointer"
                            title="Abrir menu"
                        >
                            <Menu size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold flex items-center gap-2">
                                Olá, {userName} 👋
                            </h1>
                            <p className="text-xs text-purple-300/70 mt-1">
                                Tudo monitorado. Sua casa está segura e conectada.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="bg-[#111029] border border-white/5 px-4 py-2 rounded-2xl flex items-center gap-3 text-xs shadow-md">
                            <HomeIcon size={16} className="text-purple-400" />
                            <div>
                                <span className="text-[10px] text-purple-300/60 block">Ambiente atual</span>
                                <span className="font-semibold">{currentEnvironment}</span>
                            </div>
                        </div>

                        <button className="bg-[#111029] border border-white/5 p-3 rounded-2xl text-purple-300 hover:text-white transition-colors relative">
                            <Bell size={18} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full"></span>
                        </button>

                        <div className="bg-[#111029] border border-white/5 px-3 py-1.5 rounded-2xl flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-purple-600/30 text-purple-300 flex items-center justify-center font-bold text-xs">
                                {firstName.charAt(0)}
                            </div>
                            <span className="text-xs font-semibold pr-2">{firstName}</span>
                        </div>
                    </div>
                </header>

                {/* Grid Superior */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="lg:col-span-2 bg-gradient-to-br from-[#111029] to-[#1c1a3a] p-6 rounded-3xl border border-white/5 relative overflow-hidden shadow-xl flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-base font-bold">Monitoramento ativo</h2>
                                <p className="text-xs text-purple-300/70">Executando o ambiente {currentEnvironment}</p>
                            </div>
                            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                Ouvindo agora
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 my-4">
                            <div className="flex items-center justify-center relative">
                                <div className="w-36 h-36 rounded-full border border-purple-500/20 flex items-center justify-center absolute animate-ping opacity-20"></div>
                                <div className="w-28 h-28 rounded-full border border-purple-500/30 flex items-center justify-center absolute"></div>
                                <div className="w-20 h-20 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-400 shadow-inner">
                                    <Volume2 size={32} />
                                </div>
                            </div>

                            <div className="bg-[#0b0a1e]/60 p-4 rounded-2xl border border-white/5">
                                <span className="text-[10px] font-bold text-purple-300/50 uppercase tracking-wider block mb-1">Som ambiente</span>
                                <h3 className="text-sm font-bold text-white mb-2">Ouvindo o ambiente...</h3>
                                <p className="text-[11px] text-purple-300/70 mb-4">A IA está analisando sons importantes em tempo real.</p>

                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div className="bg-white/5 p-2.5 rounded-xl">
                                        <span className="text-[10px] text-purple-300/60 block">Sensibilidade</span>
                                        <span className="font-bold">Média</span>
                                    </div>
                                    <div className="bg-white/5 p-2.5 rounded-xl">
                                        <span className="text-[10px] text-purple-300/60 block">Confiança mínima</span>
                                        <span className="font-bold">70%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={onNavigateToDetect}
                                className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors cursor-pointer shadow-lg shadow-purple-600/30"
                            >
                                Parar detecção
                            </button>
                            <button className="bg-white/5 hover:bg-white/10 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors cursor-pointer border border-white/5 flex items-center gap-2">
                                <Sliders size={14} /> Ajustar
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="bg-[#111029] p-6 rounded-3xl border border-white/5 shadow-xl">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xs font-bold text-purple-300/60 uppercase">Ambiente atual</span>
                                <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Online
                                </span>
                            </div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-purple-600/20 p-3 rounded-2xl text-purple-300">
                                    <HomeIcon size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm">{currentEnvironment}</h4>
                                    <span className="text-[11px] text-purple-300/60">{deviceCount} dispositivos conectados</span>
                                </div>
                            </div>
                            <button className="w-full flex justify-between items-center text-xs text-purple-300 hover:text-white pt-3 border-t border-white/5 transition-colors">
                                <span>Trocar ambiente</span>
                                <ChevronRight size={16} />
                            </button>
                        </div>

                        <div className="bg-[#111029] p-6 rounded-3xl border border-white/5 shadow-xl flex-1 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <div className="bg-purple-600/20 p-3 rounded-2xl text-purple-300 mb-2">
                                    <ShieldCheck size={20} />
                                </div>
                                <span className="text-[10px] text-purple-300/50">Hoje, 10:24</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm mb-1">Tudo sincronizado</h4>
                                <p className="text-[11px] text-purple-300/60">Os eventos estão salvos com segurança.</p>
                            </div>
                            <button className="flex items-center gap-2 text-xs text-purple-400 hover:text-purple-300 font-semibold mt-4 transition-colors">
                                <RefreshCw size={14} /> Sincronizar agora
                            </button>
                        </div>
                    </div>
                </div>

                {/* Grid Inferior (Alertas e Sons Frequentes) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-[#111029] p-6 rounded-3xl border border-white/5 shadow-xl">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="font-bold text-sm">Últimos alertas</h3>
                                <p className="text-[11px] text-purple-300/60">{alerts.length} eventos detectados nas últimas 24 horas</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="bg-white/5 hover:bg-white/10 text-xs text-purple-200 px-3 py-1.5 rounded-xl border border-white/5 flex items-center gap-1.5 transition-colors">
                                    <Filter size={14} /> Filtrar
                                </button>
                                <button
                                    onClick={onNavigateToHistory}
                                    className="bg-white/5 hover:bg-white/10 text-xs text-purple-200 px-3 py-1.5 rounded-xl border border-white/5 flex items-center gap-1.5 transition-colors"
                                >
                                    Ver histórico <ArrowUpRight size={14} />
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/5 text-[10px] uppercase font-bold text-purple-300/40">
                                        <th className="pb-3 font-medium">Som detectado</th>
                                        <th className="pb-3 font-medium">Data e hora</th>
                                        <th className="pb-3 font-medium">Confiança</th>
                                        <th className="pb-3 font-medium">Nível</th>
                                        <th className="pb-3 font-medium text-right"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-xs">
                                    {alerts.map((alert) => {
                                        let badgeColor = "bg-purple-500/20 text-purple-300";
                                        if (alert.level === 'Crítico') badgeColor = "bg-rose-500/20 text-rose-400";
                                        if (alert.level === 'Alto') badgeColor = "bg-amber-500/20 text-amber-400";
                                        if (alert.level === 'Baixo') badgeColor = "bg-emerald-500/20 text-emerald-400";

                                        return (
                                            <tr key={alert.id} className="hover:bg-white/[0.02] transition-colors group">
                                                <td className="py-3.5 flex items-center gap-2 font-semibold">
                                                    <span className="w-7 h-7 rounded-lg bg-purple-600/10 flex items-center justify-center text-purple-300">
                                                        <Activity size={14} />
                                                    </span>
                                                    {alert.sound}
                                                    {alert.isNew && (
                                                        <span className="bg-purple-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">NOVO</span>
                                                    )}
                                                </td>
                                                <td className="py-3.5 text-purple-300/70">{alert.time}</td>
                                                <td className="py-3.5 font-medium">{alert.confidence}</td>
                                                <td className="py-3.5">
                                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${badgeColor}`}>
                                                        {alert.level}
                                                    </span>
                                                </td>
                                                <td className="py-3.5 text-right text-purple-300/40 group-hover:text-white transition-colors">
                                                    <ChevronRight size={16} className="inline" />
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-[#111029] p-6 rounded-3xl border border-white/5 shadow-xl flex flex-col justify-between">
                        <div>
                            <h3 className="font-bold text-sm mb-4">Sons mais frequentes</h3>

                            <div className="flex flex-col gap-4">
                                {frequentSounds.map((item, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between text-xs mb-1.5">
                                            <span className="font-medium">{item.name}</span>
                                            <span className="font-bold text-purple-300">{item.percentage}%</span>
                                        </div>
                                        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${item.color}`}
                                                style={{ width: `${item.percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] text-purple-300/50">
                            <span>Atualização em tempo real</span>
                            <span>Atualizado há 1 min</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}