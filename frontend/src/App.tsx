import React, { useState, useEffect } from 'react';

// === Importações do Desktop ===
import { SplashScreenDesktop } from './pages/desktop/SplashScreenDesktop';
import { OnboardingDesktop } from './pages/desktop/OnboardingDesktop';
import { LoginDesktop } from './pages/desktop/LoginDesktop';
import { SignupDesktop } from './pages/desktop/SignupDesktop';
import { SelectEnvironmentDesktop } from './pages/desktop/SelectEnvironmentDesktop';
import { CustomizeEnvironmentDesktop } from './pages/desktop/CustomizeEnvironmentDesktop';
import { HomeDesktop } from './pages/desktop/HomeDesktop';
import { AdvancedAnalysisDesktop } from './pages/desktop/AdvancedAnalysisDesktop'; // <-- 1. Importação da nova tela

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
import { AlertScreen } from './pages/mobile/AlertScreen';
import { SoundDetector } from "./pages/mobile/SoundDetector";
import { AlertHistory } from "./pages/mobile/AlertHistory";
import { HistoryFilter } from "./pages/mobile/HistoryFilter";
import { AlertDetails } from "./components/AlertDetails.tsx";

// === Componentes Globais / Modais ===
import { Sidebar } from './components/Sidebar';
import { ConfirmModal } from './components/ConfirmModal';

// === Função Auxiliar para Ícones Dinâmicos ===
function getSoundIcon(soundName: string) {
    const name = soundName.toLowerCase();

    if (name.includes('campainha')) return '🔔';
    if (name.includes('bebê') || name.includes('choro')) return '👶';
    if (name.includes('incêndio') || name.includes('fogo') || name.includes('alarme')) return '🚨';
    if (name.includes('cão') || name.includes('cachorro') || name.includes('latido')) return '🐕';
    if (name.includes('porta') || name.includes('batida')) return '🚪';

    return '🔊';
}

