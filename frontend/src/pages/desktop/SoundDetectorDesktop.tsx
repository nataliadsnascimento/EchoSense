import React, { useState } from 'react';
import { SidebarDesktop } from '../../components/SidebarDesktop';
import {
    Home as HomeIcon,
    Menu,
    AudioWaveform
} from 'lucide-react';

interface SoundDetectorDesktopProps {
    userName: string;
    userEmail: string;
    currentEnvironment?: string;
    onNavigateToHome: () => void;
    onNavigateToHistory: () => void;
    onNavigateToDetect?: () => void;
    onLogout: () => void;
}

export function SoundDetectorDesktop({
    userName,
    userEmail,
    currentEnvironment = 'Casa',
    onNavigateToHome,
    onNavigateToHistory,
    onNavigateToDetect,
    onLogout
}: SoundDetectorDesktopProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [isDetecting, setIsDetecting] = useState(true);
    const [sensitivityValue] = useState('Média');
    const [minConfidence] = useState(88);

    return (
        <div className="flex h-screen bg-[#070614] text-white overflow-hidden font-sans relative">
            {isSidebarOpen && (
                <div className="absolute inset-y-0 left-0 z-50 flex shadow-2xl transition-all duration-300">
                    <SidebarDesktop
                        activeTab="detectar"
                        userName={userName}
                        userEmail={userEmail}
                        onNavigateToHome={onNavigateToHome}
                        onNavigateToHistory={onNavigateToHistory}
                        onNavigateToDetect={() => setIsSidebarOpen(false)}
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
                                <AudioWaveform size={22} className="text-purple-600" />
                            </div>
                            <div>
                                <span className="font-bold text-base block leading-tight">EchoSense</span>
                                <span className="text-[11px] text-purple-300/60 block">Sons que viram alerta</span>
                            </div>
                        </div>
                    </div>

                    <div className={`px-4 py-1.5 rounded-full border text-xs font-medium flex items-center gap-2 transition-colors ${
                        isDetecting
                            ? 'bg-[#111029] border-purple-500/30 text-purple-200'
                            : 'bg-[#111029] border-white/10 text-purple-300/50'
                    }`}>
                        <span className={`w-2 h-2 rounded-full ${
                            isDetecting ? 'bg-emerald-400 animate-pulse' : 'bg-gray-500'
                        }`}></span>
                        {isDetecting ? 'Detecção ativa' : 'Detecção pausada'}
                    </div>
                </header>

                <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-28 my-auto py-8">
                    <div className="flex flex-col items-center text-center">
                        <h1 className="text-3xl font-bold mb-2">
                            {isDetecting ? 'Detecção ativa' : 'Detecção pausada'}
                        </h1>

                        <div className="flex items-center gap-2 text-purple-200 text-base font-medium mb-1">
                            <HomeIcon size={18} className="text-purple-400" />
                            <span>{currentEnvironment}</span>
                        </div>

                        <p className="text-xs text-purple-300/60 mb-12">
                            {isDetecting ? 'Ouvindo o ambiente...' : 'Clique em iniciar para retomar o monitoramento'}
                        </p>

                        <div className="relative w-64 h-64 flex items-center justify-center">
                            <div className={`absolute inset-0 rounded-full border-[6px] transition-all duration-700 ${
                                isDetecting
                                    ? 'border-purple-400/60 scale-100 animate-pulse'
                                    : 'border-white/5 scale-95'
                            }`}></div>

                            <div className={`absolute inset-6 rounded-full border-[10px] transition-all duration-500 ${
                                isDetecting
                                    ? 'border-purple-600/80'
                                    : 'border-white/10'
                            }`}></div>

                            <div className={`w-32 h-32 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
                                isDetecting
                                    ? 'bg-purple-600 text-white shadow-purple-600/40'
                                    : 'bg-[#1a183b] text-purple-300/40'
                            }`}>
                                <AudioWaveform size={44} />
                            </div>
                        </div>
                    </div>

                    <div className="w-full max-w-sm bg-[#16152e] border border-white/5 p-7 rounded-3xl shadow-2xl">
                        <h2 className="text-base font-bold mb-6">Ajustes da detecção</h2>

                        <div className="mb-6">
                            <div className="flex justify-between text-xs mb-2.5">
                                <span className="text-purple-200/80">Sensibilidade</span>
                                <span className="font-semibold text-white">{sensitivityValue}</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/10 rounded-lg overflow-hidden relative">
                                <div className="absolute top-0 left-0 h-full bg-purple-500" style={{ width: '65%' }}></div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <div className="flex justify-between text-xs mb-2.5">
                                <span className="text-purple-200/80">Confiança mínima</span>
                                <span className="font-semibold text-white">{minConfidence}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/10 rounded-lg overflow-hidden relative">
                                <div className="absolute top-0 left-0 h-full bg-purple-500" style={{ width: `${minConfidence}%` }}></div>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsDetecting(!isDetecting)}
                            className={`w-full py-3.5 rounded-xl font-bold text-xs text-white transition-all cursor-pointer shadow-lg ${
                                isDetecting
                                    ? 'bg-[#dc2626] hover:bg-red-500 shadow-red-600/20'
                                    : 'bg-purple-600 hover:bg-purple-500 shadow-purple-600/30'
                            }`}
                        >
                            {isDetecting ? 'Parar detecção' : 'Iniciar detecção'}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}