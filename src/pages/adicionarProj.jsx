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
      className="w-full text-left p-3.5 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-200"
    >
      <h3 className="text-sm font-bold text-slate-800">{label}</h3>
      {desc && <p className="text-xs text-slate-400 mt-0.5">{desc}</p>}
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
    <div className="min-h-screen bg-slate-50/60 text-slate-800 antialiased">

      {/* HEADER NO PADRÃO DE FONTE DA HOME */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between">

          {/* BOTÃO HAMBÚRGUER */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex flex-col items-center justify-center gap-1 transition shadow-sm"
          >
            <span className="w-4 h-0.5 bg-slate-600 rounded-full"></span>
            <span className="w-4 h-0.5 bg-slate-600 rounded-full"></span>
            <span className="w-4 h-0.5 bg-slate-600 rounded-full"></span>
          </button>

          {/* LOGO E TEXTOS */}
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Logo"
              className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-sm"
            />
            <div>
              <h1 className="text-sm font-black text-slate-900 tracking-tight leading-none">
                Marcio Bassani
              </h1>
              <p className="text-[11px] font-medium text-slate-400 mt-1">
                Adicionar Projeto
              </p>
            </div>
          </div>

          <div className="w-10"></div>
        </div>
      </header>

      {/* MENU LATERAL RETRÁTIL */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-xs z-40"
            onClick={() => setMenuOpen(false)}
          />

          <div className="fixed top-0 left-0 w-72 h-full bg-white border-r border-slate-200 shadow-xl z-50 p-5 flex flex-col gap-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <img
                src={logo}
                alt="Logo"
                className="w-10 h-10 rounded-xl object-cover border border-slate-200"
              />
              <div>
                <h2 className="text-sm font-bold text-slate-900">Marcio Bassani</h2>
                <p className="text-[11px] text-slate-400 font-medium">Móveis Planejados</p>
              </div>
            </div>

            <div className="flex flex-col gap-1 overflow-y-auto">
              <MenuItem label="Criar Orçamentos" path="/criarOrc" />
              <MenuItem label="Lista de Orçamentos" path="/listaOrc" />
              <MenuItem label="Gerenciar Projetos" path="/gerenciarProj" />
              <MenuItem label="Adicionar Projeto" path="/adicionarProj" />
              <MenuItem label="Gerenciar Perfil" path="/gerenciarPerfil" />
            </div>
          </div>
        </>
      )}

      {/* CONTEÚDO PRINCIPAL */}
      <main className="max-w-4xl mx-auto px-4 md:px-8 pt-8 pb-12 flex flex-col gap-6">

        {/* TOPO / TITULAÇÃO */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              Novo Cadastro de Projeto
            </h1>
            <p className="text-slate-400 text-sm mt-0.5">
              Insira imagens e metadados estruturais para atualizar seu portfólio.
            </p>
          </div>

          <button
            onClick={() => navigate("/gerenciarProj")}
            className="bg-white hover:bg-slate-50 transition border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 shadow-sm w-fit"
          >
            <svg xmlns="http://www.w3.org/2000/xl" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Voltar
          </button>
        </div>

        {/* FORMULÁRIO PROFISSIONAL */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col gap-6"
        >
          {/* CAMPO: TIPO */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Tipo do móvel *
            </label>
            <div className="relative">
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-sm text-slate-800 appearance-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition pr-10 font-medium"
                required
              >
                <option value="">Selecione a categoria correspondente</option>
                {tipos.map((t, i) => (
                  <option key={i} value={t}>{t}</option>
                ))}
              </select>
              <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
              </span>
            </div>
          </div>

          {/* CAMPO: UPLOAD IMAGENS */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Imagens do projeto *
            </label>

            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300 transition p-8 cursor-pointer text-center group">
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-blue-500 transition shadow-sm mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              </div>
              <h3 className="text-sm font-bold text-slate-700">
                Clique para selecionar os arquivos
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Suporta múltiplos arquivos de alta resolução (JPEG, PNG).
              </p>
              <input
                type="file"
                multiple
                onChange={handleImagens}
                className="hidden"
                required
              />
            </label>
          </div>

          {/* PREVIEW CONTAINER */}
          {imagens.length > 0 && (
            <div className="bg-slate-50/60 border border-slate-200/60 rounded-xl p-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Arquivos selecionados ({imagens.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {imagens.map((img, index) => (
                  <div
                    key={index}
                    className="aspect-video rounded-lg overflow-hidden border border-slate-200 bg-white shadow-sm"
                  >
                    <img
                      src={URL.createObjectURL(img)}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CAMPO: DESCRIÇÃO */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Descrição ou Detalhes Técnicos
            </label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Ex: Armários em MDF amadeirado, puxadores ocultos perfil cava, dobradiças com amortecimento e fitas de LED embutidas..."
              className="w-full min-h-[140px] resize-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-sm text-slate-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition font-medium"
            />
          </div>

          {/* FOOTER DO FORMULÁRIO / AÇÕES */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => navigate("/gerenciarProj")}
              className="flex-1 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 text-xs font-bold py-3 rounded-xl transition text-center order-2 sm:order-1"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold py-3 rounded-xl shadow-md shadow-blue-500/10 transition disabled:opacity-50 order-1 sm:order-2 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Salvando Portfólio...
                </>
              ) : (
                "Salvar Projeto"
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default AdicionarProj;