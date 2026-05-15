import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import App from "./App.jsx";

import Home from "./pages/home.jsx";

import CriarOrc from "./pages/criarOrc.jsx";
import ListaOrc from "./pages/listaOrc.jsx";
import GerenciarProj from "./pages/gerenciarProj.jsx";
import ControleProj from "./pages/controleProj.jsx";
import EditarProj from "./pages/editarProj.jsx";
import AdicionarProj from "./pages/adicionarProj.jsx";
import GerenciarPerfil from "./pages/gerenciarPerfil.jsx";

import PrivateRoute from "./PrivateRoute.jsx";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";


// verifica se token é válido
const isAuth = () => {
  const token = localStorage.getItem("token");

  return (
    token &&
    token !== "undefined" &&
    token !== "null"
  );
};

const router = createBrowserRouter([

  // rota inicial
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },

  // login
  {
    path: "/login",
    element: isAuth()
      ? <Navigate to="/home" replace />
      : <App />,
  },

  // HOME
  {
    path: "/home",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },

  // ORÇAMENTOS
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

  // PROJETOS
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

  // PERFIL
  {
    path: "/gerenciarPerfil",
    element: (
      <PrivateRoute>
        <GerenciarPerfil />
      </PrivateRoute>
    ),
  },

  // =========
  // PÁGINAS PÚBLICAS FUTURAS
  // =========

  {
    path: "/principal",
    element: null,
  },

  {
    path: "/portfolio",
    element: null,
  },

  {
    path: "/projetos/:tipo",
    element: null,
  },

  {
    path: "/detalhesProj/:id",
    element: null,
  },

  {
    path: "/contato",
    element: null,
  },

]);

createRoot(
  document.getElementById("root")
).render(
  <StrictMode>
    <RouterProvider
      router={router}
    />
  </StrictMode>
);