import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import AppLayout from "../layouts/AppLayout";

export const ProtectedRoute = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};
