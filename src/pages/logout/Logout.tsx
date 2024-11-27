import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";

const Logout = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    navigate("/", { replace: true });
  };

  setTimeout(() => {
    handleLogout();
  }, 3 * 1000);

  return <h1>Cerrando Sesión...</h1>;
};

export default Logout;
