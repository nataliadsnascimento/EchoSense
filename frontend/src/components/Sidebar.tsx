
interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    onNavigate: (page: string) => void;
    onOpenLogoutModal: () => void;
    userName?: string;
}

export function Sidebar({ isOpen, onClose, onNavigate, onOpenLogoutModal, userName = "Usuário" }: SidebarProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex font-sans">
            {/* Fundo escurecido da gaveta */}
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

            {/* Conteúdo da Sidebar */}
            <div className="relative w-4/5 max-w-xs bg-[#5D4A88] text-white flex flex-col justify-between p-5 z-10 shadow-2xl h-full">
                <div>
                    {/* Cabeçalho */}
                    <div className="flex items-center gap-2 mb-6 pt-2">
                        <button onClick={onClose} className="p-1 text-white hover:opacity-80">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <h1 className="text-xl font-bold">EchoSense</h1>
                    </div>

                    {/* Perfil do Usuário Logado */}
                    <div className="mb-6">
                        <h2 className="text-lg font-bold">Olá, {userName}! 👋</h2>
                        <p className="text-xs text-purple-200 mt-0.5">Tudo monitorado</p>
                    </div>

                    {/* Banner de Monitoramento */}
                    <div className="bg-white/10 rounded-2xl p-3.5 mb-6 border border-white/10">
                        <h3 className="text-xs font-bold">Monitoramento em segundo plano</h3>
                        <p className="text-xs text-purple-200 mt-0.5">Gerencie a detecção de sons.</p>
                    </div>

                    {/* Opções do Menu */}
                    <nav className="flex flex-col gap-1 text-sm font-medium">
                        <button onClick={() => { onNavigate('home'); onClose(); }} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/20 font-semibold text-left">
                            <span>🏠</span> Início
                        </button>
                        <button onClick={() => { onNavigate('historico'); onClose(); }} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-left">
                            <span>📁</span> Histórico
                        </button>
                        <button onClick={() => { onNavigate('detectar'); onClose(); }} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-left">
                            <span>🔍</span> Detectar sons
                        </button>
                        <button onClick={() => { onNavigate('alertas'); onClose(); }} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-left">
                            <span>🔔</span> Alertas
                        </button>
                        <button onClick={() => { onNavigate('configuracoes'); onClose(); }} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-left">
                            <span>⚙️</span> Configurações
                        </button>
                    </nav>
                </div>

                {/* Botão de Sair da Conta */}
                <button onClick={() => { onClose(); onOpenLogoutModal(); }} className="flex items-center gap-3 px-3 py-3 rounded-xl text-red-300 hover:bg-red-500/10 font-bold text-sm text-left">
                    <span>🚪</span> Sair da conta
                </button>
            </div>
        </div>
    );
}