import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

interface FiltrosDataPersonalizadaProps {
    onBack: () => void;
    onApplyCustomDate: (dias: number) => void;
}

export const CustomDateFilters: React.FC<FiltrosDataPersonalizadaProps> = ({ onBack, onApplyCustomDate }) => {
    const [diasCustomizados, setDiasCustomizados] = useState<number>(3);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F8F7FA', paddingBottom: 16 }}>
            <div
                style={{
                    height: 24,
                    backgroundColor: 'var(--purple, #5c3c92)',
                    margin: '0 -22px 12px',
                    width: 'calc(100% + 44px)',
                    flexShrink: 0
                }}
            />

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16, marginTop: 4 }}>
                <button
                    style={{
                        background: 'transparent',
                        border: 'none',
                        padding: 4,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                    }}
                    onClick={onBack}
                >
                    <ChevronLeft size={26} style={{ color: 'var(--purple, #5c3c92)' }} />
                </button>
                <h1 style={{ color: 'var(--purple, #5c3c92)', fontSize: 18, fontWeight: 700, margin: 0, marginLeft: 8 }}>
                    Período personalizado
                </h1>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ background: 'white', borderRadius: 16, padding: 16, border: '1px solid #EFEAF8' }}>
                    <label style={{ fontSize: 14, fontWeight: 600, color: '#2D2342', display: 'block', marginBottom: 8 }}>
                        Exibir registros dos últimos (dias):
                    </label>
                    <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                        {[2, 3, 5, 10, 15].map((dias) => (
                            <button
                                key={dias}
                                onClick={() => setDiasCustomizados(dias)}
                                style={{
                                    flex: 1,
                                    height: 40,
                                    borderRadius: 10,
                                    border: diasCustomizados === dias ? '1.5px solid var(--purple, #5c3c92)' : '1px solid #EFEAF8',
                                    background: diasCustomizados === dias ? '#EDE8F7' : 'white',
                                    color: diasCustomizados === dias ? 'var(--purple, #5c3c92)' : '#4A4458',
                                    fontWeight: 600,
                                    fontSize: 13,
                                    cursor: 'pointer'
                                }}
                            >
                                {dias}d
                            </button>
                        ))}
                    </div>

                    <div style={{ marginTop: 16 }}>
                        <span style={{ fontSize: 12, color: '#7E7694' }}>Ou digite a quantidade exata:</span>
                        <input
                            type="number"
                            min="1"
                            max="90"
                            value={diasCustomizados}
                            onChange={(e) => setDiasCustomizados(Number(e.target.value))}
                            style={{
                                width: '100%',
                                height: 40,
                                marginTop: 6,
                                border: '1px solid #EFEAF8',
                                borderRadius: 10,
                                padding: '0 12px',
                                fontSize: 14,
                                outline: 'none',
                                background: '#F8F7FA',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>
                </div>
            </div>

            <button
                onClick={() => onApplyCustomDate(diasCustomizados)}
                style={{
                    width: '100%',
                    height: 44,
                    borderRadius: 14,
                    background: 'var(--purple, #6B4EAD)',
                    color: 'white',
                    border: 'none',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                    marginTop: 'auto'
                }}
            >
                Confirmar período ({diasCustomizados} dias)
            </button>
        </div>
    );
};