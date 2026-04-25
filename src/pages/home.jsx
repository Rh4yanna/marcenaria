import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

function Home() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const MenuItem = ({ label, path }) => (
    <button
      onClick={() => navigate(path)}
      className="w-full text-left px-4 py-3 hover:bg-gray-100 rounded-lg transition"
    >
      {label}
    </button>
  );

  const CardButton = ({ title, desc, path }) => (
    <div
      onClick={() => navigate(path)}
      className="cursor-pointer bg-white shadow-md hover:shadow-xl transition rounded-2xl p-6 border border-gray-100"
    >
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500 mt-2">{desc}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* HEADER */}
      <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        {/* MENU HAMBURGUER */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col gap-1"
        >
          <span className="w-6 h-0.5 bg-gray-800"></span>
          <span className="w-6 h-0.5 bg-gray-800"></span>
          <span className="w-6 h-0.5 bg-gray-800"></span>
        </button>

        {/* LOGO + NOME */}
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

        {/* espaço direito */}
        <div className="w-6"></div>
      </header>

      {/* MENU LATERAL */}
      {menuOpen && (
        <>
          {/* OVERLAY (clicou fora fecha) */}
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setMenuOpen(false)}
          ></div>

          {/* MENU */}
          <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-xl p-4 z-50">
            <MenuItem label="Criar Orçamentos" path="/criarOrc" />
            <MenuItem label="Lista de Orçamentos" path="/listaOrc" />
            <MenuItem label="Controle de Projetos" path="/controleProj" />
            <MenuItem label="Adicionar Projeto" path="/adicionarProj" />
            <MenuItem label="Editar Projeto" path="/editarProj" />
            <MenuItem label="Gerenciar Perfil" path="/perfil" />
          </div>
        </>
      )}

      {/* BODY */}
      <main className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <CardButton
          title="Criar Orçamentos"
          desc="Monte novos orçamentos rapidamente"
          path="/criarOrc"
        />

        <CardButton
          title="Gerenciar Projetos"
          desc="Controle todos os projetos"
          path="/gerenciarProj"
        />

        <CardButton
          title="Lista de Orçamentos"
          desc="Visualize todos os orçamentos criados"
          path="/listaOrc"
        />

        <CardButton
          title="Gerenciar Perfil"
          desc="Altere seus dados"
          path="/gerenciarPerfil"
        />
      </main>
    </div>
  );
}

export default Home;
