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

export default function Router() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />} errorElement={<NotFound />}>
        <Route path="talleres" element={<Talleres />}></Route>
        <Route path="talleres/:id" element={<TallerDetails />}></Route>
        <Route path="instructores" element={<Instructores />}></Route>
        <Route path="ubicaciones" element={<Ubicaciones />}></Route>
        <Route path="tipos-documento" element={<TiposDocumento />}></Route>
        <Route path="municipios" element={<Municipios />}></Route>
        <Route path="colegios" element={<Colegios />}></Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
