import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import { API_URL } from "../services/api";

function ListaOrc() {
  const [orcamentos, setOrcamentos] = useState([]);
  const navigate = useNavigate();

  // BUSCAR DADOS
  useEffect(() => {
    fetch(`${API_URL}/orcamentos`)
      .then((res) => res.json())
      .then((data) => {
        // MAIS RECENTES PRIMEIRO
        const ordenados = [...data].sort((a, b) => b.id - a.id);

        setOrcamentos(ordenados);
      })
      .catch((err) => {
        console.log("Erro ao buscar:", err);
      });
  }, []);

  // EXCLUIR
  const excluirOrcamento = async (id) => {
    const confirmar = window.confirm(
      "Deseja excluir este orçamento?"
    );

    if (!confirmar) return;

    try {
      const res = await fetch(`${API_URL}/orcamentos/${id}`, {
        method: "DELETE",
      });

      let data;

      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (res.ok) {
        setOrcamentos((prev) =>
          prev.filter((orc) => orc.id !== id)
        );
      } else {
        alert(data?.message || "Erro ao excluir");
      }
    } catch (err) {
      console.log(err);
      alert("Erro ao conectar com servidor");
    }
  };

  // GERAR PDF
  const gerarPDF = (orc) => {
    const doc = new jsPDF();

    // DATA DO ORÇAMENTO
    const dataOrcamento = orc.createdAt
      ? new Date(orc.createdAt)
      : new Date();

    const dataFormatada =
      dataOrcamento.toLocaleDateString("pt-BR");

    const horaFormatada =
      dataOrcamento.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });

    // HEADER
    doc.setFillColor(239, 246, 255);
    doc.rect(0, 0, 210, 40, "F");

    doc.setFont("helvetica", "bold");
    doc.setTextColor(31, 41, 55);
    doc.setFontSize(24);

    doc.text("Bassani Móveis", 105, 20, {
      align: "center",
    });

    doc.setFontSize(13);
    doc.setTextColor(107, 114, 128);

    doc.text("Orçamento Personalizado", 105, 29, {
      align: "center",
    });

    // DATA
    doc.setFontSize(10);

    doc.text(
      `Criado em ${dataFormatada} às ${horaFormatada}`,
      105,
      36,
      {
        align: "center",
      }
    );

    // CARD PRINCIPAL
    doc.setDrawColor(220, 220, 220);
    doc.roundedRect(15, 50, 180, 180, 6, 6);

    let y = 65;

    // CLIENTE
    doc.setFont("helvetica", "bold");
    doc.setTextColor(59, 130, 246);
    doc.setFontSize(13);

    doc.text("Informações do Cliente", 20, y);

    y += 12;

    doc.setFont("helvetica", "normal");
    doc.setTextColor(55, 65, 81);
    doc.setFontSize(12);

    doc.text(`Nome: ${orc.nome}`, 20, y);

    y += 10;

    doc.text(`Telefone: ${orc.telefone}`, 20, y);

    y += 18;

    // TIPO DO MÓVEL
    doc.setFont("helvetica", "bold");
    doc.setTextColor(59, 130, 246);

    doc.text("Tipo do Móvel", 20, y);

    y += 10;

    doc.setFont("helvetica", "normal");
    doc.setTextColor(55, 65, 81);

    doc.text(`${orc.tipo}`, 20, y);

    y += 18;

    // DESCRIÇÃO
    doc.setFont("helvetica", "bold");
    doc.setTextColor(59, 130, 246);

    doc.text("Descrição do Projeto", 20, y);

    y += 10;

    doc.setFont("helvetica", "normal");
    doc.setTextColor(55, 65, 81);

    const descricaoQuebrada = doc.splitTextToSize(
      orc.descricao || "-",
      165
    );

    doc.text(descricaoQuebrada, 20, y);

    y += descricaoQuebrada.length * 7 + 15;

    // VALORES
    doc.setFont("helvetica", "bold");
    doc.setTextColor(59, 130, 246);

    doc.text("Valores", 20, y);

    y += 12;

    doc.setFont("helvetica", "normal");
    doc.setTextColor(55, 65, 81);

    doc.text(`Material: R$ ${orc.material}`, 20, y);

    y += 10;

    doc.text(`Serviço: R$ ${orc.servico}`, 20, y);

    y += 18;

    // TOTAL
    doc.setFillColor(239, 246, 255);

    doc.roundedRect(20, y - 8, 170, 20, 4, 4, "F");

    doc.setFont("helvetica", "bold");
    doc.setTextColor(37, 99, 235);
    doc.setFontSize(16);

    doc.text(`Total: R$ ${orc.total}`, 25, y + 5);

    // FOOTER
    doc.setFontSize(10);
    doc.setTextColor(150);

    doc.text(
      "Bassani Móveis • Qualidade e sofisticação em móveis planejados",
      105,
      285,
      {
        align: "center",
      }
    );

    // SALVAR
    doc.save(`orcamento_${orc.nome}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-blue-50 p-6">
      <div className="max-w-5xl mx-auto">

        {/* TOPO */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Lista de Orçamentos
            </h1>

            <p className="text-gray-500 mt-2">
              Visualize, exporte e gerencie seus orçamentos.
            </p>
          </div>

          <div className="flex gap-3">

            <button
              onClick={() => navigate("/home")}
              className="bg-white border border-gray-200 hover:bg-gray-100 transition text-gray-700 px-5 py-3 rounded-2xl shadow-sm"
            >
              ← Voltar
            </button>

            <button
              onClick={() => navigate("/criarOrc")}
              className="bg-blue-500 hover:bg-blue-600 transition text-white px-5 py-3 rounded-2xl shadow-lg"
            >
              + Criar Orçamento
            </button>

          </div>
        </div>

        {/* LISTA */}
        {orcamentos.length === 0 ? (

          <div className="bg-white border border-gray-200 rounded-3xl p-12 text-center shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-700">
              Nenhum orçamento encontrado
            </h2>

            <p className="text-gray-500 mt-3">
              Crie seu primeiro orçamento para começar.
            </p>

            <button
              onClick={() => navigate("/criarOrc")}
              className="mt-6 bg-blue-500 hover:bg-blue-600 transition text-white px-6 py-3 rounded-2xl"
            >
              Criar Orçamento
            </button>
          </div>

        ) : (

          <div className="grid gap-6">

            {orcamentos.map((orc) => (

              <div
                key={orc.id}
                className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-[28px] shadow-lg p-6 hover:shadow-2xl transition"
              >

                {/* TOPO CARD */}
                <div className="flex flex-col gap-4">

                  {/* CLIENTE */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {orc.nome}
                    </h2>

                    <p className="text-gray-500 mt-1">
                      {orc.telefone}
                    </p>
                  </div>

                  {/* TIPO ABAIXO */}
                  <div className="bg-blue-100 text-blue-600 px-4 py-2 rounded-2xl text-sm font-semibold w-fit">
                    {orc.tipo}
                  </div>

                </div>

                {/* DESCRIÇÃO */}
                <div className="mt-6 bg-gray-50 border border-gray-100 rounded-2xl p-5">

                  <h3 className="font-semibold text-gray-700 mb-2">
                    Descrição do Projeto
                  </h3>

                  <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                    {orc.descricao || "Sem descrição"}
                  </p>

                </div>

                {/* VALORES */}
                <div className="grid md:grid-cols-3 gap-4 mt-6">

                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
                    <p className="text-gray-500 text-sm">
                      Material
                    </p>

                    <h3 className="text-xl font-bold text-gray-800 mt-1">
                      R$ {orc.material}
                    </h3>
                  </div>

                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
                    <p className="text-gray-500 text-sm">
                      Serviço
                    </p>

                    <h3 className="text-xl font-bold text-gray-800 mt-1">
                      R$ {orc.servico}
                    </h3>
                  </div>

                  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                    <p className="text-blue-500 text-sm">
                      Total
                    </p>

                    <h3 className="text-2xl font-bold text-blue-600 mt-1">
                      R$ {orc.total}
                    </h3>
                  </div>

                </div>

                {/* BOTÕES */}
                <div className="flex flex-col md:flex-row gap-3 mt-6">

                  <button
                    onClick={() => gerarPDF(orc)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 transition text-white py-3 rounded-2xl font-semibold shadow-md"
                  >
                    Gerar PDF
                  </button>

                  <button
                    onClick={() => excluirOrcamento(orc.id)}
                    className="flex-1 bg-red-50 hover:bg-red-100 transition text-red-500 border border-red-200 py-3 rounded-2xl font-semibold"
                  >
                    Excluir
                  </button>

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