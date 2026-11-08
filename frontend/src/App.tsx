
import { useState, useEffect, useMemo } from 'react';

import { AlertaAutomatico } from './components/AlertaAutomatico';
import { SplashScreenDesktop } from './pages/desktop/SplashScreenDesktop';
import { OnboardingDesktop } from './pages/desktop/OnboardingDesktop';
import { LoginDesktop } from './pages/desktop/LoginDesktop';
import { SignupDesktop } from './pages/desktop/SignupDesktop';
import { SelectEnvironmentDesktop } from './pages/desktop/SelectEnvironmentDesktop';
import { CustomizeEnvironmentDesktop } from './pages/desktop/CustomizeEnvironmentDesktop';

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
import { DetectedSounds, type SoundItem } from './pages/mobile/DetectedSounds';
import { AlertScreen } from './pages/mobile/AlertScreen';

import { useMonitoramentoAudio } from './hooks/useMonitoramentoAudio.js';

import { Sidebar } from './components/Sidebar';
import { ConfirmModal } from './components/ConfirmModal';

function getSoundIcon(soundName: string): string {
    const name = soundName.toLowerCase();

    if (
        name.includes('campainha') ||
        name.includes('doorbell')
    ) return '🔔';

    if (
        name.includes('bebê') ||
        name.includes('choro') ||
        name.includes('baby cry')
    ) return '👶';

    if (
        name.includes('incêndio') ||
        name.includes('fogo') ||
        name.includes('alarme') ||
        name.includes('siren') ||
        name.includes('alarm')
    ) return '🚨';

    if (
        name.includes('cão') ||
        name.includes('cachorro') ||
        name.includes('latido') ||
        name.includes('dog') ||
        name.includes('bark')
    ) return '🐕';

    if (
        name.includes('porta') ||
        name.includes('batida') ||
        name.includes('door')
    ) return '🚪';

    if (
        name.includes('clapping') ||
        name.includes('applause')
    ) return '👏';

    if (name.includes('speech')) return '🗣️';

    return '🔊';
}

function traduzirSom(nome: string): string {
    const traducoes: Record<string, string> = {

        'Narration, monologue': 'Narração ou monólogo',
        'Middle Eastern music': 'Música do Oriente Médio',
        'Music of Asia': 'Música asiática',
        'Hands': 'Mãos',
        'Clapping': 'Palmas',
        'Applause': 'Aplausos',
        'Ping': 'Som de notificação',
        'Inside, small room': 'Ambiente interno pequeno',
        'Wood block': 'Bloco de madeira',
        'Speech': 'Fala',
        'Conversation': 'Conversa',
        'Male speech, man speaking': 'Voz masculina',
        'Female speech, woman speaking': 'Voz feminina',
        'Child speech, kid speaking': 'Voz infantil',
        'Dog': 'Cachorro',
        'Bark': 'Latido',
        'Bow-wow': 'Latido de cachorro',
        'Cat': 'Gato',
        'Meow': 'Miado',
        'Doorbell': 'Campainha',
        'Siren': 'Sirene',
        'Baby cry, infant cry': 'Choro de bebê',
        'Alarm': 'Alarme',
        'Fire alarm': 'Alarme de incêndio',
        'Door': 'Porta',
        'Door slam': 'Porta batendo',
        'Knock': 'Batida na porta',
        'Telephone bell ringing': 'Telefone tocando',
        'Ringtone': 'Toque de celular',
        'Music': 'Música',
        'Silence': 'Silêncio',
        'Vehicle': 'Veículo',
        'Car': 'Carro',
        'Car horn, honking': 'Buzina de carro',
        'Traffic noise, roadway noise': 'Barulho do trânsito',
        'Rain': 'Chuva',
        'Thunder': 'Trovão',
        'Wind': 'Vento',
        'Water': 'Água',
        'Laughter': 'Risada',
        'Crying, sobbing': 'Choro',
        'Screaming': 'Grito',
        'Breathing': 'Respiração',
        'Typing': 'Digitação',
        'Computer keyboard': 'Teclado de computador',
        'Tick': 'Tique',
        'Clock': 'Relógio',
        'Explosion': 'Explosão',
        'Gunshot, gunfire': 'Disparo de arma',
        'Glass': 'Vidro',
        'Breaking': 'Quebra',
        'Inside, large room or hall': 'Ambiente interno grande',
        'Outside, urban or manmade': 'Ambiente externo urbano',
        'Outside, rural or natural': 'Ambiente externo rural',
    };

    return traducoes[nome] ?? nome;
}

