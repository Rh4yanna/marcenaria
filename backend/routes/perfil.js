import express from "express";
import { db } from "../server.js";

const router = express.Router();


// BUSCAR PERFIL

router.get("/", (req, res) => {

  const sql = `
    SELECT *
    FROM perfil_publico
    LIMIT 1
  `;

  db.query(sql, (erro, resultado) => {

    if (erro) {
      console.log(erro);

      return res
        .status(500)
        .json(erro);
    }

    res.json(
      resultado[0] || {}
    );

  });

});




// EDITAR PERFIL

router.put("/", (req, res) => {

  const {

    nome,
    titulo,
    subtitulo,
    descricaoServicos,
    whatsapp,
    telefone,
    email,
    instagram,
    instagramLink

  } = req.body;


  const sql = `

  UPDATE perfil_publico

  SET

  nome=?,
  titulo=?,
  subtitulo=?,
  descricao_servicos=?,
  whatsapp=?,
  telefone=?,
  email=?,
  instagram=?,
  instagram_link=?

  WHERE id=1

  `;


  db.query(

    sql,

    [

      nome,
      titulo,
      subtitulo,
      descricaoServicos,
      whatsapp,
      telefone,
      email,
      instagram,
      instagramLink

    ],

    (erro) => {

      if (erro) {

        console.log(erro);

        return res
          .status(500)
          .json(erro);

      }

      res.json({
        mensagem: "Perfil atualizado"
      });

    }

  );

});

export default router;