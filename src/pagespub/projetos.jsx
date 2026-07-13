import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { API_URL } from "../services/api";

function Projetos() {
  const navigate = useNavigate();
  const location = useLocation();
  const tipoSelecionado = location.state?.tipo || "";

  const [menuOpen, setMenuOpen] = useState(false);
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    buscarProjetos();
  }, []);

  const buscarProjetos = async () => {
    try {
      const res = await fetch(`${API_URL}/projetos`);
      const data = await res.json();

      const filtrados = tipoSelecionado
        ? data.filter((p) => p.tipo === tipoSelecionado)
        : data;

      setProjetos(filtrados);
    } catch {
      console.log("erro projetos");
    } finally {
      setLoading(false);
    }
  };

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
                Catálogo Técnico
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

      {/* CONTEÚDO PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col gap-8">
        
        {/* TOPO: TÍTULO E BOTÃO VOLTAR */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <span className="text-[11px] font-bold text-blue-500 uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded-md">
              Coleções Sob Medida
            </span>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 mt-2">
              {tipoSelecionado || "Todos os Projetos"}
            </h1>
            <p className="text-slate-400 text-sm mt-0.5">
              Navegue pelos ambientes e inspire-se para construir o seu espaço.
            </p>
          </div>

          <button
            onClick={() => navigate("/portfolio")}
            className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 shadow-sm transition active:scale-98 w-fit self-start sm:self-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Voltar ao Portfólio
          </button>
        </div>

        {/* LOADING INDICATOR */}
        {loading && (
          <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center shadow-sm flex flex-col items-center justify-center gap-3">
            <svg className="animate-spin h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            <p className="text-sm font-bold text-slate-500">Buscando ambientes...</p>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && projetos.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center shadow-sm flex flex-col items-center justify-center">
            <div className="w-12 h-12 text-slate-300 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            </div>
            <p className="text-sm font-bold text-slate-500">Nenhum projeto encontrado nesta categoria.</p>
          </div>
        )}

        {/* PROJETO CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!loading &&
            projetos.map((proj) => {
              let imagens = [];
              try {
                imagens = typeof proj.imagens === "string" ? JSON.parse(proj.imagens) : proj.imagens;
              } catch {
                imagens = [];
              }

              return (
                <div
                  key={proj.id}
                  className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Bloco Superior: Imagem */}
                  <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                    {imagens?.[0] && (
                      <img
                        src={imagens[0]}
                        alt={proj.nome || proj.tipo}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                      />
                    )}
                  </div>

                  {/* Bloco Inferior: Textos e Gatilho */}
                  <div className="p-5 flex flex-col gap-4">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {proj.tipo}
                      </span>
                      <h3 className="font-black text-lg text-slate-900 tracking-tight mt-0.5 truncate">
                        {proj.nome || proj.tipo}
                      </h3>
                    </div>

                    <button
                      onClick={() => navigate("/detalheProj", { state: { projeto: proj } })}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl text-xs shadow-md shadow-blue-500/10 transition flex items-center justify-center gap-1.5 active:scale-98"
                    >
                      Ver Detalhes Técnicos
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </main>

    </div>
  );
}

export default Projetos;