import React, { useState } from 'react';
import { ChevronLeft, Lock } from 'lucide-react';

interface ChangePasswordProps {
    onBack: () => void;
    onSuccess?: () => void;
}

export const ChangePasswordScreen: React.FC<ChangePasswordProps> = ({ onBack, onSuccess }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');

        if (currentPassword.length < 6) {
            setErrorMessage('A senha atual deve ter no mínimo 6 caracteres.');
            return;
        }
        if (newPassword.length < 6){
            setErrorMessage('A nova senha deve ter no mínimo 6 caracteres.');
            return;
        }

        if (newPassword === currentPassword) {
            setErrorMessage('A nova senha não pode ser igual à senha atual.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setErrorMessage('As senhas não coincidem!');
            return;
        }
        // Aqui entraria a lógica de envio para o backend futuramente
        alert('Senha alterada com sucesso!');
        onSuccess?.();
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
                    Alterar senha
                </h1>
            </div>

            {/* Formulário */}
            <div style={{ flex: 1, padding: '0 16px', overflowY: 'auto' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

                    <div style={{ background: 'white', borderRadius: 20, border: '1px solid #EFEAF8', padding: '20px', display: 'flex', flexDirection: 'column', gap: 12, boxShadow: '0 2px 8px rgba(92, 60, 146, 0.04)' }}>

                        {errorMessage && (
                            <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#DC2626', padding: '10px 12px', borderRadius: 12, fontSize: 12, fontWeight: 600, textAlign: 'center' }}>
                                {errorMessage}
                            </div>
                        )}

                        <div>
                            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#5D4A88', marginBottom: 4 }}>Senha atual</label>
                            <input
                                type="password"
                                placeholder="Digite sua senha atual"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                style={{ width: '100%', padding: '10px 12px', borderRadius: 12, border: '1px solid #EFEAF8', fontSize: 13, background: '#FAFAFC', outline: 'none' }}
                                required
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#5D4A88', marginBottom: 4 }}>Nova senha</label>
                            <input
                                type="password"
                                placeholder="Mínimo de 6 caracteres"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                style={{ width: '100%', padding: '10px 12px', borderRadius: 12, border: '1px solid #EFEAF8', fontSize: 13, background: '#FAFAFC', outline: 'none' }}
                                required
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#5D4A88', marginBottom: 4 }}>Confirmar nova senha</label>
                            <input
                                type="password"
                                placeholder="Digite a nova senha novamente"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                style={{ width: '100%', padding: '10px 12px', borderRadius: 12, border: errorMessage ? '1px solid #EF4444' : '1px solid #EFEAF8', fontSize: 13, background: '#FAFAFC', outline: 'none' }}
                                required
                            />
                        </div>

                    </div>

                    <button
                        type="submit"
                        style={{
                            background: '#5D4A88',
                            color: 'white',
                            border: 'none',
                            borderRadius: 16,
                            padding: '14px',
                            fontSize: 14,
                            fontWeight: 700,
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(93, 74, 136, 0.2)'
                        }}
                    >
                        Salvar nova senha
                    </button>
                </form>
            </div>
        </div>
    );
};