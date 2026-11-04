import React, { useState, useEffect } from 'react';
import { SplashScreen } from './pages/SplashScreen';
import { Onboarding1 } from './pages/Onboarding1';
import { Onboarding2 } from './pages/Onboarding2';
import { Onboarding3 } from './pages/Onboarding3';

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

    const pularOnboarding = () => setTelaAtual('login');

    return (
        <main className="bg-gray-950 min-h-screen py-4 flex items-center justify-center">
            <div className="w-full max-w-[412px] h-[800px] bg-[#F8F7FA] shadow-2xl overflow-hidden rounded-[32px] border-4 border-gray-800">

                {telaAtual === 'splash' && <SplashScreen />}

                {telaAtual === 'onboarding1' && (
                    <Onboarding1 onNext={() => setTelaAtual('onboarding2')} onSkip={pularOnboarding} />
                )}

                {telaAtual === 'onboarding2' && (
                    <Onboarding2 onNext={() => setTelaAtual('onboarding3')} onSkip={pularOnboarding} />
                )}

                {telaAtual === 'onboarding3' && (
                    <Onboarding3 onNext={() => setTelaAtual('onboarding4')} onSkip={pularOnboarding} />
                )}

            </div>
        </main>
    );
}

export default App;