import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.jpg";

function EditarProj() {
  const navigate = useNavigate();
  const location = useLocation();

  const projeto = location.state?.projeto;

  const [menuOpen, setMenuOpen] = useState(false);
  const [tipo, setTipo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagens, setImagens] = useState([]);

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
    "Outro",
  ];

  const MenuItem = ({ label, path }) => (
    <button
      onClick={() => navigate(path)}
      className="w-full text-left px-4 py-3 hover:bg-gray-100 rounded-lg transition"
    >
      {label}
    </button>
  );

  //  CARREGAR DADOS
  useEffect(() => {
    if (!projeto) return;

    setTipo(projeto.tipo);
    setDescricao(projeto.descricao);

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

  //  UPLOAD CLOUDINARY
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
    return result.secure_url;
  };

  //  ADICIONAR NOVAS IMAGENS
  const adicionarImagens = async (e) => {
    const files = Array.from(e.target.files);

    const novasUrls = [];

    for (let file of files) {
      const url = await uploadImagem(file);
      novasUrls.push(url);
    }

    setImagens((prev) => [...prev, ...novasUrls]);
  };

  //  REMOVER IMAGEM
  const removerImagem = (index) => {
    const novas = [...imagens];
    novas.splice(index, 1);
    setImagens(novas);
  };

  //  SALVAR ALTERAÇÕES
  const salvarAlteracoes = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/projetos/${projeto.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tipo,
            descricao,
            imagens,
          }),
        }
      );

      if (res.ok) {
        alert(" Projeto atualizado!");
        navigate("/controleProj");
      } else {
        alert("Erro ao salvar");
      }
    } catch (err) {
      console.log(err);
      alert("Erro no servidor");
    }
  };

  if (!projeto) {
    return <p>Projeto não encontrado</p>;
  }

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
            <MenuItem label="Controle de Projetos" path="/gerenciarProj" />
            <MenuItem label="Adicionar Projeto" path="/adicionarProj" />
            <MenuItem label="Gerenciar Perfil" path="/gerenciarPerfil" />
          </div>
        </>
      )}

      {/* CONTEÚDO */}
      <main className="p-6 max-w-5xl mx-auto w-full">

        {/* TOPO */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/controleProj")}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg"
          >
            ← Voltar
          </button>

          <h2 className="text-2xl font-bold">
            Editar Projeto
          </h2>
        </div>

        {/* TIPO */}
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="p-3 border rounded-lg mb-6 w-full"
        >
          {tipos.map((t, i) => (
            <option key={i}>{t}</option>
          ))}
        </select>

        {/* IMAGENS */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Imagens</h3>

            <label className="bg-orange-600 text-white px-3 py-1 rounded cursor-pointer">
              +
              <input
                type="file"
                multiple
                onChange={adicionarImagens}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex gap-4 overflow-x-auto">
            {imagens.map((img, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  src={img}
                  alt="projeto"
                  className="w-40 h-32 object-cover rounded-lg"
                />

                <button
                  onClick={() => removerImagem(index)}
                  className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
                >
                  Excluir
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* DESCRIÇÃO */}
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full p-3 border rounded-lg mb-6 min-h-[120px]"
        />

        {/* SALVAR */}
        <button
          onClick={salvarAlteracoes}
          className="bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          Salvar alterações
        </button>

      </main>
    </div>
  );
}

export default EditarProj;