export function App() {
    const [isMobile, setIsMobile] = useState(
        window.innerWidth < 768
    );

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [telaAtual, setTelaAtual] = useState('splash');

    const [alertaAtivo, setAlertaAtivo] = useState<{
        soundName: string;
        confidence: string;
        time: string;
        icon?: string;
    } | null>(null);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [ambienteEscolhido, setAmbienteEscolhido] = useState('trabalho');
    const [nomeOutro, setNomeOutro] = useState('');

    const {
        ativo,
        resultados,
        erro,
        iniciar,
        parar
    } = useMonitoramentoAudio();

    const sonsDetectados = useMemo<SoundItem[]>(() => {
        const horario = new Date().toLocaleTimeString(
            'pt-BR',
            { hour12: false }
        );

        return resultados.filter((som) => som.pontuacao >= 0.20).map((som) => ({
            id: som.indice,
            name: traduzirSom(som.classe),
            confidence: `${(som.pontuacao * 100).toFixed(1)}%`,
            time: horario,
            icon: getSoundIcon(som.classe),
        }));
    }, [resultados]);

    const mostrarDetalhes = (som: SoundItem) => {
        setAlertaAtivo({
            soundName: som.name,
            confidence: som.confidence,
            time: som.time,
            icon: som.icon,
        });
    };

    const controleIA = (
        <div className="flex flex-wrap items-center justify-center gap-2 rounded-xl bg-white p-2 shadow-md">
            <button
                type="button"
                onClick={
                    ativo
                        ? () => { void parar(); }
                        : iniciar
                }
                className="rounded-lg bg-[#5D4A88] px-3 py-2 text-xs font-semibold text-white"
            >
                {ativo ? 'Parar escuta' : 'Iniciar escuta'}
            </button>

            <span className="text-xs text-gray-700">
                {ativo ? 'Microfone ativo' : 'Microfone desligado'}
            </span>

            {erro && (
                <span
                    role="alert"
                    className="text-xs text-red-700"
                >
                    {erro}
                </span>
            )}
        </div>
    );

    useEffect(() => {
        if (telaAtual === 'splash') {
            const timer = setTimeout(() => {
                setTelaAtual(
                    isMobile ? 'onboarding1' : 'onboarding'
                );
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [telaAtual, isMobile]);

    const irParaLogin = () => {
        setTelaAtual('login');
    };

    // =========================
    // TELAS DESKTOP
    // =========================
    const renderDesktop = () => {
        if (alertaAtivo) {
            return (
                <div className="w-full h-screen bg-gray-950 flex items-center justify-center">
                    <div className="w-[412px] h-[780px] rounded-[32px] overflow-hidden shadow-2xl border-4 border-gray-800">
                        <AlertScreen
                            soundName={alertaAtivo.soundName}
                            confidence={alertaAtivo.confidence}
                            time={alertaAtivo.time}
                            onDismiss={() => setAlertaAtivo(null)}
                            onViewDetails={() => {
                                setAlertaAtivo(null);
                                setTelaAtual('detected-sounds');
                            }}
                        />
                    </div>
                </div>
            );
        }

        if (telaAtual === 'splash') {
            return (
                <SplashScreenDesktop
                    onNext={() => setTelaAtual('onboarding')}
                />
            );
        }

        if (telaAtual === 'onboarding') {
            return (
                <OnboardingDesktop
                    onFinish={() => setTelaAtual('login')}
                />
            );
        }

        if (telaAtual === 'login') {
            return (
                <LoginDesktop
                    onLoginSuccess={() => setTelaAtual('select-env')}
                    onGoToSignup={() => setTelaAtual('cadastro')}
                />
            );
        }

        if (telaAtual === 'cadastro') {
            return (
                <SignupDesktop
                    onSignupSuccess={() => setTelaAtual('select-env')}
                    onGoToLogin={() => setTelaAtual('login')}
                />
            );
        }

        if (telaAtual === 'select-env') {
            return (
                <SelectEnvironmentDesktop
                    onNext={(ambiente, outroTexto) => {
                        setAmbienteEscolhido(ambiente);

                        if (outroTexto) {
                            setNomeOutro(outroTexto);
                        }

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
                    <h1 className="text-2xl font-bold">
                        Home (Desktop)
                    </h1>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setTelaAtual('detected-sounds')}
                            className="px-4 py-2 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 transition"
                        >
                            Ver Sons Detectados
                        </button>

                        {controleIA}
                    </div>
                </div>
            );
        }

        if (telaAtual === 'detected-sounds') {
            return (
                <div className="flex min-h-screen flex-col bg-[#F8F7FA]">
                    <div className="p-3">
                        {controleIA}
                    </div>

                    <DetectedSounds
                        onBack={() => setTelaAtual('home')}
                        onSelectAlert={mostrarDetalhes}
                        soundsList={sonsDetectados}
                    />
                </div>
            );
        }

        return null;
    };

    // =========================
    // TELAS MOBILE
    // =========================
    const renderMobile = () => {
        return (
            <main className="bg-gray-950 min-h-screen w-full flex items-center justify-center">
                <div className="w-full max-w-[412px] h-[780px] bg-[#F8F7FA] shadow-2xl overflow-hidden rounded-[32px] border-4 border-gray-800 flex flex-col relative">

                    {alertaAtivo ? (
                        <AlertScreen
                            soundName={alertaAtivo.soundName}
                            confidence={alertaAtivo.confidence}
                            time={alertaAtivo.time}
                            onDismiss={() => setAlertaAtivo(null)}
                            onViewDetails={() => {
                                setAlertaAtivo(null);
                                setTelaAtual('detected-sounds');
                            }}
                        />
                    ) : (
                        <>
                            {telaAtual === 'splash' && (
                                <SplashScreen
                                    onNext={() => setTelaAtual('onboarding1')}
                                />
                            )}

                            {telaAtual === 'onboarding1' && (
                                <Onboarding1
                                    onNext={() => setTelaAtual('onboarding2')}
                                    onSkip={irParaLogin}
                                />
                            )}

                            {telaAtual === 'onboarding2' && (
                                <Onboarding2
                                    onNext={() => setTelaAtual('onboarding3')}
                                    onSkip={irParaLogin}
                                />
                            )}

                            {telaAtual === 'onboarding3' && (
                                <Onboarding3
                                    onNext={() => setTelaAtual('onboarding4')}
                                    onSkip={irParaLogin}
                                />
                            )}

                            {telaAtual === 'onboarding4' && (
                                <Onboarding4
                                    onFinish={irParaLogin}
                                />
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

                            {telaAtual === 'home' && (

<Home
    userName="Natália"
    onOpenSidebar={() => setIsSidebarOpen(true)}
    onNavigateToDetect={() => setTelaAtual('detected-sounds')}
    monitoramentoAtivo={ativo}
    onAlternarMonitoramento={() => {
        if (ativo) {
            void parar();
        } else {
            iniciar();
        }
    }}
    sonsDetectados={sonsDetectados}
    erroMonitoramento={erro}
/>

                            )}

                            {telaAtual === 'detected-sounds' && (
                                <DetectedSounds
                                    onBack={() => setTelaAtual('home')}
                                    onSelectAlert={mostrarDetalhes}
                                    soundsList={sonsDetectados}
                                />
                            )}

                            {telaAtual === 'detected-sounds' && (
                                <div className="absolute bottom-3 left-3 right-3 z-20">
                                    {controleIA}
                                </div>
                            )}

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

                            <ConfirmModal
                                isOpen={isModalOpen}
                                title="Tem certeza que deseja sair?"
                                confirmLabel="Sair"
                                onConfirm={() => {
                                    setIsModalOpen(false);
                                    void parar();
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
                telaAtual === 'detected-sounds'
            }
        />
    </>
);

}

export default App;
