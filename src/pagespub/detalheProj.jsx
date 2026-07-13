import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { API_URL } from "../services/api";

function DetalheProj() {
  const navigate = useNavigate();
  const location = useLocation();
  const projeto = location.state?.projeto;

  const [menuOpen, setMenuOpen] = useState(false);
  const [perfil, setPerfil] = useState({});

  const irPara = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const MenuItem = ({ label, path }) => (
    <button
      onClick={() => irPara(path)}
      className="w-full text-left p-4 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-200"
    >
      <h3 className="font-bold text-slate-800 text-sm">{label}</h3>
    </button>
  );

  useEffect(() => {
    buscarPerfil();
  }, []);

  const buscarPerfil = async () => {
    try {
      const res = await fetch(`${API_URL}/perfil`);
      const data = await res.json();
      setPerfil(data);
    } catch {
      console.log("erro perfil");
    }
  };

  if (!projeto) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50/60 p-4">
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-200 text-center max-w-sm w-full">
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Projeto não encontrado
          </h2>
          <p className="text-slate-400 text-xs mt-1.5 mb-6">
            O link pode estar corrompido ou o projeto foi removido.
          </p>
          <button
            onClick={() => navigate("/portfolio")}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition text-sm shadow-md shadow-blue-500/10"
          >
            Voltar ao Portfólio
          </button>
        </div>
      </div>
    );
  }

  let imagens = [];
  try {
    imagens = typeof projeto.imagens === "string" ? JSON.parse(projeto.imagens) : projeto.imagens;
  } catch {
    imagens = [];
  }

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-800 antialiased font-sans">
      
      {/* HEADER PREMIUM */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between">
          
          {/* BOTÃO DO MENU */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex flex-col items-center justify-center gap-1 transition shadow-sm"
          >
            <span className="w-4 h-0.5 bg-slate-600 rounded-full"></span>
            <span className="w-4 h-0.5 bg-slate-600 rounded-full"></span>
            <span className="w-4 h-0.5 bg-slate-600 rounded-full"></span>
          </button>

          {/* LOGO E TÍTULOS */}
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Logo Marcio Bassani"
              className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-sm"
            />
            <div>
              <h1 className="text-sm font-black text-slate-900 tracking-tight leading-none">
                Marcio Bassani
              </h1>
              <p className="text-[11px] font-medium text-slate-400 mt-1">
                Portfólio Técnico
              </p>
            </div>
          </div>

          <div className="w-10"></div>
        </div>
      </header>

      {/* MENU LATERAL RETRÁTIL */}
      {menuOpen && (
        <>
          <div
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-xs z-40"
          />

          <div className="fixed left-0 top-0 w-72 h-full bg-white border-r border-slate-200 shadow-xl z-50 p-5 flex flex-col gap-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <img src={logo} className="w-10 h-10 rounded-xl object-cover border border-slate-200" alt="Logo" />
              <div>
                <h2 className="text-sm font-bold text-slate-900">Marcio Bassani</h2>
                <p className="text-[11px] text-slate-400 font-medium">Móveis Planejados</p>
              </div>
            </div>

            <div className="flex flex-col gap-1 overflow-y-auto">
              <MenuItem label="Início" path="/principal" />
              <MenuItem label="Portfólio de Projetos" path="/portfolio" />
              <MenuItem label="Fale Conosco" path="/contato" />
            </div>
          </div>
        </>
      )}

      {/* CONTEÚDO DO PROJETO */}
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-8 flex flex-col gap-6">
        
        {/* BOTÃO VOLTAR E TITULAÇÃO */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <span className="text-[11px] font-bold text-blue-500 uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded-md">
              Móvel Planejado
            </span>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 mt-2">
              {projeto.tipo}
            </h1>
            <p className="text-slate-400 text-sm mt-0.5">
              Fotografias reais e especificações do ambiente executado.
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 shadow-sm transition active:scale-98 w-fit self-start sm:self-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Voltar
          </button>
        </div>

        {/* GALERIA DE IMAGENS PREMIUM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {imagens.map((img, index) => (
            <div 
              key={index} 
              className="relative aspect-[4/3] bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm group"
            >
              <img
                src={img}
                alt={`${projeto.tipo} - foto ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* DETALHES / DESCRIÇÃO TÉCNICA */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm mt-2">
          <div className="flex items-center gap-2.5 mb-4 border-b border-slate-100 pb-4">
            <div className="w-5 h-5 text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">
              Especificações do Projeto
            </h2>
          </div>
          <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-line font-medium">
            {projeto.descricao || "Nenhuma descrição técnica foi fornecida para este ambiente."}
          </p>
        </div>

        {/* BANNER SEÇÃO DE CONVERSÃO / ORÇAMENTO (CTA) */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden mt-6 shadow-lg shadow-slate-950/10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-transparent pointer-events-none" />
          
          <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Gostou deste móvel?
            </h2>
            <p className="text-slate-300 text-sm mt-2 font-medium">
              Fale diretamente com a gente para tirar suas dúvidas ou solicitar um orçamento.
            </p>
            
            <a
              href={perfil.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-3.5 rounded-xl text-sm shadow-md shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-98"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              Solicitar Orçamento via WhatsApp
            </a>
          </div>
        </section>

      </main>
    </div>
  );
}

export default DetalheProj;