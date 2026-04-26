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

// 🗄️ CONEXÃO COM MYSQL (sem quebrar no deploy)
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "S0l4321.",
  database: "marcenaria",
};

// só usa env se existir (evita erro estranho)
if (typeof process !== "undefined" && process.env && process.env.DB_HOST) {
  dbConfig.host = process.env.DB_HOST;
  dbConfig.user = process.env.DB_USER;
  dbConfig.password = process.env.DB_PASSWORD;
  dbConfig.database = process.env.DB_NAME;
}

export const db = mysql.createConnection(dbConfig);

// 🔥 conecta só se NÃO estiver no deploy
if (dbConfig.host !== "localhost") {
  db.connect((err) => {
    if (err) {
      console.log("Erro ao conectar:", err);
    } else {
      console.log("MySQL conectado");
    }
  });
} else {
  console.log("Banco local (ou não configurado no Render)");
}

// 🌐 ROTA TESTE
app.get("/", (req, res) => {
  res.send("Backend RODANDooO");
});

// 🚀 SERVER
const PORT =
  (typeof process !== "undefined" && process.env && process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});