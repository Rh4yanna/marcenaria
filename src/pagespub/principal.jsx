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
      <h3 className="font-semibold text-gray-800">{label}</h3>
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
    // Fundo cinza claro e texto padrão slate
    <div className="min-h-screen bg-slate-50/60 text-slate-800 antialiased font-sans">
      {/* HEADER */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex flex-col items-center justify-center gap-1 transition shadow-sm"
          >
            <span className="w-4 h-0.5 bg-slate-600 rounded-full"></span>
            <span className="w-4 h-0.5 bg-slate-600 rounded-full"></span>
            <span className="w-4 h-0.5 bg-slate-600 rounded-full"></span>
          </button>

          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Logo"
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

      {/* MENU */}
      {menuOpen && (
        <>
          <div
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-xs z-40"
          />
          <div className="fixed left-0 top-0 w-72 h-full bg-white z-50 p-6 shadow-xl border-r border-slate-200 flex flex-col gap-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <img src={logo} alt="Logo" className="w-10 h-10 rounded-xl" />
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Marcio Bassani
                </h2>
                <p className="text-[11px] text-slate-400 font-medium">
                  Navegação
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <MenuItem label="Início" path="/principal" />
              <MenuItem label="Portfólio" path="/portfolio" />
              <MenuItem label="Contato" path="/contato" />
            </div>
          </div>
        </>
      )}

      <main>
        {/* BANNER PRINCIPAL (Manteve o tamanho max-h-[70vh]) */}
        <section className="relative w-full overflow-hidden bg-slate-900 flex justify-center">
          <img
            src={perfilPublico.banner}
            alt="Banner"
            className="w-full h-auto max-h-[70vh] object-contain block opacity-50"
          />
          {/* OVERLAY degradê suave para nítidez do texto */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-slate-950/20" />

          {/* CONTEÚDO */}
          <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl text-white font-black tracking-tight max-w-4xl">
              {perfilPublico.titulo}
            </h1>
            <p className="text-white text-base sm:text-lg md:text-xl font-medium mt-5 max-w-2xl opacity-90">
              {perfilPublico.subtitulo}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <button
                onClick={() => navigate("/portfolio")}
                className="bg-blue-500 hover:bg-blue-600 text-white px-7 py-3.5 rounded-xl font-bold transition shadow-md active:scale-95"
              >
                Ver Portfólio
              </button>
              <button
                onClick={() => navigate("/contato")}
                className="bg-white/10 hover:bg-white/20 text-white px-7 py-3.5 rounded-xl font-bold backdrop-blur-md border border-white/20 transition active:scale-95"
              >
                Entrar em contato
              </button>
            </div>
          </div>
        </section>

        {/* TRABALHO COM: (Tamanho mantido max-w-6xl) */}
        <section className="max-w-6xl mx-auto px-4 md:px-8 py-16 w-full">
          <div className="bg-white border border-slate-200 rounded-[24px] p-8 md:p-10 shadow-sm flex flex-col gap-5">
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-black text-slate-950 tracking-tight flex items-center gap-2">
                <span className="w-5 h-5 text-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  </svg>
                </span>
                Trabalho com:
              </h2>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium">
              {perfilPublico.descricao_servicos}
            </p>
          </div>
        </section>

        {/* PROJETOS REALIZADOS (Tamanho mantido overflow-x-auto) */}
        <section className="flex flex-col gap-6 max-w-7xl mx-auto px-4 md:px-8 w-full pb-10 border-b border-slate-100">
          <div className="flex flex-col gap-1.5">
            <h2 className="text-xl font-black tracking-tight text-slate-950">
              Projetos realizados
            </h2>
            <p className="text-slate-400 text-sm font-medium">
              Ambientes catalogados pela nossa marcenaria
            </p>
          </div>

          <div className="flex overflow-x-auto gap-5 pb-5 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
            {projetos.map((proj) => {
              let imagens = [];
              try {
                imagens =
                  typeof proj.imagens === "string"
                    ? JSON.parse(proj.imagens)
                    : proj.imagens;
              } catch {
                imagens = [];
              }
              return (
                <div
                  key={proj.id}
                  className="min-w-[280px] md:min-w-[320px] aspect-[4/3] bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between cursor-pointer group"
                  onClick={() => navigate("/portfolio")}
                >
                  {imagens?.[0] && (
                    <img
                      src={imagens[0]}
                      alt="Projeto"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  )}
                  {/* Overlay discreto com texto no hover */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="text-white text-xs font-bold px-3 py-1.5 bg-black/40 rounded-full backdrop-blur-sm">
                      Ver no portfólio
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SOLICITE ORÇAMENTO (Tamanho mantido py-20) */}
        <section className="text-center py-20 px-4 md:px-8 bg-white border-t border-slate-100">
          <div className="max-w-lg mx-auto flex flex-col items-center gap-2">
            <h2 className="text-3xl font-black tracking-tight text-slate-950">
              Solicite um orçamento
            </h2>
            <p className="text-slate-500 text-sm font-medium leading-relaxed mt-1">
              Vamos conversar e planejar o seu próximo espaço juntos. Fale diretamente pelo WhatsApp.
            </p>

            <a href={perfilPublico.whatsapp} target="_blank" rel="noreferrer">
              <button className="mt-8 bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-4 rounded-xl shadow-lg shadow-emerald-500/20 font-bold text-lg active:scale-95 transition flex items-center gap-2.5">
                <span className="w-5 h-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </span>
                Chamar no WhatsApp
              </button>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Principal;