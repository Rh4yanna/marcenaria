import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

function GerenciarPerfil() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  // PERFIL
  const [perfil, setPerfil] = useState({
    nome: "Marcio Bassani",
    foto: "",
    previewFoto: "",
  });

  // PÚBLICO
  const [publico, setPublico] = useState({
    whatsapp: "",
    telefone: "",
    banner: "",
    previewBanner: "",

    email: "",

    instagram: "",
    instagramLink: "",

    titulo: "",
    subtitulo: "",

    descricaoServicos: "",
  });

  const linkPublico =
    "https://marcenaria-1.onrender.com/principal";

  // INPUTS

  const handlePerfil = (e) => {
    const { name, value } = e.target;

    setPerfil({
      ...perfil,
      [name]: value,
    });
  };

  const handlePublico = (e) => {
    const { name, value } = e.target;

    setPublico({
      ...publico,
      [name]: value,
    });
  };

  // FOTO

  const handleFoto = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setPerfil({
      ...perfil,
      foto: file,
      previewFoto:
        URL.createObjectURL(file),
    });
  };

  // BANNER

  const handleBanner = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setPublico({
      ...publico,
      banner: file,
      previewBanner:
        URL.createObjectURL(file),
    });
  };

  const copiarLink = () => {
    navigator.clipboard.writeText(
      linkPublico
    );

    alert("Link copiado!");
  };

  const salvar = () => {
    console.log(perfil);

    console.log(publico);

    alert(
      "Depois conectaremos API"
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-blue-50">

      {/* HEADER */}

      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200">

        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* VOLTAR */}

          <button
            onClick={() =>
              navigate("/home")
            }
            className="
            w-12 h-12
            rounded-2xl
            bg-gray-100
            hover:bg-blue-50
            flex
            items-center
            justify-center
            transition
          "
          >
            ←
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

              <h1 className="font-bold text-gray-800 text-xl">
                Marcio Bassani
              </h1>

              <p className="text-sm text-gray-500">
                Gerenciar Perfil
              </p>

            </div>

          </div>

          <div className="w-12"></div>

        </div>

      </header>

      {/* CONTEÚDO */}

      <main className="max-w-5xl mx-auto p-6">

        <div
          className="
            bg-white/90
            backdrop-blur-md
            rounded-[30px]
            shadow-md
            p-8
            border
            border-gray-200
          "
        >

          <h2 className="text-3xl font-bold text-gray-800 mb-8">

            Configurações Públicas

          </h2>


          {/* PERFIL */}

          <div className="mb-10">

            <h3 className="font-bold text-xl mb-5 text-gray-700">

              Dados do Perfil

            </h3>

            <div className="flex flex-col gap-5">

              <div>

                <label className="text-gray-600 block mb-2">

                  Foto do Perfil

                </label>

                {perfil.previewFoto && (

                  <img
                    src={
                      perfil.previewFoto
                    }
                    alt=""
                    className="
                    w-28
                    h-28
                    rounded-full
                    object-cover
                    mb-3
                    border-4
                    border-blue-100
                  "
                  />

                )}

                <input
                  type="file"
                  onChange={handleFoto}
                />

              </div>


              <input
                type="text"
                name="nome"
                value={perfil.nome}
                onChange={
                  handlePerfil
                }
                placeholder="Nome"
                className="
                p-4
                rounded-2xl
                border
                focus:outline-none
                focus:ring-2
                focus:ring-blue-200
              "
              />

            </div>

          </div>


          {/* PÚBLICO */}

          <div>

            <h3 className="font-bold text-xl mb-5 text-gray-700">

              Página Pública

            </h3>

            <div className="grid md:grid-cols-2 gap-5">

              <input
                type="text"
                name="titulo"
                value={publico.titulo}
                onChange={
                  handlePublico
                }
                placeholder="Título principal"
                className="p-4 rounded-2xl border"
              />

              <input
                type="text"
                name="subtitulo"
                value={publico.subtitulo}
                onChange={
                  handlePublico
                }
                placeholder="Subtítulo"
                className="p-4 rounded-2xl border"
              />

              <input
                type="text"
                name="whatsapp"
                value={publico.whatsapp}
                onChange={
                  handlePublico
                }
                placeholder="Link WhatsApp"
                className="p-4 rounded-2xl border"
              />

              <input
                type="text"
                name="telefone"
                value={publico.telefone}
                onChange={
                  handlePublico
                }
                placeholder="Telefone"
                className="p-4 rounded-2xl border"
              />

              <input
                type="email"
                name="email"
                value={publico.email}
                onChange={
                  handlePublico
                }
                placeholder="Email"
                className="p-4 rounded-2xl border"
              />

              <input
                type="text"
                name="instagram"
                value={publico.instagram}
                onChange={
                  handlePublico
                }
                placeholder="@Instagram"
                className="p-4 rounded-2xl border"
              />

            </div>


            <input
              type="text"
              name="instagramLink"
              value={
                publico.instagramLink
              }
              onChange={
                handlePublico
              }
              placeholder="Link Instagram"
              className="
              mt-5
              w-full
              p-4
              rounded-2xl
              border
            "
            />

            {/* BANNER */}

            <div className="mt-6">

              <label className="block mb-2 text-gray-600">

                Banner Principal

              </label>

              {publico.previewBanner && (

                <img
                  src={
                    publico.previewBanner
                  }
                  alt=""
                  className="
                    w-full
                    h-52
                    object-cover
                    rounded-3xl
                    mb-4
                  "
                />

              )}

              <input
                type="file"
                onChange={
                  handleBanner
                }
              />

            </div>


            <textarea
              name="descricaoServicos"
              value={
                publico.descricaoServicos
              }
              onChange={
                handlePublico
              }
              placeholder="Ex: trabalho com móveis planejados sob medida..."
              className="
              w-full
              mt-6
              h-36
              p-4
              rounded-2xl
              border
            "
            />

          </div>


          {/* LINK */}

          <div
            className="
            mt-8
            p-5
            rounded-3xl
            bg-blue-50
            flex
            justify-between
            items-center
          "
          >

            <span className="text-gray-700">

              {linkPublico}

            </span>

            <button
              onClick={copiarLink}
              className="
              bg-blue-500
              hover:bg-blue-600
              px-5
              py-3
              rounded-2xl
              text-white
            "
            >
              Copiar
            </button>

          </div>


          <button
            onClick={salvar}
            className="
              w-full
              mt-8
              bg-blue-500
              hover:bg-blue-600
              text-white
              py-4
              rounded-2xl
              font-bold
              shadow-lg
            "
          >
            Salvar Alterações
          </button>

        </div>

      </main>

    </div>
  );
}

export default GerenciarPerfil;