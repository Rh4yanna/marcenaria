import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { API_URL } from "../services/api";

function Principal() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const [perfilPublico, setPerfilPublico] =
    useState({
      titulo:
        "Móveis Planejados Sob Medida",

      subtitulo:
        "Projetos exclusivos com qualidade e acabamento premium",

      descricaoServicos:
        "Trabalho com móveis planejados sob medida, cozinhas, quartos, painéis, closets e montagem de móveis.",

      whatsapp:
        "https://wa.me/551199999999",

      banner:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",

      telefone:
        "(11)99999-9999",
    });

  const [projetos, setProjetos] =
    useState([]);

  const irPara = (path) => {
    setMenuOpen(false);

    navigate(path);
  };

  const MenuItem = ({
    label,
    path,
  }) => (
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
    </button>
  );

  useEffect(() => {
    buscarProjetos();
  }, []);

  const buscarProjetos =
    async () => {
      try {
        const res =
          await fetch(
            `${API_URL}/projetos`
          );

        const data =
          await res.json();

        setProjetos(data || []);
      } catch {
        console.log(
          "erro projetos"
        );
      }
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-blue-50">

      {/* HEADER */}

      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* MENU */}

          <button
            onClick={() =>
              setMenuOpen(
                !menuOpen
              )
            }
            className="
            w-12 h-12
            rounded-2xl
            bg-gray-100
            hover:bg-blue-50
            flex flex-col
            items-center
            justify-center
            gap-1
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
              alt=""
              className="
              w-14 h-14
              rounded-2xl
              object-cover
              border-2
              border-blue-100
              shadow-md
            "
            />

            <div>

              <h1 className="text-xl font-bold">

                Marcio Bassani

              </h1>

              <p className="text-sm text-gray-500">

                Móveis Planejados

              </p>

            </div>

          </div>

          <div className="w-12"></div>

        </div>

      </header>


      {/* MENU */}

      {menuOpen && (

        <>
          <div
            onClick={() =>
              setMenuOpen(
                false
              )
            }
            className="fixed inset-0 bg-black/20 z-40"
          />

          <div
            className="
          fixed
          left-0
          top-0
          w-72
          h-full
          bg-white
          z-50
          p-6
          shadow-2xl
        "
          >

            <div className="flex items-center gap-3 mb-8">

              <img
                src={logo}
                className="w-14 h-14 rounded-2xl"
              />

              <div>

                <h2 className="font-bold">

                  Marcio Bassani

                </h2>

                <p className="text-gray-500 text-sm">

                  Navegação

                </p>

              </div>

            </div>

            <div className="flex flex-col gap-3">

              <MenuItem
                label="Início"
                path="/principal"
              />

              <MenuItem
                label="Portfólio"
                path="/portfolio"
              />

              <MenuItem
                label="Contato"
                path="/contato"
              />

            </div>

          </div>
        </>

      )}

      <main>

        {/* BANNER */}

        <section
          className="
            h-[550px]
            bg-cover
            bg-center
            relative
          "
          style={{
            backgroundImage:
              `url(${perfilPublico.banner})`,
          }}
        >

          <div
            className="
            absolute
            inset-0
            bg-black/50
          "
          />

          <div
            className="
            relative
            z-10
            h-full
            flex
            flex-col
            justify-center
            items-center
            text-center
            px-6
          "
          >

            <h1
              className="
              text-5xl
              text-white
              font-bold
              max-w-4xl
            "
            >
              {perfilPublico.titulo}
            </h1>

            <p
              className="
              text-white
              text-xl
              mt-5
              max-w-2xl
            "
            >
              {perfilPublico.subtitulo}
            </p>

            <div className="flex gap-4 mt-8">

              <button
                onClick={() =>
                  navigate(
                    "/portfolio"
                  )
                }
                className="
                bg-blue-500
                hover:bg-blue-600
                text-white
                px-6
                py-4
                rounded-2xl
                shadow-xl
              "
              >
                Ver Portfólio
              </button>

              <button
                onClick={() =>
                  navigate(
                    "/contato"
                  )
                }
                className="
                bg-white
                px-6
                py-4
                rounded-2xl
              "
              >
                Entrar em contato
              </button>

            </div>

          </div>

        </section>


        {/* SOBRE */}

        <section className="max-w-6xl mx-auto px-6 py-16">

          <div
            className="
            bg-white/90
            rounded-[30px]
            p-10
            shadow-md
            border
          "
          >

            <h2 className="text-3xl font-bold">

              Trabalho com:

            </h2>

            <p className="text-gray-600 mt-4 leading-8">

              {
                perfilPublico.descricaoServicos
              }

            </p>

          </div>

        </section>


        {/* CARROSSEL */}

        <section className="px-6">

          <h2
            className="
            text-3xl
            font-bold
            text-center
            mb-8
          "
          >
            Projetos realizados
          </h2>

          <div
            className="
            flex
            overflow-x-auto
            gap-5
            pb-4
          "
          >

            {projetos.map(
              (proj) => {

                let imagens=[];

                try{

                  imagens=
                  typeof proj.imagens==="string"

                  ?JSON.parse(
                    proj.imagens
                  )

                  :proj.imagens;

                }catch{

                  imagens=[];

                }

                return(

                  <div
                  key={proj.id}

                  className="
                  min-w-[320px]
                  bg-white
                  rounded-[30px]
                  overflow-hidden
                  shadow-md
                "
                  >

                    {imagens?.[0] && (

                      <img
                        src={
                          imagens[0]
                        }
                        className="
                        w-full
                        h-72
                        object-cover
                      "
                      />

                    )}

                  </div>

                )

              }
            )}

          </div>

        </section>


        {/* ORÇAMENTO */}

        <section
          className="
          text-center
          py-20
          px-6
        "
        >

          <h2 className="text-4xl font-bold">

            Solicite um orçamento

          </h2>

          <p className="text-gray-500 mt-3">

            Fale diretamente pelo WhatsApp

          </p>

          <a
            href={
              perfilPublico.whatsapp
            }
            target="_blank"
          >

            <button
              className="
              mt-8
              bg-green-500
              hover:bg-green-600
              text-white
              px-10
              py-5
              rounded-2xl
              shadow-xl
              text-lg
            "
            >
              WhatsApp
            </button>

          </a>

        </section>

      </main>

    </div>
  );
}

export default Principal;