import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { API_URL } from "../services/api";

function EditarProj() {
  const navigate = useNavigate();
  const location = useLocation();

  const projeto = location.state?.projeto;
  const tipoOrigem = location.state?.tipo || projeto?.tipo || "";

  const [tipo, setTipo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagens, setImagens] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!projeto) return;

    setTipo(projeto.tipo || "");
    setDescricao(projeto.descricao || "");

    try {
      const imgs =
        typeof projeto.imagens === "string"
          ? JSON.parse(projeto.imagens)
          : projeto.imagens;

      setImagens(imgs || []);
    } catch {
      setImagens([]);
    }
  }, [projeto]);

  const uploadImagem = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "meu_upload");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/drrmyedhr/image/upload",
      { method: "POST", body: data }
    );

    const result = await res.json();
    return result.secure_url;
  };

  const adicionarImagens = async (e) => {
    const files = Array.from(e.target.files);
    setLoading(true);

    try {
      const novas = [];

      for (let file of files) {
        const url = await uploadImagem(file);
        novas.push(url);
      }

      setImagens((prev) => [...prev, ...novas]);
    } finally {
      setLoading(false);
    }
  };

  const removerImagem = (i) => {
    const copy = [...imagens];
    copy.splice(i, 1);
    setImagens(copy);
  };

  const salvar = async () => {
    setLoading(true);

    const res = await fetch(`${API_URL}/projetos/${projeto.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tipo, descricao, imagens }),
    });

    if (res.ok) {
      navigate("/controleProj", {
        state: { tipo: tipoOrigem }, // 🔥 volta filtrado
      });
    }

    setLoading(false);
  };

  if (!projeto) {
    return (
      <div className="p-6">
        Projeto não encontrado
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-blue-50">

      {/* HEADER */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <button
            onClick={() =>
              navigate("/controleProj", {
                state: { tipo: tipoOrigem },
              })
            }
            className="w-12 h-12 rounded-2xl bg-gray-100"
          >
            ←
          </button>

          <h1 className="font-bold text-gray-800">Editar Projeto</h1>

          <img src={logo} className="w-12 h-12 rounded-2xl object-cover" />
        </div>
      </header>

      {/* CONTEÚDO */}
      <main className="max-w-5xl mx-auto px-6 py-10">

        <div className="bg-white rounded-3xl p-8 shadow">

          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="w-full p-4 border rounded-2xl mb-6"
          >
            <option>Selecione</option>
            <option>Rack para TV</option>
            <option>Painel para TV</option>
            <option>Estante</option>
          </select>

          <input type="file" multiple onChange={adicionarImagens} />

          <div className="flex gap-3 overflow-x-auto mt-4">
            {imagens.map((img, i) => (
              <div key={i}>
                <img src={img} className="w-40 h-32 object-cover rounded-xl" />
                <button onClick={() => removerImagem(i)}>Excluir</button>
              </div>
            ))}
          </div>

          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full p-4 border rounded-2xl mt-6"
          />

          <button
            onClick={salvar}
            className="bg-blue-500 text-white px-6 py-3 rounded-2xl mt-6"
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>

        </div>
      </main>
    </div>
  );
}

export default EditarProj;