useEffect(() => {

  buscarProjetos();

  buscarPerfil();

}, []);


const buscarPerfil =
async()=>{

try{

const res=
await fetch(
`${API_URL}/perfil`
);

const data=
await res.json();

setPerfilPublico({

titulo:
data.titulo ||
"Móveis Planejados",

subtitulo:
data.subtitulo ||
"Projetos exclusivos",

descricaoServicos:
data.descricao_servicos ||
"",

whatsapp:
data.whatsapp ||
"",

banner:
data.banner ||
"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",

telefone:
data.telefone ||
""

});

}catch{

console.log(
"erro perfil"
);

}

};