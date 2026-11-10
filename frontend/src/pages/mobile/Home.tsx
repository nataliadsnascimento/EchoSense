import React, { useState } from 'react';
import { Home as HomeIcon, Clock, Search, Bell, User } from 'lucide-react';

interface HomeProps {
    userName?: string;
    onOpenSidebar: () => void;
    onNavigateToDetect: () => void;
    onNavigateToHistory?: () => void;
    onNavigate?: (tab: string) => void;
}

export function Home({ userName = "Usuário", onOpenSidebar, onNavigateToDetect, onNavigateToHistory, onNavigate }: HomeProps) {
    const [environment, setEnvironment] = useState<'casa' | 'trabalho'>('casa');
    const [isMonitoring, setIsMonitoring] = useState(true);

    const alertsData = environment === 'casa' ? [
        { id: 1, title: 'Campainha', time: 'Hoje, 10:23', icon: '🔔' },
        { id: 2, title: 'Choro de Bebê', time: 'Hoje, 09:15', icon: '👶' },
        { id: 3, title: 'Alarme', time: 'Ontem, 22:47', icon: '⚠️' },
        { id: 4, title: 'Porta Batendo', time: 'Ontem, 18:30', icon: '🚪' },
    ] : [
        { id: 1, title: 'Passos', time: 'Hoje, 10:23', icon: '👣' },
        { id: 2, title: 'Vozes no Ambiente', time: 'Hoje, 09:15', icon: '🗣️' },
        { id: 3, title: 'Impressora', time: 'Ontem, 22:47', icon: '🖨️' },
        { id: 4, title: 'Porta Fechando', time: 'Ontem, 18:30', icon: '🚪' }
    ];

    return (
        <div className="flex-1 bg-[#F8F7FA] flex flex-col font-sans relative overflow-hidden">
            <div className="w-full h-7 bg-[#4C3B78] shrink-0" />

            <div className="flex-1 p-4 pb-24 overflow-y-auto">
                <div className="flex items-center justify-between mb-4 mt-2">
                    <button onClick={onOpenSidebar} className="p-1 text-gray-700 hover:text-[#5D4A88] cursor-pointer">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <h1 className="text-lg font-bold text-[#5D4A88]">EchoSense</h1>
                    <div className="w-6" />
                </div>

                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-[#5D4A88] font-bold">
                        👤
                    </div>
                    <div>
                        <span className="text-[10px] text-gray-400 font-semibold block uppercase">Olá,</span>
                        <h2 className="text-base font-bold text-gray-800">{userName}! 👋</h2>
                    </div>
                </div>

                <div className="bg-white rounded-[20px] p-3.5 shadow-sm border border-gray-100 mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-[#5D4A88]">
                            {environment === 'casa' ? '🏠' : '💼'}
                        </div>
                        <div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase">Ambiente atual</span>
                            <p className="text-xs font-bold text-gray-800 capitalize">{environment === 'casa' ? 'Casa' : 'Trabalho'}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setEnvironment(environment === 'casa' ? 'trabalho' : 'casa')}
                        className="text-xs font-bold text-[#5D4A88] hover:underline cursor-pointer"
                    >
                        Trocar ambiente ›
                    </button>
                </div>

                <div className="bg-white rounded-[24px] p-4 shadow-sm border border-gray-100 mb-3">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="text-xs font-bold text-gray-800">Monitoramento em segundo plano</h3>
                            <p className="text-[10px] text-gray-400">Gerencie a detecção de sons.</p>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${isMonitoring ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${isMonitoring ? 'bg-green-500' : 'bg-amber-500'}`} />
                            {isMonitoring ? 'Ativo' : 'Pausado'}
                        </span>
                    </div>

                    {!isMonitoring && (
                        <p className="text-[10px] text-gray-400 mb-3">
                            O monitoramento está pausado. Você não receberá alertas visuais até retomar o serviço.
                        </p>
                    )}

                    <button
                        onClick={() => setIsMonitoring(!isMonitoring)}
                        className={`w-full py-2.5 rounded-xl font-bold text-xs border cursor-pointer transition-colors ${
                            isMonitoring
                                ? 'bg-purple-50 border-purple-200 text-[#5D4A88]'
                                : 'bg-[#5D4A88] text-white border-transparent'
                        }`}
                    >
                        {isMonitoring ? '⏸ Pausar monitoramento' : '▶ Retomar monitoramento'}
                    </button>
                </div>

                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-bold text-gray-800">Últimos alertas</h3>
                    <button onClick={onNavigateToHistory} className="text-[10px] font-bold text-[#5D4A88] cursor-pointer">Ver todos</button>
                </div>

                <div className="flex flex-col gap-2">
                    {alertsData.map((item) => (
                        <div key={item.id} className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-[#5D4A88]">
                                {item.icon}
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-gray-800">{item.title}</h4>
                                <span className="text-[10px] text-gray-400">{item.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <nav className="absolute bottom-0 left-0 right-0 h-16 bg-white border-t border-purple-50 grid grid-cols-5 items-center justify-items-center px-1 z-20 shadow-md">
                <button onClick={() => onNavigate?.('inicio')} className="flex flex-col items-center gap-0.5 text-[#5C3C92] cursor-pointer">
                    <HomeIcon size={20} />
                    <span className="text-[10px] font-bold">Início</span>
                </button>
                <button onClick={() => { onNavigateToHistory?.(); onNavigate?.('historico'); }} className="flex flex-col items-center gap-0.5 text-gray-400 hover:text-[#5C3C92] cursor-pointer">
                    <Clock size={20} />
                    <span className="text-[10px] font-medium">Histórico</span>
                </button>
                <button onClick={onNavigateToDetect} className="flex flex-col items-center gap-0.5 text-gray-400 hover:text-[#5C3C92] cursor-pointer">
                    <Search size={20} />
                    <span className="text-[10px] font-medium">Detectar</span>
                </button>
                <button onClick={() => onNavigate?.('alertas')} className="flex flex-col items-center gap-0.5 cursor-pointer">
                    <div className="bg-[#EEE8FC] px-3.5 py-1 rounded-full flex items-center justify-center">
                        <Bell size={18} className="text-[#5C3C92]" />
                    </div>
                    <span className="text-[10px] font-bold text-[#5C3C92]">Alertas</span>
                </button>
                <button onClick={() => onNavigate?.('perfil')} className="flex flex-col items-center gap-0.5 text-gray-400 hover:text-[#5C3C92] cursor-pointer">
                    <User size={20} />
                    <span className="text-[10px] font-medium">Perfil</span>
                </button>
            </nav>
        </div>
    );
}