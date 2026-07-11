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
    if (e) e.preventDefault();

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
        setMensagem(data?.message || "Erro ao salvar o orçamento");
      }
    } catch (err) {
      setTipoMsg("error");
      setMensagem("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-800 antialiased flex flex-col items-center justify-start p-4 md:p-8">
      
      {/* POPUP DE NOTIFICAÇÃO */}
      {mensagem && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-900/40 z-50 backdrop-blur-sm p-4">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm text-center border border-slate-200 animation-fade-in">
            <div className={`w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-4 ${
              tipoMsg === "success" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
            }`}>
              {tipoMsg === "success" ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              )}
            </div>
            
            <p className="mb-6 font-bold text-lg text-slate-800">
              {mensagem}
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setMensagem("")}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition rounded-xl text-sm border border-slate-200"
              >
                Fechar
              </button>

              <button
                type="button"
                onClick={() => navigate("/listaOrc")}
                className="px-4 py-2.5 bg-blue-500 hover:bg-blue-600 font-medium transition text-white rounded-xl text-sm shadow-sm"
              >
                Ver Lista
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-3xl">
        
        {/* BOTÃO VOLTAR */}
        <div className="mb-5 flex justify-start">
          <button
            type="button"
            onClick={() => navigate("/home")}
            className="bg-white hover:bg-slate-50 transition border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Voltar para o Início
          </button>
        </div>

        {/* CONTAINER DO FORMULÁRIO */}
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 md:p-8 flex flex-col gap-6">
          
          {/* CABEÇALHO */}
          <div className="border-b border-slate-100 pb-4">
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              Criar Novo Orçamento
            </h1>
            <p className="text-slate-400 text-sm mt-0.5">Preencha os dados abaixo para calcular e registrar os valores.</p>
          </div>

          {/* DADOS DO CLIENTE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Nome do Cliente
              </label>
              <input
                type="text"
                name="nome"
                placeholder="Ex: João Silva"
                value={form.nome}
                onChange={handleChange}
                className="w-full p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition text-sm text-slate-800"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Telefone de Contato
              </label>
              <input
                type="text"
                name="telefone"
                placeholder="Ex: (42) 99999-9999"
                value={form.telefone}
                onChange={handleChange}
                className="w-full p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition text-sm text-slate-800"
                required
              />
            </div>
          </div>

          {/* SELEÇÃO DO TIPO DE MÓVEL */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Tipo de Móvel
            </label>
            <div className="relative">
              <select
                name="tipo"
                value={form.tipo}
                onChange={handleChange}
                className="w-full p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition text-sm text-slate-800 appearance-none cursor-pointer"
                required
              >
                <option value="">Selecione uma opção profissional</option>
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
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
            </div>
          </div>

          {/* DESCRIÇÃO DO PROJETO */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Descrição Detalhada do Projeto
            </label>
            <textarea
              name="descricao"
              placeholder="Especifique as medidas (A x L x P), padrões de MDF, cores, ferragens e particularidades do projeto..."
              value={form.descricao}
              onChange={handleChange}
              className="w-full p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition text-sm text-slate-800 resize-none min-h-[140px]"
            />
          </div>

          {/* ENTRADAS DE PREÇO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100 pt-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Custo de Material (R$)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-sm font-semibold text-slate-400 pointer-events-none">R$</span>
                <input
                  type="number"
                  step="0.01"
                  name="material"
                  placeholder="0,00"
                  value={form.material}
                  onChange={handleChange}
                  className="w-full p-3.5 pl-10 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition text-sm text-slate-800 font-medium"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Mão de Obra / Serviço (R$)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-sm font-semibold text-slate-400 pointer-events-none">R$</span>
                <input
                  type="number"
                  step="0.01"
                  name="servico"
                  placeholder="0,00"
                  value={form.servico}
                  onChange={handleChange}
                  className="w-full p-3.5 pl-10 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition text-sm text-slate-800 font-medium"
                />
              </div>
            </div>
          </div>

          {/* DISPLAY DO VALOR TOTAL */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 border border-slate-800 p-5 rounded-xl flex items-center justify-between text-white shadow-inner mt-2">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Valor Bruto Calculado
              </p>
              <h2 className="text-3xl font-black mt-1 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-blue-200">
                R$ {form.total.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h2>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
          </div>

          {/* BOTÕES DE AÇÃO INTEGRADOS AO FORM */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 order-1 sm:order-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3.5 px-6 rounded-xl text-base shadow-md shadow-blue-500/10 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Salvando dados...
                </>
              ) : (
                "Salvar Orçamento"
              )}
            </button>

            <button
              type="button"
              onClick={() => navigate("/listaOrc")}
              className="flex-1 order-2 sm:order-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold py-3.5 px-6 rounded-xl text-base transition text-center"
            >
              Ver Orçamentos
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default CriarOrc;