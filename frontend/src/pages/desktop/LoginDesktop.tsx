import { useState } from 'react';
import logoIcon from '../../assets/som.png';
import { useGoogleLogin } from '@react-oauth/google'; // Importação do Google

interface Props {
    onLoginSuccess: () => void;
    onGoToSignup: () => void;
}

export function LoginDesktop({ onLoginSuccess, onGoToSignup }: Props) {
    const [showPassword, setShowPassword] = useState(false);

    // Configuração do login do Google
    const googleLogin = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            console.log('Login com Google bem-sucedido!', tokenResponse);
            onLoginSuccess();
        },
        onError: () => {
            console.log('Erro ao fazer login com o Google');
            alert('Falha ao autenticar com o Google.');
        }
    });

    return (
        <div className="h-screen w-full flex font-sans overflow-hidden">

            {/* === COLUNA ESQUERDA (Painel Roxo Fixo) === */}
            <div className="w-[45%] lg:w-[40%] bg-[#4A2E7A] h-full p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden text-white">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-1/2 left-0 w-48 h-48 bg-[#cb19a5]/10 rounded-full blur-3xl -translate-x-1/2"></div>

                <div className="flex items-center gap-3 relative z-10">
                    <div className="bg-white p-2 rounded-xl">
                        <img src={logoIcon} alt="Logo" className="w-6 h-6 object-contain" />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg leading-none tracking-wide">EchoSense</h1>
                        <span className="text-[11px] text-purple-200">Sons que viram alerta</span>
                    </div>
                </div>

                <div className="flex-1 flex justify-center items-center relative z-10">
                    <svg width="280" height="280" viewBox="0 0 200 200" className="opacity-80">
                        <g fill="white">
                            {[4, 12, 24, 40, 60, 80, 100, 120, 100, 80, 60, 40, 24, 12, 4].map((height, i) => (
                                <rect key={i} x={10 + i * 12} y={100 - height / 2} width="6" height={height} rx="3" fillOpacity={0.2 + (height/120)*0.8} />
                            ))}
                        </g>
                    </svg>
                </div>

                <div className="relative z-10">
                    <h2 className="text-4xl font-bold mb-4 leading-tight">Sons que viram alerta.</h2>
                    <p className="text-base text-purple-200 mb-8 max-w-sm leading-relaxed">
                        Tecnologia que transforma sons importantes em alertas visuais e luz para sua segurança.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-purple-300">
                        <span className="w-2 h-2 bg-white rounded-full"></span>
                        Mais autonomia. Mais segurança.
                    </div>
                </div>
            </div>

            {/* === COLUNA DIREITA (Formulário de Login) === */}
            <div className="flex-1 bg-white h-full flex flex-col justify-center px-16 lg:px-32 relative overflow-y-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-[#4A2E7A] mb-3">Olá, que bom te ver aqui! 👋</h2>
                    <p className="text-gray-500 text-base">Faça login para continuar</p>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); onLoginSuccess(); }} className="flex flex-col gap-6 max-w-md mx-auto w-full">
                    <div>
                        <label className="block text-sm font-bold text-[#4A2E7A] mb-2">E-mail</label>
                        <input
                            type="email"
                            placeholder="seu@gmail.com"
                            className="w-full px-5 py-4 rounded-xl border border-gray-200 text-base text-gray-800 focus:outline-none focus:border-[#5D4A88] focus:ring-2 focus:ring-[#5D4A88]/20 bg-gray-50 transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-[#4A2E7A] mb-2">Senha</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••••••"
                                className="w-full px-5 py-4 rounded-xl border border-gray-200 text-base text-gray-800 focus:outline-none focus:border-[#5D4A88] focus:ring-2 focus:ring-[#5D4A88]/20 bg-gray-50 transition-all pr-12"
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d={showPassword ? "M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" : "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z"} /></svg>
                            </button>
                        </div>
                        <div className="flex justify-end mt-3">
                            <a href="#esqueci" onClick={(e) => e.preventDefault()} className="text-sm font-bold text-[#4A2E7A] hover:underline">Esqueceu a senha?</a>
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-[#4A2E7A] hover:bg-[#382360] transition-colors text-white py-4 rounded-xl font-bold text-base shadow-lg mt-4">
                        Entrar
                    </button>
                </form>

                <div className="relative flex py-8 items-center max-w-md mx-auto w-full">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="flex-shrink mx-4 text-sm text-gray-400">ou continuar com</span>
                    <div className="flex-grow border-t border-gray-200"></div>
                </div>

                {/* Botão do Google Integrado */}
                <div className="max-w-md mx-auto w-full">
                    <button
                        type="button"
                        onClick={() => googleLogin()}
                        className="w-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors text-gray-700 py-4 rounded-xl font-bold text-base flex items-center justify-center gap-3 shadow-sm cursor-pointer"
                    >
                        <svg className="w-6 h-6" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.2v3.15C3.2 21.32 7.24 24 12 24z"/>
                            <path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.6H1.2C.44 8.14 0 9.87 0 12s.44 3.86 1.2 5.4l4.07-3.16z"/>
                            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.24 0 3.2 2.68 1.2 6.6l4.07 3.15c.95-2.85 3.6-4.99 6.73-4.99z"/>
                        </svg>
                        Google
                    </button>
                </div>

                <div className="flex justify-center items-center gap-2 mt-10 text-base">
                    <span className="text-gray-500">Não tem uma conta?</span>
                    <button onClick={onGoToSignup} className="text-[#4A2E7A] font-bold hover:underline">Cadastre-se</button>
                </div>
            </div>
        </div>
    );
}