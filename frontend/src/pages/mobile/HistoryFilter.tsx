import React, { useState } from 'react';
import {
    ChevronDown,
    ChevronLeft
} from 'lucide-react';
import { CustomDateFilters } from '../../components/CustomDateFilters.tsx';
import { getSoundIcon } from '../../components/getSoundIcon.tsx';

interface FiltrosHistoricoProps {
    onBack?: () => void;
    onApply?: (filtros: { periodo: string; diasCustom?: number; categoria: string; ambiente?: string }) => void;
    soundsList?: any[];
    ambienteAtual?: string;
}

export const HistoryFilter: React.FC<FiltrosHistoricoProps> = ({ onBack, onApply, soundsList = [], ambienteAtual = 'Todos'}) => {
    const DEFAULT_PERIOD = '7dias';
    const DEFAULT_CATEGORY = 'Todos';
    const DEFAULT_CUSTOM_DAYS = 3;

    const [selectedPeriod, setSelectedPeriod] = useState<string>(DEFAULT_PERIOD);
    const [customDays, setCustomDays] = useState<number>(DEFAULT_CUSTOM_DAYS);
    const [selectedCategory, setSelectedCategory] = useState<string>(DEFAULT_CATEGORY);
    const [selectedAmbiente, setSelectedAmbiente] = useState<string>(ambienteAtual);

    const [appliedFilters, setAppliedFilters] = useState({
        periodo: DEFAULT_PERIOD,
        diasCustom: DEFAULT_CUSTOM_DAYS,
        categoria: DEFAULT_CATEGORY,
        ambiente : ambienteAtual
    });

    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [showCustomDateScreen, setShowCustomDateScreen] = useState<boolean>(false);

    if (showCustomDateScreen) {
        return (
            <CustomDateFilters
                onBack={() => setShowCustomDateScreen(false)}
                onApplyCustomDate={(dias) => {
                    setCustomDays(dias);
                    setSelectedPeriod('custom');
                    setShowCustomDateScreen(false);
                }}
            />
        );
    }

    const handleApplyFilters = () => {
        const novosFiltros = {
            periodo: selectedPeriod,
            diasCustom: customDays,
            categoria: selectedCategory,
            ambiente : ambienteAtual
        };

        setAppliedFilters(novosFiltros);
        onApply?.(novosFiltros);
    };

    const handleClearFilters = () => {
        const padrao = {
            periodo: DEFAULT_PERIOD,
            diasCustom: DEFAULT_CUSTOM_DAYS,
            categoria: DEFAULT_CATEGORY,
            ambiente : 'Todos'
        };

        setSelectedPeriod(DEFAULT_PERIOD);
        setSelectedCategory(DEFAULT_CATEGORY);
        setCustomDays(DEFAULT_CUSTOM_DAYS);
        setSelectedAmbiente('Todos');
    };

    const filteredSounds = soundsList.filter(item => {
        const matchCategory = selectedCategory === 'Todos' || (item.title || item.name) === selectedCategory;

        let matchPeriod = true;
        if (selectedPeriod === 'hoje') {
            matchPeriod = item.diasAtras === 0;
        } else if (selectedPeriod === '7dias') {
            matchPeriod = item.diasAtras <= 7;
        } else if (selectedPeriod === '30dias') {
            matchPeriod = item.diasAtras <= 30;
        } else if (selectedPeriod === 'custom') {
            matchPeriod = item.diasAtras <= customDays;
        }

        return matchCategory && matchPeriod;
    });

    const categories = ['Todos', ...Array.from( new Set( soundsList.map((item) => item.title || item.name).filter(Boolean)))];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F8F7FA', paddingBottom: 16 }}>
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

            {/* Header com Título Centralizado */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12, padding: '0 4px', position: 'relative' }}>
                <button
                    onClick={onBack}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        padding: 4,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        position: 'absolute',
                        left: 4,
                        zIndex: 1
                    }}
                >
                    <ChevronLeft size={26} style={{ color: 'var(--purple, #5c3c92)' }} />
                </button>
                <h1 style={{ color: 'var(--purple, #5c3c92)', fontSize: 18, fontWeight: 700, margin: 0, width: '100%', textAlign: 'center' }}>
                    Filtros do Histórico
                </h1>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto', padding: '0 4px' }}>

                {/* Dropdown + Lista de Sons */}
                <div
                    style={{
                        background: 'white',
                        borderRadius: 20,
                        border: '1px solid #EFEAF8',
                        overflow: 'hidden',
                        boxShadow: '0 4px 12px rgba(92, 60, 146, 0.04)',
                    }}
                >
                    <div
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        style={{
                            padding: '12px 16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                            borderBottom: '1px solid #EFEAF8',
                            background: '#FAF8FC'
                        }}
                    >
                        <strong style={{ fontSize: 15, color: '#1A102F', fontWeight: 700 }}>
                            {selectedCategory}
                        </strong>
                        <ChevronDown size={18} style={{ color: '#6E6B7B', transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.2s' }} />
                    </div>

                    {isDropdownOpen && (
                        <div style={{ background: '#F4EFFC', borderBottom: '1px solid #EFEAF8', maxHeight: 180, overflowY: 'auto'}}>
                            {categories.map((cat) => (
                                <div
                                    key={cat}
                                    onClick={() => {
                                        setSelectedCategory(cat);
                                        setIsDropdownOpen(false);
                                    }}
                                    style={{
                                        padding: '10px 16px',
                                        fontSize: 13,
                                        fontWeight: selectedCategory === cat ? 700 : 500,
                                        color: selectedCategory === cat ? 'var(--purple, #5c3c92)' : '#4A4458',
                                        cursor: 'pointer',
                                        borderBottom: '1px solid #EBE4F7',
                                    }}
                                >
                                    {cat}
                                </div>
                            ))}
                        </div>
                    )}

                    <div style={{ maxHeight: 220, overflowY: 'auto' }}>
                        {filteredSounds.length > 0 ? (
                            filteredSounds.map((item, index) => (
                                <div
                                    key={item.id}
                                    style={{
                                        padding: '12px 16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 14,
                                        borderBottom: index < filteredSounds.length - 1 ? '1px solid #EFEAF8' : 'none'
                                }}
                            >
                                <div
                                    style={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: 12,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: item.isAlarm ? '#D9383A' : 'var(--purple, #5c3c92)',
                                        flexShrink: 0
                                    }}
                                >
                                    {getSoundIcon(item.name || item.title)}
                                </div>

                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <strong style={{ fontSize: 14, color: '#2D2342', fontWeight: 600 }}>{item.title || item.name || 'Som detectado'}</strong>
                                    <span style={{ fontSize: 11, color: '#8E879E' }}>Confiança: {item.confidence}%</span>
                                </div>

                                <span style={{ fontSize: 11, color: '#8E879E', fontWeight: 400 }}>{item.time}</span>
                            </div>
                        ))
                    ) : (
                        <div style={{ padding: 20, textAlign: 'center', color: '#8E879E', fontSize: 13 }}>
                            Nenhum som encontrado para este filtro.
                        </div>
                    )}
                    </div>
                </div>

                <div>
                    <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1A102F', marginBottom: 10, marginTop: 0 }}>
                        Período
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                        <div
                            onClick={() => setSelectedPeriod('hoje')}
                            style={{
                                background: selectedPeriod === 'hoje' ? '#EDE8F7' : 'white',
                                border: selectedPeriod === 'hoje' ? '1.5px solid var(--purple, #5c3c92)' : '1px solid #EFEAF8',
                                borderRadius: 14,
                                padding: '10px 12px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                cursor: 'pointer'
                            }}
                        >
                            <div style={{ width: 14, height: 14, borderRadius: '50%', border: selectedPeriod === 'hoje' ? '4px solid var(--purple, #5c3c92)' : '1.5px solid #A59DB5', boxSizing: 'border-box' }} />
                            <span style={{ fontSize: 12, color: selectedPeriod === 'hoje' ? 'var(--purple, #5c3c92)' : '#4A4458', fontWeight: selectedPeriod === 'hoje' ? 600 : 500 }}>Hoje</span>
                        </div>

                        <div
                            onClick={() => setSelectedPeriod('7dias')}
                            style={{
                                background: selectedPeriod === '7dias' ? '#EDE8F7' : 'white',
                                border: selectedPeriod === '7dias' ? '1.5px solid var(--purple, #5c3c92)' : '1px solid #EFEAF8',
                                borderRadius: 14,
                                padding: '10px 12px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                cursor: 'pointer'
                            }}
                        >
                            <div style={{ width: 14, height: 14, borderRadius: '50%', border: selectedPeriod === '7dias' ? '4px solid var(--purple, #5c3c92)' : '1.5px solid #A59DB5', boxSizing: 'border-box' }} />
                            <span style={{ fontSize: 12, color: selectedPeriod === '7dias' ? 'var(--purple, #5c3c92)' : '#4A4458', fontWeight: selectedPeriod === '7dias' ? 600 : 500 }}>Últimos 7 dias</span>
                        </div>

                        <div
                            onClick={() => setSelectedPeriod('30dias')}
                            style={{
                                background: selectedPeriod === '30dias' ? '#EDE8F7' : 'white',
                                border: selectedPeriod === '30dias' ? '1.5px solid var(--purple, #5c3c92)' : '1px solid #EFEAF8',
                                borderRadius: 14,
                                padding: '10px 12px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                cursor: 'pointer'
                            }}
                        >
                            <div style={{ width: 14, height: 14, borderRadius: '50%', border: selectedPeriod === '30dias' ? '4px solid var(--purple, #5c3c92)' : '1.5px solid #A59DB5', boxSizing: 'border-box' }} />
                            <span style={{ fontSize: 12, color: selectedPeriod === '30dias' ? 'var(--purple, #5c3c92)' : '#4A4458', fontWeight: selectedPeriod === '30dias' ? 600 : 500 }}>Últimos 30 dias</span>
                        </div>

                        <div
                            onClick={() => setShowCustomDateScreen(true)}
                            style={{
                                background: selectedPeriod === 'custom' ? '#EDE8F7' : 'white',
                                border: selectedPeriod === 'custom' ? '1.5px solid var(--purple, #5c3c92)' : '1px solid #EFEAF8',
                                borderRadius: 14,
                                padding: '10px 12px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                cursor: 'pointer'
                            }}
                        >
                            <div style={{ width: 14, height: 14, borderRadius: '50%', border: selectedPeriod === 'custom' ? '4px solid var(--purple, #5c3c92)' : '1.5px solid #A59DB5', boxSizing: 'border-box' }} />
                            <span style={{ fontSize: 12, color: selectedPeriod === 'custom' ? 'var(--purple, #5c3c92)' : '#4A4458', fontWeight: selectedPeriod === 'custom' ? 600 : 500 }}>
                                {selectedPeriod === 'custom' ? `Últimos ${customDays} dias` : 'Personalizado'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 'auto', paddingTop: 12 }}>
                <button
                    onClick={handleApplyFilters}
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
                        boxShadow: '0 4px 12px rgba(107, 78, 173, 0.2)'
                    }}
                >
                    Aplicar filtros
                </button>

                <button
                    onClick={handleClearFilters}
                    style={{
                        width: '100%',
                        height: 36,
                        background: 'transparent',
                        color: '#1A102F',
                        border: 'none',
                        fontSize: 13,
                        fontWeight: 500,
                        cursor: 'pointer'
                    }}
                >
                    Limpar filtros
                </button>
            </div>
        </div>
    );
};