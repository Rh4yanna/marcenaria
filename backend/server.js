import express from "express";
import mysql from "mysql2";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import orcamentosRoutes from "./routes/orcamentos.js";
import projetosRoutes from "./routes/projetos.js";
import { verificarToken } from "./middleware/authMiddleware.js";

const app = express();

// 🔥 MIDDLEWARES
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

// 🗄️ CONEXÃO COM MYSQL (com fallback)
export const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "S0l4321.",
  database: process.env.DB_NAME || "marcenaria",
});

// 🔥 CONECTA SÓ SE TIVER CONFIG (evita erro no Render)
if (process.env.DB_HOST) {
  db.connect((err) => {
    if (err) {
      console.log("Erro ao conectar:", err);
    } else {
      console.log("MySQL conectado");
    }
  });
} else {
  console.log("Banco não configurado (modo deploy)");
}

// 🌐 ROTA TESTE
app.get("/", (req, res) => {
  res.send("Backend RODANDooO");
});

// 🚀 SERVER (porta dinâmica)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});