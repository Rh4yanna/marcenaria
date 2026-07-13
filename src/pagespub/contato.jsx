import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { API_URL } from "../services/api";

function Contato() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const [perfilPublico, setPerfilPublico] = useState({
    titulo: "",
    subtitulo: "",
    banner: "",
    whatsapp: "",
    telefone: "",
    email: "",
    instagram: "",
    instagram_link: "",
  });

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

      if (data) {
        setPerfilPublico(data);
      }
    } catch (err) {
      console.log("Erro perfil:", err);
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
                Atendimento Exclusivo
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

      {/* HERO BANNER DO PERFIL */}
      <section className="relative w-full h-[38vh] md:h-[45vh] bg-slate-900 overflow-hidden flex items-center justify-center">
        {perfilPublico.banner && (
          <img
            src={perfilPublico.banner}
            alt="Banner de Fundo Marcenaria"
            className="absolute inset-0 w-full h-full object-cover opacity-40 filter brightness-90"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
        
        <div className="relative z-10 text-center px-4 max-w-2xl">
          <span className="text-[11px] font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            Marcenaria de Alto Padrão
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mt-3">
            {perfilPublico.titulo || "Solicite um Orçamento"}
          </h2>
          <p className="text-sm text-slate-300 mt-2 font-medium">
            {perfilPublico.subtitulo || "Transforme seus ambientes com projetos sob medida planejados para o seu bem-estar."}
          </p>
        </div>
      </section>

      {/* CONTEÚDO / BOTÃO VOLTAR E CARDS */}
      <main className="max-w-4xl mx-auto px-4 md:px-8 pt-8 pb-16">
        
        {/* BOTÃO VOLTAR REESTILIZADO */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/principal")}
            className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 shadow-sm transition active:scale-98"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Voltar ao Início
          </button>
        </div>

        {/* SEÇÃO DOS CARDS DE CONTATO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* WHATSAPP PREMIUM */}
          <a
            href={perfilPublico.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="group bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-emerald-200 hover:shadow-md hover:shadow-emerald-500/5 transition-all duration-300 flex flex-col justify-between h-48"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              </div>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">Online</span>
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Conversar no WhatsApp</h3>
              <p className="text-lg font-black text-slate-800 mt-0.5 group-hover:text-emerald-600 transition-colors">
                {perfilPublico.telefone || "Iniciar Conversa"}
              </p>
            </div>
          </a>

          {/* INSTAGRAM PREMIUM */}
          <a
            href={perfilPublico.instagram_link}
            target="_blank"
            rel="noreferrer"
            className="group bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-pink-200 hover:shadow-md hover:shadow-pink-500/5 transition-all duration-300 flex flex-col justify-between h-48"
          >
            <div className="w-12 h-12 bg-pink-50 text-pink-600 rounded-xl flex items-center justify-center group-hover:bg-pink-500 group-hover:text-white transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nosso Instagram</h3>
              <p className="text-lg font-black text-slate-800 mt-0.5 group-hover:text-pink-600 transition-colors truncate">
                {perfilPublico.instagram || "@marciobassani"}
              </p>
            </div>
          </a>

          {/* EMAIL PREMIUM */}
          <div className="group bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-blue-200 hover:shadow-md hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between h-48">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">E-mail Corporativo</h3>
              <p className="text-base font-black text-slate-800 mt-0.5 break-all">
                {perfilPublico.email || "contato@marciobassani.com"}
              </p>
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}

export default Contato;