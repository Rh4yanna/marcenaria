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
        w-full text-left p-4 rounded-2xl
        hover:bg-blue-50 transition
        border border-transparent hover:border-blue-100
      "
    >
      <h3 className="font-semibold text-gray-800">{label}</h3>
      {desc && <p className="text-sm text-gray-500 mt-1">{desc}</p>}
    </button>
  );

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
      .catch(console.log);
  };

  useEffect(() => {
    buscarProjetos();
  }, [tipoSelecionado]);

  const excluirProjeto = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir?")) return;

    const res = await fetch(`${API_URL}/projetos/${id}`, {
      method: "DELETE",
    });

    if (res.ok) buscarProjetos();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-blue-50">

      {/* HEADER */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-12 h-12 rounded-2xl bg-gray-100 hover:bg-blue-50 flex items-center justify-center"
          >
            ☰
          </button>

          <div className="flex items-center gap-4">
            <img src={logo} className="w-14 h-14 rounded-2xl border-2 border-blue-100 object-cover" />
            <div>
              <h1 className="font-bold text-gray-800">Controle de Projetos</h1>
              <p className="text-sm text-gray-500">{tipoSelecionado || "Todos os projetos"}</p>
            </div>
          </div>

          <div className="w-12" />
        </div>
      </header>

      {/* MENU */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setMenuOpen(false)} />
      )}

      {/* CONTEÚDO */}
      <main className="max-w-7xl mx-auto px-6 pt-10 pb-12">

        {/* TOPO */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-6 mb-10">

          <h1 className="text-3xl font-bold text-gray-800">
            {tipoSelecionado || "Todos os Projetos"}
          </h1>

          <button
            onClick={() => navigate("/adicionarProj")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-2xl font-semibold"
          >
            + Novo Projeto
          </button>
        </div>

        {/* LISTA */}
        {projetos.length === 0 ? (
          <div className="bg-white p-10 rounded-3xl text-center shadow">
            Nenhum projeto encontrado.
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
                  className="bg-white/90 backdrop-blur-md rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition"
                >

                  <img
                    src={imagens?.[0]}
                    className="w-full h-52 object-cover"
                  />

                  <div className="p-5">
                    <h3 className="font-bold text-gray-800">{proj.tipo}</h3>

                    <div className="flex gap-3 mt-5">

                      <button
                        onClick={() => excluirProjeto(proj.id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-2xl"
                      >
                        Excluir
                      </button>

                      <button
                        onClick={() =>
                          navigate("/editarProj", {
                            state: {
                              projeto: proj,
                              tipo: tipoSelecionado, // 🔥 mantém filtro
                            },
                          })
                        }
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-2xl"
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