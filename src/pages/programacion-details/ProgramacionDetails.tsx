import { useParams } from "react-router-dom";
import BreadCrumb from "../../components/Breadcrum";
import ProgramacionSection from "./ProgramacionSection";

export default function ProgramacionDetails() {
  const { idProgramacion: idStr } = useParams();
  const id = parseInt(idStr as string) | 0;

  return (
    <>
      <BreadCrumb />
      <div className="grid gap-8">
        <ProgramacionSection id={id} />
      </div>
    </>
  );
}
