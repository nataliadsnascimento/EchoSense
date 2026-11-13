import React from 'react';
import { ChevronLeft, ChevronRight, Home, Clock, Search, Bell, User, HelpCircle, MessageSquare, PhoneCall, Send } from 'lucide-react';

interface HelpSupportProps {
    onBack: () => void;
    onNavigate?: (tab: string) => void;
    onOpenChat?: () => void;
}

export const HelpSupport: React.FC<HelpSupportProps> = ({ onBack, onNavigate, onOpenChat }) => {
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
                    Ajuda e suporte
                </h1>
            </div>

            {/* Conteúdo com Rolagem */}
            <div style={{ flex: 1, padding: '0 16px 16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>

                {/* Card Principal com a Lista de Opções */}
                <div style={{ background: 'white', borderRadius: 24, border: '1px solid #EFEAF8', padding: '16px', display: 'flex', flexDirection: 'column', gap: 12, boxShadow: '0 4px 12px rgba(92, 60, 146, 0.04)' }}>

                    {/* Item 1: Como o EchoSense funciona? */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: '#FAFAFC', borderRadius: 16, border: '1px solid #F0ECF8', cursor: 'pointer' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ width: 40, height: 40, borderRadius: 12, background: '#EDE8F7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--purple, #5c3c92)' }}>
                                <HelpCircle size={20} />
                            </div>
                            <span style={{ fontSize: 13, fontWeight: 700, color: '#1A102F' }}>Como o EchoSense funciona?</span>
                        </div>
                        <ChevronRight size={18} style={{ color: '#7E7694' }} />
                    </div>

                    {/* Item 2: Perguntas frequentes */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: '#FAFAFC', borderRadius: 16, border: '1px solid #F0ECF8', cursor: 'pointer' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ width: 40, height: 40, borderRadius: 12, background: '#EDE8F7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--purple, #5c3c92)' }}>
                                <Bell size={20} />
                            </div>
                            <span style={{ fontSize: 13, fontWeight: 700, color: '#1A102F' }}>Perguntas frequentes</span>
                        </div>
                        <ChevronRight size={18} style={{ color: '#7E7694' }} />
                    </div>

                    {/* Item 3: Fale conosco */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: '#FAFAFC', borderRadius: 16, border: '1px solid #F0ECF8', cursor: 'pointer' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ width: 40, height: 40, borderRadius: 12, background: '#EDE8F7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--purple, #5c3c92)' }}>
                                <PhoneCall size={20} />
                            </div>
                            <span style={{ fontSize: 13, fontWeight: 700, color: '#1A102F' }}>Fale conosco</span>
                        </div>
                        <ChevronRight size={18} style={{ color: '#7E7694' }} />
                    </div>

                    {/* Item 4: Enviar feedback */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: '#FAFAFC', borderRadius: 16, border: '1px solid #F0ECF8', cursor: 'pointer' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ width: 40, height: 40, borderRadius: 12, background: '#EDE8F7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--purple, #5c3c92)' }}>
                                <Send size={20} />
                            </div>
                            <span style={{ fontSize: 13, fontWeight: 700, color: '#1A102F' }}>Enviar feedback</span>
                        </div>
                        <ChevronRight size={18} style={{ color: '#7E7694' }} />
                    </div>

                </div>

                {/* Card Inferior: Ainda precisa de ajuda? */}
                <div style={{ background: 'white', borderRadius: 24, border: '1px solid #EFEAF8', padding: '20px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxShadow: '0 4px 12px rgba(92, 60, 146, 0.04)', gap: 12 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1A102F', margin: 0 }}>
                            Ainda precisa de ajuda?
                        </h3>
                        <span style={{ fontSize: 12, color: '#7E7694' }}>
                            Nosso time está pronto para te ajudar.
                        </span>
                    </div>

                    <button
                        onClick={onOpenChat}
                        style={{
                            width: '100%',
                            backgroundColor: 'var(--purple, #5c3c92)',
                            color: 'white',
                            border: 'none',
                            borderRadius: 16,
                            padding: '12px',
                            fontSize: 14,
                            fontWeight: 700,
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(92, 60, 146, 0.2)'
                        }}
                    >
                        Abrir chat
                    </button>
                </div>

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