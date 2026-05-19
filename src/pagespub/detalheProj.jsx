import { useEffect, useState } from "react";
import {
useNavigate,
useLocation
} from "react-router-dom";

import logo from "../assets/logo.jpg";
import { API_URL } from "../services/api";

function DetalheProj(){

const navigate=
useNavigate();

const location=
useLocation();

const projeto=
location.state?.projeto;

const [menuOpen,setMenuOpen]=
useState(false);

const [perfil,setPerfil]=
useState({});

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
border
border-transparent
hover:border-blue-100
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



useEffect(()=>{

buscarPerfil();

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



if(!projeto){

return(

<div className="
min-h-screen
flex
items-center
justify-center
">

<div className="
bg-white
p-10
rounded-3xl
shadow-md
text-center
">

<h2 className="
text-2xl
font-bold
">

Projeto não encontrado

</h2>

<button
onClick={()=>
navigate("/portfolio")
}

className="
mt-6
bg-blue-500
text-white
px-6
py-3
rounded-2xl
"
>

Voltar

</button>

</div>

</div>

);

}



let imagens=[];

try{

imagens=

typeof projeto.imagens==="string"

?JSON.parse(
projeto.imagens
)

:projeto.imagens;

}catch{

imagens=[];

}



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

Detalhes do projeto

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
text-sm
text-gray-500
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
max-w-6xl
mx-auto
px-6
py-10
">

<button

onClick={()=>
navigate(-1)
}

className="
mb-8
bg-white
border
border-gray-200
hover:bg-gray-100
px-5
py-3
rounded-2xl
"
>

← Voltar

</button>



<h1 className="
text-4xl
font-bold
mb-2
">

{projeto.tipo}

</h1>

<p className="
text-gray-500
mb-10
">

Conheça mais detalhes deste projeto

</p>



{/* IMAGENS */}

<div className="
grid
md:grid-cols-2
gap-6
">

{imagens.map(
(img,index)=>(

<img

key={index}

src={img}

className="
w-full
h-[400px]
object-cover
rounded-[30px]
shadow-md
hover:scale-[1.02]
transition
"

/>

)

)}

</div>



{/* DESCRIÇÃO */}

<div className="
bg-white
rounded-[30px]
p-8
shadow-md
mt-10
">

<h2 className="
text-2xl
font-bold
mb-4
">

Descrição

</h2>

<p className="
text-gray-600
leading-8
whitespace-pre-line
">

{projeto.descricao ||
"Sem descrição cadastrada"}

</p>

</div>



{/* ORÇAMENTO */}

<div className="
text-center
py-20
">

<h2 className="
text-4xl
font-bold
">

Solicitar orçamento

</h2>

<p className="
text-gray-500
mt-3
">

Fale diretamente pelo WhatsApp

</p>


<a
href={
perfil.whatsapp
}
target="_blank"
rel="noreferrer"
>

<button
className="
mt-8
bg-green-500
hover:bg-green-600
text-white
px-10
py-5
rounded-2xl
shadow-xl
text-lg
"
>

WhatsApp

</button>

</a>

</div>

</main>

</div>

);

}

export default DetalheProj;