import React, { useState } from 'react';
import logoIcon from '../../assets/som.png';
import { useGoogleLogin } from '@react-oauth/google'; // Importação do Google

interface Props {
    onLoginSuccess: () => void;
    onGoToSignup: () => void;
}

export function Login({ onLoginSuccess, onGoToSignup }: Props) {
    const [showPassword, setShowPassword] = useState(false);

    // Configuração do login do Google para o mobile
    const googleLogin = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            console.log('Login com Google bem-sucedido (Mobile)!', tokenResponse);
            onLoginSuccess();
        },
        onError: () => {
            console.log('Erro ao fazer login com o Google');
            alert('Falha ao autenticar com o Google.');
        }
    });

    return (
        <div className="h-full bg-white flex flex-col justify-between p-6 font-sans overflow-y-auto">
            {/* Topo / Voltar ou Logo */}
            <div className="flex justify-between items-center mb-4">
                <img src={logoIcon} alt="EchoSense" className="w-8 h-8 object-contain" />
            </div>

            {/* Cabeçalho */}
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-[#4A2E7A] mb-1">Olá, que bom te ver aqui! 👋</h2>
                <p className="text-gray-500 text-xs">Faça login para continuar</p>
            </div>

            {/* Formulário */}
            <form onSubmit={(e) => { e.preventDefault(); onLoginSuccess(); }} className="flex flex-col gap-4 w-full">
                <div>
                    <label className="block text-xs font-bold text-[#4A2E7A] mb-1.5">E-mail</label>
                    <input
                        type="email"
                        placeholder="seu@gmail.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-[#5D4A88] bg-gray-50"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-[#4A2E7A] mb-1.5">Senha</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••••••"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-[#5D4A88] bg-gray-50 pr-10"
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d={showPassword ? "M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" : "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z"} /></svg>
                        </button>
                    </div>
                    <div className="flex justify-end mt-1.5">
                        <a href="#esqueci" onClick={(e) => e.preventDefault()} className="text-[11px] font-bold text-[#4A2E7A] hover:underline">Esqueceu a senha?</a>
                    </div>
                </div>

                <button type="submit" className="w-full bg-[#4A2E7A] hover:bg-[#382360] transition-colors text-white py-3 rounded-xl font-bold text-sm shadow-md mt-1">
                    Entrar
                </button>
            </form>

            <div className="relative flex py-4 items-center w-full">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-3 text-xs text-gray-400">ou continuar com</span>
                <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* Botão do Google para Mobile */}
            <div className="w-full">
                <button
                    type="button"
                    onClick={() => googleLogin()}
                    className="w-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors text-gray-700 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.2v3.15C3.2 21.32 7.24 24 12 24z"/>
                        <path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.6H1.2C.44 8.14 0 9.87 0 12s.44 3.86 1.2 5.4l4.07-3.16z"/>
                        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.24 0 3.2 2.68 1.2 6.6l4.07 3.15c.95-2.85 3.6-4.99 6.73-4.99z"/>
                    </svg>
                    Google
                </button>
            </div>

            <div className="flex justify-center items-center gap-1.5 mt-4 text-xs">
                <span className="text-gray-500">Não tem uma conta?</span>
                <button onClick={onGoToSignup} className="text-[#4A2E7A] font-bold hover:underline">Cadastre-se</button>
            </div>
        </div>
    );
}