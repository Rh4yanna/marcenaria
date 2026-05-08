import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { API_URL } from "../services/api";

function EditarProj() {
  const navigate = useNavigate();
  const location = useLocation();

  const projeto = location.state?.projeto;
  const tipoOrigem = location.state?.tipo || projeto?.tipo || "";

  const [menuOpen, setMenuOpen] = useState(false);
  const [tipo, setTipo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagens, setImagens] = useState([]);
  const [loading, setLoading] = useState(false);

  const irPara = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const MenuItem = ({ label, desc, path }) => (
    <button
      onClick={() => irPara(path)}
      className="
        w-full text-left p-4 rounded-2xl
        hover:bg-blue-50 transition
        border border-transparent hover:border-blue-100
      "
    >
      <h3 className="font-semibold text-gray-800">{label}</h3>
      {desc && <p className="text-sm text-gray-500 mt-1">{desc}</p>}
    </button>
  );

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
        state: { tipo: tipoOrigem },
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

      {/* HEADER IGUAL CONTROLEPROJ */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* MENU */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="
              w-12 h-12 rounded-2xl
              bg-gray-100 hover:bg-blue-50
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
              className="
                w-14 h-14 rounded-2xl
                object-cover border-2 border-blue-100
                shadow-md
              "
            />

            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Marcio Bassani
              </h1>
              <p className="text-sm text-gray-500">
                Editar Projeto
              </p>
            </div>
          </div>

          <div className="w-12" />
        </div>
      </header>

      {/* MENU LATERAL IGUAL CONTROLEPROJ */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={() => setMenuOpen(false)}
          />

          <div className="
            fixed top-0 left-0 w-80 h-full bg-white
            shadow-2xl z-50 p-6 border-r border-gray-200
          ">
            <div className="flex items-center gap-4 mb-8">
              <img src={logo} className="w-14 h-14 rounded-2xl object-cover" />

              <div>
                <h2 className="font-bold text-gray-800">
                  Marcio Bassani
                </h2>
                <p className="text-sm text-gray-500">
                  Gestão de móveis planejados
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <MenuItem label="Criar Orçamentos" path="/criarOrc" />
              <MenuItem label="Lista de Orçamentos" path="/listaOrc" />
              <MenuItem label="Gerenciar Projetos" path="/gerenciarProj" />
              <MenuItem label="Adicionar Projeto" path="/adicionarProj" />
              <MenuItem label="Gerenciar Perfil" path="/gerenciarPerfil" />
            </div>
          </div>
        </>
      )}

      {/* CONTEÚDO */}
      <main className="max-w-5xl mx-auto px-6 pt-10 pb-12">

        {/* TOPO IGUAL CONTROLEPROJ */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Editar Projeto
            </h1>

            <p className="text-gray-500 mt-3 text-lg">
              Altere informações do projeto.
            </p>
          </div>

          {/* BOTÃO VOLTAR PADRÃO */}
          <button
            onClick={() =>
              navigate("/controleProj", {
                state: { tipo: tipoOrigem },
              })
            }
            className="
              bg-white border border-gray-200
              hover:bg-gray-100 transition
              text-gray-700 px-5 py-3 rounded-2xl shadow-sm
            "
          >
            ← Voltar
          </button>
        </div>

        {/* CARD */}
        <div className="bg-white/90 backdrop-blur-md rounded-[28px] p-8 shadow-md">

          {/* TIPO */}
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

          {/* IMAGENS */}
          <input type="file" multiple onChange={adicionarImagens} />

          <div className="flex gap-3 overflow-x-auto mt-4">
            {imagens.map((img, i) => (
              <div key={i}>
                <img src={img} className="w-40 h-32 object-cover rounded-xl" />
                <button onClick={() => removerImagem(i)}>
                  Excluir
                </button>
              </div>
            ))}
          </div>

          {/* DESCRIÇÃO */}
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full p-4 border rounded-2xl mt-6"
          />

          {/* SALVAR */}
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