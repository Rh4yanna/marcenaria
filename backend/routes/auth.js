import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../server.js";

const router = express.Router();

const SECRET = "segredo123";


// ✅ CADASTRO
router.post("/register", async (req, res) => {
  const { nome, email, senha } = req.body;

  // validação básica
  if (!nome || !email || !senha) {
    return res.status(400).json("Preencha todos os campos");
  }

  try {
    const hash = await bcrypt.hash(senha, 10);

    const sql = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";

    db.query(sql, [nome, email, hash], (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json("Erro ao cadastrar");
      }

      return res.json("Usuário cadastrado");
    });
  } catch (err) {
    console.log(err);
    res.status(500).json("Erro no servidor");
  }
});


// ✅ LOGIN
router.post("/login", (req, res) => {
  const { email, senha } = req.body;

  // validação básica
  if (!email || !senha) {
    return res.status(400).json("Preencha email e senha");
  }

  const sql = "SELECT * FROM usuarios WHERE email = ?";

  db.query(sql, [email], async (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json("Erro no servidor");
    }

    if (result.length === 0) {
      return res.status(404).json("Usuário não encontrado");
    }

    const usuario = result[0];

    try {
      const senhaValida = await bcrypt.compare(senha, usuario.senha);

      if (!senhaValida) {
        return res.status(401).json("Senha incorreta");
      }

      const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        SECRET,
        { expiresIn: "1d" }
      );

      return res.json({ token });
    } catch (err) {
      console.log(err);
      return res.status(500).json("Erro ao validar senha");
    }
  });
});

export default router;