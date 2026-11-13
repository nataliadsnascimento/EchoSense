import React from 'react';
import {
    User,
    Lock,
    Cpu,
    Sliders,
    ChevronRight,
    Home,
    Clock,
    Search,
    Bell
} from 'lucide-react';

interface UserProfileProps {
    onNavigate?: (tab: string) => void;
    onLogout?: () => void;
    userName?: string;
    userEmail?: string;
    onOpenSettings?: () => void;
    onOpenLogoutModal?: () => void;
    onOpenChangePassword?: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
                                                            onNavigate,
                                                            userName,
                                                            userEmail,
                                                            onOpenSettings,
                                                            onOpenLogoutModal,
                                                            onOpenChangePassword
                                                        }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F8F7FA', paddingBottom: 0 }}>
            {/* Faixa Roxa Superior */}
            <div
                style={{
                    height: 24,
                    backgroundColor: 'var(--purple, #5c3c92)',
                    margin: '0 -22px 12px',
                    width: 'calc(100% + 44px)',
                    flexShrink: 0
                }}
            />

            {/* Header com Título */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, padding: '0 4px', position: 'relative' }}>
                <h1 style={{ color: 'var(--purple, #5c3c92)', fontSize: 18, fontWeight: 700, margin: 0, textAlign: 'center' }}>
                    Meu perfil
                </h1>
            </div>

            {/* Conteúdo com Rolagem */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14, overflowY: 'auto', padding: '0 4px 16px' }}>

                {/* Card de Identificação Dinâmica do Usuário */}
                <div style={{ background: 'white', borderRadius: 20, border: '1px solid #EFEAF8', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 4px 12px rgba(92, 60, 146, 0.04)' }}>
                    <div style={{ width: 64, height: 64, borderRadius: '50%', border: '1px solid #EFEAF8', background: '#F8F7FA', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10, color: 'var(--purple, #5c3c92)' }}>
                        <User size={32} />
                    </div>
                    <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1A102F', margin: '0 0 2px' }}>{userName}</h2>
                    <span style={{ fontSize: 12, color: '#7E7694' }}>{userEmail}</span>
                </div>

                {/* Lista de Opções de Menu */}
                <div style={{ background: 'white', borderRadius: 20, border: '1px solid #EFEAF8', overflow: 'hidden', boxShadow: '0 2px 8px rgba(92, 60, 146, 0.04)' }}>

                    <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #F0ECF8', cursor: 'pointer' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ width: 32, height: 32, borderRadius: 10, background: '#EDE8F7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--purple, #5c3c92)' }}>
                                <User size={16} />
                            </div>
                            <span style={{ fontSize: 13, fontWeight: 600, color: '#2D2342' }}>Editar perfil</span>
                        </div>
                        <ChevronRight size={18} style={{ color: '#7E7694' }} />
                    </div>

                    <div
                        onClick={onOpenChangePassword}
                        style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #F0ECF8', cursor: 'pointer' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ width: 32, height: 32, borderRadius: 10, background: '#EDE8F7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--purple, #5c3c92)' }}>
                                <Lock size={16} />
                            </div>
                            <span style={{ fontSize: 13, fontWeight: 600, color: '#2D2342' }}>Alterar senha</span>
                        </div>
                        <ChevronRight size={18} style={{ color: '#7E7694' }} />
                    </div>

                    <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #F0ECF8', cursor: 'pointer' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ width: 32, height: 32, borderRadius: 10, background: '#EDE8F7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--purple, #5c3c92)' }}>
                                <Cpu size={16} />
                            </div>
                            <span style={{ fontSize: 13, fontWeight: 600, color: '#2D2342' }}>Dispositivos</span>
                        </div>
                        <ChevronRight size={18} style={{ color: '#7E7694' }} />
                    </div>

                    {/* Exemplo: Preferências abrindo a tela de configurações */}
                    <div
                        onClick={onOpenSettings}
                        style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ width: 32, height: 32, borderRadius: 10, background: '#EDE8F7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--purple, #5c3c92)' }}>
                                <Sliders size={16} />
                            </div>
                            <span style={{ fontSize: 13, fontWeight: 600, color: '#2D2342' }}>Preferências</span>
                        </div>
                        <ChevronRight size={18} style={{ color: '#7E7694' }} />
                    </div>

                </div>

                {/* Botão Sair da Conta */}
                <button
                    onClick={onOpenLogoutModal}
                    style={{
                        background: 'white',
                        border: '1px solid #FEE2E2',
                        borderRadius: 16,
                        padding: '12px',
                        color: '#EF4444',
                        fontSize: 14,
                        fontWeight: 700,
                        cursor: 'pointer',
                        textAlign: 'center',
                        boxShadow: '0 2px 8px rgba(239, 68, 68, 0.04)'
                    }}
                >
                    Sair da conta
                </button>

            </div>

            {/* Barra de Navegação Inferior */}
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
                    <div style={{ background: '#eee8fc', borderRadius: 14, padding: '3px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <User size={18} style={{ color: 'var(--purple, #5c3c92)' }} />
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--purple, #5c3c92)' }}>Perfil</span>
                </button>
            </nav>
        </div>
    );
};