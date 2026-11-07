import React, { useState, useEffect } from 'react';

// Importações do Desktop
import { SplashScreenDesktop } from './pages/desktop/SplashScreenDesktop';
import { OnboardingDesktop } from './pages/desktop/OnboardingDesktop';

// Importações do Mobile
import { SplashScreen } from './pages/mobile/SplashScreen';
import { Onboarding1 } from './pages/mobile/Onboarding1';
import { Onboarding2 } from './pages/mobile/Onboarding2';
import { Onboarding3 } from './pages/mobile/Onboarding3';
import { Onboarding4 } from './pages/mobile/Onboarding4';
import { Login } from './pages/mobile/Login';
import { Signup } from './pages/mobile/Signup';
import { SelectEnvironment } from './pages/mobile/SelectEnvironment';
import { CustomizeEnvironment } from './pages/mobile/CustomizeEnvironment';
import { Sidebar } from './components/Sidebar';
import { ConfirmModal } from './components/ConfirmModal';

export function App() {
    const [telaAtual, setTelaAtual] = useState('splash');

    // Estados para os Modais/Gavetas
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (telaAtual === 'splash') {
            const timer = setTimeout(() => {
                setTelaAtual('onboarding-desktop');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [telaAtual]);

    const irParaLogin = () => setTelaAtual('login');

    if (telaAtual === 'splash') {
        return <SplashScreenDesktop />;
    }

    if (telaAtual === 'onboarding-desktop') {
        return <OnboardingDesktop onFinish={irParaLogin} />;
    }

    return (
        <main className="bg-gray-950 min-h-screen py-4 flex items-center justify-center relative">
            <div className="w-full max-w-[412px] h-[780px] bg-[#F8F7FA] shadow-2xl overflow-hidden rounded-[32px] border-4 border-gray-800 flex flex-col relative">

                {/* Botão flutuante para abrir o Menu (para fins de teste visual) */}
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="absolute top-4 left-4 z-40 bg-[#5D4A88] text-white text-xs px-3 py-1.5 rounded-xl font-semibold shadow-md hover:opacity-90"
                >
                    ☰ Menu
                </button>

                {telaAtual === 'splash-mobile' && <SplashScreen />}

                {telaAtual === 'onboarding1' && (
                    <Onboarding1 onNext={() => setTelaAtual('onboarding2')} onSkip={irParaLogin} />
                )}

                {telaAtual === 'onboarding2' && (
                    <Onboarding2 onNext={() => setTelaAtual('onboarding3')} onSkip={irParaLogin} />
                )}

                {telaAtual === 'onboarding3' && (
                    <Onboarding3 onNext={() => setTelaAtual('onboarding4')} onSkip={irParaLogin} />
                )}

                {telaAtual === 'onboarding4' && (
                    <Onboarding4 onFinish={irParaLogin} />
                )}

                {telaAtual === 'login' && (
                    <Login
                        onLoginSuccess={() => setTelaAtual('select-env')}
                        onGoToSignup={() => setTelaAtual('cadastro')}
                    />
                )}

                {telaAtual === 'cadastro' && (
                    <Signup
                        onSignupSuccess={() => setTelaAtual('select-env')}
                        onGoToLogin={() => setTelaAtual('login')}
                    />
                )}

                {telaAtual === 'select-env' && (
                    <SelectEnvironment
                        onNext={() => setTelaAtual('customize-env')}
                    />
                )}

                {telaAtual === 'customize-env' && (
                    <CustomizeEnvironment
                        onFinish={() => alert('Parabéns! Concluíste o fluxo inicial do EchoSense com sucesso!')}
                    />
                )}

                {/* Componente Sidebar (Menu Lateral) */}
                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    onNavigate={(page) => {
                        alert(`Navegando para a tela: ${page}`);
                    }}
                    onOpenLogoutModal={() => {
                        setIsModalOpen(true);
                    }}
                    userName="Natália"
                />

                {/* Componente ConfirmModal Renderizado */}
                <ConfirmModal
                    isOpen={isModalOpen}
                    title="Tem certeza que deseja sair?"
                    confirmLabel="Sair"
                    onConfirm={() => {
                        alert('Você saiu da conta!');
                        setIsModalOpen(false);
                    }}
                    onCancel={() => setIsModalOpen(false)}
                />
            </div>
        </main>
    );
}

export default App;