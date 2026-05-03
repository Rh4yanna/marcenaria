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

  const MenuItem = ({ label, path }) => (
    <button
      onClick={() => irPara(path)}
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
        
        {/* MENU */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col gap-1"
        >
          <span className="w-6 h-0.5 bg-gray-800"></span>
          <span className="w-6 h-0.5 bg-gray-800"></span>
          <span className="w-6 h-0.5 bg-gray-800"></span>
        </button>

        {/* LOGO */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="logo"
            className="w-12 h-12 rounded-full object-cover border-2 border-orange-500"
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
          />

          <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-xl p-4 z-50">
            <MenuItem label="Criar Orçamentos" path="/criarOrc" />
            <MenuItem label="Lista de Orçamentos" path="/listaOrc" />
            <MenuItem label="Gerenciar Projetos" path="/gerenciarProj" />
            <MenuItem label="Adicionar Projeto" path="/adicionarProj" />
            <MenuItem label="Gerenciar Perfil" path="/gerenciarPerfil" />
          </div>
        </>
      )}

      {/* CONTEÚDO */}
      <main className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        
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