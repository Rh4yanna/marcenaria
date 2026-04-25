import express from "express";
import mysql from "mysql2";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import orcamentosRoutes from "./routes/orcamentos.js";
import projetosRoutes from "./routes/projetos.js";
import { verificarToken } from "./middleware/authMiddleware.js";

const app = express();

// 🔥 MIDDLEWARES PRIMEIRO
app.use(cors());
app.use(express.json());

// 🔐 ROTAS
app.use("/auth", authRoutes);
app.use("/orcamentos", orcamentosRoutes);
app.use("/projetos", projetosRoutes);

// 🔒 ROTA PROTEGIDA
app.get("/protegido", verificarToken, (req, res) => {
  res.json("Você está autenticado!");
});

// 🗄️ CONEXÃO COM MYSQL
export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "S0l4321.",
  database: "marcenaria",
});

db.connect((err) => {
  if (err) {
    console.log("Erro ao conectar:", err);
  } else {
    console.log("MySQL conectado");
  }
});

// 🌐 ROTA TESTE
app.get("/", (req, res) => {
  res.send("Backend RODANDooO");
});

// 🚀 SERVER
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
