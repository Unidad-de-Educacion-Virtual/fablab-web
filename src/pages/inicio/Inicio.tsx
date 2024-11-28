import ContentLayout from "../../layouts/ContentLayout";
import ProgramacionesProximas from "./ProgramacionesProximas";
import UltimasSesiones from "./UltimasSesiones";

export default function Inicio() {
  return (
    <ContentLayout title="Panel General">
      <div className="w-full grid gap-8">
        <ProgramacionesProximas />
        <UltimasSesiones />
      </div>
    </ContentLayout>
  );
}
