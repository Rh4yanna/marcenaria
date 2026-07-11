import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { API_URL } from "../services/api";

function GerenciarProj() {
  const [projetos, setProjetos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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

  // BUSCAR PROJETOS
  useEffect(() => {
    const buscar = async () => {
      try {
        const res = await fetch(`${API_URL}/projetos`);
        const data = await res.json();
        setProjetos(Array.isArray(data) ? data.reverse() : []);
      } catch (err) {
        console.log("Erro ao buscar projetos:", err);
      } finally {
        setLoading(false);
      }
    };

    buscar();
  }, []);

  // AGRUPAR POR TIPO
  const projetosPorTipo = tipos.map((tipo) => ({
    tipo,
    itens: projetos.filter((p) => p.tipo === tipo),
  }));

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-800 antialiased">
      
      {/* HEADER NO PADRÃO EXATO DA HOME */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between">
          
          {/* LOGO + NAVEGAÇÃO */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/home")}>
              <img
                src={logo}
                alt="Logo Bassani"
                className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-sm"
              />
              <div>
                <h1 className="text-sm font-black text-slate-900 tracking-tight leading-none">
                  Marcio Bassani
                </h1>
                <p className="text-[11px] font-medium text-slate-400 mt-1">
                  Móveis Planejados
                </p>
              </div>
            </div>

            {/* LINKS DIRETOS DA HOME (Visível em telas maiores) */}
            <nav className="hidden md:flex items-center gap-1">
              <button 
                onClick={() => navigate("/criarOrc")} 
                className="text-xs font-bold text-slate-500 hover:text-slate-800 px-3 py-2 rounded-lg transition"
              >
                Criar Orçamento
              </button>
              <button 
                onClick={() => navigate("/listaOrc")} 
                className="text-xs font-bold text-slate-500 hover:text-slate-800 px-3 py-2 rounded-lg transition"
              >
                Orçamentos Solicitados
              </button>
              <button 
                onClick={() => navigate("/gerenciarProj")} 
                className="text-xs font-black bg-blue-50 text-blue-600 px-3 py-2 rounded-lg border border-blue-150/40"
              >
                Gerenciar Projetos
              </button>
              <button 
                onClick={() => navigate("/gerenciarPerfil")} 
                className="text-xs font-bold text-slate-500 hover:text-slate-800 px-3 py-2 rounded-lg transition"
              >
                Perfil Institucional
              </button>
            </nav>
          </div>

          {/* BOTÃO VOLTAR / SAIR DA SEÇÃO */}
          <button
            onClick={() => navigate("/home")}
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-red-500 transition px-3 py-2 rounded-xl border border-transparent hover:border-slate-200/60 hover:bg-white"
          >
            <span>Início</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          </button>

        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-12 flex flex-col gap-6">
        
        {/* TITULAÇÃO DA SEÇÃO */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              Galeria de Projetos
            </h1>
            <p className="text-slate-400 text-sm mt-0.5">
              Organize, categorize e filtre os portfólios de móveis produzidos.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => navigate("/home")}
              className="bg-white hover:bg-slate-50 transition border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
              Voltar
            </button>

            <button
              onClick={() => navigate("/adicionarProj")}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-xl text-sm shadow-md shadow-blue-500/10 transition flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="14"/><line x1="5" y1="12" x2="14" y2="12"/></svg>
              Novo Projeto
            </button>
          </div>
        </div>

        {/* CONTAINER DO FILTRO SELETOR */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm max-w-md">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Filtrar por Categoria de Móvel
          </label>
          <div className="relative">
            <select
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none text-sm text-slate-800 appearance-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition pr-10 font-medium"
            >
              <option value="">Exibir Todas as Categorias</option>
              {tipos.map((t, i) => (
                <option key={i} value={t}>{t}</option>
              ))}
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
            </span>
          </div>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm max-w-sm mx-auto">
            <p className="text-slate-400 font-medium text-sm animate-pulse">
              Carregando portfólio...
            </p>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && projetos.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm max-w-xl mx-auto mt-4">
            <div className="w-12 h-12 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center mx-auto mb-4 border border-slate-200/60">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            </div>
            <h2 className="text-lg font-bold text-slate-800">Nenhum projeto registrado</h2>
            <p className="text-slate-400 text-sm mt-1 mb-6">
              Comece populando sua vitrine adicionando os primeiros móveis concluídos.
            </p>
            <button
              onClick={() => navigate("/adicionarProj")}
              className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition"
            >
              Adicionar Primeiro Projeto
            </button>
          </div>
        )}

        {/* LISTAGEM AGRUPADA */}
        {!loading &&
          projetosPorTipo
            .filter((grupo) => !filtro || grupo.tipo === filtro)
            .map((grupo, index) => {
              if (grupo.itens.length === 0) return null;

              return (
                <div key={index} className="flex flex-col gap-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                  
                  {/* HEADER DO GRUPO */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h2 className="text-base font-black text-slate-900 uppercase tracking-tight">
                        {grupo.tipo}
                      </h2>
                      <p className="text-xs text-slate-400 font-medium mt-0.5">
                        {grupo.itens.length} {grupo.itens.length === 1 ? "móvel listado" : "móveis listados"}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        navigate("/controleProj", {
                          state: { tipo: grupo.tipo },
                        })
                      }
                      className="bg-slate-900 hover:bg-black text-white text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-sm transition"
                    >
                      Gerenciar Categoria
                    </button>
                  </div>

                  {/* CARROSSEL HORIZONTAL DE IMAGENS */}
                  <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
                    {grupo.itens.map((proj) => {
                      let imagens = [];
                      try {
                        imagens = typeof proj.imagens === "string" ? JSON.parse(proj.imagens) : proj.imagens;
                        imagens = (imagens || []).filter((img) => img && img !== "null");
                      } catch {
                        imagens = [];
                      }

                      return (
                        <div
                          key={proj.id}
                          className="min-w-[240px] max-w-[240px] bg-slate-50 border border-slate-200 rounded-xl overflow-hidden group flex flex-col justify-between"
                        >
                          {/* WRAPPER DA FOTO */}
                          <div className="w-full h-44 overflow-hidden relative bg-slate-200 border-b border-slate-200/60">
                            {imagens.length > 0 ? (
                              <img
                                src={imagens[0]}
                                alt={proj.nome || "Projeto"}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-1.5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                                <span className="text-[10px] font-bold uppercase tracking-wider">Sem Imagem</span>
                              </div>
                            )}
                          </div>

                          {/* LEGENDA */}
                          <div className="p-3 bg-white">
                            <h3 className="text-xs font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                              {proj.nome || "Ambiente sem título"}
                            </h3>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              );
            })}
      </main>
    </div>
  );
}

export default GerenciarProj;