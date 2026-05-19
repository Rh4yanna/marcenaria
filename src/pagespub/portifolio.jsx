import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { API_URL } from "../services/api";

function Portfolio() {

const navigate=
useNavigate();

const [menuOpen,setMenuOpen]=
useState(false);

const [perfil,setPerfil]=
useState({});

const [projetos,setProjetos]=
useState([]);

const [loading,setLoading]=
useState(true);


const tipos=[

"Rack para TV",
"Painel para TV",
"Estante",
"Mesa de centro",
"Aparador",
"Guarda-roupa planejado",
"Cama",
"Escrivaninha",
"Cozinha planejada",
"Closet planejado",
"Home office planejado",
"Mesa de jantar",
"Painel ripado",
"Lavanderia planejada",
"Banheiro planejado",
"Outro"

];


useEffect(()=>{

buscarPerfil();

buscarProjetos();

},[]);



const buscarPerfil=
async()=>{

try{

const res=
await fetch(
`${API_URL}/perfil`
);

const data=
await res.json();

setPerfil(data);

}catch{

console.log(
"erro perfil"
);

}

};



const buscarProjetos=
async()=>{

try{

const res=
await fetch(
`${API_URL}/projetos`
);

const data=
await res.json();

setProjetos(
Array.isArray(data)
?data
:[]
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



const irPara=(path)=>{

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



const projetosPorTipo=
tipos.map((tipo)=>({

tipo,

itens:
projetos.filter(
(p)=>
p.tipo===tipo
)

}));



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

Portfólio

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

<h1 className="
text-4xl
font-bold
mb-2
">

Portfólio

</h1>

<p className="
text-gray-500
mb-12
">

Conheça alguns projetos realizados

</p>



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

projetosPorTipo.map(

(grupo,index)=>{

if(
grupo.itens.length===0
)

return null;



return(

<div
key={index}
className="
mb-14
">

<div className="mb-6">

<div>

<h2 className="
text-2xl
font-bold
">

{grupo.tipo}

</h2>

<p className="
text-gray-500
mt-1
">

{grupo.itens.length}
projeto(s)

</p>

</div>

</div>



<div className="
flex
gap-5
overflow-x-auto
pb-4
">

{grupo.itens.map(

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
min-w-[320px]
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
h-72
object-cover
"

/>

)}

</div>

);

}

)}

</div>


<div className="
flex
justify-center
mt-6
">

<button

onClick={()=>

navigate(
"/detalheProj",
{
state:{
tipo:grupo.tipo
}
}
)

}

className="
bg-blue-500
hover:bg-blue-600
transition
text-white
px-8
py-3
rounded-2xl
shadow-md
font-semibold
"

>

Ver mais

</button>

</div>


</div>

);

}

)

}

</main>

</div>

);

}

export default Portfolio;