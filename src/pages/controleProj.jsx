import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.jpg";

function ControleProj() {
  const [projetos, setProjetos] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const tipoSelecionado = location.state?.tipo || "";

  const MenuItem = ({ label, path }) => (
    <button
      onClick={() => navigate(path)}
      className="w-full text-left px-4 py-3 hover:bg-gray-100 rounded-lg transition"
    >
      {label}
    </button>
  );

  // 🔄 BUSCAR PROJETOS
  const buscarProjetos = () => {
    fetch("http://localhost:3000/projetos")
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

  // 🗑️ EXCLUIR
  const excluirProjeto = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir?")) return;

    try {
      const res = await fetch(`http://localhost:3000/projetos/${id}`, {
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
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* HEADER */}
      <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col gap-1"
        >
          <span className="w-6 h-0.5 bg-gray-800"></span>
          <span className="w-6 h-0.5 bg-gray-800"></span>
          <span className="w-6 h-0.5 bg-gray-800"></span>
        </button>

        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="logo"
            className="w-12 h-12 rounded-full object-cover border-2 border-orange-500 shadow"
          />
          <span className="font-semibold text-gray-800 text-lg">
            Marcio Bassani
          </span>
        </div>

        <div className="w-6"></div>
      </header>

      {/* MENU */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setMenuOpen(false)}
          ></div>

          <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-xl p-4 z-50">
            <MenuItem label="Criar Orçamentos" path="/criarOrc" />
            <MenuItem label="Lista de Orçamentos" path="/listaOrc" />
            <MenuItem label="Controle de Projetos" path="/gerenciarProj" />
            <MenuItem label="Adicionar Projeto" path="/adicionarProj" />
            <MenuItem label="Gerenciar Perfil" path="/gerenciarPerfil" />
          </div>
        </>
      )}

      {/* CONTEÚDO */}
      <main className="p-6 max-w-6xl mx-auto w-full">

        {/* TOPO */}
        <div className="flex justify-between items-center mb-6">

          {/* ESQUERDA */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/gerenciarProj")}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg"
            >
              ← Voltar
            </button>

            <h2 className="text-2xl font-bold">
              {tipoSelecionado || "Todos os Projetos"}
            </h2>
          </div>

          {/* DIREITA */}
          <button
            onClick={() => navigate("/adicionarProj")}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg text-xl"
          >
            +
          </button>

        </div>

        {/* LISTA */}
        {projetos.length === 0 ? (
          <p>Nenhum projeto encontrado.</p>
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
                  className="bg-white p-4 rounded-xl shadow flex flex-col gap-3"
                >
                  {/* IMAGEM */}
                  {imagens.length > 0 ? (
                    <img
                      src={imagens[0]}
                      alt="projeto"
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                      Sem imagem
                    </div>
                  )}

                  {/* TIPO */}
                  <h3 className="font-bold">{proj.tipo}</h3>

                  {/* BOTÕES */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => excluirProjeto(proj.id)}
                      className="flex-1 bg-red-500 text-white py-2 rounded-lg"
                    >
                      Excluir
                    </button>

                    <button
                      onClick={() =>
                        navigate("/editarProj", { state: { projeto: proj } })
                      }
                      className="flex-1 bg-blue-500 text-white py-2 rounded-lg"
                    >
                      Editar
                    </button>
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