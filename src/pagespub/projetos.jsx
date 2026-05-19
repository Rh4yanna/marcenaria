import { useEffect,useState } from "react";
import {
useNavigate,
useLocation
} from "react-router-dom";

import logo from "../assets/logo.jpg";
import { API_URL } from "../services/api";

function Projetos(){

const navigate=
useNavigate();

const location=
useLocation();

const tipoSelecionado=
location.state?.tipo||"";

const [menuOpen,
setMenuOpen]=
useState(false);

const [projetos,
setProjetos]=
useState([]);

const [loading,
setLoading]=
useState(true);


useEffect(()=>{

buscarProjetos();

},[]);



const buscarProjetos=
async()=>{

try{

const res=
await fetch(
`${API_URL}/projetos`
);

const data=
await res.json();

const filtrados=
tipoSelecionado

?data.filter(
(p)=>
p.tipo===
tipoSelecionado
)

:data;

setProjetos(
filtrados
);

}catch{

console.log(
"erro projetos"
);

}

finally{

setLoading(false);

}

};



const irPara=
(path)=>{

setMenuOpen(false);

navigate(path);

};



const MenuItem=({

label,
path

})=>(

<button

onClick={()=>
irPara(path)
}

className="
w-full
text-left
p-4
rounded-2xl
hover:bg-blue-50
transition
"

>

<h3 className="
font-semibold
text-gray-800
">

{label}

</h3>

</button>

);



return(

<div className="
min-h-screen
bg-gradient-to-br
from-white
via-gray-100
to-blue-50
">

{/* HEADER */}

<header className="
sticky
top-0
z-30
bg-white/80
backdrop-blur-md
border-b
border-gray-200
">

<div className="
max-w-7xl
mx-auto
px-6
py-4
flex
items-center
justify-between
">

<button

onClick={()=>
setMenuOpen(
!menuOpen
)
}

className="
w-12
h-12
rounded-2xl
bg-gray-100
hover:bg-blue-50
flex
flex-col
items-center
justify-center
gap-1
"

>

<span className="
w-5
h-0.5
bg-gray-700
"/>

<span className="
w-5
h-0.5
bg-gray-700
"/>

<span className="
w-5
h-0.5
bg-gray-700
"/>

</button>


<div className="
flex
items-center
gap-4
">

<img

src={logo}

className="
w-14
h-14
rounded-2xl
object-cover
border-2
border-blue-100
shadow-md
"

/>

<div>

<h1 className="
text-xl
font-bold
">

Marcio Bassani

</h1>

<p className="
text-sm
text-gray-500
">

Projetos

</p>

</div>

</div>

<div className="w-12"/>

</div>

</header>



{/* MENU */}

{menuOpen&&(

<>

<div

onClick={()=>
setMenuOpen(false)
}

className="
fixed
inset-0
bg-black/30
z-40
"

/>


<div className="
fixed
left-0
top-0
w-72
h-full
bg-white
z-50
p-6
shadow-2xl
">

<div className="
flex
items-center
gap-4
mb-8
">

<img

src={logo}

className="
w-14
h-14
rounded-2xl
"

/>

<div>

<h2 className="
font-bold
">

Marcio Bassani

</h2>

<p className="
text-gray-500
text-sm
">

Navegação

</p>

</div>

</div>



<div className="
flex
flex-col
gap-3
">

<MenuItem
label="Início"
path="/principal"
/>

<MenuItem
label="Portfólio"
path="/portfolio"
/>

<MenuItem
label="Contato"
path="/contato"
/>

</div>

</div>

</>

)}



<main className="
max-w-7xl
mx-auto
px-6
py-10
">

<div className="
flex
justify-between
items-center
mb-10
">

<div>

<h1 className="
text-4xl
font-bold
">

{tipoSelecionado}

</h1>

<p className="
text-gray-500
mt-2
">

Projetos desta categoria

</p>

</div>


<button

onClick={()=>
navigate(
"/portfolio"
)
}

className="
bg-white
border
px-6
py-3
rounded-2xl
"

>

← Voltar

</button>

</div>



{loading&&(

<div className="
bg-white
rounded-3xl
p-12
text-center
">

Carregando...

</div>

)}



{!loading&&
projetos.length===0&&(

<div className="
bg-white
rounded-3xl
p-12
text-center
">

Nenhum projeto encontrado

</div>

)}



<div className="
grid
md:grid-cols-2
lg:grid-cols-3
gap-8
">

{projetos.map(
(proj)=>{

let imagens=[];

try{

imagens=

typeof
proj.imagens
==="string"

?JSON.parse(
proj.imagens
)

:proj.imagens;

}catch{

imagens=[];

}



return(

<div

key={proj.id}

className="
bg-white
rounded-[30px]
overflow-hidden
shadow-md
"

>

{imagens?.[0]&&(

<img

src={
imagens[0]
}

className="
w-full
h-64
object-cover
"

/>

)}


<div className="
p-5
">

<h3 className="
font-bold
text-xl
">

{proj.nome||

proj.tipo}

</h3>


<button

onClick={()=>

navigate(
"/detalhesProj",
{

state:{

projeto:
proj

}

}

)

}

className="
w-full
mt-5
bg-blue-500
hover:bg-blue-600
text-white
py-3
rounded-2xl
"

>

Ver detalhes

</button>

</div>

</div>

);

}

)}

</div>

</main>

</div>

);

}

export default Projetos;