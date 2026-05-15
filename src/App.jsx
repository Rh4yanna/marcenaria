import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./services/api";

function App() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  // se já estiver logado
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/home");
    }
  }, []);

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

        body: JSON.stringify({
          email,
          senha,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // salva token
        localStorage.setItem(
          "token",
          data.token
        );

        // salva usuário
        localStorage.setItem(
          "usuario",
          JSON.stringify(data.usuario)
        );

        navigate("/home");

      } else {

        alert(
          data.message || "Erro ao fazer login"
        );

      }

    } catch (err) {

      console.log(err);

      alert(
        "Erro ao conectar ao servidor"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 bg-[url('https://images.unsplash.com/photo-1581090700227-4c4c9b5e6c8a')] bg-cover bg-center">

      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4"
        >

          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            onChange={(e)=>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            required
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            onChange={(e)=>
              setSenha(e.target.value)
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition duration-300"
          >

            {loading
              ? "Entrando..."
              : "Entrar"}

          </button>

          <p className="text-sm text-center text-gray-600 hover:text-orange-600 cursor-pointer">
            Esqueceu a senha?
          </p>

        </form>
      </div>
    </div>
  );
}

export default App;