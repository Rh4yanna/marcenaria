import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { API_URL } from "../services/api";

function Principal() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [perfilPublico, setPerfilPublico] = useState({
    titulo: "",
    subtitulo: "",
    descricao_servicos: "",
    whatsapp: "",
    banner: "",
    telefone: "",
    email: "",
    instagram: "",
    instagram_link: "",
  });
  const [projetos, setProjetos] = useState([]);

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
    buscarProjetos();
  }, []);

  const buscarPerfil = async () => {
    try {
      const res = await fetch(`${API_URL}/perfil`);
      const data = await res.json();
      if (data) {
        setPerfilPublico(data);
      }
    } catch (err) {
      console.log("Erro perfil:", err);
    }
  };

  const buscarProjetos = async () => {
    try {
      const res = await fetch(`${API_URL}/projetos`);
      const data = await res.json();
      setProjetos(Array.isArray(data) ? data : []);
    } catch {
      console.log("Erro projetos");
    }
  };

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
                Móveis Planejados
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

      <main className="flex flex-col gap-12 pb-16">
        
        {/* HERO BANNER SECTION ACCENT */}
        <section className="relative w-full h-[75vh] md:h-[85vh] bg-slate-950 overflow-hidden flex items-center justify-center">
          {/* IMAGEM DE FUNDO */}
          {perfilPublico.banner && (
            <img
              src={perfilPublico.banner}
              alt="Apresentação Marcio Bassani"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-45 select-none"
            />
          )}

          {/* GRADIENTE OVERLAY INTEGRADO */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20" />

          {/* CONTEÚDO PRINCIPAL (TEXTOS) */}
          <div className="relative z-10 max-w-4xl mx-auto text-center px-4 md:px-8 flex flex-col items-center gap-4">
            <span className="text-[11px] font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full backdrop-blur-xs">
              Design & Execução Sob Medida
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tight leading-tight max-w-3xl">
              {perfilPublico.titulo || "Móveis Planejados de Alto Padrão"}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-xl font-medium leading-relaxed mt-2">
              {perfilPublico.subtitulo}
            </p>

            {/* BOTÕES DE AÇÃO INTERATIVOS */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 mt-6 w-full sm:w-auto">
              <button
                onClick={() => navigate("/portfolio")}
                className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold px-7 py-3.5 rounded-xl text-sm transition shadow-lg shadow-blue-500/20 active:scale-98"
              >
                Conhecer Portfólio
              </button>
              <button
                onClick={() => navigate("/contato")}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/15 text-white border border-white/20 backdrop-blur-md font-bold px-7 py-3.5 rounded-xl text-sm transition active:scale-98"
              >
                Fazer Orçamento
              </button>
            </div>
          </div>
        </section>

        {/* TRABALHO COM (SERVIÇOS) */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 w-full">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-2.5 mb-4 border-b border-slate-100 pb-4">
              <div className="w-5 h-5 text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
              </div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight">
                Especialidades da Marcenaria
              </h2>
            </div>
            <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed whitespace-pre-line">
              {perfilPublico.descricao_servicos || "Soluções completas em ambientes planejados corporativos e residenciais."}
            </p>
          </div>
        </section>

        {/* VITRINE RÁPIDA (PROJETOS RECENTES) */}
        <section className="flex flex-col gap-4 max-w-7xl mx-auto w-full px-4 md:px-8">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Projetos Recentes
            </h2>
            <p className="text-xs font-semibold text-slate-400 mt-0.5">
              Uma amostra rápida de nossa qualidade de acabamento.
            </p>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
            {projetos.map((proj) => {
              let imagens = [];
              try {
                imagens = typeof proj.imagens === "string" ? JSON.parse(proj.imagens) : proj.imagens;
              } catch {
                imagens = [];
              }

              return (
                <div
                  key={proj.id}
                  onClick={() => navigate("/portfolio")}
                  className="min-w-[280px] md:min-w-[320px] aspect-[4/3] bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm cursor-pointer group shrink-0 relative"
                >
                  {imagens?.[0] && (
                    <img
                      src={imagens[0]}
                      alt="Projeto realizado"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white/90 text-slate-900 font-bold text-xs px-3 py-1.5 rounded-lg backdrop-blur-xs shadow-sm">
                      Ver no Portfólio
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA FINAL DE CONVERSÃO */}
        <section className="max-w-7xl mx-auto w-full px-4 md:px-8 mt-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 md:p-10 text-center relative overflow-hidden shadow-md shadow-slate-950/10">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-transparent pointer-events-none" />
            
            <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center">
              <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
                Vamos planejar o seu próximo espaço?
              </h2>
              <p className="text-slate-400 text-xs md:text-sm mt-1.5 font-medium leading-relaxed">
                Envie suas medidas ou fale sobre a sua ideia. Respondemos de forma rápida com um atendimento consultivo completo.
              </p>
              
              <a
                href={perfilPublico.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3.5 rounded-xl text-xs shadow-md shadow-emerald-500/15 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-98"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                Chamar no WhatsApp Comercial
              </a>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

export default Principal;