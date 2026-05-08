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
    "Home office planejado",
    "Mesa de jantar",
    "Painel ripado",
    "Lavanderia planejada",
    "Banheiro planejado",
    "Outro",
  ];

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
      <h3 className="font-semibold text-gray-800">
        {label}
      </h3>

      <p className="text-sm text-gray-500 mt-1">
        {desc}
      </p>
    </button>
  );

  // BUSCAR PROJETOS
  useEffect(() => {
    const buscar = async () => {
      try {
        const res = await fetch(`${API_URL}/projetos`);
        const data = await res.json();

        setProjetos(Array.isArray(data) ? data.reverse() : []);
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
                Gestão de Projetos
              </p>
            </div>
          </div>

          <div className="w-12"></div>
        </div>
      </header>

      {/* MENU LATERAL */}
      {menuOpen && (
        <>
          {/* OVERLAY */}
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={() => setMenuOpen(false)}
          />

          {/* SIDEBAR */}
          <div
            className="
              fixed
              top-0
              left-0
              w-80
              h-full
              bg-white
              shadow-2xl
              z-50
              p-6
              border-r
              border-gray-200
            "
          >
            {/* TOPO */}
            <div className="flex items-center gap-4 mb-8">
              <img
                src={logo}
                alt="logo"
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

            {/* LINKS */}
            <div className="flex flex-col gap-2">

              <MenuItem
                label="Criar Orçamentos"
                desc="Monte novos orçamentos rapidamente"
                path="/criarOrc"
              />

              <MenuItem
                label="Lista de Orçamentos"
                desc="Visualize todos os orçamentos"
                path="/listaOrc"
              />

              <MenuItem
                label="Gerenciar Projetos"
                desc="Controle seus projetos"
                path="/gerenciarProj"
              />

              <MenuItem
                label="Adicionar Projeto"
                desc="Cadastre novos projetos"
                path="/adicionarProj"
              />

              <MenuItem
                label="Gerenciar Perfil"
                desc="Atualize suas informações"
                path="/gerenciarPerfil"
              />
            </div>
          </div>
        </>
      )}

      {/* CONTEÚDO */}
      <main className="max-w-7xl mx-auto px-6 pt-10 pb-12">

        {/* TOPO */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Gerenciar Projetos
            </h1>

            <p className="text-gray-500 mt-3 text-lg">
              Organize e visualize todos os projetos cadastrados.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">

            <button
              onClick={() => navigate("/home")}
              className="
                bg-white
                border
                border-gray-200
                hover:bg-gray-100
                transition
                text-gray-700
                px-5
                py-3
                rounded-2xl
                shadow-sm
              "
            >
              ← Voltar
            </button>

            <button
              onClick={() => navigate("/adicionarProj")}
              className="
                bg-blue-500
                hover:bg-blue-600
                transition
                text-white
                px-5
                py-3
                rounded-2xl
                shadow-lg
                font-semibold
              "
            >
              + Adicionar Projeto
            </button>

          </div>
        </div>

        {/* FILTRO */}
        <div
          className="
            bg-white/90
            backdrop-blur-md
            border
            border-gray-200
            rounded-[28px]
            p-6
            shadow-md
            mb-10
          "
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4">

            <div className="flex-1">
              <label className="text-sm font-semibold text-gray-700 block mb-2">
                Filtrar por tipo de móvel
              </label>

              <select
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className="
                  w-full
                  bg-gray-50
                  border
                  border-gray-200
                  rounded-2xl
                  px-4
                  py-3
                  outline-none
                  focus:ring-4
                  focus:ring-blue-100
                  focus:border-blue-300
                  transition
                "
              >
                <option value="">Todos os móveis</option>

                {tipos.map((t, i) => (
                  <option key={i}>{t}</option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="bg-white rounded-3xl p-12 text-center shadow-md">
            <p className="text-gray-500 text-lg">
              Carregando projetos...
            </p>
          </div>
        )}

        {/* SEM PROJETOS */}
        {!loading && projetos.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-700">
              Nenhum projeto encontrado
            </h2>

            <p className="text-gray-500 mt-3">
              Cadastre seu primeiro projeto para começar.
            </p>

            <button
              onClick={() => navigate("/adicionarProj")}
              className="
                mt-6
                bg-blue-500
                hover:bg-blue-600
                transition
                text-white
                px-6
                py-3
                rounded-2xl
                font-semibold
              "
            >
              Adicionar Projeto
            </button>
          </div>
        )}

        {/* LISTA */}
        {!loading &&
          projetosPorTipo
            .filter((grupo) => !filtro || grupo.tipo === filtro)
            .map((grupo, index) => {

              if (grupo.itens.length === 0) return null;

              return (
                <div key={index} className="mb-14">

                  {/* TÍTULO */}
                  <div className="flex items-center justify-between mb-5">

                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        {grupo.tipo}
                      </h2>

                      <p className="text-gray-500 mt-1">
                        {grupo.itens.length} projeto(s)
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        navigate("/controleProj", {
                          state: { tipo: grupo.tipo },
                        })
                      }
                      className="
                        bg-gray-900
                        hover:bg-black
                        transition
                        text-white
                        px-5
                        py-3
                        rounded-2xl
                        shadow-md
                        font-semibold
                      "
                    >
                      Gerenciar
                    </button>

                  </div>

                  {/* PROJETOS */}
                  <div className="flex gap-5 overflow-x-auto pb-3">

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
                          className="
                            min-w-[280px]
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
                              alt="projeto"
                              className="
                                w-full
                                h-56
                                object-cover
                                group-hover:scale-105
                                transition
                                duration-500
                              "
                            />
                          ) : (
                            <div className="w-full h-56 bg-gray-100 flex items-center justify-center text-gray-400">
                              Sem imagem
                            </div>
                          )}

                          {/* INFO */}
                          <div className="p-5">

                            <h3 className="text-lg font-bold text-gray-800">
                              {proj.nome || grupo.tipo}
                            </h3>

                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
      </main>
    </div>
  );
}

export default GerenciarProj;