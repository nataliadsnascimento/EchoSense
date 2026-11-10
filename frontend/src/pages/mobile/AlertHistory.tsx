import React, { useState } from 'react';
import {
    ChevronLeft,
    SlidersHorizontal,
    Bell,
    Baby,
    Play,
    Send,
    Home,
    Clock,
    Search,
    User
} from 'lucide-react';

interface HistoryGroup {
    id: string;
    title: string;
    detections: number;
    time: string;
    confidence: number;
    icon: React.ReactNode;
}

interface HistoricoAlertasProps {
    onBack?: () => void;
    onOpenFilter?: () => void;
    onNavigate?: (tab: string) => void;
    onSelectAlert?: (alerta?: any) => void;
}

const historyGroups: HistoryGroup[] = [
    { id: '1', title: 'Campainha', detections: 1, time: '10:15', confidence: 97, icon: <Bell size={20} /> },
    { id: '2', title: 'Choro de bebê', detections: 1, time: '09:56', confidence: 93, icon: <Baby size={20} /> }
];

export const AlertHistory: React.FC<HistoricoAlertasProps> = ({ onBack, onOpenFilter, onNavigate }) => {
    const [feedbacks, setFeedbacks] = useState<{ [key: string]: string }>({});

    const handleFeedbackChange = (id: string, text: string) => {
        setFeedbacks(prev => ({ ...prev, [id]: text }));
    };

    const handleSendFeedback = (id: string) => {
        const texto = feedbacks[id];
        if (texto && texto.trim() !== '') {
            alert(`Feedback enviado para o item ${id}: "${texto}"`);
            setFeedbacks(prev => ({ ...prev, [id]: '' }));
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F8F7FA', paddingBottom: 0 }}>
            <div
                style={{
                    height: 24,
                    backgroundColor: 'var(--purple, #5c3c92)',
                    margin: '0 -22px 8px',
                    width: 'calc(100% + 44px)',
                    flexShrink: 0
                }}
            />

            <div
                className="onboarding-header"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                    marginTop: 2
                }}
            >
                <button
                    className="icon-button"
                    style={{
                        background: 'transparent',
                        border: 'none',
                        padding: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: 'none'
                    }}
                    onClick={onBack}
                >
                    <ChevronLeft size={26} style={{ color: 'var(--purple, #5c3c92)' }} />
                </button>

                <h1 style={{ color: 'var(--purple, #5c3c92)', fontSize: 20, fontWeight: 700, margin: 0, textAlign: 'center' }}>
                    Histórico de alertas
                </h1>

                <button
                    className="icon-button"
                    style={{
                        width: 38,
                        height: 38,
                        borderRadius: '50%',
                        border: '1px solid var(--border, #E2E8F0)',
                        background: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
                    }}
                    onClick={onOpenFilter}
                >
                    <SlidersHorizontal size={18} style={{ color: 'var(--purple, #5c3c92)' }} />
                </button>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto', paddingBottom: 10 }}>
                {historyGroups.map((group) => (
                    <div
                        key={group.id}
                        style={{
                            background: 'white',
                            borderRadius: 16,
                            border: '1px solid #EFEAF8',
                            overflow: 'hidden',
                            boxShadow: '0 2px 8px rgba(92, 60, 146, 0.04)'
                        }}
                    >

                        <div
                            style={{
                                background: '#EDE8F7',
                                padding: '8px 12px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10
                            }}
                        >
                            <div
                                style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: 10,
                                    background: '#DFD7F3',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--purple, #5c3c92)'
                                }}
                            >
                                {group.icon}
                            </div>
                            <div>
                                <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#2D2342' }}>{group.title}</h3>
                                <span style={{ fontSize: 11, color: '#7E7694' }}>{group.detections} detecção</span>
                            </div>
                        </div>

                        <div
                            style={{
                                padding: '8px 12px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderBottom: '1px solid #F0ECF8'
                            }}
                        >
                            <div>
                                <h4 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#2D2342' }}>{group.title}</h4>
                                <span style={{ fontSize: 11, color: '#7E7694' }}>Confiança: {group.confidence}%</span>
                            </div>
                            <span style={{ fontSize: 11, color: '#7E7694', fontWeight: 500 }}>{group.time}</span>
                        </div>

                        <div
                            style={{
                                padding: '8px 12px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderBottom: '1px solid #F0ECF8'
                            }}
                        >
                            <div>
                                <h4 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#2D2342' }}>
                                    Repetir som (disponível por 24h)
                                </h4>
                                <span style={{ fontSize: 11, color: '#7E7694' }}>Salvo localmente e expira após 24 horas.</span>
                            </div>
                            <button
                                style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: '50%',
                                    background: '#F0EBFB',
                                    border: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    flexShrink: 0
                                }}
                            >
                                <Play size={14} style={{ color: 'var(--purple, #5c3c92)', marginLeft: 2 }} fill="var(--purple, #5c3c92)" />
                            </button>
                        </div>

                        <div
                            style={{
                                padding: '8px 12px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 4
                            }}
                        >
                            <h4 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#2D2342' }}>Feedback do som</h4>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <input
                                    type="text"
                                    value={feedbacks[group.id] || ''}
                                    onChange={(e) => handleFeedbackChange(group.id, e.target.value)}
                                    placeholder="Escreva seu feedback sobre este som..."
                                    style={{
                                        flex: 1,
                                        border: '1px solid #EFEAF8',
                                        borderRadius: 8,
                                        padding: '6px 10px',
                                        fontSize: 12,
                                        color: '#2D2342',
                                        outline: 'none',
                                        background: '#F8F7FA',
                                        height: 32
                                    }}
                                />
                                <button
                                    style={{
                                        width: 32,
                                        height: 32,
                                        borderRadius: '50%',
                                        background: 'var(--purple, #5c3c92)',
                                        border: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        flexShrink: 0
                                    }}
                                    onClick={() => handleSendFeedback(group.id)}
                                >
                                    <Send size={14} style={{ color: 'white' }} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <nav style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                alignItems: 'center',
                justifyItems: 'center',
                height: 72,
                borderTop: '1px solid #EFEAF8',

                background: 'white',
                paddingTop: 8,
                paddingBottom: 12
            }}>
                <button className="skip-button" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: 0, width: '100%', background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => onNavigate?.('inicio')}>
                    <Home size={20} style={{ color: '#948EA5' }} />
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#948EA5' }}>Início</span>
                </button>

                <button className="skip-button" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: 0, width: '100%', background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => onNavigate?.('historico')}>
                    <div style={{ background: '#eee8fc', borderRadius: 14, padding: '3px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Clock size={18} style={{ color: 'var(--purple, #5c3c92)' }} />
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--purple, #5c3c92)' }}>Histórico</span>
                </button>

                <button className="skip-button" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: 0, width: '100%', background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => onNavigate?.('detectar')}>
                    <Search size={20} style={{ color: '#948EA5' }} />
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#948EA5' }}>Detectar</span>
                </button>

                <button className="skip-button" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: 0, width: '100%', background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => onNavigate?.('alertas')}>
                    <Bell size={20} style={{ color: '#948EA5' }} />
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#948EA5' }}>Alertas</span>
                </button>

                <button className="skip-button" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: 0, width: '100%', background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => onNavigate?.('perfil')}>
                    <User size={20} style={{ color: '#948EA5' }} />
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#948EA5' }}>Perfil</span>
                </button>
            </nav>
        </div>
    );
};