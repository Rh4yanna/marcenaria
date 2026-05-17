import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { API_URL } from "../services/api";

function Contato() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const [perfilPublico, setPerfilPublico] = useState({
    titulo: "",
    subtitulo: "",
    banner: "",
    whatsapp: "",
    telefone: "",
    email: "",
    instagram: "",
    instagram_link: "",
  });

  const irPara = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const MenuItem = ({ label, path }) => (
    <button
      onClick={() => irPara(path)}
      className="
        w-full
        text-left
        p-4
        rounded-2xl
        hover:bg-blue-50
        transition
        border
        border-transparent
        hover:border-blue-100
      "
    >
      <h3 className="font-semibold text-gray-800">{label}</h3>
    </button>
  );

  useEffect(() => {
    buscarPerfil();
  }, []);

  const buscarPerfil = async () => {
    try {
      const res = await fetch(`${API_URL}/perfil`);
      const data = await res.json();

      if (data) {
        setPerfilPublico(data);
      }
    } catch (err) {
      console.log("Erro perfil:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-blue-50">

      {/* HEADER */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="
              w-12 h-12
              rounded-2xl
              bg-gray-100
              hover:bg-blue-50
              flex flex-col
              items-center justify-center gap-1
            "
          >
            <span className="w-5 h-0.5 bg-gray-700"></span>
            <span className="w-5 h-0.5 bg-gray-700"></span>
            <span className="w-5 h-0.5 bg-gray-700"></span>
          </button>

          <div className="flex items-center gap-4">
            <img
              src={logo}
              alt=""
              className="w-14 h-14 rounded-2xl object-cover border-2 border-blue-100 shadow-md"
            />

            <div>
              <h1 className="text-xl font-bold">Marcio Bassani</h1>
              <p className="text-sm text-gray-500">Entre em Contato</p>
            </div>
          </div>

          <div className="w-12"></div>
        </div>
      </header>

      {/* MENU */}
      {menuOpen && (
        <>
          <div
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-black/20 z-40"
          />

          <div className="fixed left-0 top-0 w-72 h-full bg-white z-50 p-6 shadow-2xl">

            <div className="flex items-center gap-3 mb-8">
              <img src={logo} className="w-14 h-14 rounded-2xl" />

              <div>
                <h2 className="font-bold">Marcio Bassani</h2>
                <p className="text-gray-500 text-sm">Navegação</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <MenuItem label="Início" path="/principal" />
              <MenuItem label="Portfólio" path="/portfolio" />
              <MenuItem label="Contato" path="/contato" />
            </div>

          </div>
        </>
      )}

      {/* BANNER */}
        <section className="relative w-full bg-black flex justify-center items-center">
            <img
                src={perfilPublico.banner}
                alt="Banner"
                className="
                w-full
                max-h-[450px]
                object-contain
                "
            />
        </section>

      {/* BOTÃO VOLTAR */}
      <div className="max-w-6xl mx-auto px-6 mt-10">
        <button
          onClick={() => navigate("/principal")}
          className="
            bg-white
            px-6
            py-4
            rounded-2xl
            shadow-md
            hover:bg-gray-100
            transition
          "
        >
          Voltar
        </button>
      </div>

      {/* TÍTULO */}
      <div className="text-center mt-10">
        <h2 className="text-4xl font-bold">Entre em contato</h2>
      </div>

      {/* CONTATO */}
      <section className="max-w-3xl mx-auto px-6 mt-10 space-y-6">

        {/* WHATSAPP */}
        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center justify-between">
          <a
            href={perfilPublico.whatsapp}
            target="_blank"
            rel="noreferrer"
          >
            <button className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600">
              WhatsApp
            </button>
          </a>

          <span className="text-gray-700 font-medium">
            {perfilPublico.telefone}
          </span>
        </div>

        {/* EMAIL */}
        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center justify-between">
          <span className="font-medium text-gray-700">Email</span>
          <span className="text-gray-700">{perfilPublico.email}</span>
        </div>

        {/* INSTAGRAM */}
        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center justify-between">
          <a
            href={perfilPublico.instagram_link}
            target="_blank"
            rel="noreferrer"
          >
            <button className="bg-pink-500 text-white px-6 py-3 rounded-xl hover:bg-pink-600">
              Instagram
            </button>
          </a>

          <span className="text-gray-700 font-medium">
            {perfilPublico.instagram}
          </span>
        </div>

      </section>

      <div className="h-20"></div>

    </div>
  );
}

export default Contato;