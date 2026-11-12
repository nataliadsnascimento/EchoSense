import React, { useState, useEffect } from 'react';

// === Importações do Desktop ===

import { AlertaAutomatico } from './components/AlertaAutomatico';
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
import { AlertScreen } from './pages/mobile/AlertScreen';
import {SoundDetector} from "./pages/mobile/SoundDetector";
import {AlertHistory} from "./pages/mobile/AlertHistory";
import {HistoryFilter} from "./pages/mobile/HistoryFilter";
import {AlertDetails} from "./components/AlertDetails.tsx";

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

    return '🔊'; // Ícone padrão
}

export interface SoundEvent {
    id: string;
    name: string;
    confidence: number | string;
    time: string;
    date?: string;
    environment?: string;
    isAlarm?: boolean;
}

export function App() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [telaAtual, setTelaAtual] = useState('splash');
    const [resultados, setResultados] = useState<SoundEvent[]>([]);
    const [ativo, setAtivo] = useState(true);

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
    const [ambienteEscolhido, setAmbienteEscolhido] = useState<string>('trabalho');
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
        if (tab == 'inicio' || tab == 'home') setTelaAtual('home');
        if (tab === 'detectar' || tab === 'detectar-sons') setTelaAtual('detectar-sons');
        if (tab === 'historico' || tab === 'historico-alertas') setTelaAtual('historico-alertas');
        if (tab === 'alertas' || tab === 'detected-sounds') {

               if (resultados && resultados.length > 0) {
                const ultimoSom = resultados[0];
                setAlertaAtivo({
                    soundName: ultimoSom.name || 'Som detectado',
                    confidence: `${ultimoSom.confidence}%`,
                    time: ultimoSom.time || '10:22:45',
                    icon: getSoundIcon(ultimoSom.name || ''),
                });
            } else {
                // Fallback seguro: padrão de exemplo
                setAlertaAtivo({
                    soundName: 'Campainha',
                    confidence: '88%',
                    time: '10:22:45',
                    icon: '🔔',
                });
                // Depois remove o setAlertaAtivo e coloca setTelaAtual('detectar-sons');
               }
        } else if (tab === 'perfil') {
            setTelaAtual('perfil');
        }
    };

    const [detalhesAlertaSelecionado, setDetalhesAlertaSelecionado] = useState<{
        title: string;
        confidence: string;
        dateOrTime: string;
        duration?: string;
        audioLevel?: string;
    } | null>(null);

    const [filtrosHistorico, setFiltrosHistorico] = useState({
        periodo: '7dias',
        diasCustom: 3,
        categoria: 'Todos',
    });

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
                <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-900 text-white gap-4">
                    <h1 className="text-2xl font-bold">Home (Desktop)</h1>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setTelaAtual('detected-sounds')}
                            className="px-4 py-2 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 transition"
                        >
                            Ver Sons Detectados
                        </button>
                        <button
                            onClick={() => {
                                const nomeSom = 'Choro de Bebê';
                                setAlertaAtivo({
                                    soundName: nomeSom,
                                    confidence: '95%',
                                    time: new Date().toLocaleTimeString(),
                                    icon: getSoundIcon(nomeSom),
                                });
                            }}
                            className="px-4 py-2 bg-red-600 rounded-lg font-semibold hover:bg-red-700 transition"
                        >
                            Simular Alerta
                        </button>
                    </div>
                </div>
            );
        }

        if (telaAtual === 'detected-sounds') {
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

        return null;
    };

    // === RENDERIZAÇÃO DO FLUXO MOBILE ===
    const renderMobile = () => {
        return (
            <main className="bg-gray-950 min-h-screen w-full flex items-center justify-center">
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
                                    duration: (alertaAtivo as any)?.duration || '3.2 segundos',
                                    audioLevel: (alertaAtivo as any)?.audioLevel || 'Alto',
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
                                    onNext={(ambiente: string) => {
                                        if (ambiente) setAmbienteEscolhido(ambiente);
                                        setTelaAtual('customize-env');
                                    }}
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
                                        title: 'Som detectado',
                                        confidence: '0%',
                                        dateOrTime: '--:--',
                                    }}
                                    duration={detalhesAlertaSelecionado?.duration || '3.2 segundos'}
                                    audioLevel={detalhesAlertaSelecionado?.audioLevel || 'Alto'}
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
                        soundsList={resultados}
                        ambienteAtual={ambienteEscolhido}
                    />
                )}

                {telaAtual === 'historico-alertas' && (
                    <AlertHistory
                        onBack={() => setTelaAtual('home')}
                        onOpenFilter={() => setTelaAtual('filtros-historico')}
                        onNavigate={handleNavigation}
                        soundsList={resultados}
                        ambienteAtual={ambienteEscolhido}
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
                        soundsList={resultados}
                        ambienteAtual={ambienteEscolhido}
                        onApply={(filtros) => {
                            setFiltrosHistorico({
                                periodo: filtros.periodo,
                                diasCustom: filtros.diasCustom || 3,
                                categoria: filtros.categoria,
                            });
                            if (filtros.ambiente && filtros.ambiente !== 'Todos') {
                                setAmbienteEscolhido(filtros.ambiente);
                            }
                        }}
                    />
                )}

                            {/* Tela Principal (Home) */}
                            {telaAtual === 'home' && (
                                <Home
                                    userName="Natália"
                                    ambienteAtual={ambienteEscolhido}
                                    onSelectEnvironment={(novoAmbiente) => setAmbienteEscolhido(novoAmbiente)}
                                    onOpenSidebar={() => setIsSidebarOpen(true)}
                                    onNavigateToDetect={() => setTelaAtual('detectar-sons')}
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
                        </>
                    )}
                </div>
            </main>
        );
    };


return (
    <>
        {isMobile ? renderMobile() : renderDesktop()}

        <AlertaAutomatico
            ativo={ativo}
            resultados={resultados}
            mostrarControles={
                telaAtual === 'home' ||
                telaAtual === 'detected-sounds' ||
                telaAtual === 'detectar-sons'
            }

            onDetection={(novoSom: SoundEvent) => {
                const somComAmbiente = {
                    ...novoSom,
                    environment: ambienteEscolhido || 'Trabalho',
                };

                setResultados((prev) => [somComAmbiente, ...prev]);

                if (Number(novoSom.confidence) >= 85) {
                    setAlertaAtivo({
                        soundName: novoSom.name,
                        confidence: `${novoSom.confidence}%`,
                        time: novoSom.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        icon: getSoundIcon(novoSom.name),
                        duration: (novoSom as any).duration ? `${(novoSom as any).duration}s` : '3.2 segundos',
                        audioLevel: Number(novoSom.confidence) > 90 ? 'Muito Alto' : 'Alto',
                    } as any);
                }
            }}
        />
    </>
);

}

export default App;
