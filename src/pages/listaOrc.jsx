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
        console.log("Dados recebidos:", data);
        setOrcamentos(data);
      })
      .catch((err) => {
        console.log("Erro ao buscar:", err);
      });
  }, []);

  // EXCLUIR
  const excluirOrcamento = async (id) => {
    const confirmar = window.confirm("Deseja excluir este orçamento?");
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
        setOrcamentos((prev) => prev.filter((orc) => orc.id !== id));
      } else {
        alert(data?.message || "Erro ao excluir");
      }
    } catch (err) {
      console.log(err);
      alert("Erro ao conectar com servidor");
    }
  };

  // PDF
  const gerarPDF = (orc) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Orçamento", 20, 20);

    doc.setFontSize(12);
    doc.text(`Cliente: ${orc.nome}`, 20, 40);
    doc.text(`Telefone: ${orc.telefone}`, 20, 50);
    doc.text(`Tipo do móvel: ${orc.tipo}`, 20, 60);

    doc.text("Descrição:", 20, 80);
    doc.text(orc.descricao || "-", 20, 90);

    doc.text(`Material: R$ ${orc.material}`, 20, 120);
    doc.text(`Serviço: R$ ${orc.servico}`, 20, 130);

    doc.setFontSize(14);
    doc.text(`Total: R$ ${orc.total}`, 20, 150);

    doc.save(`orcamento_${orc.nome}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">

        <button
          onClick={() => navigate("/home")}
          className="mb-4 bg-gray-800 text-white px-4 py-2 rounded-lg"
        >
          ← Voltar
        </button>

        <h2 className="text-2xl font-bold mb-6">
          Lista de Orçamentos
        </h2>

        {orcamentos.length === 0 ? (
          <p>Nenhum orçamento encontrado.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {orcamentos.map((orc) => (
              <div
                key={orc.id}
                className="bg-white p-5 rounded-xl shadow"
              >
                <h3 className="font-bold text-lg">{orc.nome}</h3>

                <p><strong>Telefone:</strong> {orc.telefone}</p>
                <p><strong>Tipo:</strong> {orc.tipo}</p>

                <p className="mt-2 whitespace-pre-line">
                  <strong>Descrição:</strong> {orc.descricao}
                </p>

                <p className="mt-2">
                  <strong>Material:</strong> R$ {orc.material}
                </p>

                <p>
                  <strong>Serviço:</strong> R$ {orc.servico}
                </p>

                <p className="text-green-600 font-bold mt-3">
                  Total: R$ {orc.total}
                </p>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => gerarPDF(orc)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    PDF
                  </button>

                  <button
                    onClick={() => excluirOrcamento(orc.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
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