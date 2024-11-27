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
  }, 2 * 1000);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <p className="font-bold text-2xl animate-pulse">Cerrando Sesión...</p>
    </div>
  );
};

export default Logout;
