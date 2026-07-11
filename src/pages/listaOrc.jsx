import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import { API_URL } from "../services/api";

function ListaOrc() {
  const [orcamentos, setOrcamentos] = useState([]);
  const [busca, setBusca] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    buscarOrcamentos();
  }, []);

  const buscarOrcamentos = async () => {
    try {
      const res = await fetch(`${API_URL}/orcamentos`);
      const data = await res.json();

      const ordenados = [...data].sort((a, b) => {
        return new Date(b.createdAt || b.id) - new Date(a.createdAt || a.id);
      });

      setOrcamentos(ordenados);
    } catch (err) {
      console.log("Erro ao buscar:", err);
    }
  };

  const excluirOrcamento = async (id) => {
    const confirmar = window.confirm("Deseja realmente excluir este orçamento de forma permanente?");
    if (!confirmar) return;

    try {
      const res = await fetch(`${API_URL}/orcamentos/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setOrcamentos((prev) => prev.filter((orc) => orc.id !== id));
      } else {
        alert("Erro ao excluir o orçamento.");
      }
    } catch (err) {
      console.log(err);
      alert("Erro ao conectar com o servidor.");
    }
  };

  const orcamentosFiltrados = orcamentos.filter((orc) =>
    orc.nome.toLowerCase().includes(busca.toLowerCase())
  );

  // NOVO GERADOR DE PDF PROFISSIONAL E DESIGN LAPIDADO
  const gerarPDF = (orc) => {
    const doc = new jsPDF();

    const dataOrcamento = orc.createdAt ? new Date(orc.createdAt) : new Date();
    const dataFormatada = dataOrcamento.toLocaleDateString("pt-BR");
    const horaFormatada = dataOrcamento.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    // 1. CABEÇALHO CORPORATIVO
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 41, 59); // slate-800
    doc.setFontSize(22);
    doc.text("BASSANI MÓVEIS", 20, 25);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139); // slate-500
    doc.setFontSize(10);
    doc.text("Móveis Planejados de Alto Padrão", 20, 31);

    // Alinhado à direita no cabeçalho
    doc.setFont("helvetica", "bold");
    doc.setTextColor(59, 130, 246); // blue-500
    doc.setFontSize(12);
    doc.text("ORÇAMENTO OFICIAL", 190, 25, { align: "right" });
    
    doc.setFont("helvetica", "normal");
    doc.setTextColor(148, 163, 184); // slate-400
    doc.setFontSize(9);
    doc.text(`Emitido em: ${dataFormatada} às ${horaFormatada}`, 190, 31, { align: "right" });

    // Linha divisória fina do topo
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.setLineWidth(0.5);
    doc.line(20, 38, 190, 38);

    let y = 52;

    // 2. SEÇÃO: CLIENTE
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(12);
    doc.text("1. DADOS DO CLIENTE", 20, y);
    
    y += 8;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105); // slate-600
    doc.setFontSize(11);
    doc.text(`Nome do Cliente:  ${orc.nome}`, 22, y);
    
    y += 7;
    doc.text(`Telefone de Contato:  ${orc.telefone}`, 22, y);

    y += 15;

    // 3. SEÇÃO: ESPECIFICAÇÕES DO PROJETO
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(12);
    doc.text("2. ESPECIFICAÇÕES DO PROJETO", 20, y);
    
    y += 8;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(59, 130, 246);
    doc.setFontSize(11);
    doc.text(`Tipo de Ambiente / Móvel:  ${orc.tipo}`, 22, y);
    
    y += 9;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 41, 59);
    doc.text("Descrição Detalhada:", 22, y);
    
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);
    const descricaoQuebrada = doc.splitTextToSize(orc.descricao || "Nenhuma observação adicional informada.", 165);
    doc.text(descricaoQuebrada, 22, y);

    // Calcula dinamicamente o pulo de linha com base no tamanho da descrição
    y += (descricaoQuebrada.length * 6) + 15;

    // 4. SEÇÃO: DEMONSTRATIVO DE VALORES (Formato de Tabela Clara)
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(12);
    doc.text("3. DEMONSTRATIVO DE VALORES", 20, y);

    y += 6;
    // Linha topo da tabela
    doc.setDrawColor(241, 245, 249); // slate-100
    doc.line(20, y, 190, y);

    // Item Material
    y += 8;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);
    doc.setFontSize(11);
    doc.text("Custos de Insumos e Materiais", 22, y);
    doc.text(`R$ ${(Number(orc.material) || 0).toFixed(2).replace('.', ',')}`, 190, y, { align: "right" });
    
    y += 4;
    doc.line(20, y, 190, y);

    // Item Serviço
    y += 8;
    doc.text("Mão de Obra Especializada e Instalação", 22, y);
    doc.text(`R$ ${(Number(orc.servico) || 0).toFixed(2).replace('.', ',')}`, 190, y, { align: "right" });
    
    y += 4;
    doc.line(20, y, 190, y);

    // BLOCO TOTALIZADOR DESTACADO
    y += 6;
    doc.setFillColor(248, 250, 252); // slate-50 (fundo sutil)
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.roundedRect(20, y, 170, 16, 2, 2, "DF");

    y += 11;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 41, 59);
    doc.text("VALOR TOTAL DO INVESTIMENTO", 25, y);
    
    doc.setTextColor(37, 99, 235); // azul forte comercial
    doc.setFontSize(13);
    doc.text(`R$ ${(Number(orc.total) || 0).toFixed(2).replace('.', ',')}`, 185, y, { align: "right" });

    // 5. RODAPÉ FIXO NO FINAL DA PÁGINA
    doc.setDrawColor(241, 245, 249);
    doc.line(20, 272, 190, 272);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(148, 163, 184);
    doc.setFontSize(8.5);
    doc.text("Este documento é uma estimativa de valores válida por 15 dias a contar da data de emissão.", 105, 279, { align: "center" });
    doc.text("Bassani Móveis • Qualidade, pontualidade e sofisticação sob medida.", 105, 284, { align: "center" });

    // Salva o arquivo final limpo de espaços desnecessários no nome
    const nomeArquivo = orc.nome.toLowerCase().replace(/\s+/g, "_");
    doc.save(`orcamento_${nomeArquivo}.pdf`);
  };

  const formatarMoeda = (valor) => {
    return (Number(valor) || 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-800 antialiased p-4 md:p-8">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        
        {/* CABEÇALHO DA TELA */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              Painel de Orçamentos
            </h1>
            <p className="text-slate-400 text-sm mt-0.5">
              Gerencie, filtre e emita relatórios em PDF para os seus clientes.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => navigate("/home")}
              className="bg-white hover:bg-slate-50 transition border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/xl" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
              Voltar
            </button>

            <button
              onClick={() => navigate("/criarOrc")}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-xl text-sm shadow-md shadow-blue-500/10 transition flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="14"/><line x1="5" y1="12" x2="14" y2="12"/></svg>
              Novo Orçamento
            </button>
          </div>
        </div>

        {/* BARRA DE PESQUISA */}
        {orcamentos.length > 0 && (
          <div className="relative w-full max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </span>
            <input
              type="text"
              placeholder="Buscar orçamento pelo nome do cliente..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full p-2.5 pl-10 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition text-sm text-slate-800"
            />
          </div>
        )}

        {/* LISTAGEM DOS CARDS */}
        {orcamentosFiltrados.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm max-w-xl mx-auto mt-6">
            <div className="w-12 h-12 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center mx-auto mb-4 border border-slate-200/60">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <h2 className="text-lg font-bold text-slate-800">
              {orcamentos.length === 0 ? "Nenhum orçamento gravado" : "Nenhum resultado encontrado"}
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              {orcamentos.length === 0 
                ? "Gere e salve seu primeiro orçamento na plataforma corporativa." 
                : "Verifique os termos digitados ou limpe o filtro de busca."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {orcamentosFiltrados.map((orc) => (
              <div
                key={orc.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-200 group relative overflow-hidden"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {orc.nome}
                      </h2>
                      <p className="text-xs text-slate-400 font-medium mt-0.5 flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        {orc.telefone}
                      </p>
                    </div>
                    <span className="inline-flex px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200 shrink-0">
                      {orc.tipo}
                    </span>
                  </div>

                  <div className="mt-4 bg-slate-50 border border-slate-150 rounded-xl p-3.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Especificações
                    </span>
                    <p className="text-xs text-slate-600 whitespace-pre-line leading-relaxed line-clamp-3">
                      {orc.descricao || "Sem observações adicionais gravadas."}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100">
                  <div className="grid grid-cols-3 gap-2 text-center mb-4">
                    <div className="bg-slate-50/60 border border-slate-200/60 p-2 rounded-lg">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Material</span>
                      <span className="text-xs font-semibold text-slate-700 mt-0.5 block">{formatarMoeda(orc.material)}</span>
                    </div>
                    <div className="bg-slate-50/60 border border-slate-200/60 p-2 rounded-lg">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Serviço</span>
                      <span className="text-xs font-semibold text-slate-700 mt-0.5 block">{formatarMoeda(orc.servico)}</span>
                    </div>
                    <div className="bg-blue-50/50 border border-blue-100 p-2 rounded-lg">
                      <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider block">Total</span>
                      <span className="text-xs font-bold text-blue-600 mt-0.5 block">{formatarMoeda(orc.total)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => gerarPDF(orc)}
                      className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold py-2 px-4 rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V15"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      Baixar PDF
                    </button>

                    <button
                      onClick={() => excluirOrcamento(orc.id)}
                      className="bg-white hover:bg-red-50 text-slate-400 hover:text-red-600 border border-slate-200 hover:border-red-200 font-medium py-2 px-4 rounded-xl text-xs transition flex items-center justify-center gap-1.5"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                      Excluir
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default ListaOrc;