import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { ROLE } from "../config";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  roles?: string[];
  children?: ReactNode;
}

export const ProtectedRoute = ({
  roles = [ROLE.ADMIN, ROLE.INSTRUCTOR],
  children,
}: ProtectedRouteProps) => {
  const { token, claims } = useAuth();

  if (!token || !claims || !roles.includes(claims.rol)) {
    return <Navigate to="/login" />;
  }

  return children || <Outlet />;
};
