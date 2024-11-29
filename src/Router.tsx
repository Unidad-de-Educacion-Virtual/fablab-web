import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import NotFound from "./pages/NotFound";
import Talleres from "./pages/talleres/Talleres";
import TallerDetails from "./pages/taller-details/TallerDetails";
import Instructores from "./pages/instructores/Instructores";
import Ubicaciones from "./pages/ubicaciones/Ubicaciones";
import TiposDocumento from "./pages/tipos-documento/TiposDocumento";
import Municipios from "./pages/municipios/Municipios";
import Colegios from "./pages/colegios/Colegios";
import Participantes from "./pages/participantes/Participantes";
import ProgramacionDetails from "./pages/programacion-details/ProgramacionDetails";
import SesionDetails from "./pages/sesion-details/SesionDetails";
import Inscripciones from "./pages/inscripciones/Inscripciones";
import { useAuth } from "./providers/AuthProvider";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Login from "./pages/login/Login";
import Logout from "./pages/logout/Logout";
import { ROLE } from "./config";
import Inicio from "./pages/inicio/Inicio";
import AppLayout from "./layouts/AppLayout";

export default function Router() {
  const { token, claims } = useAuth();

  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <Navigate to={"login"} />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ];

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element:
            (token === null && <ProtectedRoute />) ||
            (claims?.rol === ROLE.ADMIN && (
              <ProtectedRoute roles={[ROLE.ADMIN]}>
                <Inicio />
              </ProtectedRoute>
            )) ||
            (claims?.rol === ROLE.INSTRUCTOR && <Navigate to="/talleres" />),
        },
        {
          path: "talleres",
          element: <ProtectedRoute roles={[ROLE.ADMIN, ROLE.INSTRUCTOR]} />,
          children: [
            {
              element: <Talleres />,
              index: true,
            },
            {
              path: ":idTaller",
              children: [
                {
                  element: <TallerDetails />,
                  index: true,
                },
                {
                  path: "programaciones/:idProgramacion",
                  children: [
                    {
                      element: <ProgramacionDetails />,
                      index: true,
                    },
                    {
                      path: "sesiones/:idSesion",
                      element: <SesionDetails />,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          path: "instructores",
          element: (
            <ProtectedRoute roles={[ROLE.ADMIN]}>
              <Instructores />
            </ProtectedRoute>
          ),
        },
        {
          path: "ubicaciones",
          element: (
            <ProtectedRoute roles={[ROLE.ADMIN]}>
              <Ubicaciones />
            </ProtectedRoute>
          ),
        },
        {
          path: "tipos-documento",
          element: (
            <ProtectedRoute roles={[ROLE.ADMIN]}>
              <TiposDocumento />
            </ProtectedRoute>
          ),
        },
        {
          path: "municipios",
          element: (
            <ProtectedRoute roles={[ROLE.ADMIN]}>
              <Municipios />
            </ProtectedRoute>
          ),
        },
        {
          path: "colegios",
          element: (
            <ProtectedRoute roles={[ROLE.ADMIN]}>
              <Colegios />
            </ProtectedRoute>
          ),
        },
        {
          path: "participantes",
          element: (
            <ProtectedRoute roles={[ROLE.ADMIN, ROLE.INSTRUCTOR]}>
              <Participantes />
            </ProtectedRoute>
          ),
        },
        {
          path: "inscripciones",
          element: (
            <ProtectedRoute roles={[ROLE.ADMIN, ROLE.INSTRUCTOR]}>
              <Inscripciones />
            </ProtectedRoute>
          ),
        },
        {
          path: "login",
          element: <Navigate to={"/"} />,
        },
        {
          path: "logout",
          element: <Logout />,
        },
      ],
    },
  ];

  const router = createBrowserRouter([
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
}
