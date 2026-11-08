
interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    confirmLabel: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export function ConfirmModal({ isOpen, title, confirmLabel, onConfirm, onCancel }: ConfirmModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Fundo escurecido */}
            <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={onCancel} />

            {/* Conteúdo do Modal */}
            <div className="bg-white w-full max-w-xs rounded-[24px] p-5 shadow-2xl z-10 flex flex-col items-center text-center relative">
                {/* Ícone de Alerta Amarelo */}
                <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-500 text-2xl mb-4">
                    ⚠️
                </div>

                <h3 className="text-base font-bold text-gray-800 mb-5 leading-snug px-2">
                    {title}
                </h3>

                {/* Botões Cancelar e Ação */}
                <div className="grid grid-cols-2 gap-3 w-full">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="w-full py-2.5 rounded-xl border border-[#5D4A88] text-[#5D4A88] font-bold text-xs hover:bg-purple-50 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors shadow-sm"
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}