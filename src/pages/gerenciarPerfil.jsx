import { useState } from "react";
import { useNavigate } from "react-router-dom";

function GerenciarPerfil() {
  const navigate = useNavigate();

  // ===== DADOS =====
  const [perfil, setPerfil] = useState({
    nome: "Marcio Bassani",
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
  });

  const linkPublico = "https://seusite.com/bassani"; // editar depois que tiver o link real

  // ===== HANDLERS =====
  const handlePerfil = (e) => {
    const { name, value } = e.target;
    setPerfil({ ...perfil, [name]: value });
  };

  const handlePublico = (e) => {
    const { name, value } = e.target;
    setPublico({ ...publico, [name]: value });
  };

  const handleFoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPerfil({
      ...perfil,
      foto: file,
      previewFoto: URL.createObjectURL(file),
    });
  };

  const handleBanner = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPublico({
      ...publico,
      banner: file,
      previewBanner: URL.createObjectURL(file),
    });
  };

  const copiarLink = () => {
    navigator.clipboard.writeText(linkPublico);
    alert("Link copiado!");
  };

  const salvar = () => {
    console.log("Perfil:", perfil);
    console.log("Publico:", publico);

    alert("Dados salvos (depois conectamos com API)");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">

        {/* VOLTAR */}
        <button
          onClick={() => navigate("/home")}
          className="mb-4 bg-gray-800 text-white px-4 py-2 rounded-lg"
        >
          ← Voltar
        </button>

        <h2 className="text-2xl font-bold mb-6">
          Gerenciar Perfil
        </h2>

        {/* ===== PERFIL ===== */}
        <h3 className="text-lg font-semibold mb-3">
          Dados do Perfil
        </h3>

        <div className="flex flex-col gap-4 mb-8">

          {/* FOTO */}
          <div>
            <label className="block mb-1">Foto</label>

            {perfil.previewFoto && (
              <img
                src={perfil.previewFoto}
                alt="preview"
                className="w-20 h-20 rounded-full object-cover mb-2"
              />
            )}

            <input type="file" onChange={handleFoto} />
          </div>

          {/* NOME */}
          <input
            type="text"
            name="nome"
            value={perfil.nome}
            onChange={handlePerfil}
            placeholder="Nome"
            className="p-3 border rounded-lg"
          />
        </div>

        {/* ===== PÁGINA PÚBLICA ===== */}
        <h3 className="text-lg font-semibold mb-3">
          Páginas Públicas
        </h3>

        <div className="flex flex-col gap-4 mb-8">

          <input
            type="text"
            name="whatsapp"
            value={publico.whatsapp}
            onChange={handlePublico}
            placeholder="Link do WhatsApp"
            className="p-3 border rounded-lg"
          />

          <input
            type="text"
            name="telefone"
            value={publico.telefone}
            onChange={handlePublico}
            placeholder="Número"
            className="p-3 border rounded-lg"
          />

          {/* BANNER */}
          <div>
            <label className="block mb-1">Banner</label>

            {publico.previewBanner && (
              <img
                src={publico.previewBanner}
                alt="banner"
                className="w-full h-32 object-cover rounded-lg mb-2"
              />
            )}

            <input type="file" onChange={handleBanner} />
          </div>

          <input
            type="email"
            name="email"
            value={publico.email}
            onChange={handlePublico}
            placeholder="Email"
            className="p-3 border rounded-lg"
          />

          <input
            type="text"
            name="instagram"
            value={publico.instagram}
            onChange={handlePublico}
            placeholder="@Instagram"
            className="p-3 border rounded-lg"
          />

          <input
            type="text"
            name="instagramLink"
            value={publico.instagramLink}
            onChange={handlePublico}
            placeholder="Link do Instagram"
            className="p-3 border rounded-lg"
          />

          <input
            type="text"
            name="titulo"
            value={publico.titulo}
            onChange={handlePublico}
            placeholder="Título da página"
            className="p-3 border rounded-lg"
          />

          <input
            type="text"
            name="subtitulo"
            value={publico.subtitulo}
            onChange={handlePublico}
            placeholder="Subtítulo"
            className="p-3 border rounded-lg"
          />
        </div>

        {/* ===== LINK PÚBLICO ===== */}
        <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center mb-6">
          <span className="text-sm">{linkPublico}</span>

          <button
            onClick={copiarLink}
            className="bg-blue-500 text-white px-3 py-1 rounded-lg"
          >
            Copiar
          </button>
        </div>

        {/* SALVAR */}
        <button
          onClick={salvar}
          className="w-full bg-orange-600 text-white py-3 rounded-lg"
        >
          Salvar alterações
        </button>

      </div>
    </div>
  );
}

export default GerenciarPerfil;