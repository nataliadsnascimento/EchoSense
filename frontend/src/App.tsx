import React, { useState, useEffect } from 'react';
import { SplashScreen } from './pages/SplashScreen';
import { Onboarding1 } from './pages/Onboarding1';
import { Onboarding2 } from './pages/Onboarding2';
import { Onboarding3 } from './pages/Onboarding3';
import { Onboarding4 } from './pages/Onboarding4';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { SelectEnvironment } from './pages/SelectEnvironment';
import { CustomizeEnvironment } from './pages/CustomizeEnvironment';
import {SoundDetector} from "./pages/SoundDetector.tsx";

export function App() {
    const [telaAtual, setTelaAtual] = useState('splash');

    useEffect(() => {
        if (telaAtual === 'splash') {
            const timer = setTimeout(() => {
                setTelaAtual('onboarding1');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [telaAtual]);

    const handleNavigation = (tab: string) => {
        if (tab === 'detectar') setTelaAtual('detectar-sons');
    };

    const irParaLogin = () => setTelaAtual('login');

    return (
        <main className="bg-gray-950 min-h-screen py-4 flex items-center justify-center">
            <div className="w-full max-w-[412px] h-[780px] bg-[#F8F7FA] shadow-2xl overflow-hidden rounded-[32px] border-4 border-gray-800 flex flex-col relative">

                {telaAtual === 'splash' && <SplashScreen />}

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
                        onFinish={() => setTelaAtual('detectar-sons')}
                    />
                )}

                {/* Tela Principal de Sons Detectados */}
                {telaAtual === 'detectar-sons' && (
                    <SoundDetector
                        onBack={() => setTelaAtual('customize-env')}
                        onNavigate={handleNavigation}
                    />
                )}

            </div>
        </main>
    );
}

export default App;