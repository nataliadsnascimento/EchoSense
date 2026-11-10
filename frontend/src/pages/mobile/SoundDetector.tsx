import React from 'react';
import { ChevronLeft, Bell, Baby, AlertTriangle, DoorClosed, Dog, Home, Clock, Search, User } from 'lucide-react';

interface SoundItem {
    id: string;
    title: string;
    confidence: number;
    time: string;
    icon: React.ReactNode;
    isAlarm?: boolean;
}

interface DetectarSonsProps {
    onBack?: () => void;
    onNavigate?: (tab: string) => void;
}

const detectedSounds: SoundItem[] = [
    { id: '1', title: 'Campainha', confidence: 98, time: '10:22:45', icon: <Bell size={24} /> },
    { id: '2', title: 'Choro de bebê', confidence: 97, time: '10:15:32', icon: <Baby size={24} /> },
    { id: '3', title: 'Alarme', confidence: 96, time: '09:47:21', icon: <AlertTriangle size={24} />, isAlarm: true },
    { id: '4', title: 'Porta batendo', confidence: 93, time: '09:20:11', icon: <DoorClosed size={24} /> },
    { id: '5', title: 'Cachorro latindo', confidence: 93, time: '09:56:03', icon: <Dog size={24} /> }
];

export const SoundDetector: React.FC<DetectarSonsProps> = ({ onBack, onNavigate }) => {
    return (
        <div className="onboarding-screen" style={{ display: 'flex', flexDirection: 'column', height: '100%', paddingBottom: 0 }}>
            <div
                style={{
                    height: 28,
                    backgroundColor: 'var(--purple)',
                    margin: '0 -22px 12px',
                    width: 'calc(100% + 44px)',
                    flexShrink: 0
                }}
            />

            <div className="onboarding-header" style={{ marginBottom: 16, marginTop: 4, alignItems: 'center', display: 'flex' }}>
                <button
                    className="icon-button"
                    style={{ width: 44, height: 44, flexShrink: 0, transform: 'translate(16px, 8px)' }}
                    onClick={onBack}
                >
                    <ChevronLeft size={26} />
                </button>
                <div style={{ textAlign: 'center', flex: 1, marginRight: 44, transform: 'translateY(20px)' }}>
                    <h1 style={{ color: 'var(--purple)', fontSize: 22, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>
                        Sons detectados
                    </h1>
                    <span style={{ color: 'var(--muted)', fontSize: 13 }}>Em tempo real</span>
                </div>
            </div>

            <div className="onboarding-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', paddingBottom: 8, marginTop: 32 }}>
                <div
                    className="info-card"
                    style={{
                        padding: 0,
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        border: '1.5px solid var(--border)',
                        borderRadius: 20,
                        boxShadow: '0 4px 14px rgba(76, 52, 138, 0.08)'
                    }}
                >
                    {detectedSounds.map((item, index) => (
                        <div
                            key={item.id}
                            className="event-card"
                            style={{
                                borderRadius: 0,
                                border: 'none',
                                borderBottom: index < detectedSounds.length - 1 ? '1px solid var(--border)' : 'none',
                                padding: '14px 16px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 14
                            }}
                        >
                            <div
                                className="event-icon"
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 12,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: item.isAlarm ? '#fde8e8' : '#f0ebfb',
                                    color: item.isAlarm ? '#d9534f' : 'var(--purple)',
                                    padding: 0
                                }}
                            >
                                {item.icon}
                            </div>

                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <strong style={{ fontSize: 15, color: 'var(--text)' }}>{item.title}</strong>
                                <small style={{ color: 'var(--muted)', fontSize: 12 }}>Confiança: {item.confidence}%</small>
                            </div>

                            <span style={{
                                fontSize: 12,
                                color: 'var(--muted)',
                                whiteSpace: 'nowrap',
                                alignSelf: 'center',
                                marginLeft: 'auto'
                            }}>
                                {item.time}
                            </span>
                        </div>
                    ))}
                </div>
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
                <button className="skip-button" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: 0, width: '100%' }} onClick={() => onNavigate?.('inicio')}>
                    <Home size={20} style={{ color: '#948EA5' }} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#948EA5' }}>Início</span>
                </button>

                <button className="skip-button" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: 0, width: '100%' }} onClick={() => onNavigate?.('historico')}>
                    <Clock size={20} style={{ color: '#948EA5' }} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#948EA5' }}>Histórico</span>
                </button>

                <button className="skip-button" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: 0, width: '100%' }}>
                    <div style={{ background: '#eee8fc', borderRadius: 16, padding: '4px 14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Search size={20} style={{ color: 'var(--purple)' }} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--purple)' }}>Detectar</span>
                </button>

                <button className="skip-button" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: 0, width: '100%' }} onClick={() => onNavigate?.('alertas')}>
                    <Bell size={20} style={{ color: '#948EA5' }} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#948EA5' }}>Alertas</span>
                </button>

                <button className="skip-button" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: 0, width: '100%' }} onClick={() => onNavigate?.('perfil')}>
                    <User size={20} style={{ color: '#948EA5' }} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#948EA5' }}>Perfil</span>
                </button>
            </nav>
        </div>
    );
};