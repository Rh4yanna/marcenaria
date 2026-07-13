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
    "Outro",
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
      <h3 className="font-semibold text-slate-800">{label}</h3>
    </button>
  );

  const projetosPorTipo = tipos.map((tipo) => ({
    tipo,
    itens: projetos.filter((p) => p.tipo === tipo),
  }));

  return (
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
              className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-sm"
              alt="Logo"
            />
            <div>
              <h1 className="text-sm font-black text-slate-900 tracking-tight leading-none">
                Marcio Bassani
              </h1>
              <p className="text-[11px] font-medium text-slate-400 mt-1">
                Portfólio
              </p>
            </div>
          </div>

          <div className="w-10" />
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
              <img src={logo} className="w-10 h-10 rounded-xl" alt="Logo" />
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

      {/* CONTEÚDO PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="border-b border-slate-200 pb-5 mb-10">
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            Portfólio
          </h1>
          <p className="text-slate-400 text-sm mt-0.5">
            Conheça alguns projetos realizados
          </p>
        </div>

        {loading && (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
            Carregando...
          </div>
        )}

        {!loading &&
          projetosPorTipo.map((grupo, index) => {
            if (grupo.itens.length === 0) return null;

            return (
              <div key={index} className="mb-14">
                <div className="mb-5">
                  <h2 className="text-xl font-black tracking-tight text-slate-900">
                    {grupo.tipo}
                  </h2>
                  <p className="text-xs font-semibold text-slate-400 mt-0.5">
                    {grupo.itens.length}{" "}
                    {grupo.itens.length === 1 ? "projeto" : "projetos"}
                  </p>
                </div>

                {/* FILA HORIZONTAL COM O TAMANHO ORIGINAL LADO A LADO */}
                <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                  {grupo.itens.map((proj) => {
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
                        className="min-w-[320px] bg-white border border-slate-200 rounded-[30px] overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                        onClick={() => navigate("/portfolio")}
                      >
                        {imagens?.[0] && (
                          <img
                            src={imagens[0]}
                            className="w-full h-72 object-cover group-hover:scale-103 transition duration-500"
                            alt={grupo.tipo}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-center mt-5">
                  <button
                    onClick={() =>
                      navigate("/projetos", { state: { tipo: grupo.tipo } })
                    }
                    className="bg-blue-500 hover:bg-blue-600 text-white px-7 py-2.5 rounded-xl font-bold transition shadow-md active:scale-95 text-xs tracking-wide"
                  >
                    Ver mais
                  </button>
                </div>
              </div>
            );
          })}
      </main>
    </div>
  );
}

export default Portfolio;