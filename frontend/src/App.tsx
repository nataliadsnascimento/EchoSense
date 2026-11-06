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

export function App() {
    const [telaAtual, setTelaAtual] = useState('splash');

    useEffect(() => {
        if (telaAtual === 'splash') {
            const timer = setTimeout(() => {
                // Vai para o Onboarding do Desktop.
                // Se quiseres testar o mobile de novo, muda isto para 'onboarding1'
                setTelaAtual('onboarding-desktop');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [telaAtual]);

    const irParaLogin = () => setTelaAtual('login');

    // ==========================================
    // RENDERIZAÇÃO DO FLUXO DESKTOP
    // ==========================================
    if (telaAtual === 'splash') {
        // Se no futuro quiseres detetar o ecrã para mostrar o mobile,
        // podes colocar uma condição baseada na largura da janela (window.innerWidth)
        return <SplashScreenDesktop />;
    }

    if (telaAtual === 'onboarding-desktop') {
        return <OnboardingDesktop onFinish={irParaLogin} />;
    }

    // ==========================================
    // RENDERIZAÇÃO DO FLUXO MOBILE
    // ==========================================
    return (
        <main className="bg-gray-950 min-h-screen py-4 flex items-center justify-center">
            <div className="w-full max-w-[412px] h-[780px] bg-[#F8F7FA] shadow-2xl overflow-hidden rounded-[32px] border-4 border-gray-800 flex flex-col relative">

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
            </div>
        </main>
    );
}

export default App;