import React from 'react';
import { ChevronLeft, Home, Clock, Search, Bell, User } from 'lucide-react';

// === Importação dos Assets Locais ===
import iconEcho from '../../assets/icon.png';
import reactLogo from '../../assets/react.svg';
import yamnetLogo from '../../assets/yamnet.png';
import pwaLogo from '../../assets/pwa.png';

interface AboutAppProps {
    onBack: () => void;
    onNavigate?: (tab: string) => void;
}

export const AboutApp: React.FC<AboutAppProps> = ({ onBack, onNavigate }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F8F7FA', paddingBottom: 0 }}>
            {/* Faixa Roxa Superior */}
            <div style={{ height: 24, backgroundColor: 'var(--purple, #5c3c92)', margin: '0 -22px 12px', width: 'calc(100% + 44px)', flexShrink: 0 }} />

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14, padding: '0 4px', position: 'relative' }}>
                <button
                    onClick={onBack}
                    style={{ background: 'transparent', border: 'none', padding: 4, cursor: 'pointer', position: 'absolute', left: 4, zIndex: 1 }}
                >
                    <ChevronLeft size={26} style={{ color: 'var(--purple, #5c3c92)' }} />
                </button>
                <h1 style={{ color: 'var(--purple, #5c3c92)', fontSize: 18, fontWeight: 700, margin: 0, width: '100%', textAlign: 'center' }}>
                    Sobre o EchoSense
                </h1>
            </div>

            {/* Conteúdo com Rolagem */}
            <div style={{ flex: 1, padding: '0 16px 16px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>

                <div style={{ background: 'white', borderRadius: 24, border: '1px solid #EFEAF8', padding: '24px 18px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxShadow: '0 4px 12px rgba(92, 60, 146, 0.04)', gap: 16 }}>

                    {/* Logotipo principal */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                        <img
                            src={iconEcho}
                            alt="EchoSense Icon"
                            style={{ width: '170px', height: '150px', objectFit: 'cover', marginBottom: 4 }}
                        />
                        <span style={{ fontSize: 12, color: '#7E7694', fontWeight: 500 }}>
                            Versão 1.0.0
                        </span>
                    </div>

                    <p style={{ fontSize: 13, color: '#2D2342', lineHeight: 1.5, margin: 0, maxWidth: '280px' }}>
                        O EchoSense transforma sons importantes em alertas visuais e luminosos, promovendo mais segurança, autonomia e inclusão.
                    </p>

                    {/* Bloco de Tecnologias */}
                    <div style={{ width: '100%', marginTop: 4 }}>
                        <h3 style={{ fontSize: 13, fontWeight: 700, color: '#1A102F', marginBottom: 12 }}>
                            Tecnologias utilizadas
                        </h3>


                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, width: '100%' }}>

                            {/* React */}
                            <div style={{ background: '#FAFAFC', borderRadius: 16, border: '1px solid #F0ECF8', padding: '20px 6px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 60 }}>
                                    <img src={reactLogo} alt="React" style={{ width: 70, height: 70, objectFit: 'contain' }} />
                                </div>
                                <span style={{ fontSize: 11, fontWeight: 700, color: '#2D2342' }}>React</span>
                            </div>

                            {/* YamNet (TensorFlow) */}
                            <div style={{ background: '#FAFAFC', borderRadius: 16, border: '1px solid #F0ECF8', padding: '30px 6px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 60 }}>
                                    <img src={yamnetLogo} alt="YamNet" style={{ width: 90, height: 90, objectFit: 'cover' }} />
                                </div>
                                <span style={{ fontSize: 10, fontWeight: 700, color: '#2D2342', textAlign: 'center', lineHeight: 1.2 }}>
                                     <span style={{ fontSize: 8, color: '#7E7694', display: 'block' }}></span>
                                </span>
                            </div>

                            {/* PWA */}
                            <div style={{ background: '#FAFAFC', borderRadius: 16, border: '1px solid #F0ECF8', padding: '30px 6px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 60 }}>
                                    <img src={pwaLogo} alt="PWA" style={{ width: 90, height: 90, objectFit: 'cover' }} />
                                </div>
                                <span style={{ fontSize: 11, fontWeight: 700, color: '#2D2342' }}></span>
                            </div>

                        </div>
                    </div>

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