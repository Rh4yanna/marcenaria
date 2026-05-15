import jwt from "jsonwebtoken";

const SECRET = "segredo123";

export const verificarToken = (req, res, next) => {
  
  // pega Authorization: Bearer TOKEN
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({
      message: "Token necessário"
    });
  }

  // separa "Bearer" do token
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({
      message: "Token inválido"
    });
  }

  try {

    const decoded = jwt.verify(
      token,
      SECRET
    );

    req.userId = decoded.id;

    next();

  } catch {

    return res.status(401).json({
      message: "Token expirado ou inválido"
    });

  }
};