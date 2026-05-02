import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

function AdicionarProj() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const [tipo, setTipo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagens, setImagens] = useState([]);
  const [loading, setLoading] = useState(false);

  const MenuItem = ({ label, path }) => (
    <button
      onClick={() => navigate(path)}
      className="w-full text-left px-4 py-3 hover:bg-gray-100 rounded-lg transition"
    >
      {label}
    </button>
  );

  //  CAPTURA IMAGENS
  const handleImagens = (e) => {
    setImagens(Array.from(e.target.files));
  };

  //  UPLOAD PARA CLOUDINARY
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

  // PROTEÇÃO CONTRA ERRO
  if (!result.secure_url) {
    console.log("❌ ERRO CLOUDINARY:", result);
    throw new Error("Erro no upload da imagem");
  }

  return result.secure_url;
};

  //  SALVAR PROJETO
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!tipo || imagens.length === 0) {
      alert("Preencha o tipo e selecione ao menos uma imagem!");
      return;
    }

    setLoading(true);

    try {
      //  Upload das imagens
      const urls = [];

      for (let img of imagens) {
        const url = await uploadImagem(img);
        urls.push(url);
      }

      console.log("📸 URLs:", urls);

      //  Envia para backend
      const res = await fetch("http://localhost:3000/projetos", {
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
        alert(" Projeto salvo com sucesso!");
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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* HEADER */}
      <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col gap-1"
        >
          <span className="w-6 h-0.5 bg-gray-800"></span>
          <span className="w-6 h-0.5 bg-gray-800"></span>
          <span className="w-6 h-0.5 bg-gray-800"></span>
        </button>

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

        <div className="w-6"></div>
      </header>

      {/* MENU */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setMenuOpen(false)}
          ></div>

          <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-xl p-4 z-50">
            <MenuItem label="Criar Orçamentos" path="/criarOrc" />
            <MenuItem label="Lista de Orçamentos" path="/listaOrc" />
            <MenuItem label="Controle de Projetos" path="/controleProj" />
            <MenuItem label="Adicionar Projeto" path="/adicionarProj" />
            <MenuItem label="Gerenciar Perfil" path="/gerenciarPerfil" />
          </div>
        </>
      )}

      {/* FORM */}
      <main className="flex justify-center p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full max-w-2xl p-8 rounded-2xl shadow-lg flex flex-col gap-4"
        >
          <h2 className="text-2xl font-bold text-gray-800">
            Adicionar Projeto
          </h2>

          {/* TIPO */}
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="p-3 border rounded-lg"
            required
          >
            <option value="">Selecione o tipo</option>
            <option>Rack para TV</option>
            <option>Painel para TV</option>
            <option>Estante</option>
            <option>Mesa de centro</option>
            <option>Aparador</option>
            <option>Guarda-roupa planejado</option>
            <option>Cama</option>
            <option>Escrivaninha</option>
            <option>Cozinha planejada</option>
            <option>Closet planejado</option>
            <option>Outro</option>
          </select>

          {/* IMAGENS */}
          <input
            type="file"
            multiple
            onChange={handleImagens}
            className="p-2 border rounded-lg w-full"
          />

          {/* PREVIEW */}
          <div className="flex gap-2 flex-wrap">
            {imagens.map((img, index) => (
              <img
                key={index}
                src={URL.createObjectURL(img)}
                alt="preview"
                className="w-20 h-20 object-cover rounded-lg border"
              />
            ))}
          </div>

          {/* DESCRIÇÃO */}
          <textarea
            value={descricao}
            placeholder="Descrição do Material
          - Medidas (altura, largura, profundidade) 
          - Material (MDF, madeira, etc) 
          - Cor 
          - Detalhes adicionais"
            onChange={(e) => setDescricao(e.target.value)}
            className="p-3 border rounded-lg resize-y min-h-[120px]"
          />

          {/* BOTÕES */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate("/gerenciarProj")}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg"
            >
              Voltar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
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
