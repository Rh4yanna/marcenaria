import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {

  const token =
    localStorage.getItem("token");

  const autenticado =
    token &&
    token !== "undefined" &&
    token !== "null";

  return autenticado
    ? children
    : <Navigate to="/login" replace />;
}

export default PrivateRoute;