import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { API_URL } from "../services/api";

function Portfolio() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [perfil, setPerfil] = useState({});
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);

  const tipos = [
    "Rack para TV",
    "Painel para TV",
    "Estante",
    "Mesa de centro",
    "Aparador",
    "Guarda-roupa planejado",
    "Cama",
    "Escrivaninha",
    "Cozinha planejada",
    "Closet planejado",
    "Home office planejado",
    "Mesa de jantar",
    "Painel ripado",
    "Lavanderia planejada",
    "Banheiro planejado",
    "Outro"
  ];

  useEffect(() => {
    buscarPerfil();
    buscarProjetos();
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

  const buscarProjetos = async () => {
    try {
      const res = await fetch(`${API_URL}/projetos`);
      const data = await res.json();
      setProjetos(Array.isArray(data) ? data : []);
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

  const projetosPorTipo = tipos.map((tipo) => ({
    tipo,
    itens: projetos.filter((p) => p.tipo === tipo)
  }));

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
                Galeria de Ambientes
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

      {/* CONTEÚDO PRINCIPAL DO PORTFÓLIO */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col gap-8">
        
        {/* TITULAÇÃO DA PÁGINA */}
        <div className="border-b border-slate-200 pb-5">
          <span className="text-[11px] font-bold text-blue-500 uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded-md">
            Galeria Exclusiva
          </span>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 mt-2">
            Nosso Portfólio
          </h1>
          <p className="text-slate-400 text-sm mt-0.5">
            Explore os móveis planejados sob medida fabricados pela nossa equipe.
          </p>
        </div>

        {/* LOADING INDICATOR */}
        {loading && (
          <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center shadow-sm flex flex-col items-center justify-center gap-3">
            <svg className="animate-spin h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            <p className="text-sm font-bold text-slate-500">Buscando os melhores projetos...</p>
          </div>
        )}

        {/* LISTAGEM DE CATEGORIAS */}
        {!loading &&
          projetosPorTipo.map((grupo, index) => {
            if (grupo.itens.length === 0) return null;

            return (
              <div key={index} className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm flex flex-col gap-5">
                
                {/* CABEÇALHO DA CATEGORIA */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-lg font-black tracking-tight text-slate-900">
                      {grupo.tipo}
                    </h2>
                    <p className="text-xs font-semibold text-slate-400 mt-0.5">
                      {grupo.itens.length} {grupo.itens.length === 1 ? "ambiente catalogado" : "ambientes catalogados"}
                    </p>
                  </div>
                </div>

                {/* FILA DE CARDS FLUIDA (CARROSSEL HORIZONTAL) */}
                <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                  {grupo.itens.map((proj) => {
                    let imagens = [];
                    try {
                      imagens = typeof proj.imagens === "string" ? JSON.parse(proj.imagens) : proj.imagens;
                    } catch {
                      imagens = [];
                    }

                    return (
                      <button
                        key={proj.id}
                        onClick={() => navigate("/detalheProj", { state: { projeto: proj } })}
                        className="min-w-[290px] md:min-w-[340px] text-left group bg-slate-50 hover:bg-slate-100/70 border border-slate-200/80 rounded-xl overflow-hidden transition-all duration-300 flex flex-col"
                      >
                        {/* Imagem do Card */}
                        <div className="relative aspect-[4/3] w-full bg-slate-200 overflow-hidden">
                          {imagens?.[0] && (
                            <img
                              src={imagens[0]}
                              alt={proj.tipo}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          )}
                        </div>
                        
                        {/* Rodapé Interno do Card */}
                        <div className="p-4 flex items-center justify-between gap-3">
                          <span className="text-xs font-bold text-slate-700 truncate">Ver Detalhes do Móvel</span>
                          <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-blue-500 group-hover:border-blue-200 transition-colors shadow-xs shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* BOTÃO VER MAIS DA CATEGORIA */}
                <div className="flex justify-center pt-2">
                  <button
                    onClick={() => navigate("/projetos", { state: { tipo: grupo.tipo } })}
                    className="bg-slate-100 hover:bg-slate-200 border border-slate-200/60 text-slate-700 font-bold px-6 py-2.5 rounded-xl text-xs transition active:scale-98 shadow-xs flex items-center gap-1.5"
                  >
                    Ver todas os projetos {grupo.tipo}
                  </button>
                </div>

              </div>
            );
          })
        }
      </main>

    </div>
  );
}

export default Portfolio;