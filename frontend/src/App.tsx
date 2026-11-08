import React, { useState, useEffect } from 'react';

// === Importações do Desktop ===
import { SplashScreenDesktop } from './pages/desktop/SplashScreenDesktop';
import { OnboardingDesktop } from './pages/desktop/OnboardingDesktop';
import { LoginDesktop } from './pages/desktop/LoginDesktop';
import { SignupDesktop } from './pages/desktop/SignupDesktop';
import { SelectEnvironmentDesktop } from './pages/desktop/SelectEnvironmentDesktop';
import { CustomizeEnvironmentDesktop } from './pages/desktop/CustomizeEnvironmentDesktop';

// === Importações do Mobile ===
import { SplashScreen } from './pages/mobile/SplashScreen';
import { Onboarding1 } from './pages/mobile/Onboarding1';
import { Onboarding2 } from './pages/mobile/Onboarding2';
import { Onboarding3 } from './pages/mobile/Onboarding3';
import { Onboarding4 } from './pages/mobile/Onboarding4';
import { Login } from './pages/mobile/Login';
import { Signup } from './pages/mobile/Signup';
import { SelectEnvironment } from './pages/mobile/SelectEnvironment';
import { CustomizeEnvironment } from './pages/mobile/CustomizeEnvironment';
import { Home } from './pages/mobile/Home';
import { DetectedSounds } from './pages/mobile/DetectedSounds';

// === Componentes Globais / Modais ===
import { Sidebar } from './components/Sidebar';
import { ConfirmModal } from './components/ConfirmModal';

export function App() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [telaAtual, setTelaAtual] = useState('splash');

    // Estados para o Menu Lateral e Modais no Mobile
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Estados para guardar a escolha do ambiente no desktop
    const [ambienteEscolhido, setAmbienteEscolhido] = useState('trabalho');
    const [nomeOutro, setNomeOutro] = useState('');

    useEffect(() => {
        if (telaAtual === 'splash') {
            const timer = setTimeout(() => {
                setTelaAtual(isMobile ? 'onboarding1' : 'onboarding');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [telaAtual, isMobile]);

    const irParaLogin = () => setTelaAtual('login');

    // === RENDERIZAÇÃO DO FLUXO DESKTOP ===
    const renderDesktop = () => {
        if (telaAtual === 'splash') return <SplashScreenDesktop onNext={() => setTelaAtual('onboarding')} />;
        if (telaAtual === 'onboarding') return <OnboardingDesktop onFinish={() => setTelaAtual('login')} />;
        if (telaAtual === 'login') return <LoginDesktop onLoginSuccess={() => setTelaAtual('select-env')} onGoToSignup={() => setTelaAtual('cadastro')} />;
        if (telaAtual === 'cadastro') return <SignupDesktop onSignupSuccess={() => setTelaAtual('select-env')} onGoToLogin={() => setTelaAtual('login')} />;

        if (telaAtual === 'select-env') {
            return (
                <SelectEnvironmentDesktop
                    onNext={(ambiente, outroTexto) => {
                        setAmbienteEscolhido(ambiente);
                        if (outroTexto) setNomeOutro(outroTexto);
                        setTelaAtual('customize-env');
                    }}
                />
            );
        }

        if (telaAtual === 'customize-env') {
            return (
                <CustomizeEnvironmentDesktop
                    ambienteEscolhido={ambienteEscolhido}
                    nomePersonalizado={nomeOutro}
                    onFinish={() => setTelaAtual('home')}
                />
            );
        }

        if (telaAtual === 'home') {
            return (
                <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
                    <h1 className="text-2xl font-bold mb-4">Home (Desktop)</h1>
                    <button
                        onClick={() => setTelaAtual('detected-sounds')}
                        className="px-4 py-2 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 transition"
                    >
                        Ver Sons Detectados
                    </button>
                </div>
            );
        }

        if (telaAtual === 'detected-sounds') {
            return <DetectedSounds onBack={() => setTelaAtual('home')} onSelectAlert={() => alert('Alerta selecionado!')} />;
        }

        return null;
    };

    // === RENDERIZAÇÃO DO FLUXO MOBILE ===
    const renderMobile = () => {
        return (
            <main className="bg-gray-950 min-h-screen w-full flex items-center justify-center">
                <div className="w-full max-w-[412px] h-[780px] bg-[#F8F7FA] shadow-2xl overflow-hidden rounded-[32px] border-4 border-gray-800 flex flex-col relative">

                    {telaAtual === 'splash' && <SplashScreen onNext={() => setTelaAtual('onboarding1')} />}

                    {telaAtual === 'onboarding1' && <Onboarding1 onNext={() => setTelaAtual('onboarding2')} onSkip={irParaLogin} />}
                    {telaAtual === 'onboarding2' && <Onboarding2 onNext={() => setTelaAtual('onboarding3')} onSkip={irParaLogin} />}
                    {telaAtual === 'onboarding3' && <Onboarding3 onNext={() => setTelaAtual('onboarding4')} onSkip={irParaLogin} />}
                    {telaAtual === 'onboarding4' && <Onboarding4 onFinish={irParaLogin} />}

                    {telaAtual === 'login' && (
                        <Login
                            onLoginSuccess={() => setTelaAtual('select-env')}
                            onGoToSignup={() => setTelaAtual('cadastro')}
                        />
                    )}

                    {telaAtual === 'cadastro' && (
                        <Signup
                            onSignupSuccess={() => setTelaAtual('select-env')}
                            onGoToLogin={irParaLogin}
                        />
                    )}

                    {telaAtual === 'select-env' && (
                        <SelectEnvironment
                            onNext={() => setTelaAtual('customize-env')}
                        />
                    )}

                    {telaAtual === 'customize-env' && (
                        <CustomizeEnvironment
                            onFinish={() => setTelaAtual('home')}
                        />
                    )}

                    {/* Tela Principal (Home) */}
                    {telaAtual === 'home' && (
                        <Home
                            userName="Natália"
                            onOpenSidebar={() => setIsSidebarOpen(true)}
                            onNavigateToDetect={() => setTelaAtual('detected-sounds')}
                        />
                    )}

                    {/* Tela de Sons Detectados */}
                    {telaAtual === 'detected-sounds' && (
                        <DetectedSounds
                            onBack={() => setTelaAtual('home')}
                            onSelectAlert={() => alert('Clicou em um alerta específico!')}
                        />
                    )}

                    {/* Menu Lateral (Sidebar) */}
                    <Sidebar
                        isOpen={isSidebarOpen}
                        onClose={() => setIsSidebarOpen(false)}
                        onNavigate={(page) => {
                            setTelaAtual(page);
                        }}
                        onOpenLogoutModal={() => {
                            setIsModalOpen(true);
                        }}
                        userName="Natália"
                    />

                    {/* Modal de Confirmação de Saída */}
                    <ConfirmModal
                        isOpen={isModalOpen}
                        title="Tem certeza que deseja sair?"
                        confirmLabel="Sair"
                        onConfirm={() => {
                            setIsModalOpen(false);
                            setTelaAtual('login');
                        }}
                        onCancel={() => setIsModalOpen(false)}
                    />
                </div>
            </main>
        );
    };

    return isMobile ? renderMobile() : renderDesktop();
}

export default App;