import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { API_URL } from "../services/api";

function GerenciarPerfil() {
  const navigate = useNavigate();

  const [perfil, setPerfil] = useState({
    nome: "",
    foto: "",
    previewFoto: "",
  });

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

  useEffect(() => {
    buscarPerfil();
  }, []);

  const buscarPerfil = async () => {
    try {
      const res = await fetch(
        `${API_URL}/perfil`
      );

      const data = await res.json();

      setPerfil({
        nome: data.nome || "",
        foto: "",
        previewFoto: "",
      });

      setPublico({
        whatsapp:
          data.whatsapp || "",

        telefone:
          data.telefone || "",

        banner: "",

        previewBanner: "",

        email:
          data.email || "",

        instagram:
          data.instagram || "",

        instagramLink:
          data.instagram_link || "",

        titulo:
          data.titulo || "",

        subtitulo:
          data.subtitulo || "",

        descricaoServicos:
          data.descricao_servicos || "",
      });

    } catch (err) {

      console.log(
        "Erro:",
        err
      );

    }
  };

  const handlePerfil = (e) => {

    const {
      name,
      value
    } = e.target;

    setPerfil({

      ...perfil,

      [name]:
      value,

    });

  };

  const handlePublico = (e) => {

    const {
      name,
      value
    } = e.target;

    setPublico({

      ...publico,

      [name]:
      value,

    });

  };

  const handleFoto = (e) => {

    const file =
      e.target.files[0];

    if (!file) return;

    setPerfil({

      ...perfil,

      foto:file,

      previewFoto:
      URL.createObjectURL(
        file
      ),

    });

  };

  const handleBanner = (e) => {

    const file =
      e.target.files[0];

    if (!file) return;

    setPublico({

      ...publico,

      banner:file,

      previewBanner:
      URL.createObjectURL(
        file
      ),

    });

  };

  const copiarLink=()=>{

    navigator.clipboard
    .writeText(
      linkPublico
    );

    alert(
      "Link copiado!"
    );

  };

  const salvar=async()=>{

    try{

      const res=
      await fetch(

      `${API_URL}/perfil`,

      {

      method:"PUT",

      headers:{

      "Content-Type":
      "application/json"

      },

      body:JSON.stringify({

      nome:
      perfil.nome,

      titulo:
      publico.titulo,

      subtitulo:
      publico.subtitulo,

      descricaoServicos:
      publico.descricaoServicos,

      whatsapp:
      publico.whatsapp,

      telefone:
      publico.telefone,

      email:
      publico.email,

      instagram:
      publico.instagram,

      instagramLink:
      publico.instagramLink

      })

      }

      );

      if(!res.ok){

      throw new Error();

      }

      alert(
      "Salvo!"
      );

    }catch{

      alert(
      "Erro ao salvar"
      );

    }

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-blue-50">

      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200">

        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <button
            onClick={() =>
            navigate("/home")}
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
              w-14 h-14
              rounded-2xl
              object-cover
              border-2
              border-blue-100
              "
            />

            <div>

              <h1 className="font-bold text-xl">
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

      <main className="max-w-5xl mx-auto p-6">

        <div className="bg-white p-8 rounded-[30px] shadow-md">

          <h2 className="text-3xl font-bold mb-8">

            Configurações Públicas

          </h2>

          <input
            type="text"
            name="nome"
            value={perfil.nome}
            onChange={handlePerfil}
            placeholder="Nome"
            className="w-full p-4 border rounded-2xl mb-5"
          />

          <input
            type="text"
            name="titulo"
            value={publico.titulo}
            onChange={handlePublico}
            placeholder="Título"
            className="w-full p-4 border rounded-2xl mb-5"
          />

          <input
            type="text"
            name="subtitulo"
            value={publico.subtitulo}
            onChange={handlePublico}
            placeholder="Subtítulo"
            className="w-full p-4 border rounded-2xl mb-5"
          />

          <textarea
            name="descricaoServicos"
            value={publico.descricaoServicos}
            onChange={handlePublico}
            placeholder="Descrição"
            className="w-full p-4 border rounded-2xl h-36 mb-5"
          />

          <input
            type="text"
            name="whatsapp"
            value={publico.whatsapp}
            onChange={handlePublico}
            placeholder="WhatsApp"
            className="w-full p-4 border rounded-2xl mb-5"
          />

          <input
            type="text"
            name="telefone"
            value={publico.telefone}
            onChange={handlePublico}
            placeholder="Telefone"
            className="w-full p-4 border rounded-2xl mb-5"
          />

          <input
            type="email"
            name="email"
            value={publico.email}
            onChange={handlePublico}
            placeholder="Email"
            className="w-full p-4 border rounded-2xl mb-5"
          />

          <input
            type="text"
            name="instagram"
            value={publico.instagram}
            onChange={handlePublico}
            placeholder="@Instagram"
            className="w-full p-4 border rounded-2xl mb-5"
          />

          <button
            onClick={salvar}
            className="
            w-full
            bg-blue-500
            hover:bg-blue-600
            text-white
            py-4
            rounded-2xl
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