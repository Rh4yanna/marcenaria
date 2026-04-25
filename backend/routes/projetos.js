import express from "express";
import { db } from "../server.js";

const router = express.Router();


// 💾 CRIAR PROJETO
router.post("/", (req, res) => {
  console.log("🔥 CHEGOU PROJETO:", req.body);

  const { tipo, descricao, imagens } = req.body;

  const sql = `
    INSERT INTO projetos (tipo, descricao, imagens)
    VALUES (?, ?, ?)
  `;

  db.query(
    sql,
    [tipo, descricao, JSON.stringify(imagens)],
    (err, result) => {
      if (err) {
        console.error("❌ ERRO MYSQL:", err);
        return res.status(500).json({ message: "Erro ao salvar projeto" });
      }

      console.log("✅ PROJETO SALVO");
      res.json({ message: "Projeto salvo com sucesso" });
    }
  );
});


// 📄 LISTAR TODOS
router.get("/", (req, res) => {
  const sql = "SELECT * FROM projetos ORDER BY id DESC";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("❌ ERRO AO BUSCAR:", err);
      return res.status(500).json({ message: "Erro ao buscar projetos" });
    }

    res.json(result);
  });
});


// 🔎 BUSCAR POR ID (opcional, mas útil)
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM projetos WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("❌ ERRO AO BUSCAR POR ID:", err);
      return res.status(500).json({ message: "Erro ao buscar projeto" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Projeto não encontrado" });
    }

    res.json(result[0]);
  });
});


// ✏️ ATUALIZAR PROJETO
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { tipo, descricao, imagens } = req.body;

  const sql = `
    UPDATE projetos
    SET tipo = ?, descricao = ?, imagens = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [tipo, descricao, JSON.stringify(imagens), id],
    (err) => {
      if (err) {
        console.error("❌ ERRO AO ATUALIZAR:", err);
        return res.status(500).json({ message: "Erro ao atualizar projeto" });
      }

      console.log("✏️ PROJETO ATUALIZADO");
      res.json({ message: "Projeto atualizado com sucesso" });
    }
  );
});


// 🗑️ EXCLUIR PROJETO
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM projetos WHERE id = ?";

  db.query(sql, [id], (err) => {
    if (err) {
      console.error("❌ ERRO AO EXCLUIR:", err);
      return res.status(500).json({ message: "Erro ao excluir projeto" });
    }

    console.log("🗑️ PROJETO EXCLUÍDO");
    res.json({ message: "Projeto excluído com sucesso" });
  });
});


export default router;