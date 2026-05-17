import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { API_URL } from "../services/api";

function GerenciarPerfil() {
  const navigate = useNavigate();

  const inputBannerRef =
    useRef(null);

  const [publico, setPublico] =
    useState({
      titulo: "",
      subtitulo: "",
      descricao_servicos: "",
      banner: "",

      whatsapp: "",
      telefone: "",

      email: "",

      instagram: "",
      instagram_link: "",
    });

  const [previewBanner,
    setPreviewBanner] =
    useState("");

  const linkPublico =
    "https://marcenaria-1.onrender.com/principal";


  // CARREGAR PERFIL

  useEffect(() => {
    buscarPerfil();
  }, []);

  const buscarPerfil =
    async () => {

      try {

        const resposta =
          await fetch(
            `${API_URL}/perfil`
          );

        const dados =
          await resposta.json();

        if (dados) {

          setPublico(dados);

          setPreviewBanner(
            dados.banner || ""
          );

        }

      } catch (err) {

        console.log(
          "Erro carregar:",
          err
        );

      }

    };


  // INPUTS

  const handlePublico =
    (e) => {

      const {
        name,
        value
      } = e.target;

      setPublico({

        ...publico,

        [name]:
        value

      });

    };


  // CLOUDINARY

  const handleBanner =
    async (e) => {

      const file =
        e.target.files[0];

      if (!file) return;

      try {

        const formData =
          new FormData();

        formData.append(
          "file",
          file
        );

        formData.append(
          "upload_preset",
          "marcenaria_upload"
        );


        const resposta =
          await fetch(
            "https://api.cloudinary.com/v1_1/drrmyedhr/image/upload",
            {
              method:
                "POST",

              body:
                formData,
            }
          );


        const dados =
          await resposta.json();


        console.log(
          "Cloudinary:",
          dados
        );


        if (
          !dados.secure_url
        ) {

          return alert(
            "Erro upload"
          );

        }


        setPreviewBanner(
          dados.secure_url
        );


        // CORREÇÃO
        setPublico(
          (prev) => ({
            ...prev,

            banner:
              dados.secure_url
          })
        );

      } catch (err) {

        console.log(err);

        alert(
          "Erro upload imagem"
        );

      }

    };



  // COPIAR LINK

  const copiarLink =
    () => {

      navigator
      .clipboard
      .writeText(
        linkPublico
      );

      alert(
        "Link copiado"
      );

    };



  // SALVAR

  const salvar =
    async () => {

      console.log(
        "ENVIANDO:",
        publico
      );

      try {

        const resposta =
          await fetch(
            `${API_URL}/perfil`,
            {

              method:
                "PUT",

              headers: {

                "Content-Type":
                "application/json"

              },

              body:
                JSON.stringify(
                  publico
                ),

            }
          );


        const dados =
          await resposta.json();


        if (
          resposta.ok
        ) {

          alert(
            "Salvo com sucesso"
          );

        } else {

          alert(
            dados.erro ||
            "Erro salvar"
          );

        }

      } catch (err) {

        console.log(err);

        alert(
          "Erro conexão API"
        );

      }

    };



  return (

    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-blue-50">


      {/* HEADER */}

      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200">

        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <button
            onClick={() =>
              navigate(
                "/home"
              )
            }
            className="
            bg-white
            border
            border-gray-200
            hover:bg-gray-100
            px-5
            py-3
            rounded-2xl
            "
          >

            ← Voltar

          </button>


          <div className="flex items-center gap-4">

            <img
              src={logo}
              alt=""
              className="
              w-14
              h-14
              rounded-2xl
              object-cover
              "
            />

            <div>

              <h1 className="font-bold text-xl">

                Marcio Bassani

              </h1>

              <p className="text-gray-500 text-sm">

                Gerenciar Perfil

              </p>

            </div>

          </div>

          <div className="w-12"></div>

        </div>

      </header>



      <main className="max-w-5xl mx-auto p-6">

        <div className="
          bg-white
          rounded-[30px]
          p-8
          shadow-md
        ">

          <h2 className="text-3xl font-bold mb-8">

            Configurações Públicas

          </h2>


          <div className="grid md:grid-cols-2 gap-5">

            <input
              name="titulo"
              value={
                publico.titulo
              }
              onChange={
                handlePublico
              }
              placeholder="Título principal"
              className="p-4 rounded-2xl border"
            />


            <input
              name="subtitulo"
              value={
                publico.subtitulo
              }
              onChange={
                handlePublico
              }
              placeholder="Subtítulo"
              className="p-4 rounded-2xl border"
            />


            <input
              name="whatsapp"
              value={
                publico.whatsapp
              }
              onChange={
                handlePublico
              }
              placeholder="WhatsApp"
              className="p-4 rounded-2xl border"
            />


            <input
              name="telefone"
              value={
                publico.telefone
              }
              onChange={
                handlePublico
              }
              placeholder="(42)999999999"
              className="p-4 rounded-2xl border"
            />


            <input
              name="email"
              value={
                publico.email
              }
              onChange={
                handlePublico
              }
              placeholder="Email"
              className="p-4 rounded-2xl border"
            />


            <input
              name="instagram"
              value={
                publico.instagram
              }
              onChange={
                handlePublico
              }
              placeholder="@Instagram"
              className="p-4 rounded-2xl border"
            />

          </div>


          <input
            name="instagram_link"
            value={
              publico.instagram_link
            }
            onChange={
              handlePublico
            }
            placeholder="Link Instagram"
            className="
            w-full
            mt-5
            p-4
            rounded-2xl
            border
            "
          />


          <div className="mt-8">

            <label className="font-semibold">

              Banner Principal

            </label>


            {previewBanner && (

              <img
                src={
                  previewBanner
                }
                className="
                w-full
                h-56
                rounded-3xl
                object-cover
                mt-4
                mb-4
                "
              />

            )}


            <input
              type="file"
              ref={
                inputBannerRef
              }
              onChange={
                handleBanner
              }
              hidden
            />


            <button
              onClick={() =>
                inputBannerRef
                .current
                .click()
              }
              className="
              bg-blue-500
              text-white
              px-6
              py-3
              rounded-2xl
              "
            >

              Trocar Imagem

            </button>

          </div>



          <textarea
            name="descricao_servicos"
            value={
              publico
              .descricao_servicos
            }
            onChange={
              handlePublico
            }
            placeholder="Descrição"
            className="
            w-full
            mt-6
            h-36
            p-4
            rounded-2xl
            border
            "
          />


          <button
            onClick={
              salvar
            }
            className="
            w-full
            mt-8
            bg-blue-500
            text-white
            py-4
            rounded-2xl
            font-bold
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