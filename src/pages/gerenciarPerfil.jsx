import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { API_URL } from "../services/api";

function GerenciarPerfil() {
  const navigate = useNavigate();

  const [perfil, setPerfil] = useState({
    nome: "Marcio Bassani",
  });

  const [publico, setPublico] =
    useState({
      titulo: "",
      subtitulo: "",
      descricao_servicos: "",
      banner: "",
      whatsapp: "",
      telefone: "",
      email: "",
      instagram: "",
      instagram_link: "",
    });

  const [previewBanner,setPreviewBanner]=
    useState("");

  const linkPublico =
    "https://marcenaria-1.onrender.com/principal";



  useEffect(()=>{

    buscarPerfil();

  },[]);



  const buscarPerfil =
    async()=>{

      try{

        const resposta=
        await fetch(
          `${API_URL}/perfilPublico`
        );

        const dados=
        await resposta.json();

        if(dados){

          setPublico(dados);

          setPreviewBanner(
            dados.banner || ""
          );

        }

      }catch(err){

        console.log(
          "Erro carregar:",
          err
        );

      }

    };



  const handlePublico=(e)=>{

    const {name,value}=e.target;

    setPublico({

      ...publico,

      [name]:value

    });

  };



  const handleBanner=(e)=>{

    const file=
      e.target.files[0];

    if(!file)return;

    const preview=
      URL.createObjectURL(file);

    setPreviewBanner(
      preview
    );

    setPublico({

      ...publico,

      banner:preview

    });

  };



  const copiarLink=()=>{

    navigator.clipboard.writeText(
      linkPublico
    );

    alert("Link copiado");

  };



  const salvar=async()=>{

    try{

      const resposta=
      await fetch(

        `${API_URL}/perfilPublico`,

        {

          method:"PUT",

          headers:{
            "Content-Type":
            "application/json"
          },

          body:JSON.stringify(
            publico
          )

        }

      );

      const dados=
      await resposta.json();

      alert(
        dados.message
      );

    }catch{

      alert(
        "Erro ao salvar"
      );

    }

  };



  return(

<div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-blue-50">

<header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200">

<div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

<button
onClick={()=>
navigate("/home")
}
className="
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

<p className="text-sm text-gray-500">

Gerenciar Perfil

</p>

</div>

</div>

<div className="w-12"/>

</div>

</header>



<main className="max-w-5xl mx-auto p-6">

<div
className="
bg-white
rounded-[30px]
shadow-md
p-8
border
"
>

<h2 className="text-3xl font-bold mb-8">

Configurações Públicas

</h2>


<div className="grid md:grid-cols-2 gap-5">

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
placeholder="WhatsApp"
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
placeholder="@Instagram"
className="p-4 rounded-2xl border"
/>

</div>



<input
name="instagram_link"
value={
publico.instagram_link
}
onChange={
handlePublico
}
placeholder="Link Instagram"
className="
w-full
mt-5
p-4
rounded-2xl
border
"
/>


<div className="mt-6">

<label>

Banner

</label>

{previewBanner &&(

<img
src={
previewBanner
}
className="
w-full
h-52
rounded-3xl
object-cover
my-4
"
/>

)}

<input
type="file"
onChange={
handleBanner
}
/>

</div>



<textarea
name="descricao_servicos"
value={
publico.descricao_servicos
}
onChange={
handlePublico
}
placeholder="Descrição"
className="
w-full
mt-6
h-36
p-4
rounded-2xl
border
"
/>



<div
className="
mt-8
bg-blue-50
p-5
rounded-3xl
flex
justify-between
"
>

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
hover:bg-blue-600
text-white
py-4
rounded-2xl
font-bold
"
>

Salvar Alterações

</button>

</div>

</main>

</div>

);

}

export default GerenciarPerfil;