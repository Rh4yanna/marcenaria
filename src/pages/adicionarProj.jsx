import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../services/api";
import logo from "../assets/logo.jpg";

function AdicionarProj() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const [tipo, setTipo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagens, setImagens] = useState([]);
  const [loading, setLoading] = useState(false);

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

  // CAPTURA IMAGENS
  const handleImagens = (e) => {
    setImagens(Array.from(e.target.files));
  };

  // UPLOAD CLOUDINARY
  const uploadImagem = async (file) => {
    const data = new FormData();

    data.append("file", file);
    data.append("upload_preset", "meu_upload");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/drrmyedhr/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const result = await res.json();

    if (!result.secure_url) {
      console.log("Erro Cloudinary:", result);
      throw new Error("Erro no upload");
    }

    return result.secure_url;
  };

  // SALVAR PROJETO
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!tipo || imagens.length === 0) {
      alert("Selecione o tipo e ao menos uma imagem.");
      return;
    }

    setLoading(true);

    try {
      const urls = [];

      for (let img of imagens) {
        const url = await uploadImagem(img);
        urls.push(url);
      }

      const res = await fetch(`${API_URL}/projetos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tipo,
          descricao,
          imagens: urls,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Projeto salvo com sucesso!");
        navigate("/gerenciarProj");
      } else {
        alert(data.message || "Erro ao salvar");
      }

    } catch (err) {
      console.log(err);
      alert("Erro ao enviar projeto");
    } finally {
      setLoading(false);
    }
  };

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
                Adicionar Projeto
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
      <main className="max-w-5xl mx-auto px-6 pt-10 pb-12">

        {/* TOPO */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Adicionar Projeto
            </h1>

            <p className="text-gray-500 mt-3 text-lg">
              Cadastre novos projetos para o portfólio.
            </p>
          </div>

          <button
            onClick={() => navigate("/gerenciarProj")}
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
              w-fit
            "
          >
            ← Voltar
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="
            bg-white/90
            backdrop-blur-md
            border border-gray-200
            rounded-[32px]
            p-8
            shadow-xl
            flex flex-col gap-8
          "
        >

          {/* TIPO */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Tipo do móvel
            </label>

            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="
                w-full
                bg-gray-50
                border border-gray-200
                rounded-2xl
                px-4
                py-4
                outline-none
                focus:ring-4
                focus:ring-blue-100
                focus:border-blue-300
                transition
              "
              required
            >
              <option value="">
                Selecione o tipo
              </option>

              {tipos.map((tipo, index) => (
                <option key={index}>
                  {tipo}
                </option>
              ))}
            </select>
          </div>

          {/* UPLOAD */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Imagens do projeto
            </label>

            <label
              className="
                flex
                flex-col
                items-center
                justify-center
                border-2
                border-dashed
                border-blue-200
                rounded-[28px]
                bg-blue-50/50
                hover:bg-blue-50
                transition
                p-10
                cursor-pointer
              "
            >
              <div className="text-5xl text-blue-400">
                ⬆
              </div>

              <h3 className="text-lg font-semibold text-gray-700 mt-4">
                Clique para adicionar imagens
              </h3>

              <p className="text-sm text-gray-500 mt-2 text-center">
                Selecione uma ou mais imagens do projeto.
              </p>

              <input
                type="file"
                multiple
                onChange={handleImagens}
                className="hidden"
              />
            </label>
          </div>

          {/* PREVIEW */}
          {imagens.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">
                Pré-visualização
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                {imagens.map((img, index) => (
                  <div
                    key={index}
                    className="
                      rounded-2xl
                      overflow-hidden
                      border border-gray-200
                      shadow-sm
                    "
                  >
                    <img
                      src={URL.createObjectURL(img)}
                      alt="preview"
                      className="
                        w-full
                        h-36
                        object-cover
                      "
                    />
                  </div>
                ))}

              </div>
            </div>
          )}

          {/* DESCRIÇÃO */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Descrição do projeto
            </label>

            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descreva materiais, acabamentos, detalhes e informações do projeto..."
              className="
                w-full
                min-h-[180px]
                resize-none
                bg-gray-50
                border border-gray-200
                rounded-2xl
                px-4
                py-4
                outline-none
                focus:ring-4
                focus:ring-blue-100
                focus:border-blue-300
                transition
              "
            />
          </div>

          {/* BOTÕES */}
          <div className="flex flex-col md:flex-row gap-4">

            <button
              type="button"
              onClick={() => navigate("/gerenciarProj")}
              className="
                flex-1
                bg-gray-100
                hover:bg-gray-200
                transition
                text-gray-700
                py-4
                rounded-2xl
                font-semibold
              "
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                flex-1
                bg-blue-500
                hover:bg-blue-600
                transition
                text-white
                py-4
                rounded-2xl
                font-semibold
                shadow-lg
                disabled:opacity-50
              "
            >
              {loading ? "Salvando..." : "Salvar Projeto"}
            </button>

          </div>
        </form>
      </main>
    </div>
  );
}

export default AdicionarProj;