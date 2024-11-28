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
    (claims && {
      path: "/",
      element: <ProtectedRoute />,
      errorElement: <NotFound />,
      children: [
        [ROLE.ADMIN].includes(claims.rol) && {
          path: "",
          element: <Inicio />,
        },
        [ROLE.ADMIN, ROLE.INSTRUCTOR].includes(claims.rol) && {
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
        [ROLE.ADMIN].includes(claims.rol) && {
          path: "instructores",
          element: <Instructores />,
        },
        [ROLE.ADMIN].includes(claims.rol) && {
          path: "ubicaciones",
          element: <Ubicaciones />,
        },
        [ROLE.ADMIN].includes(claims.rol) && {
          path: "tipos-documento",
          element: <TiposDocumento />,
        },
        [ROLE.ADMIN].includes(claims.rol) && {
          path: "municipios",
          element: <Municipios />,
        },
        [ROLE.ADMIN].includes(claims.rol) && {
          path: "colegios",
          element: <Colegios />,
        },
        [ROLE.ADMIN, ROLE.INSTRUCTOR].includes(claims.rol) && {
          path: "participantes",
          element: <Participantes />,
        },
        [ROLE.ADMIN].includes(claims.rol) && {
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
    }) ||
      {},
  ];

  const router = createBrowserRouter([
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
}
