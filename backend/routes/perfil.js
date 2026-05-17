import express from "express";
import { db } from "../server.js";

const router = express.Router();


// BUSCAR PERFIL

router.get("/", (req, res) => {

  db.query(
    "SELECT * FROM perfil_publico LIMIT 1",
    (err, result) => {

      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({
            erro:"Erro ao buscar"
          });
      }

      res.json(
        result[0] || {}
      );

    }
  );

});



// SALVAR

router.put("/", (req,res)=>{

const {
titulo,
subtitulo,
descricao_servicos,
banner,
whatsapp,
telefone,
email,
instagram,
instagram_link
}=req.body;


db.query(

`
UPDATE perfil_publico
SET
titulo=?,
subtitulo=?,
descricao_servicos=?,
banner=?,
whatsapp=?,
telefone=?,
email=?,
instagram=?,
instagram_link=?
WHERE id=1
`,

[
titulo,
subtitulo,
descricao_servicos,
banner,
whatsapp,
telefone,
email,
instagram,
instagram_link
],

(err)=>{

if(err){

console.log(err);

return res
.status(500)
.json({
erro:"Erro salvar"
});

}

res.json({
mensagem:
"Perfil atualizado"
});

}

);

});

export default router;