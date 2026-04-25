import jwt from "jsonwebtoken";

const SECRET = "segredo123";

export const verificarToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json("Token necessário");
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).json("Token inválido");

    req.userId = decoded.id;
    next();
  });
};

