import React, { useState } from 'react';
import logoIcon from '../../assets/som.png';

interface Props {
    onSignupSuccess: () => void;
    onGoToLogin: () => void;
}

export function SignupDesktop({ onSignupSuccess, onGoToLogin }: Props) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="h-screen w-full flex font-sans overflow-hidden">

            {/* === COLUNA ESQUERDA (Painel Roxo Fixo) === */}
            <div className="w-[45%] lg:w-[40%] bg-[#4A2E7A] h-full p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden text-white">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-1/2 left-0 w-48 h-48 bg-[#cb19a5]/10 rounded-full blur-3xl -translate-x-1/2"></div>

                {/* Topo: Logo */}
                <div className="flex items-center gap-3 relative z-10">
                    <div className="bg-white p-2 rounded-xl">
                        <img src={logoIcon} alt="Logo" className="w-6 h-6 object-contain" />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg leading-none tracking-wide">EchoSense</h1>
                        <span className="text-[11px] text-purple-200">Sons que viram alerta</span>
                    </div>
                </div>

                {/* Centro: Onda Sonora */}
                <div className="flex-1 flex justify-center items-center relative z-10">
                    <svg width="280" height="280" viewBox="0 0 200 200" className="opacity-80">
                        <g fill="white">
                            {[4, 12, 24, 40, 60, 80, 100, 120, 100, 80, 60, 40, 24, 12, 4].map((height, i) => (
                                <rect key={i} x={10 + i * 12} y={100 - height / 2} width="6" height={height} rx="3" fillOpacity={0.2 + (height/120)*0.8} />
                            ))}
                        </g>
                    </svg>
                </div>

                {/* Base: Textos */}
                <div className="relative z-10">
                    <h2 className="text-4xl font-bold mb-4 leading-tight">Mais segurança começa aqui.</h2>
                    <p className="text-base text-purple-200 mb-8 max-w-sm leading-relaxed">
                        Tecnologia que transforma sons importantes em alertas visuais e luz para sua tranquilidade.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-purple-300">
                        <span className="w-2 h-2 bg-white rounded-full"></span>
                        Mais autonomia. Mais segurança.
                    </div>
                </div>
            </div>

            {/* === COLUNA DIREITA (Formulário de Cadastro - Tela Inteira) === */}
            <div className="flex-1 bg-white h-full flex flex-col justify-center px-16 lg:px-32 relative overflow-y-auto">

                <div className="text-center mb-10 mt-8">
                    <h2 className="text-4xl font-bold text-[#4A2E7A] mb-3">Criar conta</h2>
                    <p className="text-gray-500 text-base">Preencha seus dados para começar</p>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); onSignupSuccess(); }} className="flex flex-col gap-5 max-w-md mx-auto w-full pb-8">

                    {/* Campo: Nome Completo */}
                    <div>
                        <label className="block text-sm font-bold text-[#4A2E7A] mb-2">Nome completo</label>
                        <input
                            type="text"
                            placeholder="Seu nome"
                            className="w-full px-5 py-3.5 rounded-xl border border-gray-200 text-base text-gray-800 focus:outline-none focus:border-[#5D4A88] focus:ring-2 focus:ring-[#5D4A88]/20 bg-gray-50 transition-all"
                            required
                        />
                    </div>

                    {/* Campo: E-mail */}
                    <div>
                        <label className="block text-sm font-bold text-[#4A2E7A] mb-2">E-mail</label>
                        <input
                            type="email"
                            placeholder="seu@gmail.com"
                            className="w-full px-5 py-3.5 rounded-xl border border-gray-200 text-base text-gray-800 focus:outline-none focus:border-[#5D4A88] focus:ring-2 focus:ring-[#5D4A88]/20 bg-gray-50 transition-all"
                            required
                        />
                    </div>

                    {/* Campo: Senha */}
                    <div>
                        <label className="block text-sm font-bold text-[#4A2E7A] mb-2">Senha</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Mínimo de 6 caracteres"
                                className="w-full px-5 py-3.5 rounded-xl border border-gray-200 text-base text-gray-800 focus:outline-none focus:border-[#5D4A88] focus:ring-2 focus:ring-[#5D4A88]/20 bg-gray-50 transition-all pr-12"
                                required
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d={showPassword ? "M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" : "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z"} /></svg>
                            </button>
                        </div>
                    </div>

                    {/* Campo: Confirmar Senha */}
                    <div>
                        <label className="block text-sm font-bold text-[#4A2E7A] mb-2">Confirme sua senha</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Repita a senha"
                                className="w-full px-5 py-3.5 rounded-xl border border-gray-200 text-base text-gray-800 focus:outline-none focus:border-[#5D4A88] focus:ring-2 focus:ring-[#5D4A88]/20 bg-gray-50 transition-all pr-12"
                                required
                            />
                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d={showConfirmPassword ? "M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" : "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z"} /></svg>
                            </button>
                        </div>
                    </div>

                    {/* Checkbox Termos */}
                    <div className="mt-2">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                required
                                className="w-5 h-5 rounded border-gray-300 text-[#4A2E7A] focus:ring-[#4A2E7A] cursor-pointer accent-[#4A2E7A]"
                            />
                            <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                                Li e concordo com os <a href="#termos" className="text-[#4A2E7A] font-bold hover:underline">termos de uso</a> e <a href="#privacidade" className="text-[#4A2E7A] font-bold hover:underline">política de privacidade</a>.
                            </span>
                        </label>
                    </div>

                    {/* Botão Cadastrar */}
                    <button type="submit" className="w-full bg-[#4A2E7A] hover:bg-[#382360] transition-colors text-white py-4 rounded-xl font-bold text-base shadow-lg mt-4">
                        Cadastrar
                    </button>
                </form>

                {/* Ir para Login */}
                <div className="flex justify-center items-center gap-2 mt-4 text-base pb-8">
                    <span className="text-gray-500">Já tem uma conta?</span>
                    <button onClick={onGoToLogin} className="text-[#4A2E7A] font-bold hover:underline">Entrar</button>
                </div>

            </div>
        </div>
    );
}