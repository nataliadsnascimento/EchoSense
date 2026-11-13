import React, { useState } from 'react';
import { ChevronLeft, Home, Clock, Search, Bell, User, Check } from 'lucide-react';

interface OfflineSyncProps {
    onBack: () => void;
    onNavigate?: (tab: string) => void;
    eventosPendentes?: Array<{
        id: string | number;
        name: string;
        time: string;
        date?: string;
        icon?: string;
    }>;
    onSyncComplete?: () => void;
}

function getEventIcon(name: string) {
    const n = name.toLowerCase();
    if (n.includes('campainha')) return '🔔';
    if (n.includes('bebê') || n.includes('choro')) return '👶';
    if (n.includes('incêndio') || n.includes('fogo') || n.includes('alarme')) return '🚨';
    if (n.includes('porta')) return '🚪';
    if (n.includes('latido') || n.includes('cão')) return '🐕';
    if (n.includes('buzina')) return '🚗';
    return '🔊';
}

export const OfflineSync: React.FC<OfflineSyncProps> = ({
                                                            onBack,
                                                            onNavigate,
                                                            eventosPendentes = [],
                                                            onSyncComplete
                                                        }) => {
    const [sincronizado, setSincronizado] = useState(false);
    const [dadosSincronizados, setDadosSincronizados] = useState({
        quantidade: 0,
        dataHora: ''
    });

    const handleSyncNow = () => {
        const qtd = eventosPendentes.length;
        const agora = new Date();
        const dataFormatada = agora.toLocaleDateString('pt-BR');
        const horaFormatada = agora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        setDadosSincronizados({
            quantidade: qtd,
            dataHora: `${dataFormatada} ${horaFormatada}`
        });

        // Dispara a tela de sucesso dinamicamente ao concluir
        setSincronizado(true);
        if (onSyncComplete) onSyncComplete();
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F8F7FA', paddingBottom: 0 }}>
            {/* Faixa Roxa Superior */}
            <div style={{ height: 24, backgroundColor: 'var(--purple, #5c3c92)', margin: '0 -22px 12px', width: 'calc(100% + 44px)', flexShrink: 0 }} />

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16, padding: '0 4px', position: 'relative' }}>
                <button
                    onClick={onBack}
                    style={{ background: 'transparent', border: 'none', padding: 4, cursor: 'pointer', position: 'absolute', left: 4, zIndex: 1 }}
                >
                    <ChevronLeft size={26} style={{ color: 'var(--purple, #5c3c92)' }} />
                </button>
                <h1 style={{ color: 'var(--purple, #5c3c92)', fontSize: 18, fontWeight: 700, margin: 0, width: '100%', textAlign: 'center' }}>
                    Sincronização
                </h1>
            </div>

            {/* Conteúdo com Rolagem */}
            <div style={{ flex: 1, padding: '0 16px 16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>

                {!sincronizado ? (
                    <>
                        {/* ── ESTADO 1: OFFLINE / PENDENTE ── */}
                        <div style={{ background: 'white', borderRadius: 24, border: '1px solid #EFEAF8', padding: '24px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxShadow: '0 4px 12px rgba(92, 60, 146, 0.04)', flexShrink: 0 }}>
                            <div style={{ width: 140, height: 112, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7C3AED' }}>
                                <svg width="124" height="96" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19.36 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.64-4.96z" fill="#7C3AED" opacity="0.95"/>
                                    <path d="M9 15c.6-.6 1.4-1.2 3.2-1.2 1.3 0 2.2.4 2.8.9M7.2 12.2c1.2-1 2.6-1.6 5.4-1.6 1.3 0 2.5.3 3.6.8" stroke="white" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
                                    <line x1="3.5" y1="3.5" x2="20.5" y2="20.5" stroke="white" strokeWidth="2.4" strokeLinecap="round"/>
                                </svg>
                            </div>
                            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1A102F', margin: '0 0 4px' }}>
                                Você está offline
                            </h2>
                            <span style={{ fontSize: 12, color: '#7E7694' }}>
                                {eventosPendentes.length} {eventosPendentes.length === 1 ? 'evento aguardando sincronização' : 'eventos aguardando sincronização'}
                            </span>
                        </div>

                        {/* Lista de Eventos Pendentes Dinâmica com Rolagem Protegida */}
                        {eventosPendentes.length > 0 && (
                            <div style={{
                                background: 'white',
                                borderRadius: 20,
                                border: '1px solid #EFEAF8',
                                padding: '12px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 8,
                                boxShadow: '0 2px 8px rgba(92, 60, 146, 0.04)',
                                maxHeight: '260px',
                                overflowY: 'auto'
                            }}>
                                {eventosPendentes.map((item) => {
                                    const iconeExibicao = item.icon || getEventIcon(item.name);
                                    return (
                                        <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: '#FAFAFC', borderRadius: 14, border: '1px solid #F0ECF8', flexShrink: 0 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
                                                <div style={{ width: 36, height: 36, borderRadius: 10, background: '#EDE8F7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                                                    {iconeExibicao}
                                                </div>
                                                <div>
                                                    <h4 style={{ fontSize: 13, fontWeight: 700, color: '#2D2342', margin: 0 }}>{item.name}</h4>
                                                </div>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <span style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#2D2342' }}>{item.time}</span>
                                                <span style={{ display: 'block', fontSize: 10, color: '#7E7694' }}>{item.date || 'Hoje'}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Botão Sincronizar Agora */}
                        <button
                            onClick={handleSyncNow}
                            style={{
                                background: 'var(--purple, #5c3c92)',
                                color: 'white',
                                border: 'none',
                                borderRadius: 16,
                                padding: '14px',
                                fontSize: 14,
                                fontWeight: 700,
                                cursor: 'pointer',
                                textAlign: 'center',
                                boxShadow: '0 4px 12px rgba(92, 60, 146, 0.2)',
                                flexShrink: 0
                            }}
                        >
                            Sincronizar agora
                        </button>

                        <p style={{ fontSize: 11, color: '#7E7694', textAlign: 'center', margin: '0 16px 8px', lineHeight: 1.4, flexShrink: 0 }}>
                            A sincronização será feita automaticamente quando a conexão for restaurada.
                        </p>
                    </>
                ) : (
                    <>
                        {/* ── ESTADO 2: SUCESSO / CONCLUÍDO ── */}

                        <div style={{ background: 'white', borderRadius: 20, border: '1px solid #EFEAF8', padding: '28px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxShadow: '0 4px 12px rgba(92, 60, 146, 0.04)' }}>
                            <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#E6F4EA', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, color: '#137333' }}>
                                <Check size={32} strokeWidth={2.5} />
                            </div>
                            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1A102F', margin: '0 0 6px' }}>
                                Sincronização concluída!
                            </h2>
                            <span style={{ fontSize: 12, color: '#7E7694', lineHeight: 1.4, maxWidth: '240px' }}>
                                Todos os eventos foram enviados com sucesso.
                            </span>
                        </div>

                        <div style={{ background: 'white', borderRadius: 20, border: '1px solid #EFEAF8', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(92, 60, 146, 0.04)' }}>
                            <div>
                                <span style={{ display: 'block', fontSize: 11, color: '#7E7694', marginBottom: 2 }}>Enviados</span>
                                <span style={{ fontSize: 14, fontWeight: 700, color: '#1A102F' }}>
                                    {dadosSincronizados.quantidade} {dadosSincronizados.quantidade === 1 ? 'evento' : 'eventos'}
                                </span>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <span style={{ display: 'block', fontSize: 11, color: '#7E7694', marginBottom: 2 }}>Data e hora</span>
                                <span style={{ fontSize: 13, fontWeight: 700, color: '#1A102F' }}>
                                    {dadosSincronizados.dataHora}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={onBack}
                            style={{
                                background: 'var(--purple, #5c3c92)',
                                color: 'white',
                                border: 'none',
                                borderRadius: 16,
                                padding: '14px',
                                fontSize: 14,
                                fontWeight: 700,
                                cursor: 'pointer',
                                textAlign: 'center',
                                boxShadow: '0 4px 12px rgba(92, 60, 146, 0.2)',
                                marginTop: 8
                            }}
                        >
                            OK
                        </button>
                    </>
                )}

            </div>

            {/* Barra de Navegação Inferior Padronizada */}
            <nav style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                alignItems: 'center',
                justifyItems: 'center',
                height: 72,
                borderTop: '1px solid #EFEAF8',
                background: 'white',
                paddingTop: 8,
                paddingBottom: 12,
                flexShrink: 0
            }}>
                <button style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => onNavigate?.('inicio')}>
                    <Home size={20} style={{ color: '#948EA5' }} />
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#948EA5' }}>Início</span>
                </button>
                <button style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => onNavigate?.('historico')}>
                    <Clock size={20} style={{ color: '#948EA5' }} />
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#948EA5' }}>Histórico</span>
                </button>
                <button style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => onNavigate?.('detectar')}>
                    <Search size={20} style={{ color: '#948EA5' }} />
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#948EA5' }}>Detectar</span>
                </button>
                <button style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => onNavigate?.('alertas')}>
                    <Bell size={20} style={{ color: '#948EA5' }} />
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#948EA5' }}>Alertas</span>
                </button>
                <button style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => onNavigate?.('perfil')}>
                    <User size={20} style={{ color: '#948EA5' }} />
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#948EA5' }}>Perfil</span>
                </button>
            </nav>
        </div>
    );
};