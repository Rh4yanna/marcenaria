import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

function ListaOrc() {
  const [orcamentos, setOrcamentos] = useState([]);
  const navigate = useNavigate();

  // 🔄 BUSCAR DADOS
  useEffect(() => {
    fetch("http://localhost:3000/orcamentos")
      .then((res) => res.json())
      .then((data) => {
        console.log("📦 Dados recebidos:", data);
        setOrcamentos(data);
      })
      .catch((err) => {
        console.log("❌ Erro ao buscar:", err);
      });
  }, []);

  // 🗑️ EXCLUIR COM VERIFICAÇÃO REAL
  const excluirOrcamento = async (id) => {
    const confirmar = window.confirm("Deseja excluir este orçamento?");
    if (!confirmar) return;

    try {
      console.log("🔵 Enviando DELETE:", id);

      const res = await fetch(`http://localhost:3000/orcamentos/${id}`, {
        method: "DELETE",
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      console.log("🟢 RESPOSTA:", res.status, data);

      if (res.ok) {
        // 🔥 Só remove da tela se backend confirmou
        setOrcamentos((prev) => prev.filter((orc) => orc.id !== id));
      } else {
        alert(data?.message || "Erro ao excluir");
      }
    } catch (err) {
      console.log("❌ ERRO:", err);
      alert("Erro ao conectar com servidor");
    }
  };

  // 📄 GERAR PDF
  const gerarPDF = (orc) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Orçamento", 20, 20);

    doc.setFontSize(12);
    doc.text(`Cliente: ${orc.nome}`, 20, 40);
    doc.text(`Telefone: ${orc.telefone}`, 20, 50);

    doc.text(`Tipo do móvel: ${orc.tipo}`, 20, 60);

    doc.text("Descrição do móvel:", 20, 80);
    doc.text(orc.descricao || "-", 20, 90);

    doc.text(`Valor dos Materiais: R$ ${orc.material}`, 20, 120);
    doc.text(`Valor do Serviço: R$ ${orc.servico}`, 20, 130);

    doc.setFontSize(12);
    doc.text(`Total: R$ ${orc.total}`, 20, 150);

    doc.save(`orcamento_${orc.nome}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        {/* 🔙 VOLTAR */}
        <button
          onClick={() => navigate("/home")}
          className="mb-4 text-white bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-900"
        >
          ← Voltar
        </button>

        <h2 className="text-2xl font-bold mb-6">Lista de Orçamentos</h2>

        {orcamentos.length === 0 ? (
          <p className="text-gray-500">Nenhum orçamento encontrado.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {orcamentos.map((orc) => (
              <div
                key={orc.id}
                className="bg-white p-5 rounded-xl shadow-md border border-gray-100"
              >
                <h3 className="font-bold text-lg text-gray-800">{orc.nome}</h3>

                <p>
                  <strong>Telefone:</strong> {orc.telefone}
                </p>
                <p>
                  <strong>Tipo:</strong> {orc.tipo}
                </p>

                <p className="whitespace-pre-line mt-2">
                  <strong>Descrição:</strong> {orc.descricao}
                </p>

                <p className="mt-2">
                  <strong>Material:</strong> R$ {orc.material}
                </p>

                <p>
                  <strong>Serviço:</strong> R$ {orc.servico}
                </p>

                <p className="text-green-600 font-bold mt-3 text-lg">
                  Total: R$ {orc.total}
                </p>

                {/* 🔥 BOTÕES */}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => gerarPDF(orc)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    📄 PDF
                  </button>

                  <button
                    onClick={() => excluirOrcamento(orc.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    🗑️ Excluir
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
