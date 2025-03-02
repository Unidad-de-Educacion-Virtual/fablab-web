import { useParams } from "react-router-dom";
import BreadCrumb from "../../components/Breadcrum";
import SesionSection from "./SesionSection";
import Asistentes from "./Asistentes";
import Evidencias from "./Evidencias";
import { useAuth } from "../../providers/AuthProvider";
import { useService } from "../../hooks/useService";
import { API_SESION_PATH } from "../../config";
import { Sesion } from "../../types/Sesion";
import { getEntityById } from "../../services/BackendService";

export default function SesionDetails() {
  const { idSesion: idStr } = useParams();
  const id = parseInt(idStr as string) | 0;
  const { token } = useAuth();
  const { data: sesion, refresh } = useService(
    async () => await getEntityById<Sesion>(API_SESION_PATH, id, token),
    [id]
  );

  if (!sesion) return;

  return (
    <>
      <BreadCrumb />
      <div className="grid gap-8">
        <SesionSection sesion={sesion} refresh={refresh} />
        <Asistentes sesion={sesion} refreshSesion={refresh} />
        <Evidencias sesionId={id} />
      </div>
    </>
  );
}
