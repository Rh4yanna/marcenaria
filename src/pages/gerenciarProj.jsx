import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { API_URL } from "../services/api";

function GerenciarProj() {
  const [projetos, setProjetos] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filtro, setFiltro] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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
    "Outro",
  ];

  const MenuItem = ({ label, path }) => (
    <button
      onClick={() => navigate(path)}
      className="w-full text-left px-4 py-3 hover:bg-gray-100 rounded-lg transition"
    >
      {label}
    </button>
  );

  // BUSCAR PROJETOS
  useEffect(() => {
    const buscar = async () => {
      try {
        const res = await fetch(`${API_URL}/projetos`);
        const data = await res.json();

        setProjetos(Array.isArray(data) ? data : []);
      } catch (err) {
        console.log("Erro ao buscar projetos:", err);
      } finally {
        setLoading(false);
      }
    };

    buscar();
  }, []);

  // AGRUPAR POR TIPO
  const projetosPorTipo = tipos.map((tipo) => ({
    tipo,
    itens: projetos.filter((p) => p.tipo === tipo),
  }));

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* HEADER */}
      <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="logo"
            className="w-12 h-12 rounded-full object-cover border-2 border-orange-500"
          />
          <span className="font-semibold text-gray-800">
            Marcio Bassani
          </span>
        </div>

        <div />
      </header>

      {/* MENU */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setMenuOpen(false)}
          />

          <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-xl p-4 z-50">
            <MenuItem label="Criar Orçamentos" path="/criarOrc" />
            <MenuItem label="Lista de Orçamentos" path="/listaOrc" />
            <MenuItem label="Controle de Projetos" path="/controleProj" />
            <MenuItem label="Adicionar Projeto" path="/adicionarProj" />
            <MenuItem label="Gerenciar Perfil" path="/gerenciarPerfil" />
          </div>
        </>
      )}

      {/* CONTEÚDO */}
      <main className="p-6 max-w-6xl mx-auto w-full">

        {/* BOTÃO VOLTAR */}
        <button
          onClick={() => navigate("/home")}
          className="mb-4 text-white bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          ← Voltar
        </button>

        {/* TOPO */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-gray-700 font-semibold">
              Filtrar por móvel
            </span>

            <select
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="p-2 border rounded-lg ml-2"
            >
              <option value="">Todos</option>
              {tipos.map((t, i) => (
                <option key={i}>{t}</option>
              ))}
            </select>
          </div>

          <button
            onClick={() => navigate("/adicionarProj")}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg text-xl"
          >
            +
          </button>
        </div>

        {/* LOADING */}
        {loading && <p>Carregando projetos...</p>}

        {/* LISTA */}
        {!loading &&
          projetosPorTipo
            .filter((grupo) => !filtro || grupo.tipo === filtro)
            .map((grupo, index) => {

              if (grupo.itens.length === 0) return null;

              return (
                <div key={index} className="mb-10">

                  {/* TÍTULO */}
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {grupo.tipo}
                  </h3>

                  {/* SCROLL */}
                  <div className="flex gap-4 overflow-x-auto pb-2">

                    {grupo.itens.map((proj) => {
                      let imagens = [];

                      try {
                        imagens =
                          typeof proj.imagens === "string"
                            ? JSON.parse(proj.imagens)
                            : proj.imagens;

                        imagens = (imagens || []).filter(
                          (img) => img && img !== "null"
                        );
                      } catch {
                        imagens = [];
                      }

                      return (
                        <div
                          key={proj.id}
                          className="min-w-[200px] bg-white p-3 rounded-xl shadow"
                        >
                          {imagens.length > 0 ? (
                            <img
                              src={imagens[0]}
                              alt="projeto"
                              className="w-full h-32 object-cover rounded-lg"
                            />
                          ) : (
                            <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                              Sem imagem
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* BOTÃO */}
                  <button
                    onClick={() =>
                      navigate("/controleProj", {
                        state: { tipo: grupo.tipo },
                      })
                    }
                    className="mt-3 bg-gray-800 text-white px-4 py-2 rounded-lg"
                  >
                    Gerenciar
                  </button>
                </div>
              );
            })}
      </main>
    </div>
  );
}

export default GerenciarProj;