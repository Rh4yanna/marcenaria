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
      className="w-full text-left p-3.5 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-200"
    >
      <h3 className="text-sm font-bold text-slate-800">{label}</h3>
      {desc && <p className="text-xs text-slate-400 mt-0.5">{desc}</p>}
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
    } catch (err) {
      console.error(err);
      alert("Erro ao fazer upload de alguma imagem.");
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

    try {
      const res = await fetch(`${API_URL}/projetos/${projeto.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo, descricao, imagens }),
      });

      if (res.ok) {
        navigate("/controleProj", {
          state: { tipo: tipoOrigem },
        });
      } else {
        alert("Erro ao salvar as alterações.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro na conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  if (!projeto) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 font-medium text-sm">
        Projeto não encontrado ou dados inválidos.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-800 antialiased">

      {/* HEADER NO PADRÃO DA IDENTIDADE VISUAL */}
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
                Editar Projeto
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
              Modificar Projeto Cadastrado
            </h1>
            <p className="text-slate-400 text-sm mt-0.5">
              Atualize as fotos e descrições técnicas exibidas no seu portfólio de móveis.
            </p>
          </div>

          <button
            onClick={() => navigate("/controleProj", { state: { tipo: tipoOrigem } })}
            className="bg-white hover:bg-slate-50 transition border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 shadow-sm w-fit"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Voltar
          </button>
        </div>

        {/* CARD DO FORMULÁRIO */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col gap-6">
          
          {/* CAMPO: TIPO */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Tipo do móvel
            </label>
            <div className="relative">
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-sm text-slate-800 appearance-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition pr-10 font-medium"
              >
                <option value="">Selecione</option>
                <option>Rack para TV</option>
                <option>Painel para TV</option>
                <option>Estante</option>
                <option>Mesa de centro</option>
                <option>Mesa de jantar</option>
                <option>Mesa planejada</option>
                <option>Aparador</option>
                <option>Guarda-roupa planejado</option>
                <option>Cama</option>
                <option>Cabeceira</option>
                <option>Escrivaninha</option>
                <option>Cozinha planejada</option>
                <option>Closet planejado</option>
                <option>Armário de banheiro</option>
                <option>Painel ripado</option>
                <option>Balcão</option>
                <option>Home office</option>
                <option>Cristaleira</option>
                <option>Nicho decorativo</option>
                <option>Prateleira</option>
                <option>Lavanderia planejada</option>
                <option>Barzinho</option>
                <option>Área gourmet</option>
                <option>Quarto infantil</option>
                <option>Outro</option>
              </select>
              <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
              </span>
            </div>
          </div>

          {/* CAMPO: ADICIONAR IMAGENS */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Adicionar novas fotos ao portfólio
            </label>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300 transition p-6 cursor-pointer text-center group">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-blue-500 transition shadow-sm mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              </div>
              <h3 className="text-sm font-bold text-slate-700">Escolher arquivos locais</h3>
              <p className="text-xs text-slate-400 mt-0.5">Clique para anexar novas mídias via Cloudinary.</p>
              <input type="file" multiple onChange={adicionarImagens} className="hidden" />
            </label>
          </div>

          {/* GRADE / GALERIA DE IMAGENS ATUAIS */}
          {imagens.length > 0 && (
            <div className="bg-slate-50/60 border border-slate-200/60 rounded-xl p-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Imagens Ativas ({imagens.length})
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {imagens.map((img, i) => (
                  <div key={i} className="group relative aspect-video bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
                    <img src={img} alt={`Midia ${i}`} className="w-full h-24 object-cover" />
                    
                    <button
                      onClick={() => removerImagem(i)}
                      className="w-full py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-[11px] font-bold border-t border-red-100/60 transition text-center"
                    >
                      Remover foto
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CAMPO: DESCRIÇÃO */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Descrição detalhada do projeto
            </label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descreva detalhes estruturais, madeiras, dobradiças ou cores aplicadas no ambiente..."
              className="w-full min-h-[140px] resize-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-sm text-slate-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition font-medium"
            />
          </div>

          {/* BOTÕES DE AÇÃO */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => navigate("/controleProj", { state: { tipo: tipoOrigem } })}
              className="flex-1 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 text-xs font-bold py-3 rounded-xl transition text-center order-2 sm:order-1"
            >
              Voltar sem salvar
            </button>

            <button
              onClick={salvar}
              disabled={loading}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold py-3 rounded-xl shadow-md shadow-blue-500/10 transition disabled:opacity-50 order-1 sm:order-2 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Salvando Alterações...
                </>
              ) : (
                "Salvar Modificações"
              )}
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}

export default EditarProj;