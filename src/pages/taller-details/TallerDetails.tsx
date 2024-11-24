import { useParams } from "react-router-dom";
import TallerSection from "./TallerSection";

export default function TallerDetails() {
  const { id: idStr } = useParams();
  const id = parseInt(idStr as string) | 0;

  return (
    <>
      <TallerSection id={id} />
    </>
  );
}
