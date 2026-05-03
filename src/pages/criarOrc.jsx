import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../services/api"; 

function CriarOrc() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [mensagem, setMensagem] = useState("");
  const [tipoMsg, setTipoMsg] = useState(""); // success | error

  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    tipo: "",
    descricao: "",
    material: "",
    servico: "",
    total: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    const newForm = {
      ...form,
      [name]: value,
    };

    const material = parseFloat(newForm.material) || 0;
    const servico = parseFloat(newForm.servico) || 0;

    newForm.total = material + servico;

    setForm(newForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/orcamentos`, { // ✅ CORRIGIDO
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      let data = null;
      try {
        data = await res.json();
      } catch {}

      if (res.ok) {
        setTipoMsg("success");
        setMensagem("Orçamento salvo com sucesso!");

        // limpa form
        setForm({
          nome: "",
          telefone: "",
          tipo: "",
          descricao: "",
          material: "",
          servico: "",
          total: 0,
        });
      } else {
        setTipoMsg("error");
        setMensagem(data?.message || "Erro ao salvar");
      }
    } catch (err) {
      setTipoMsg("error");
      setMensagem("Erro ao conectar com servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      {/* POPUP */}
      {mensagem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-80 text-center">
            <p
              className={`mb-4 font-semibold ${
                tipoMsg === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {mensagem}
            </p>

            <div className="flex gap-2 justify-center">
              <button
                onClick={() => setMensagem("")}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Fechar
              </button>

              <button
                onClick={() => navigate("/listaOrc")}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg"
              >
                Ver lista de orçamentos
              </button>
            </div>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-2xl p-8 rounded-2xl shadow-lg flex flex-col gap-4"
      >
        <button
          type="button"
          onClick={() => navigate("/home")}
          className="mb-2 text-white bg-gray-800 px-4 py-2 rounded-lg"
        >
          ← Voltar
        </button>

        <h2 className="text-2xl font-bold text-gray-800">Criar Orçamento</h2>

        <input
          type="text"
          name="nome"
          placeholder="Nome do cliente"
          value={form.nome}
          onChange={handleChange}
          className="p-3 border rounded-lg"
          required
        />

        <input
          type="text"
          name="telefone"
          placeholder="Telefone"
          value={form.telefone}
          onChange={handleChange}
          className="p-3 border rounded-lg"
          required
        />

        <select
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          className="p-3 border rounded-lg"
          required
        >
          <option value="">Tipo de móvel</option>
          <option value="Cozinha">Cozinha</option>
          <option value="Mesa">Mesa</option>
          <option value="Guarda-roupa">Guarda-roupa</option>
          <option value="Painel">Painel</option>
          <option value="Outro">Outro</option>
        </select>

        <textarea
          name="descricao"
          placeholder="Descrição do Material
- Medidas (altura, largura, profundidade) 
- Material (MDF, madeira, etc) 
- Cor 
- Detalhes adicionais"
          value={form.descricao}
          onChange={handleChange}
          className="p-3 border rounded-lg resize-y min-h-[120px]"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="material"
            placeholder="Valor do Material"
            value={form.material}
            onChange={handleChange}
            className="p-3 border rounded-lg"
          />

          <input
            type="number"
            name="servico"
            placeholder="Valor do Serviço"
            value={form.servico}
            onChange={handleChange}
            className="p-3 border rounded-lg"
          />
        </div>

        <div className="bg-gray-100 p-4 rounded-lg flex justify-between">
          <span>Total:</span>
          <span className="font-bold text-green-600">
            R$ {form.total.toFixed(2)}
          </span>
        </div>

        {/* BOTÕES */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-orange-600 text-white py-3 rounded-lg"
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/listaOrc")}
            className="flex-1 bg-gray-700 text-white py-3 rounded-lg"
          >
            Ver lista de orçamentos
          </button>
        </div>
      </form>
    </div>
  );
}

export default CriarOrc;