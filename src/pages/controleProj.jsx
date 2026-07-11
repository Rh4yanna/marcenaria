import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { API_URL } from "../services/api";

function ControleProj() {
  const [projetos, setProjetos] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const tipoSelecionado = location.state?.tipo || "";

  const irPara = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const MenuItem = ({ label, desc, path }) => (
    <button
      onClick={() => irPara(path)}
      className="w-full text-left p-3.5 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-200"
    >
      <h3 className="text-sm font-bold text-slate-800">{label}</h3>
      {desc && <p className="text-xs text-slate-400 mt-0.5">{desc}</p>}
    </button>
  );

  // BUSCAR PROJETOS
  const buscarProjetos = () => {
    fetch(`${API_URL}/projetos`)
      .then((res) => res.json())
      .then((data) => {
        const filtrados = tipoSelecionado
          ? data.filter((p) => p.tipo === tipoSelecionado)
          : data;

        filtrados.sort((a, b) => b.id - a.id);
        setProjetos(filtrados);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    buscarProjetos();
  }, []);

  // EXCLUIR
  const excluirProjeto = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este projeto?")) return;

    try {
      const res = await fetch(`${API_URL}/projetos/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Projeto excluído!");
        buscarProjetos();
      }
    } catch (err) {
      console.log(err);
      alert("Erro ao excluir");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-800 antialiased">

      {/* HEADER NO PADRÃO DE FONTE DA HOME */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between">

          {/* BOTÃO HAMBÚRGUER */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex flex-col items-center justify-center gap-1 transition shadow-sm"
          >
            <span className="w-4 h-0.5 bg-slate-600 rounded-full"></span>
            <span className="w-4 h-0.5 bg-slate-600 rounded-full"></span>
            <span className="w-4 h-0.5 bg-slate-600 rounded-full"></span>
          </button>

          {/* LOGO E TEXTOS */}
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
                Controle de Projetos
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
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-xs z-40"
            onClick={() => setMenuOpen(false)}
          />

          <div className="fixed top-0 left-0 w-72 h-full bg-white border-r border-slate-200 shadow-xl z-50 p-5 flex flex-col gap-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <img
                src={logo}
                alt="Logo"
                className="w-10 h-10 rounded-xl object-cover border border-slate-200"
              />
              <div>
                <h2 className="text-sm font-bold text-slate-900">Marcio Bassani</h2>
                <p className="text-[11px] text-slate-400 font-medium">Móveis Planejados</p>
              </div>
            </div>

            <div className="flex flex-col gap-1 overflow-y-auto">
              <MenuItem label="Criar Orçamentos" path="/criarOrc" />
              <MenuItem label="Lista de Orçamentos" path="/listaOrc" />
              <MenuItem label="Gerenciar Projetos" path="/gerenciarProj" />
              <MenuItem label="Adicionar Projeto" path="/adicionarProj" />
              <MenuItem label="Gerenciar Perfil" path="/gerenciarPerfil" />
            </div>
          </div>
        </>
      )}

      {/* CONTEÚDO PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-12 flex flex-col gap-6">

        {/* TOPO / TITULAÇÃO */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              {tipoSelecionado || "Controle de Projetos"}
            </h1>
            <p className="text-slate-400 text-sm mt-0.5">
              Gerencie, edite ou remova os itens vinculados a esta categoria.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => navigate("/gerenciarProj")}
              className="bg-white hover:bg-slate-50 transition border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
              Voltar
            </button>

            <button
              onClick={() => navigate("/adicionarProj")}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-xl text-sm shadow-md shadow-blue-500/10 transition flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="14"/><line x1="5" y1="12" x2="14" y2="12"/></svg>
              Novo
            </button>
          </div>
        </div>

        {/* LISTAGEM EM GRID RESPONSIVO */}
        {projetos.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm max-w-sm mx-auto mt-4">
            <p className="text-slate-400 font-medium text-sm">
              Nenhum projeto encontrado nesta categoria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
                >
                  {/* WRAPPER DA IMAGEM */}
                  <div className="w-full h-48 bg-slate-100 overflow-hidden relative border-b border-slate-100">
                    {imagens.length > 0 ? (
                      <img
                        src={imagens[0]}
                        alt={proj.nome || "Projeto"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs font-bold uppercase tracking-wider">
                        Sem Imagem
                      </div>
                    )}
                  </div>

                  {/* INFORMAÇÕES E BOTÕES DE AÇÃO */}
                  <div className="p-4 flex flex-col gap-4">
                    <div>
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {proj.tipo}
                      </h3>
                      <h4 className="text-sm font-bold text-slate-800 mt-0.5 line-clamp-1">
                        {proj.nome || "Ambiente sem título"}
                      </h4>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-50">
                      <button
                        onClick={() => excluirProjeto(proj.id)}
                        className="bg-white hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-slate-500 border border-slate-200 text-xs font-bold py-2 rounded-lg transition"
                      >
                        Excluir
                      </button>

                      <button
                        onClick={() =>
                          navigate("/editarProj", { state: { projeto: proj } })
                        }
                        className="bg-slate-900 hover:bg-black text-white text-xs font-bold py-2 rounded-lg transition text-center"
                      >
                        Editar
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default ControleProj;