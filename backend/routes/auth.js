import express from "express";
import jwt from "jsonwebtoken";
import { db } from "../server.js";

const router = express.Router();

const SECRET = "segredo123";


// 🔐 LOGIN SIMPLES (SEM HASH)
router.post("/login", (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json("Preencha email e senha");
  }

  const sql = "SELECT * FROM usuarios WHERE email = ?";

  db.query(sql, [email], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json("Erro no servidor");
    }

    if (result.length === 0) {
      return res.status(404).json("Usuário não encontrado");
    }

    const usuario = result[0];

    // 🔥 COMPARAÇÃO DIRETA (SEM BCRYPT)
    if (senha !== usuario.senha) {
      return res.status(401).json("Senha incorreta");
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      SECRET,
      { expiresIn: "1d" }
    );

    return res.json({ token });
  });
});

export default router;