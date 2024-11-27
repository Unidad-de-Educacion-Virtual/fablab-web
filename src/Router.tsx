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

export default function Router() {
  const { token } = useAuth();

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
      element: <ProtectedRoute />,
      errorElement: <NotFound />,
      children: [
        {
          path: "talleres",
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
          element: <Instructores />,
        },
        {
          path: "ubicaciones",
          element: <Ubicaciones />,
        },
        {
          path: "tipos-documento",
          element: <TiposDocumento />,
        },
        {
          path: "municipios",
          element: <Municipios />,
        },
        {
          path: "colegios",
          element: <Colegios />,
        },
        {
          path: "participantes",
          element: <Participantes />,
        },
        {
          path: "inscripciones",
          element: <Inscripciones />,
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
