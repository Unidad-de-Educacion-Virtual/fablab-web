import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { createRoutesFromElements } from "react-router-dom";
import { Route } from "react-router-dom";

import App from "./layouts/App";
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

export default function Router() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />} errorElement={<NotFound />}>
        <Route path="talleres" element={<Talleres />}></Route>
        <Route path="talleres/:idTaller" element={<TallerDetails />}></Route>
        <Route
          path="talleres/:idTaller/programaciones/:idProgramacion"
          element={<ProgramacionDetails />}
        ></Route>
        <Route
          path="talleres/:idTaller/programaciones/:idProgramacion/sesiones/:idSesion"
          element={<SesionDetails />}
        ></Route>
        <Route path="instructores" element={<Instructores />}></Route>
        <Route path="ubicaciones" element={<Ubicaciones />}></Route>
        <Route path="tipos-documento" element={<TiposDocumento />}></Route>
        <Route path="municipios" element={<Municipios />}></Route>
        <Route path="colegios" element={<Colegios />}></Route>
        <Route path="participantes" element={<Participantes />}></Route>
        <Route path="inscripciones" element={<Inscripciones />}></Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
