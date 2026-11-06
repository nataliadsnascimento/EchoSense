import React, { useState } from 'react';
import logoIcon from '../../assets/som.png';

interface Props {
    onSignupSuccess: () => void;
    onGoToLogin: () => void;
}

export function Signup({ onSignupSuccess, onGoToLogin }: Props) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="h-full bg-[#F8F7FA] flex flex-col justify-between font-sans relative overflow-hidden p-5">
            <div className="absolute top-0 left-0 right-0 h-4 bg-[#5D4A88]"></div>

            {/* Cabeçalho */}
            <div className="flex justify-between items-center mt-3 z-10">
                <div></div>
                <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 p-1.5">
                    <img src={logoIcon} alt="Ícone EchoSense" className="w-full h-full object-contain" />
                </div>
            </div>

            {/* Conteúdo Central / Cartão de Cadastro */}
            <div className="bg-white rounded-[28px] p-5 shadow-sm flex flex-col justify-center my-auto z-10">
                <div className="text-center mb-3">
                    <h2 className="text-[20px] font-bold text-[#5D4A88] leading-tight">
                        Criar conta
                    </h2>
                    <p className="text-gray-400 text-xs mt-0.5">
                        Preencha seus dados para começar
                    </p>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); onSignupSuccess(); }} className="flex flex-col gap-2.5">
                    {/* Campo Nome Completo */}
                    <div>
                        <label className="block text-[11px] font-bold text-[#5D4A88] mb-1">Nome completo</label>
                        <input
                            type="text"
                            placeholder="Seu nome"
                            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-gray-800 focus:outline-none focus:border-[#5D4A88] bg-gray-50/50"
                        />
                    </div>

                    {/* Campo E-mail */}
                    <div>
                        <label className="block text-[11px] font-bold text-[#5D4A88] mb-1">E-mail</label>
                        <input
                            type="email"
                            placeholder="seu@gmail.com"
                            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-gray-800 focus:outline-none focus:border-[#5D4A88] bg-gray-50/50"
                        />
                    </div>

                    {/* Campo Senha */}
                    <div>
                        <label className="block text-[11px] font-bold text-[#5D4A88] mb-1">Senha</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Mínimo de 6 caracteres"
                                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-gray-800 focus:outline-none focus:border-[#5D4A88] bg-gray-50/50 pr-9"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d={showPassword ? "M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" : "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z"} />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Botão Cadastrar */}
                    <button
                        type="submit"
                        className="w-full bg-[#5D4A88] hover:bg-[#4A2E7A] transition-colors text-white py-3 rounded-xl font-bold text-xs mt-2 shadow-md"
                    >
                        Cadastrar
                    </button>
                </form>
            </div>

            {/* Rodapé / Link de Ir para Login */}
            <div className="flex justify-center items-center gap-1 mb-1 z-10 text-xs">
                <span className="text-gray-500">já tem uma conta?</span>
                <button onClick={onGoToLogin} className="text-[#5D4A88] font-bold hover:underline">
                    Entrar
                </button>
            </div>
        </div>
    );
}