import { useParams } from "react-router-dom";
import BreadCrumb from "../../components/Breadcrum";
import SesionSection from "./SesionSection";
import Asistentes from "./Asistentes";
import Evidencias from "./Evidencias";

export default function SesionDetails() {
  const { idSesion: idStr } = useParams();
  const id = parseInt(idStr as string) | 0;

  return (
    <>
      <BreadCrumb />
      <div className="grid gap-8">
        <SesionSection id={id} />
        <Asistentes sesionId={id} />
        <Evidencias sesionId={id} />
      </div>
    </>
  );
}
