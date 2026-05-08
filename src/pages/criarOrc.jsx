import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../services/api";

function CriarOrc() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [tipoMsg, setTipoMsg] = useState("");

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
      const res = await fetch(`${API_URL}/orcamentos`, {
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
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-blue-50 flex justify-center items-center p-6">
      
      {/* POPUP */}
      {mensagem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-3xl shadow-2xl w-80 text-center border border-gray-100">
            <p
              className={`mb-5 font-semibold text-lg ${
                tipoMsg === "success"
                  ? "text-emerald-600"
                  : "text-red-500"
              }`}
            >
              {mensagem}
            </p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setMensagem("")}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 transition rounded-xl"
              >
                Fechar
              </button>

              <button
                onClick={() => navigate("/listaOrc")}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 transition text-white rounded-xl"
              >
                Ver Orçamentos
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-4xl">

        {/* TOPO */}
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => navigate("/home")}
            className="bg-white hover:bg-gray-100 transition border border-gray-200 text-gray-700 px-5 py-3 rounded-2xl shadow-sm"
          >
            ← Voltar
          </button>

          <button
            type="button"
            onClick={() => navigate("/listaOrc")}
            className="bg-blue-500 hover:bg-blue-600 transition text-white px-5 py-3 rounded-2xl shadow-md"
          >
            Ver Orçamentos
          </button>
        </div>

        {/* CARD */}
        <div className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-2xl rounded-[32px] p-8 md:p-10">

          {/* TITULO */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800">
              Criar Orçamento
            </h1>

            <p className="text-gray-500 mt-2">
              Preencha as informações do projeto para gerar um novo orçamento.
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
          >

            {/* CLIENTE */}
            <div className="grid md:grid-cols-2 gap-5">

              <div>
                <label className="text-sm text-gray-600 font-medium mb-2 block">
                  Nome do cliente
                </label>

                <input
                  type="text"
                  name="nome"
                  placeholder="Digite o nome do cliente"
                  value={form.nome}
                  onChange={handleChange}
                  className="w-full p-4 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 font-medium mb-2 block">
                  Telefone
                </label>

                <input
                  type="text"
                  name="telefone"
                  placeholder="(00) 00000-0000"
                  value={form.telefone}
                  onChange={handleChange}
                  className="w-full p-4 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
              </div>

            </div>

            {/* TIPO */}
            <div>
              <label className="text-sm text-gray-600 font-medium mb-2 block">
                Tipo de móvel
              </label>

              <select
                name="tipo"
                value={form.tipo}
                onChange={handleChange}
                className="w-full p-4 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              >
                <option value="">Selecione o tipo</option>

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
            </div>

            {/* DESCRIÇÃO */}
            <div>
              <label className="text-sm text-gray-600 font-medium mb-2 block">
                Descrição do projeto
              </label>

              <textarea
                name="descricao"
                placeholder="• Medidas (altura, largura e profundidade)
• Material (MDF, madeira etc.)
• Cor
• Detalhes adicionais"
                value={form.descricao}
                onChange={handleChange}
                className="w-full p-4 rounded-2xl border border-gray-200 bg-gray-50 resize-none min-h-[180px] focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* VALORES */}
            <div className="grid md:grid-cols-2 gap-5">

              <div>
                <label className="text-sm text-gray-600 font-medium mb-2 block">
                  Valor do material
                </label>

                <input
                  type="number"
                  name="material"
                  placeholder="R$ 0,00"
                  value={form.material}
                  onChange={handleChange}
                  className="w-full p-4 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 font-medium mb-2 block">
                  Valor do serviço
                </label>

                <input
                  type="number"
                  name="servico"
                  placeholder="R$ 0,00"
                  value={form.servico}
                  onChange={handleChange}
                  className="w-full p-4 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

            </div>

            {/* TOTAL */}
            <div className="bg-gradient-to-r from-blue-50 to-gray-50 border border-blue-100 p-6 rounded-3xl flex items-center justify-between shadow-sm">
              <div>
                <p className="text-gray-500 text-sm">
                  Valor total do orçamento
                </p>

                <h2 className="text-3xl font-bold text-gray-800 mt-1">
                  R$ {form.total.toFixed(2)}
                </h2>
              </div>

              <div className="bg-blue-100 text-blue-600 px-4 py-2 rounded-2xl text-sm font-semibold">
                Atualizado automaticamente
              </div>
            </div>

          </form>
        </div>

        {/* BOTÕES FORA DO FORM */}
        <div className="flex flex-col md:flex-row gap-4 mt-6">

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 bg-blue-500 hover:bg-blue-600 transition text-white py-4 rounded-2xl shadow-lg font-semibold text-lg disabled:opacity-50"
          >
            {loading ? "Salvando..." : "Salvar Orçamento"}
          </button>

          <button
            onClick={() => navigate("/listaOrc")}
            className="flex-1 bg-white border border-gray-200 hover:bg-gray-100 transition text-gray-700 py-4 rounded-2xl shadow-sm font-semibold text-lg"
          >
            Ver Lista de Orçamentos
          </button>

        </div>
      </div>
    </div>
  );
}

export default CriarOrc;