import express from "express";
import { db } from "../server.js";

const router = express.Router();

//  SALVAR ORÇAMENTO
router.post("/", (req, res) => {
  console.log(" CHEGOU NO BACKEND:", req.body);

  const { nome, telefone, tipo, descricao, material, servico, total } =
    req.body;

  const sql = `
    INSERT INTO orcamentos (nome, telefone, tipo, descricao, material, servico, total)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [nome, telefone, tipo, descricao, material, servico, total],
    (err, result) => {
      if (err) {
        console.error(" ERRO MYSQL:", err);
        return res.status(500).json({ message: "Erro ao salvar no banco" });
      }

      console.log(" SALVO NO BANCO");
      res.json({ message: "Orçamento salvo com sucesso" });
    },
  );
});

//  LISTAR ORÇAMENTOS
router.get("/", (req, res) => {
  const sql = "SELECT * FROM orcamentos ORDER BY id DESC";

  db.query(sql, (err, result) => {
    if (err) {
      console.error(" ERRO AO BUSCAR:", err);
      return res.status(500).json({ message: "Erro ao buscar orçamentos" });
    }

    console.log(" ENVIANDO DADOS:", result.length);
    res.json(result);
  });
});

//  EXCLUIR ORÇAMENTO
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  console.log("🗑️ Tentando excluir ID:", id);

  const sql = "DELETE FROM orcamentos WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("❌ ERRO AO EXCLUIR:", err);
      return res.status(500).json({ message: "Erro ao excluir" });
    }

    console.log("✅ EXCLUÍDO DO BANCO");

    res.json({ message: "Excluído com sucesso" });
  });
});

export default router;
