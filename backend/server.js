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

// 🧠 CONFIG BANCO (LOCAL + RENDER)
const dbConfig = {
  host: process.env.DB_HOST || "tramway.proxy.rlwy.net",
  user: process.env.DB_USER || "root",
  password:
    process.env.DB_PASSWORD || "OXOxfIZEzzuiKRzWcSGYQjsfcHeNVhUi",
  database: process.env.DB_NAME || "railway",
  port: process.env.DB_PORT || 18922,
};

// 🗄️ CONEXÃO
export const db = mysql.createConnection(dbConfig);

// 🔌 CONECTAR
db.connect((err) => {
  if (err) {
    console.log("❌ Erro ao conectar:", err);
  } else {
    console.log("✅ MySQL conectado");
  }
});

// 🌐 ROTA TESTE
app.get("/", (req, res) => {
  res.send("Backend RODANDooO");
});

// 🚀 SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});