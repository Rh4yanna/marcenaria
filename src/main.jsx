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
Navigate
}
from "react-router-dom";


const isAuth=()=>{
 return localStorage.getItem("token");
};

const router=createBrowserRouter([

{
 path:"/",
 element:
 isAuth()
 ? <Navigate to="/home"/>
 : <App/>
},

{
 path:"/login",
 element:<App/>
},

{
 path:"/home",
 element:(
 <PrivateRoute>
 <Home/>
 </PrivateRoute>
)
},

{
 path:"/criarOrc",
 element:(
 <PrivateRoute>
 <CriarOrc/>
 </PrivateRoute>
)
},

{
 path:"/listaOrc",
 element:(
 <PrivateRoute>
 <ListaOrc/>
 </PrivateRoute>
)
},

{
 path:"/gerenciarProj",
 element:(
 <PrivateRoute>
 <GerenciarProj/>
 </PrivateRoute>
)
},

{
 path:"/controleProj",
 element:(
 <PrivateRoute>
 <ControleProj/>
 </PrivateRoute>
)
},

{
 path:"/editarProj",
 element:(
 <PrivateRoute>
 <EditarProj/>
 </PrivateRoute>
)
},

{
 path:"/adicionarProj",
 element:(
 <PrivateRoute>
 <AdicionarProj/>
 </PrivateRoute>
)
},

{
 path:"/gerenciarPerfil",
 element:(
 <PrivateRoute>
 <GerenciarPerfil/>
 </PrivateRoute>
)
},

// futuras páginas públicas

{
 path:"/principal",
 element:null
},

{
 path:"/portfolio",
 element:null
},

{
 path:"/projetos/:tipo",
 element:null
},

{
 path:"/detalhesProj/:id",
 element:null
},

{
 path:"/contato",
 element:null
}

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