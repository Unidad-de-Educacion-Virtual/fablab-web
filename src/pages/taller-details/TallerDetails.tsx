import { useParams } from "react-router-dom";
import TallerSection from "./TallerSection";
import Programaciones from "./Programaciones";
import BreadCrumb from "../../components/Breadcrum";

export default function TallerDetails() {
  const { idTaller: idStr } = useParams();
  const id = parseInt(idStr as string) | 0;

  return (
    <>
      <BreadCrumb />
      <div className="grid gap-8">
        <TallerSection id={id} />
        <Programaciones tallerId={id} />
      </div>
    </>
  );
}
