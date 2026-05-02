import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

function GerenciarProj() {
  const [projetos, setProjetos] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filtro, setFiltro] = useState("");
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

  //  BUSCAR PROJETOS
  useEffect(() => {
    fetch("http://localhost:3000/projetos")
      .then((res) => res.json())
      .then((data) => {
        console.log(" PROJETOS:", data);
        setProjetos(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const MenuItem = ({ label, path }) => (
    <button
      onClick={() => navigate(path)}
      className="w-full text-left px-4 py-3 hover:bg-gray-100 rounded-lg transition"
    >
      {label}
    </button>
  );

  //  AGRUPAR PROJETOS POR TIPO
  const projetosPorTipo = tipos.map((tipo) => ({
    tipo,
    itens: projetos.filter((p) => p.tipo === tipo),
  }));

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

      {/* MENU LATERAL */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setMenuOpen(false)}
          ></div>

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

        {/* FILTRO + BOTÃO */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col">
            <span className="text-gray-700 font-semibold mb-1">
              Filtre por móvel
            </span>

            <select
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="p-2 border rounded-lg"
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

        {/* LISTA POR TIPO */}
        {projetosPorTipo
          .filter((grupo) => !filtro || grupo.tipo === filtro)
          .map((grupo, index) => {

            if (grupo.itens.length === 0) return null;

            return (
              <div key={index} className="mb-10">

                {/* TITULO */}
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {grupo.tipo}
                </h3>

                {/* SCROLL HORIZONTAL */}
                <div className="flex gap-4 overflow-x-auto pb-2">

                  {grupo.itens.map((proj) => {

                    let imagens = [];

                    if (proj.imagens) {
                      try {
                        if (typeof proj.imagens === "string") {
                          imagens = JSON.parse(proj.imagens);
                        } else if (Array.isArray(proj.imagens)) {
                          imagens = proj.imagens;
                        }

                        //  limpa lixo (null, vazio)
                        imagens = imagens.filter(
                          (img) => img && img !== "null"
                        );

                      } catch (err) {
                        console.log(" erro imagens:", err);
                        imagens = [];
                      }
                    }

                    return (
                      <div
                        key={proj.id}
                        className="min-w-[200px] bg-white p-3 rounded-xl shadow"
                      >
                        {imagens.length > 0 ? (
                          <img
                            src={imagens[0]?.trim()}
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

                {/* BOTÃO GERENCIAR */}
                <button
                  onClick={() => navigate("/controleProj", { state: { tipo: grupo.tipo } })}
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