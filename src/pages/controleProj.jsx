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
      className="
        w-full
        text-left
        p-4
        rounded-2xl
        hover:bg-blue-50
        transition
        border
        border-transparent
        hover:border-blue-100
      "
    >
      <h3 className="font-semibold text-gray-800">{label}</h3>
      {desc && <p className="text-sm text-gray-500 mt-1">{desc}</p>}
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
    if (!window.confirm("Tem certeza que deseja excluir?")) return;

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
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-blue-50">

      {/* HEADER */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* MENU */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="
              w-12 h-12
              rounded-2xl
              bg-gray-100
              hover:bg-blue-50
              flex flex-col items-center justify-center gap-1
              transition
            "
          >
            <span className="w-5 h-0.5 bg-gray-700"></span>
            <span className="w-5 h-0.5 bg-gray-700"></span>
            <span className="w-5 h-0.5 bg-gray-700"></span>
          </button>

          {/* LOGO */}
          <div className="flex items-center gap-4">
            <img
              src={logo}
              alt="logo"
              className="
                w-14 h-14
                rounded-2xl
                object-cover
                border-2 border-blue-100
                shadow-md
              "
            />

            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Marcio Bassani
              </h1>
              <p className="text-sm text-gray-500">
                Controle de Projetos
              </p>
            </div>
          </div>

          <div className="w-12"></div>
        </div>
      </header>

      {/* MENU LATERAL */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={() => setMenuOpen(false)}
          />

          <div className="
            fixed top-0 left-0 w-80 h-full bg-white
            shadow-2xl z-50 p-6 border-r border-gray-200
          ">
            <div className="flex items-center gap-4 mb-8">
              <img
                src={logo}
                className="w-14 h-14 rounded-2xl object-cover"
              />
              <div>
                <h2 className="font-bold text-gray-800">
                  Marcio Bassani
                </h2>
                <p className="text-sm text-gray-500">
                  Gestão de móveis planejados
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <MenuItem label="Criar Orçamentos" path="/criarOrc" />
              <MenuItem label="Lista de Orçamentos" path="/listaOrc" />
              <MenuItem label="Gerenciar Projetos" path="/gerenciarProj" />
              <MenuItem label="Adicionar Projeto" path="/adicionarProj" />
              <MenuItem label="Gerenciar Perfil" path="/gerenciarPerfil" />
            </div>
          </div>
        </>
      )}

      {/* CONTEÚDO */}
      <main className="max-w-7xl mx-auto px-6 pt-10 pb-12">

        {/* TOPO */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              {tipoSelecionado || "Controle de Projetos"}
            </h1>

            <p className="text-gray-500 mt-3 text-lg">
              Gerencie, edite ou exclua seus projetos.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/gerenciarProj")}
              className="
                bg-white border border-gray-200
                hover:bg-gray-100 transition
                text-gray-700 px-5 py-3 rounded-2xl shadow-sm
              "
            >
              ← Voltar
            </button>

            <button
              onClick={() => navigate("/adicionarProj")}
              className="
                bg-blue-500 hover:bg-blue-600 transition
                text-white px-5 py-3 rounded-2xl shadow-lg font-semibold
              "
            >
              + Novo
            </button>
          </div>
        </div>

        {/* LISTA */}
        {projetos.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-md">
            <p className="text-gray-500 text-lg">
              Nenhum projeto encontrado.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

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
                  className="
                    bg-white/90
                    backdrop-blur-md
                    border border-gray-200
                    rounded-[28px]
                    overflow-hidden
                    shadow-md
                    hover:shadow-2xl
                    transition
                    group
                  "
                >

                  {/* IMAGEM */}
                  {imagens.length > 0 ? (
                    <img
                      src={imagens[0]}
                      className="
                        w-full h-52 object-cover
                        group-hover:scale-105 transition duration-500
                      "
                    />
                  ) : (
                    <div className="w-full h-52 bg-gray-100 flex items-center justify-center text-gray-400">
                      Sem imagem
                    </div>
                  )}

                  {/* INFO */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-800">
                      {proj.tipo}
                    </h3>

                    <div className="flex gap-3 mt-5">

                      <button
                        onClick={() => excluirProjeto(proj.id)}
                        className="
                          flex-1 bg-red-500 hover:bg-red-600
                          text-white py-2 rounded-2xl font-semibold
                        "
                      >
                        Excluir
                      </button>

                      <button
                        onClick={() =>
                          navigate("/editarProj", { state: { projeto: proj } })
                        }
                        className="
                          flex-1 bg-blue-500 hover:bg-blue-600
                          text-white py-2 rounded-2xl font-semibold
                        "
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