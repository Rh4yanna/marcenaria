import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

function Home() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const irPara = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const sair = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  const MenuItem = ({ label, desc, path }) => (
    <button
      onClick={() => irPara(path)}
      className="w-full text-left p-3.5 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-200 flex flex-col gap-0.5 group"
    >
      <span className="font-medium text-slate-700 group-hover:text-blue-600 transition">{label}</span>
      <span className="text-xs text-slate-400">{desc}</span>
    </button>
  );

  const CardButton = ({ title, desc, path, icon }) => (
    <div
      onClick={() => navigate(path)}
      className="group cursor-pointer bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-0.5 hover:border-blue-300 transition-all duration-300 flex flex-col justify-between min-h-[160px]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="p-3 rounded-xl bg-slate-50 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors duration-300 border border-slate-100 group-hover:border-blue-100">
          {icon}
        </div>
        <div className="p-2 rounded-lg text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{title}</h3>
        <p className="text-sm text-slate-500 mt-1 line-clamp-2">{desc}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-800 antialiased">
      {/* HEADER */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex flex-col justify-center items-center gap-1.5 transition text-slate-700 border border-slate-200/40"
          >
            <span className={`w-5 h-0.5 bg-current transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-5 h-0.5 bg-current transition-opacity ${menuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-5 h-0.5 bg-current transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>

          <div className="flex items-center gap-3">
            <img src={logo} className="w-10 h-10 rounded-xl object-cover shadow-sm border border-slate-100" alt="Logo" />
            <div>
              <h1 className="font-bold text-base tracking-tight text-slate-900 leading-tight">Marcio Bassani</h1>
              <p className="text-xs text-slate-500 font-medium">Painel Administrativo</p>
            </div>
          </div>
          
          <button 
            onClick={sair}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 transition border border-transparent hover:border-red-100"
          >
            Sair
          </button>
          <div className="sm:hidden w-10"></div>
        </div>
      </header>

      {/* SIDEBAR DRAWER */}
      {menuOpen && (
        <>
          <div onClick={() => setMenuOpen(false)} className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-40" />
          <div className="fixed left-0 top-0 w-72 h-full bg-white p-5 shadow-2xl z-50 flex flex-col justify-between border-r border-slate-200">
            <div>
              <div className="flex items-center gap-3 pb-6 mb-4 border-b border-slate-200">
                <img src={logo} className="w-10 h-10 rounded-xl object-cover border border-slate-100" alt="Logo" />
                <div>
                  <h2 className="font-bold text-slate-900 text-sm">Marcio Bassani</h2>
                  <p className="text-xs text-slate-400 font-medium">Gestão Marcenaria</p>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <MenuItem label="Criar Orçamentos" desc="Novo orçamento" path="/criarOrc" />
                <MenuItem label="Lista Orçamentos" desc="Visualizar gravados" path="/listaOrc" />
                <MenuItem label="Gerenciar Projetos" desc="Portfólio interno" path="/gerenciarProj" />
                <MenuItem label="Adicionar Projeto" desc="Cadastrar novo item" path="/adicionarProj" />
                <MenuItem label="Gerenciar Perfil" desc="Atualizar dados públicos" path="/gerenciarPerfil" />
              </div>
            </div>

            <button
              onClick={sair}
              className="w-full bg-slate-100 text-slate-700 hover:bg-red-50 hover:text-red-600 font-semibold py-3 rounded-xl text-sm transition-colors duration-200 mt-auto flex items-center justify-center gap-2 border border-slate-200 hover:border-red-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Sair da Conta
            </button>
          </div>
        </>
      )}

      {/* CONTEÚDO PRINCIPAL */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-6">
        
        {/* BANNER DO PORTFÓLIO PÚBLICO */}
        <div 
          onClick={() => window.open("https://marcenaria-1.onrender.com/principal", "_blank")}
          className="group cursor-pointer relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 md:p-8 text-white shadow-md hover:shadow-xl transition-all duration-300 border border-slate-700/70"
        >
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/20 transition-all duration-500" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-500/10 text-emerald-400 mb-3 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Site Online
              </span>
              <h2 className="text-xl md:text-2xl font-black tracking-tight">Ver Meu Portfólio Público</h2>
              <p className="text-slate-400 text-sm mt-1 max-w-md">
                Acesse a visualização externa que seus clientes utilizam para ver seus trabalhos e entrar em contato.
              </p>
            </div>
            
            <div className="flex items-center gap-2 text-sm font-bold bg-white/10 hover:bg-white/15 transition py-3 px-5 rounded-xl border border-white/10 self-start sm:self-center backdrop-blur-sm group-hover:border-white/30">
              Acessar Página
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-1 transition-transform"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
            </div>
          </div>
        </div>

        {/* GRID DE FUNCIONALIDADES ADMINISTRATIVAS */}
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 pl-1">Ações do Sistema</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CardButton
              title="Criar Orçamentos"
              desc="Gere e monte novos orçamentos personalizados para os clientes."
              path="/criarOrc"
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>}
            />

            <CardButton
              title="Lista de Orçamentos"
              desc="Visualize, busque e gerencie todos os orçamentos já salvos."
              path="/listaOrc"
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18"/><path d="M3 6h18"/><path d="M3 18h18"/></svg>}
            />

            <CardButton
              title="Gerenciar Projetos"
              desc="Altere a galeria de fotos e portfólio interno exibido no site."
              path="/gerenciarProj"
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>}
            />

            <CardButton
              title="Gerenciar Perfil"
              desc="Atualize suas redes sociais, contatos de WhatsApp, banner e dados principais."
              path="/gerenciarPerfil"
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
            />
          </div>
        </div>

      </main>
    </div>
  );
}

export default Home;