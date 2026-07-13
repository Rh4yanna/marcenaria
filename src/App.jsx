import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./services/api";
import loginBg from "./assets/login.jpg";

function App() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  // Se já estiver logado
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        navigate("/home");
      } else {
        alert(data.message || "Erro ao fazer login");
      }
    } catch (err) {
      console.log(err);
      alert("Erro ao conectar ao servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center p-4 antialiased"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      {/* Camada escura / Overlay de contraste moderno */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"></div>

      {/* Card de Login Profissional */}
      <div className="relative bg-white border border-slate-200/80 rounded-2xl shadow-2xl w-full max-w-md p-8 md:p-10 flex flex-col gap-6 transition-all">
        
        {/* Identificação / Boas-vindas */}
        <div className="text-center">
          <h2 className="text-2xl font-black tracking-tight text-slate-900">
            Login 
          </h2>
        </div>

        {/* Formulário estruturado */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          
          {/* CAMPO: EMAIL */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Endereço de E-mail
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="Digite seu email"
                value={email}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition font-medium"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* CAMPO: SENHA */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Sua Senha
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition font-medium"
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
          </div>

          {/* ESQUECEU A SENHA */}
          <div className="flex justify-end -mt-2">
            <button 
              type="button"
              className="text-xs font-semibold text-slate-400 hover:text-blue-500 transition"
              onClick={() => alert("Entre em contato com o administrador do sistema para redefinir sua senha.")}
            >
              Esqueceu a senha?
            </button>
          </div>

          {/* BOTÃO DE SUBMIT COM SPINNER DE CARREGAMENTO */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold py-3.5 rounded-xl shadow-md shadow-blue-500/10 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Autenticando...
              </>
            ) : (
              "Acessar Sistema"
            )}
          </button>
        </form>

        {/* Rodapé institucional discreto */}
        <div className="text-center pt-2 border-t border-slate-100">
          <p className="text-[11px] text-slate-400 font-medium">
            Marcio Bassani Móveis Planejados 
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;