import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

function Home() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const irPara = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const sair = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    navigate("/login");
  };

  const MenuItem = ({
    label,
    desc,
    path,
  }) => (

    <button
      onClick={() =>
        irPara(path)
      }
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

      <h3 className="font-semibold">

        {label}

      </h3>

      <p className="text-sm text-gray-500 mt-1">

        {desc}

      </p>

    </button>

  );


  const CardButton = ({
    title,
    desc,
    path
  }) => (

    <div
      onClick={() =>
        navigate(path)
      }
      className="
      group
      cursor-pointer
      bg-white
      rounded-[30px]
      p-7
      shadow-md
      hover:shadow-2xl
      transition
      "
    >

      <div className="flex justify-between">

        <div>

          <h3 className="text-2xl font-bold">

            {title}

          </h3>

          <p className="text-gray-500 mt-3">

            {desc}

          </p>

        </div>

        <div className="
        w-14
        h-14
        rounded-2xl
        bg-blue-50
        flex
        items-center
        justify-center
        ">

          →

        </div>

      </div>

    </div>

  );



  return (

    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-blue-50">

      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <button
            onClick={() =>
              setMenuOpen(
                !menuOpen
              )
            }
            className="
            w-12
            h-12
            rounded-2xl
            bg-gray-100
            flex
            flex-col
            justify-center
            items-center
            gap-1
            "
          >

            <span className="w-5 h-0.5 bg-gray-700"></span>
            <span className="w-5 h-0.5 bg-gray-700"></span>
            <span className="w-5 h-0.5 bg-gray-700"></span>

          </button>


          <div className="flex items-center gap-4">

            <img
              src={logo}
              className="
              w-14
              h-14
              rounded-2xl
              "
            />

            <div>

              <h1 className="font-bold text-xl">

                Marcio Bassani

              </h1>

              <p className="text-gray-500 text-sm">

                Painel Administrativo

              </p>

            </div>

          </div>

          <div className="w-12"></div>

        </div>

      </header>


      {menuOpen && (

        <>

          <div
            onClick={() =>
              setMenuOpen(false)
            }
            className="
            fixed
            inset-0
            bg-black/20
            z-40
            "
          />

          <div className="
          fixed
          left-0
          top-0
          w-80
          h-full
          bg-white
          p-6
          shadow-2xl
          z-50
          ">

            <div className="flex items-center gap-4 mb-8">

              <img
                src={logo}
                className="
                w-14
                h-14
                rounded-2xl
                "
              />

              <div>

                <h2 className="font-bold">

                  Marcio Bassani

                </h2>

                <p className="text-gray-500 text-sm">

                  Gestão Marcenaria

                </p>

              </div>

            </div>


            <div className="flex flex-col gap-2">

              <MenuItem
                label="Criar Orçamentos"
                desc="Novo orçamento"
                path="/criarOrc"
              />

              <MenuItem
                label="Lista Orçamentos"
                desc="Visualizar"
                path="/listaOrc"
              />

              <MenuItem
                label="Gerenciar Projetos"
                desc="Projetos"
                path="/gerenciarProj"
              />

              <MenuItem
                label="Adicionar Projeto"
                desc="Cadastrar"
                path="/adicionarProj"
              />

              <MenuItem
                label="Gerenciar Perfil"
                desc="Atualizar dados"
                path="/gerenciarPerfil"
              />

            </div>

            <button
              onClick={sair}
              className="
              mt-6
              w-full
              bg-red-500
              text-white
              py-3
              rounded-2xl
              "
            >

              Sair

            </button>

          </div>

        </>

      )}

      <main className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid md:grid-cols-2 gap-6">

          <CardButton
            title="Criar Orçamentos"
            desc="Monte novos orçamentos."
            path="/criarOrc"
          />

          <CardButton
            title="Gerenciar Projetos"
            desc="Controle projetos."
            path="/gerenciarProj"
          />

          <CardButton
            title="Lista de Orçamentos"
            desc="Visualize orçamentos."
            path="/listaOrc"
          />

          <CardButton
            title="Gerenciar Perfil"
            desc="Atualize informações."
            path="/gerenciarPerfil"
          />


          <div
            onClick={() =>
              window.open(
                "https://marcenaria-1.onrender.com/principal",
                "_blank"
              )
            }
            className="
            cursor-pointer
            bg-white
            rounded-[30px]
            p-7
            shadow-md
            hover:shadow-2xl
            "
          >

            <h3 className="text-2xl font-bold">

              Portfólio Público

            </h3>

            <p className="text-gray-500 mt-3">

              Visualizar site público

            </p>

          </div>

        </div>

      </main>

    </div>

  );
}

export default Home;