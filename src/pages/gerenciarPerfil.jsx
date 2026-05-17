import {useState,useEffect,useRef} from "react";
import {useNavigate} from "react-router-dom";
import logo from "../assets/logo.jpg";

import {API_URL} from "../services/api";

function GerenciarPerfil() {

  const navigate =
    useNavigate();

  const inputBannerRef =
    useRef(null);

  const [menuOpen,
    setMenuOpen] =
    useState(false);

  const [publico,
    setPublico] =
    useState({

      titulo:"",
      subtitulo:"",
      descricao_servicos:"",
      banner:"",

      whatsapp:"",
      telefone:"",
      email:"",

      instagram:"",
      instagram_link:""

    });


  const [previewBanner,
    setPreviewBanner] =
    useState("");


  const linkPublico =
  "https://marcenaria-1.onrender.com/principal";


  useEffect(()=>{

    buscarPerfil();

  },[]);



  const buscarPerfil=
  async()=>{

    try{

      const resposta=
      await fetch(
        `${API_URL}/perfil`
      );

      const dados=
      await resposta.json();

      if(dados){

        setPublico(
          dados
        );

        setPreviewBanner(
          dados.banner||""
        );

      }

    }catch(err){

      console.log(err);

    }

  };



  const irPara=(path)=>{

    setMenuOpen(
      false
    );

    navigate(path);

  };



  const MenuItem=({
    label,
    desc,
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
">

{label}

</h3>

<p className="
text-sm
text-gray-500
">

{desc}

</p>

</button>

);



const handlePublico=
(e)=>{

const{
name,
value
}=e.target;

setPublico({

...publico,

[name]:
value

});

};




const handleBanner=
async(e)=>{

const file=
e.target.files[0];

if(!file)
return;


try{

const formData=
new FormData();

formData.append(
"file",
file
);

formData.append(
"upload_preset",
"marcenaria_upload"
);


const resposta=
await fetch(

"https://api.cloudinary.com/v1_1/drrmyedhr/image/upload",

{

method:
"POST",

body:
formData

}

);


const dados=
await resposta.json();


if(
!dados.secure_url
){

return alert(
"Erro upload"
);

}


setPreviewBanner(
dados.secure_url
);


setPublico(
(prev)=>({

...prev,

banner:
dados.secure_url

})

);


}catch(err){

console.log(err);

}

};




const copiarLink=
()=>{

navigator.clipboard
.writeText(
linkPublico
);

alert(
"Link copiado"
);

};




const salvar=
async()=>{

try{

const resposta=
await fetch(

`${API_URL}/perfil`,

{

method:
"PUT",

headers:{

"Content-Type":
"application/json"

},

body:
JSON.stringify(
publico
)

}

);


const dados=
await resposta.json();


if(
resposta.ok
){

alert(
"Salvo com sucesso"
);

}else{

alert(
dados.erro
);

}

}catch{

alert(
"Erro"
);

}

};



return(

<div className="
min-h-screen
bg-gradient-to-br
from-white
via-gray-100
to-blue-50
">

      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <button
            onClick={() =>
              setMenuOpen(
                !menuOpen
              )
            }
            className="
            w-12
            h-12
            rounded-2xl
            bg-gray-100
            flex
            flex-col
            justify-center
            items-center
            gap-1
            "
          >

            <span className="w-5 h-0.5 bg-gray-700"></span>
            <span className="w-5 h-0.5 bg-gray-700"></span>
            <span className="w-5 h-0.5 bg-gray-700"></span>

          </button>


          <div className="flex items-center gap-4">

            <img
              src={logo}
              className="
              w-14
              h-14
              rounded-2xl
              "
            />

            <div>

              <h1 className="font-bold text-xl">

                Marcio Bassani

              </h1>

              <p className="text-gray-500 text-sm">

                Painel Administrativo

              </p>

            </div>

          </div>

          <div className="w-12"></div>

        </div>

      </header>



{menuOpen&&(

<>

<div
onClick={()=>
setMenuOpen(
false
)
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
w-80
h-full
bg-white
z-50
shadow-2xl
p-6
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

Painel Administrativo

</p>

</div>

</div>


<div className="
flex
flex-col
gap-2
">

<MenuItem
label="Criar Orçamentos"
desc="Novo orçamento"
path="/criarOrc"
/>

<MenuItem
label="Lista Orçamentos"
desc="Visualizar"
path="/listaOrc"
/>

<MenuItem
label="Gerenciar Projetos"
desc="Projetos"
path="/gerenciarProj"
/>

<MenuItem
label="Adicionar Projeto"
desc="Cadastrar"
path="/adicionarProj"
/>

<MenuItem
label="Gerenciar Perfil"
desc="Atualizar dados"
path="/gerenciarPerfil"
/>

</div>

</div>

</>

)}



<main className="
max-w-5xl
mx-auto
p-6
">

  <div>

        <button
          onClick={()=>
            navigate("/home")
          }
          className="
          bg-white
          border
          border-gray-200
          hover:bg-gray-100
          transition
          text-gray-700
          px-5
          py-3
          rounded-2xl
          shadow-sm
          "
        >

          ← Voltar

        </button>

      </div>

<div className="
    bg-white
    rounded-[30px]
    p-8
    shadow-md
    ">

    <h2 className="
    text-3xl
    font-bold
    mb-8
    ">

    Configurações Públicas

    </h2>


    <div className="
    grid
    md:grid-cols-2
    gap-5
    ">

    <input
    name="titulo"
    value={publico.titulo}
    onChange={handlePublico}
    placeholder="Título"
    className="p-4 rounded-2xl border"
    />


    <input
    name="subtitulo"
    value={publico.subtitulo}
    onChange={handlePublico}
    placeholder="Subtítulo"
    className="p-4 rounded-2xl border"
    />


    <input
    name="whatsapp"
    value={publico.whatsapp}
    onChange={handlePublico}
    placeholder="Whats"
    className="p-4 rounded-2xl border"
    />


    <input
    name="telefone"
    value={publico.telefone}
    onChange={handlePublico}
    placeholder="Telefone"
    className="p-4 rounded-2xl border"
    />


    <input
    name="email"
    value={publico.email}
    onChange={handlePublico}
    placeholder="Email"
    className="p-4 rounded-2xl border"
    />


    <input
    name="instagram"
    value={publico.instagram}
    onChange={handlePublico}
    placeholder="@instagram"
    className="p-4 rounded-2xl border"
    />

    </div>


    <input
    name="instagram_link"
    value={publico.instagram_link}
    onChange={handlePublico}
    placeholder="Link Instagram"
    className="
    w-full
    mt-5
    p-4
    rounded-2xl
    border
    "
    />



    <div className="mt-8">

    {previewBanner&&(

    <img
    src={previewBanner}
    className="
    w-full
    h-56
    rounded-3xl
    object-cover
    mb-4
    "
    />

    )}


    <input
    type="file"
    hidden
    ref={
    inputBannerRef
    }
    onChange={
    handleBanner
    }
    />


    <button
    onClick={()=>
    inputBannerRef
    .current
    .click()
    }
    className="
    bg-blue-500
    text-white
    px-6
    py-3
    rounded-2xl
    "
    >

    Trocar Imagem

    </button>

    </div>



    <textarea
    name="
    descricao_servicos"
    value={
    publico.descricao_servicos
    }
    onChange={
    handlePublico
    }
    className="
    w-full
    mt-6
    h-36
    border
    rounded-2xl
    p-4
    "
    />



    <div className="
    bg-blue-50
    p-5
    rounded-3xl
    mt-8
    flex
    justify-between
    ">

    <span>

    {linkPublico}

    </span>


    <button
    onClick={
    copiarLink
    }
    className="
    bg-blue-500
    text-white
    px-5
    rounded-2xl
    "
    >

    Copiar

    </button>

    </div>



    <button
    onClick={salvar}
    className="
    w-full
    mt-8
    bg-blue-500
    text-white
    py-4
    rounded-2xl
    font-bold
    "
    >

    Salvar Alterações

    </button>


    <button
    onClick={()=>

    window.open(
    linkPublico,
    "_blank"
    )

    }
    className="
    w-full
    mt-4
    bg-gray-800
    text-white
    py-4
    rounded-2xl
    font-bold
    "
    >

    Acessar Portfólio Público

    </button>

    </div>

    </main>

</div>

);

}

export default GerenciarPerfil;