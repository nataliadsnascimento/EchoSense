import React, { useState } from 'react';
import { ChevronLeft, Sliders, Volume2, Shield, Zap, Smartphone, RefreshCw, ChevronRight } from 'lucide-react';

interface GeneralSettingsProps {
    onBack: () => void;
    onNavigate?: (tab: string) => void;
}

export const GeneralSettings: React.FC<GeneralSettingsProps> = ({ onBack, onNavigate }) => {
    // Estados para os toggles (switches)
    const [detecaoSegundoPlano, setDetecaoSegundoPlano] = useState(true);
    const [flashLed, setFlashLed] = useState(true);
    const [vibracao, setVibracao] = useState(true);
    const [piscarTela, setPiscarTela] = useState(true);
    const [sincronizacaoAuto, setSincronizacaoAuto] = useState(true);

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
                    Configurações
                </h1>
            </div>

            {/* Conteúdo com Rolagem */}
            <div style={{ flex: 1, padding: '0 16px 16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>

                {/* SEÇÃO: GERAL */}
                <div>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1A102F', marginBottom: 8, paddingLeft: 4 }}>Geral</h3>
                    <div style={{ background: 'white', borderRadius: 20, border: '1px solid #EFEAF8', overflow: 'hidden', boxShadow: '0 2px 8px rgba(92, 60, 146, 0.04)' }}>

                        {/* Sensibilidade de detecção */}
                        <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #F0ECF8', cursor: 'pointer' }}>
                            <span style={{ fontSize: 13, fontWeight: 600, color: '#2D2342' }}>Sensibilidade de detecção</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <span style={{ fontSize: 13, color: '#7E7694' }}>Média</span>
                                <ChevronRight size={16} style={{ color: '#7E7694' }} />
                            </div>
                        </div>

                        {/* Confiança mínima */}
                        <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #F0ECF8', cursor: 'pointer' }}>
                            <span style={{ fontSize: 13, fontWeight: 600, color: '#2D2342' }}>Confiança mínima</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <span style={{ fontSize: 13, color: '#7E7694' }}>70%</span>
                                <ChevronRight size={16} style={{ color: '#7E7694' }} />
                            </div>
                        </div>

                        {/* Detecção em segundo plano */}
                        <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #F0ECF8' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, paddingRight: 8 }}>
                                <span style={{ fontSize: 13, fontWeight: 600, color: '#2D2342' }}>Detecção em segundo plano</span>
                                <span style={{ fontSize: 11, color: '#7E7694' }}>Detecta sons enquanto você utiliza outros aplicativos</span>
                            </div>
                            <input
                                type="checkbox"
                                checked={detecaoSegundoPlano}
                                onChange={() => setDetecaoSegundoPlano(!detecaoSegundoPlano)}
                                style={{ cursor: 'pointer', width: 18, height: 18, accentColor: 'var(--purple, #5c3c92)' }}
                            />
                        </div>

                        {/* Armazenamento de áudio */}
                        <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, paddingRight: 8 }}>
                                <span style={{ fontSize: 13, fontWeight: 600, color: '#2D2342' }}>Armazenamento de áudio</span>
                                <span style={{ fontSize: 11, color: '#7E7694' }}>Áudio salvo somente neste dispositivo</span>
                                <span style={{ fontSize: 10, color: '#948EA5' }}>Excluir automaticamente após 24 horas</span>
                            </div>
                            <ChevronRight size={16} style={{ color: '#7E7694', flexShrink: 0 }} />
                        </div>

                    </div>
                </div>

                {/* SEÇÃO: ALERTAS */}
                <div>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1A102F', marginBottom: 8, paddingLeft: 4 }}>Alertas</h3>
                    <div style={{ background: 'white', borderRadius: 20, border: '1px solid #EFEAF8', overflow: 'hidden', boxShadow: '0 2px 8px rgba(92, 60, 146, 0.04)' }}>

                        <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #F0ECF8' }}>
                            <span style={{ fontSize: 13, fontWeight: 600, color: '#2D2342' }}>Flash/LED</span>
                            <input type="checkbox" checked={flashLed} onChange={() => setFlashLed(!flashLed)} style={{ cursor: 'pointer', width: 18, height: 18, accentColor: 'var(--purple, #5c3c92)' }} />
                        </div>

                        <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #F0ECF8' }}>
                            <span style={{ fontSize: 13, fontWeight: 600, color: '#2D2342' }}>Vibração</span>
                            <input type="checkbox" checked={vibracao} onChange={() => setVibracao(!vibracao)} style={{ cursor: 'pointer', width: 18, height: 18, accentColor: 'var(--purple, #5c3c92)' }} />
                        </div>

                        <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: 13, fontWeight: 600, color: '#2D2342' }}>Piscar tela</span>
                            <input type="checkbox" checked={piscarTela} onChange={() => setPiscarTela(!piscarTela)} style={{ cursor: 'pointer', width: 18, height: 18, accentColor: 'var(--purple, #5c3c92)' }} />
                        </div>

                    </div>
                </div>

                {/* SEÇÃO: OUTROS */}
                <div>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1A102F', marginBottom: 8, paddingLeft: 4 }}>Outros</h3>
                    <div style={{ background: 'white', borderRadius: 20, border: '1px solid #EFEAF8', overflow: 'hidden', boxShadow: '0 2px 8px rgba(92, 60, 146, 0.04)' }}>

                        <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: 13, fontWeight: 600, color: '#2D2342' }}>Sincronização automática</span>
                            <input type="checkbox" checked={sincronizacaoAuto} onChange={() => setSincronizacaoAuto(!sincronizacaoAuto)} style={{ cursor: 'pointer', width: 18, height: 18, accentColor: 'var(--purple, #5c3c92)' }} />
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};