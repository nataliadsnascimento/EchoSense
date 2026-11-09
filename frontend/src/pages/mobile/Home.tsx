import React, {useState} from 'react';

interface HomeProps {
    userName?: string;
    onOpenSidebar: () => void;
    onNavigateToDetect: () => void;
    onNavigateToHistory?: () => void;
}

export function Home({userName = "Usuário", onOpenSidebar, onNavigateToDetect, onNavigateToHistory}: HomeProps){
    const [environment, setEnvironment] = useState<'casa' | 'trabalho'>('casa');
    const [isMonitoring, setIsMonitoring] = useState(true);

    const alertsData = environment === 'casa' ? [
        {id: 1, title: 'Campainha', time: 'Hoje, 10:23', icon: '🔔'},
        {id: 2, title: 'Choro de Bebê', time: 'Hoje, 09:15', icon: '👶'},
        {id: 3, title: 'Alarme', time: 'Ontem, 22:47', icon: '⚠️'},
        {id: 4, title: 'Porta Batendo', time: 'Ontem, 18:30', icon: '🚪'},
    ] : [
        {id: 1, title: 'Passos', time: 'Hoje, 10:23', icon: '👣'},
        {id: 2, title: 'Vozes no Ambiente', time: 'Hoje, 09:15', icon: '🗣️'},
        {id: 3, title: 'Impressora', time: 'Ontem, 22:47', icon: '🖨️'},
        {id: 4, title: 'Porta Fechando', time: 'Ontem, 18:30', icon: '🚪'}
    ];


    return (
        <div className="flex-1 bg-[#F8F7FA] flex flex-col font-sans p-4 pb-20 overflow-y-auto">
          {/* Botão para abrir o Menu Lateral */}
          <div className="flex items-center justify-between mb-4 mt-2">
             <button onClick={onOpenSidebar} className="p-1 text-gray-700 hover:text-[#5D4A88]">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
               </svg>
             </button>
             <h1 className="text-lg font-bold text-[#5D4A88]">EchoSense</h1>
             <div className="w-6" />
          </div>

         {/* Saudação com Nome do Usuário */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-[#5D4A88] font-bold">
              👤
            </div>
            <div>
               <span className="text-[10px] text-gray-400 font-semibold block uppercase">Olá,</span>
               <h2 className="text-base font-bold text-gray-800">{userName}! 👋</h2>
            </div>
          </div>

         {/* Troca de Ambiente (Casa / Trabalho) */}
         <div className="bg-white rounded-[20px] p-3.5 shadow-sm border border-gray-100 mb-3 flex items-center justify-between">
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-[#5D4A88]">
               {environment === 'casa' ? '🏠' : '💼'}
             </div>
             <div>
               <span className="text-[10px] font-bold text-gray-400 uppercase">Ambiente atual</span>
               <p className="text-xs font-bold text-gray-800 capitalize">{environment === 'casa' ? 'Casa' : 'Trabalho'}</p>
              </div>
             </div>
             <button
               onClick={() => setEnvironment(environment === 'casa' ? 'trabalho' : 'casa')}
               className="text-xs font-bold text-[#5D4A88] hover:underline"
             >
               Trocar ambiente ›
             </button>
           </div>

          {/* Controle do Status do Monitoramento (Ativo / Pausado) */}
          <div className="bg-white rounded-[24px] p-4 shadow-sm border border-gray-100 mb-3">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xs font-bold text-gray-800">Monitoramento em segundo plano</h3>
                <p className="text-[10px] text-gray-400">Gerencie a detecção de sons.</p>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${isMonitoring ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isMonitoring ? 'bg-green-500' : 'bg-amber-500'}`} />
                {isMonitoring ? 'Ativo' : 'Pausado'}
              </span>
            </div>

          {!isMonitoring && (
              <p className="text-[10px] text-gray-400 mb-3">
                O monitoramento está pausado. Você não receberá alertas visuais até retomar o serviço.
              </p>
           )}

          <button
            onClick={() => setIsMonitoring(!isMonitoring)}
            className={`w-full py-2.5 rounded-xl font-bold text-xs border ${
                isMonitoring
                ? 'bg-purple-50 border-purple-200 text-[#5D4A88]'
                : 'bg-[#5D4A88] text-white border-transparent'
            }`}
        >
            {isMonitoring ? '⏸ Pausar monitoramento' : '▶ Retomar monitoramento'}
          </button>
        </div>

        {/* Lista de Alertas Recentes */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold text-gray-800">Últimos alertas</h3>
          <button onClick={onNavigateToHistory} className="text-[10px] font-bold text-[#5D4A88]">Ver todos</button>
        </div>

        <div className="flex flex-col gap-2">
          {alertsData.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-[#5D4A88]">
                   {item.icon}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-800">{item.title}</h4>
                  <span className="text-[10px] text-gray-400">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
}