export function App() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [telaAtual, setTelaAtual] = useState('splash');

    // Estados dinâmicos de dados do usuário vindos do cadastro/login
    const [userName, setUserName] = useState('Carlos Melo');
    const [userEmail, setUserEmail] = useState('carlos.melo@upe.br');

    // Estado para disparar o Alerta em Tempo Real
    const [alertaAtivo, setAlertaAtivo] = useState<{
        soundName: string;
        confidence: string;
        time: string;
        icon?: string;
    } | null>(null);

    // Estados para o Menu Lateral e Modais no Mobile
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Estados para guardar a escolha do ambiente no desktop
    const [ambienteEscolhido, setAmbienteEscolhido] = useState('Casa');
    const [nomeOutro, setNomeOutro] = useState('');

    useEffect(() => {
        if (telaAtual === 'splash') {
            const timer = setTimeout(() => {
                setTelaAtual(isMobile ? 'onboarding1' : 'onboarding');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [telaAtual, isMobile]);

    const handleNavigation = (tab: string) => {
        if (tab === 'inicio' || tab === 'home') setTelaAtual('home');
        if (tab === 'detectar' || tab === 'detectar-sons') setTelaAtual('detectar-sons');
        if (tab === 'historico' || tab === 'historico-alertas') setTelaAtual('historico-alertas');
        if (tab === 'alertas' || tab === 'detected-sounds') {
            setAlertaAtivo({
                soundName: 'Campainha',
                confidence: '88%',
                time: '10:22:45',
                icon: '🔔',
            });
        }
    };

    const [detalhesAlertaSelecionado, setDetalhesAlertaSelecionado] = useState<{
        title: string;
        confidence: string;
        dateOrTime: string;
    } | null>(null);

    const irParaLogin = () => setTelaAtual('login');

    // === RENDERIZAÇÃO DO FLUXO DESKTOP ===
    const renderDesktop = () => {
        if (alertaAtivo) {
            return (
                <div className="w-full h-screen bg-gray-950 flex items-center justify-center">
                    <div className="w-[412px] h-[780px] rounded-[32px] overflow-hidden shadow-2xl border-4 border-gray-800">
                        <AlertScreen
                            soundName={alertaAtivo.soundName}
                            confidence={alertaAtivo.confidence}
                            time={alertaAtivo.time}
                            icon={alertaAtivo.icon}
                            onDismiss={() => setAlertaAtivo(null)}
                            onViewDetails={() => {
                                setDetalhesAlertaSelecionado({
                                    title: alertaAtivo.soundName,
                                    confidence: alertaAtivo.confidence,
                                    dateOrTime: alertaAtivo.time,
                                });
                                setAlertaAtivo(null);
                                setTelaAtual('detected-sounds');
                            }}
                        />
                    </div>
                </div>
            );
        }

        if (telaAtual === 'splash') return <SplashScreenDesktop onNext={() => setTelaAtual('onboarding')} />;
        if (telaAtual === 'onboarding') return <OnboardingDesktop onFinish={() => setTelaAtual('login')} />;

        if (telaAtual === 'login') {
            return (
                <LoginDesktop
                    onLoginSuccess={(email?: string) => {
                        if (email) setUserEmail(email);
                        setTelaAtual('select-env');
                    }}
                    onGoToSignup={() => setTelaAtual('cadastro')}
                />
            );
        }

        if (telaAtual === 'cadastro') {
            return (
                <SignupDesktop
                    onSignupSuccess={(name?: string, email?: string) => {
                        if (name) setUserName(name);
                        if (email) setUserEmail(email);
                        setTelaAtual('select-env');
                    }}
                    onGoToLogin={() => setTelaAtual('login')}
                />
            );
        }

        if (telaAtual === 'select-env') {
            return (
                <SelectEnvironmentDesktop
                    onNext={(ambiente, outroTexto) => {
                        setAmbienteEscolhido(outroTexto || ambiente);
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
                <HomeDesktop
                    userName={userName}
                    userEmail={userEmail}
                    currentEnvironment={ambienteEscolhido}
                    onNavigateToHistory={() => setTelaAtual('historico-alertas')}
                    onNavigateToDetect={() => setTelaAtual('detectar-sons')}
                    onNavigateToAdvancedAnalysis={() => setTelaAtual('analise-avancada')} // <-- 2. Navegar para Análise Avançada
                    onLogout={() => setTelaAtual('login')}
                />
            );
        }

        // <-- 3. Nova Rota de Análise Avançada no Desktop
        if (telaAtual === 'analise-avancada') {
            return (
                <AdvancedAnalysisDesktop
                    userName={userName}
                    userEmail={userEmail}
                    currentEnvironment={ambienteEscolhido}
                    onNavigateToHome={() => setTelaAtual('home')}
                    onNavigateToHistory={() => setTelaAtual('historico-alertas')}
                    onNavigateToDetect={() => setTelaAtual('detectar-sons')}
                    onLogout={() => setTelaAtual('login')}
                />
            );
        }

        if (telaAtual === 'detected-sounds' || telaAtual === 'detectar-sons') {
            return (
                <DetectedSounds
                    onBack={() => setTelaAtual('home')}
                    onSelectAlert={(alerta: any) => {
                        const nomeSom = alerta?.name || 'Alarme de Incêndio';
                        setAlertaAtivo({
                            soundName: nomeSom,
                            confidence: alerta?.confidence || '95%',
                            time: alerta?.time || '10:30',
                            icon: getSoundIcon(nomeSom),
                        });
                    }}
                />
            );
        }

        if (telaAtual === 'historico-alertas') {
            return (
                <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-900 text-white gap-4">
                    <h1 className="text-2xl font-bold">Histórico de Alertas (Desktop)</h1>
                    <button
                        onClick={() => setTelaAtual('home')}
                        className="px-4 py-2 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 transition cursor-pointer"
                    >
                        Voltar ao Início
                    </button>
                </div>
            );
        }

        return null;
    };

    // === RENDERIZAÇÃO DO FLUXO MOBILE ===
    const renderMobile = () => {
        return (
            <main className="bg-gray-950 min-h-screen w-full flex items-center justify-center p-2">
                <div className="w-full max-w-[412px] h-[780px] bg-[#F8F7FA] shadow-2xl overflow-hidden rounded-[32px] border-4 border-gray-800 flex flex-col relative">

                    {/* Alerta em Overlay/Modal quando ativado */}
                    {alertaAtivo ? (
                        <AlertScreen
                            soundName={alertaAtivo.soundName}
                            confidence={alertaAtivo.confidence}
                            time={alertaAtivo.time}
                            icon={alertaAtivo.icon}
                            onDismiss={() => setAlertaAtivo(null)}
                            onViewDetails={() => {
                                setDetalhesAlertaSelecionado({
                                    title: alertaAtivo.soundName,
                                    confidence: alertaAtivo.confidence,
                                    dateOrTime: alertaAtivo.time,
                                });
                                setAlertaAtivo(null);
                                setTelaAtual('detalhes-alerta');
                            }}
                        />
                    ) : (
                        <>
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

                            {/* Rota para os Detalhes do Alerta */}
                            {telaAtual === 'detalhes-alerta' && (
                                <AlertDetails
                                    onBack={() => setTelaAtual('historico-alertas')}
                                    onNavigate={handleNavigation}
                                    onDeleteEvent={() => {
                                        setTelaAtual('historico-alertas');
                                    }}
                                    mainAlert={detalhesAlertaSelecionado || {
                                        title: 'Campainha',
                                        confidence: '98%',
                                        dateOrTime: '27/12/2026 10:23:45',
                                    }}
                                />
                            )}

                            {telaAtual === 'customize-env' && (
                                <CustomizeEnvironment
                                    onFinish={() => setTelaAtual('home')}
                                />
                            )}

                            {telaAtual === 'detectar-sons' && (
                                <SoundDetector
                                    onBack={() => setTelaAtual('home')}
                                    onNavigate={handleNavigation}
                                />
                            )}

                            {telaAtual === 'historico-alertas' && (
                                <AlertHistory
                                    onBack={() => setTelaAtual('home')}
                                    onOpenFilter={() => setTelaAtual('filtros-historico')}
                                    onNavigate={handleNavigation}
                                    onSelectAlert={(alerta?: any) => {
                                        const nomeSom = alerta?.name || alerta?.title || 'Campainha';
                                        const conf = alerta?.confidence || '98%';
                                        const hora = alerta?.time || alerta?.dateOrTime || '10:23:45';

                                        setDetalhesAlertaSelecionado({
                                            title: nomeSom,
                                            confidence: conf,
                                            dateOrTime: hora,
                                        });
                                        setTelaAtual('detalhes-alerta');
                                    }}
                                />
                            )}

                            {telaAtual === 'filtros-historico' && (
                                <HistoryFilter
                                    onBack={() => setTelaAtual('historico-alertas')}
                                />
                            )}

                            {/* Tela Principal (Home) */}
                            {telaAtual === 'home' && (
                                <Home
                                    userName={userName}
                                    onOpenSidebar={() => setIsSidebarOpen(true)}
                                    onNavigateToDetect={() => setTelaAtual('detected-sounds')}
                                    onNavigateToHistory={() => setTelaAtual('historico-alertas')}
                                />
                            )}

                            {/* Tela de Sons Detectados */}
                            {telaAtual === 'detected-sounds' && (
                                <DetectedSounds
                                    onBack={() => setTelaAtual('home')}
                                    onSelectAlert={(alerta: any) => {
                                        const nomeSom = alerta?.name || 'Choro de Bebê';
                                        setAlertaAtivo({
                                            soundName: nomeSom,
                                            confidence: alerta?.confidence || '89%',
                                            time: alerta?.time || '10:45',
                                            icon: getSoundIcon(nomeSom),
                                        });
                                    }}
                                />
                            )}

                            {/* Menu Lateral (Sidebar) */}
                            <Sidebar
                                isOpen={isSidebarOpen}
                                onClose={() => setIsSidebarOpen(false)}
                                onNavigate={(page) => {
                                    handleNavigation(page);
                                }}
                                onOpenLogoutModal={() => {
                                    setIsSidebarOpen(false);
                                    setIsModalOpen(true);
                                }}
                                userName={userName}
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
                        </>
                    )}
                </div>
            </main>
        );
    };

    return isMobile ? renderMobile() : renderDesktop();
}

export default App;