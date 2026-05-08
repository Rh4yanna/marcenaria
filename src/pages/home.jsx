import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

function Home() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

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

  const CardButton = ({ title, desc, path }) => (
    <div
      onClick={() => navigate(path)}
      className="
        group
        cursor-pointer
        bg-white/90
        backdrop-blur-md
        border border-gray-200
        hover:border-blue-200
        rounded-[30px]
        p-7
        shadow-md
        hover:shadow-2xl
        transition-all
        duration-300
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition">
            {title}
          </h3>

          <p className="text-gray-500 mt-3 leading-relaxed">
            {desc}
          </p>
        </div>

        <div
          className="
            min-w-[56px]
            h-14
            rounded-2xl
            bg-blue-50
            flex items-center justify-center
            text-blue-500
            text-2xl
            group-hover:bg-blue-100
            transition
          "
        >
          →
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-blue-50">

      {/* HEADER */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* MENU BUTTON */}
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
                Painel Administrativo
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

        {/* TÍTULO */}
        <div className="mb-10">
          <h4 className="text-2xl font-bold text-gray-800">
            Bem-vindo ao painel
          </h4>

          <p className="text-gray-500 mt-3 text-lg">
            Gerencie orçamentos, projetos e informações da sua marcenaria.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">

          <CardButton
            title="Criar Orçamentos"
            desc="Monte novos orçamentos personalizados para seus clientes de forma rápida e profissional."
            path="/criarOrc"
          />

          <CardButton
            title="Gerenciar Projetos"
            desc="Controle todos os projetos cadastrados e mantenha seu portfólio organizado."
            path="/gerenciarProj"
          />

          <CardButton
            title="Lista de Orçamentos"
            desc="Visualize, exporte em PDF e exclua orçamentos já criados."
            path="/listaOrc"
          />

          <CardButton
            title="Gerenciar Perfil"
            desc="Atualize suas informações, banner, contatos e dados públicos."
            path="/gerenciarPerfil"
          />

        </div>
      </main>
    </div>
  );
}

export default Home;