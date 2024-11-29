import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import { useEffect } from "react";

const Logout = () => {
  const { setToken, token } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
  };

  useEffect(() => {
    if (token === null) {
      navigate("/", { replace: true });
    }
  }, [token]);

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
