import React, { useState } from 'react';
import { Home, Clock, Search, Bell, User, ChevronLeft, Baby, AlertTriangle, DoorClosed, Dog, Volume2 } from 'lucide-react';
import { ConfirmModal } from '../components/ConfirmModal';

export interface AlertDetailItem {
    id?: string | number;
    title: string;
    confidence: string;
    dateOrTime: string;
    icon?: string;
}

interface AlertDetailsProps {
    onBack: () => void;
    onNavigate?: (tab: string) => void;
    onDeleteEvent?: () => void;
    mainAlert?: AlertDetailItem;
    relatedAlerts?: AlertDetailItem[];
    duration?: string;
    audioLevel?: string;
}

function getSoundIcon(soundName?: string, size: number = 20) {
    const name = String(soundName || '').toLowerCase();

    if (name.includes('campainha')) return <Bell size={size} />;
    if (name.includes('bebê') || name.includes('bebe') || name.includes('choro')) return <Baby size={size} />;
    if (name.includes('incêndio') || name.includes('fogo') || name.includes('alarme')) return <AlertTriangle size={size} />;
    if (name.includes('cão') || name.includes('cachorro') || name.includes('latido')) return <Dog size={size} />;
    if (name.includes('porta') || name.includes('batida')) return <DoorClosed size={size} />;

    return <Volume2 size={size} />;
}

export function AlertDetails({
                                 onBack,
                                 onNavigate,
                                 onDeleteEvent,
                                 mainAlert = {
                                     title: 'Campainha',
                                     confidence: '98%',
                                     dateOrTime: '27/12/2026 10:23:45',
                                 },
                                 relatedAlerts = [
                                     { id: 1, title: 'Choro de bebê', confidence: '97%', dateOrTime: '10:15:32'},
                                     { id: 2, title: 'Alarme', confidence: '96%', dateOrTime: '09:47:21'},
                                     { id: 3, title: 'Porta batendo', confidence: '93%', dateOrTime: '09:20:11'},
                                     { id: 4, title: 'Cachorro latindo', confidence: '93%', dateOrTime: '09:56:03'},
                                 ],
                                 duration = '3.2 segundos',
                                 audioLevel = 'Alto',
                             }: AlertDetailsProps) {

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleConfirmDelete = () => {
        setIsDeleteModalOpen(false);
        if (onDeleteEvent) {
            onDeleteEvent();
        }
    };

    return (
        <div className="flex-1 bg-[#F8F7FA] flex flex-col justify-between font-sans relative overflow-hidden">

            <div className="w-full h-7 bg-[#4C3B78]" />

            <div className="flex-1 p-4 overflow-y-auto pb-24">

                <div className="flex items-center gap-4 mb-5 mt-1">
                    <button
                        onClick={onBack}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-purple-50 text-[#4C3B78] hover:bg-purple-50 cursor-pointer"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <h1 className="text-xl font-bold text-[#352555]">Detalhes do alerta</h1>
                </div>

                <div className="bg-white rounded-[24px] p-6 shadow-sm border border-purple-50 flex flex-col items-center justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-[#F1ECF9] flex items-center justify-center mb-3 text-[#5C3C92]">
                        {getSoundIcon(mainAlert.title, 28)}
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-0.5">{mainAlert.title}</h2>
                    <span className="text-xs text-gray-400 font-medium mb-1">
            Confiança: {mainAlert.confidence}
          </span>
                    <span className="text-xs text-gray-400 font-mono">
            {mainAlert.dateOrTime}
          </span>
                </div>

                <div className="bg-white rounded-[24px] shadow-sm border border-purple-50 overflow-hidden mb-4 divide-y divide-gray-100">
                    {relatedAlerts.map((item) => (
                        <div key={item.id || item.title} className="p-3.5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-[#F4EFFB] flex items-center justify-center text-[#5C3C92]">
                                    {getSoundIcon(item.title, 20)}
                                </div>
                                <div>
                                    <h3 className="text-xs font-bold text-gray-800">{item.title}</h3>
                                    <span className="text-[10px] text-gray-400 font-medium">
                    Confiança: {item.confidence}
                  </span>
                                </div>
                            </div>
                            <span className="text-[10px] text-gray-400 font-mono">
                {item.dateOrTime}
              </span>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-[20px] shadow-sm border border-purple-50 overflow-hidden mb-5 divide-y divide-gray-100">
                    <div className="p-3.5 flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-800">Duração do som</span>
                        <span className="text-xs text-gray-600 font-medium">{duration}</span>
                    </div>
                    <div className="p-3.5 flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-800">Nível do áudio</span>
                        <span className="text-xs text-gray-600 font-medium">{audioLevel}</span>
                    </div>
                </div>

                <button
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="w-full bg-[#D91E18] hover:bg-red-700 active:bg-red-800 text-white font-bold py-3.5 rounded-[18px] text-sm shadow-md transition-colors cursor-pointer"
                >
                    Excluir evento
                </button>
            </div>

            <ConfirmModal
                isOpen={isDeleteModalOpen}
                title="Deseja excluir este evento?"
                confirmLabel="Excluir"
                onConfirm={handleConfirmDelete}
                onCancel={() => setIsDeleteModalOpen(false)}
            />

            <nav className="absolute bottom-0 left-0 right-0 h-16 bg-white border-t border-purple-50 grid grid-cols-5 items-center justify-items-center px-1">
                <button onClick={() => onNavigate?.('inicio')} className="flex flex-col items-center gap-0.5 text-gray-400 hover:text-[#5C3C92] cursor-pointer">
                    <Home size={20} />
                    <span className="text-[10px] font-medium">Início</span>
                </button>
                <button onClick={() => onNavigate?.('historico')} className="flex flex-col items-center gap-0.5 text-gray-400 hover:text-[#5C3C92] cursor-pointer">
                    <Clock size={20} />
                    <span className="text-[10px] font-medium">Histórico</span>
                </button>
                <button onClick={() => onNavigate?.('detectar')} className="flex flex-col items-center gap-0.5 text-gray-400 hover:text-[#5C3C92] cursor-pointer">
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