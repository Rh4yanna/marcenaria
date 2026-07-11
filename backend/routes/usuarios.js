import express from "express";
import jwt from "jsonwebtoken";
import { db } from "../server.js";

const router = express.Router();

const SECRET = "segredo123";

// =========================
// CADASTRO
// =========================
router.post("/register", (req, res) => {

  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({
      message: "Preencha todos os campos"
    });
  }

  const verificarSQL =
    "SELECT * FROM usuarios WHERE email=?";

  db.query(
    verificarSQL,
    [email],
    (err, usuarioExistente) => {

      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "Erro servidor"
        });
      }

      if (usuarioExistente.length > 0) {
        return res.status(400).json({
          message: "Email já cadastrado"
        });
      }

      const sql =
        "INSERT INTO usuarios(nome,email,senha) VALUES(?,?,?)";

      db.query(
        sql,
        [nome, email, senha],
        (err) => {

          if (err) {
            console.log(err);

            return res.status(500).json({
              message: "Erro ao cadastrar"
            });
          }

          return res.status(201).json({
            message: "Usuário cadastrado com sucesso"
          });

        }
      );

    }
  );

});


// =========================
// LOGIN
// =========================
router.post("/login", (req, res) => {

  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({
      message: "Preencha email e senha"
    });
  }

  const sql =
    "SELECT * FROM usuarios WHERE email=?";

  db.query(
    sql,
    [email],
    (err, result) => {

      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "Erro servidor"
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "Usuário não encontrado"
        });
      }

      const usuario = result[0];

      // Comparação direta da senha
      if (senha !== usuario.senha) {
        return res.status(401).json({
          message: "Senha incorreta"
        });
      }

      const token = jwt.sign(
        {
          id: usuario.id,
          email: usuario.email
        },
        SECRET,
        {
          expiresIn: "1d"
        }
      );

      return res.json({

        token,

        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email
        }

      });

    }
  );

});

export default router;