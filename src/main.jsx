import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import App from "./App.jsx";

// ÁREA ADMIN
import Home from "./pages/home.jsx";

import CriarOrc from "./pages/criarOrc.jsx";
import ListaOrc from "./pages/listaOrc.jsx";

import GerenciarProj from "./pages/gerenciarProj.jsx";
import ControleProj from "./pages/controleProj.jsx";
import EditarProj from "./pages/editarProj.jsx";
import AdicionarProj from "./pages/adicionarProj.jsx";
import GerenciarPerfil from "./pages/gerenciarPerfil.jsx";

import PrivateRoute from "./PrivateRoute.jsx";

// PÁGINAS PÚBLICAS
import Principal from "./pagespub/principal.jsx";
import Portfolio from "./pagespub/portifolio.jsx";
import Projetos from "./pagespub/projetos.jsx";
import DetalheProj from "./pagespub/detalheProj.jsx";
import Contato from "./pagespub/contato.jsx";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";


// verifica token
const isAuth = () => {
  const token = localStorage.getItem("token");

  return (
    token &&
    token !== "undefined" &&
    token !== "null"
  );
};

const router = createBrowserRouter([

  // página inicial
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },

  // LOGIN
  {
    path: "/login",
    element: isAuth()
      ? <Navigate to="/home" replace />
      : <App />,
  },

  // ====================
  // ÁREA ADMIN
  // ====================

  {
    path: "/home",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },

  {
    path: "/criarOrc",
    element: (
      <PrivateRoute>
        <CriarOrc />
      </PrivateRoute>
    ),
  },

  {
    path: "/listaOrc",
    element: (
      <PrivateRoute>
        <ListaOrc />
      </PrivateRoute>
    ),
  },

  {
    path: "/gerenciarProj",
    element: (
      <PrivateRoute>
        <GerenciarProj />
      </PrivateRoute>
    ),
  },

  {
    path: "/controleProj",
    element: (
      <PrivateRoute>
        <ControleProj />
      </PrivateRoute>
    ),
  },

  {
    path: "/editarProj",
    element: (
      <PrivateRoute>
        <EditarProj />
      </PrivateRoute>
    ),
  },

  {
    path: "/adicionarProj",
    element: (
      <PrivateRoute>
        <AdicionarProj />
      </PrivateRoute>
    ),
  },

  {
    path: "/gerenciarPerfil",
    element: (
      <PrivateRoute>
        <GerenciarPerfil />
      </PrivateRoute>
    ),
  },

  // ====================
  // PÁGINAS PÚBLICAS
  // ====================

  {
    path: "/principal",
    element: <Principal />,
  },

  {
    path: "/portfolio",
    element: <Portfolio />,
  },

  {
    path: "/projetos",
    element: <Projetos />,
  },

  {
    path: "/detalhesProj",
    element: <DetalheProj />,
  },

  {
    path: "/contato",
    element: <Contato />,
  },

  // rota inexistente
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  }

]);

createRoot(
  document.getElementById("root")
).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
);