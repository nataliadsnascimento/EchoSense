import React, { useState } from 'react';
import { SidebarDesktop } from '../../components/SidebarDesktop';
import {
    Bell,
    ChevronRight,
    Home as HomeIcon,
    Menu,
    Download,
    Calendar
} from 'lucide-react';

interface AdvancedAnalysisProps {
    userName: string;
    userEmail: string;
    currentEnvironment?: string;
    onNavigate?: (tab: string) => void;
    onNavigateToHome: () => void;
    onNavigateToHistory: () => void;
    onNavigateToDetect: () => void;
    onLogout: () => void;
}

export function AdvancedAnalysisDesktop({
    userName,
    userEmail,
    currentEnvironment = 'Casa',
    onNavigate,
    onNavigateToHome,
    onNavigateToHistory,
    onNavigateToDetect,
    onLogout
}: AdvancedAnalysisProps) {
    const firstName = userName.split(' ')[0];
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [periodoFiltro] = useState('Últimos 30 dias');

    return (
        <div className="flex h-screen bg-[#070614] text-white overflow-hidden font-sans relative">
            {isSidebarOpen && (
                <div className="absolute inset-y-0 left-0 z-50 flex shadow-2xl transition-all duration-300">
                    <SidebarDesktop
                         activeTab="inicio"
                         userName={userName}
                         userEmail={userEmail}
                         onNavigate={(tab) => {
                             setIsSidebarOpen(false);
                             onNavigate?.(tab);
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

            <main className="flex-1 p-8 overflow-y-auto">
                 <header className="flex justify-between items-center mb-6">
                     <div className="flex items-center gap-4">
                          <button
                              onClick={() => setIsSidebarOpen(true)}
                              className="bg-[#111029] border border-white/5 p-3 rounded-2xl text-purple-300 hover:text-white transition-colors cursor-pointer"
                              title="Abrir menu"
                          >
                              <Menu size={20} />
                          </button>
                          <div>
                               <h1 className="text-2xl font-bold flex items-center gap-2">
                                   Olá, {userName}! 👋
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

                         <button
                             onClick={() => onNavigate?.('alertas')}
                             className="bg-[#111029] border border-white/5 p-3 rounded-2xl text-purple-300 hover:text-white transition-colors relative cursor-pointer"
                             title="Ver alertas"
                         >
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

                 <div className="flex justify-between items-center border-b border-white/10 mb-8">
                     <div className="flex items-center gap-8">
                          <button
                              onClick={onNavigateToHome}
                              className="pb-3 text-sm font-semibold text-purple-300/50 hover:text-purple-200 transition-all cursor-pointer relative"
                          >
                              Painel geral
                          </button>

                          <button
                              className="pb-3 text-sm font-semibold text-purple-400 transition-all cursor-pointer relative"
                          >
                              Análise avançada
                              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500 rounded-full" />
                          </button>
                     </div>

                     <div className="flex items-center gap-3 pb-3">
                          <div className="bg-[#111029] border border-white/5 px-3 py-2 rounded-xl flex items-center gap-2 text-xs text-purple-200">
                               <Calendar size={14} className="text-purple-400" />
                               <span>{periodoFiltro}</span>
                          </div>
                          <button className="bg-[#111029] hover:bg-[#1a183b] border border-white/5 px-4 py-2 rounded-xl flex items-center gap-2 text-xs text-purple-200 transition-colors cursor-pointer">
                              <Download size={14} /> Exportar Relatório (PDF/CSV)
                          </button>
                     </div>
                 </div>

                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                     <div className="lg:col-span-2 bg-[#111029] p-6 rounded-3xl border border-white/5 shadow-xl flex flex-col justify-between">
                         <div className="flex justify-between items-center mb-6">
                             <div>
                                  <h2 className="text-base font-bold">Média de ruído por período</h2>
                                  <p className="text-xs text-purple-300/60">Análise de decibéis no ambiente {currentEnvironment}</p>
                             </div>
                             <div className="flex items-center gap-4 text-[11px]">
                                  <span className="flex items-center gap-1.5 text-rose-400">
                                      <span className="w-3 h-0.5 bg-rose-400 inline-block"></span> Nível de Alerta (70)
                                  </span>
                                  <span className="flex items-center gap-1.5 text-purple-400">
                                       <span className="w-3 h-0.5 bg-purple-400 inline-block"></span> Nível do ambiente (dB)
                                  </span>
                             </div>
                         </div>

                         <div className="relative h-48 w-full flex items-end justify-between px-2 pt-6 border-b border-white/10 gap-1">
                             <div className="absolute top-12 left-0 right-0 border-b border-dashed border-rose-400/40 z-10"></div>

                             {[35, 48, 60, 52, 32, 65, 74, 45, 41, 45, 72, 76, 55, 38, 42, 62, 68, 51, 60, 43, 62, 65, 50, 78, 84, 61, 55, 64].map((val, idx) => (
                                 <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                                     <div
                                          className="w-full bg-gradient-to-t from-purple-600/60 to-purple-400 rounded-t-sm transition-all group-hover:bg-purple-400"
                                          style={{ height: `${val}%` }}
                                     ></div>
                                 </div>
                             ))}
                         </div>

                         <div className="flex justify-between text-[10px] text-purple-300/40 pt-2 px-1">
                              <span>1 dia</span>
                              <span>5 dia</span>
                              <span>10 dia</span>
                              <span>15 dia</span>
                              <span>20 dia</span>
                              <span>25 dia</span>
                              <span>30 dia</span>
                         </div>
                     </div>

                     <div className="bg-[#111029] p-6 rounded-3xl border border-white/5 shadow-xl flex flex-col justify-between">
                          <div>
                              <h2 className="text-base font-bold mb-1">Padrões de horário - Mapas de calor</h2>
                              <p className="text-xs text-purple-300/60 mb-6">Horários com maior frequência de alertas</p>

                              <div className="flex items-end justify-between h-44 gap-1 px-1 bg-[#0b0a1e]/50 p-4 rounded-2xl border border-white/5">
                                   {[20, 15, 30, 40, 60, 90, 100, 95, 75, 50, 40, 35, 30, 25, 40, 55].map((intensity, i) => {
                                       let bgCol = "bg-purple-300/30";
                                       if (intensity > 70) bgCol = "bg-purple-600";
                                       else if (intensity > 40) bgCol = "bg-purple-400";

                                       return (
                                            <div key={i} className="flex-1 flex flex-col items-center h-full justify-end">
                                                <div
                                                     className={`w-full rounded-md ${bgCol} transition-all`}
                                                     style={{ height: `${intensity}%` }}
                                                ></div>
                                            </div>
                                       );
                                   })}
                              </div>
                          </div>

                          <div className="flex justify-between text-[10px] text-purple-300/50 pt-4">
                               <span>0h</span>
                               <span>4h</span>
                               <span>8h</span>
                               <span>12h</span>
                               <span>16h</span>
                               <span>20h</span>
                               <span>24h</span>
                          </div>
                     </div>
                 </div>

                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-[#111029] p-6 rounded-3xl border border-white/5 shadow-xl flex flex-col justify-between">
                         <h3 className="text-base font-bold mb-6">Distribuição por Categoria</h3>

                         <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 my-2">
                             <div className="flex items-center justify-center relative">
                                 <div className="w-40 h-40 rounded-full border-[16px] border-purple-500 border-t-amber-400 border-r-rose-500 border-b-cyan-500 flex items-center justify-center shadow-inner">
                                      <div className="text-center">
                                           <span className="text-xs text-purple-300/60 block">Total</span>
                                           <span className="text-lg font-bold">142</span>
                                      </div>
                                 </div>
                             </div>

                             <div className="flex flex-col gap-3 text-xs">
                                  <div className="flex items-center justify-between bg-white/[0.02] p-2.5 rounded-xl">
                                       <span className="flex items-center gap-2 font-medium">
                                           <span className="w-3 h-3 rounded-full bg-purple-500 inline-block"></span> Campainha
                                       </span>
                                       <span className="font-bold text-purple-300">35%</span>
                                  </div>
                                  <div className="flex items-center justify-between bg-white/[0.02] p-2.5 rounded-xl">
                                       <span className="flex items-center gap-2 font-medium">
                                             <span className="w-3 h-3 rounded-full bg-cyan-500 inline-block"></span> Choro de Bebê
                                       </span>
                                       <span className="font-bold text-cyan-400">25%</span>
                                  </div>
                                  <div className="flex items-center justify-between bg-white/[0.02] p-2.5 rounded-xl">
                                       <span className="flex items-center gap-2 font-medium">
                                             <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span> Alarme
                                       </span>
                                       <span className="font-bold text-rose-400">20%</span>
                                  </div>
                                  <div className="flex items-center justify-between bg-white/[0.02] p-2.5 rounded-xl">
                                        <span className="flex items-center gap-2 font-medium">
                                              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block"></span> Outros
                                        </span>
                                        <span className="font-bold text-amber-300">20%</span>
                                  </div>
                             </div>
                         </div>

                         <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] text-purple-300/50">
                              <span>Atualização em tempo real</span>
                              <span>Atualizado há 1 min</span>
                         </div>
                    </div>

                    <div className="bg-[#111029] p-6 rounded-3xl border border-white/5 shadow-xl flex flex-col justify-between">
                        <div>
                             <h3 className="text-base font-bold mb-1">Inspeção e Inteligência de Dados</h3>
                             <p className="text-xs text-purple-300/60 mb-6">Sumário em texto e as estatísticas consolidadas.</p>

                             <div className="flex flex-col gap-3 text-xs">
                                 <div className="bg-[#0b0a1e]/60 border border-white/5 p-3.5 rounded-2xl flex justify-between items-center">
                                      <span className="text-purple-300/70">Total de Alertas</span>
                                      <span className="font-bold text-white text-sm">142</span>
                                 </div>
                                 <div className="bg-[#0b0a1e]/60 border border-white/5 p-3.5 rounded-2xl flex justify-between items-center">
                                      <span className="text-purple-300/70">Nível de Ruído Máximo</span>
                                      <span className="font-bold text-rose-400">92 dB (Alarme)</span>
                                 </div>
                                 <div className="bg-[#0b0a1e]/60 border border-white/5 p-3.5 rounded-2xl flex justify-between items-center">
                                      <span className="text-purple-300/70">Dia Mais Ativo</span>
                                      <span className="font-bold text-white">Quarta-feira</span>
                                 </div>
                             </div>
                        </div>

                        <button
                            onClick={onNavigateToHistory}
                            className="w-full mt-6 bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/20 text-purple-300 hover:text-white text-xs font-semibold py-3 px-4 rounded-2xl transition-colors flex items-center justify-between cursor-pointer"
                        >
                            <span>Visualizar lista completa de ocorrências</span>
                            <ChevronRight size={16} />
                        </button>
                    </div>
                 </div>
            </main>
        </div>
    );
}