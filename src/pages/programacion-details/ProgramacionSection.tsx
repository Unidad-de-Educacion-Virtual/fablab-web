import { useService } from "../../hooks/useService";
import { getEntityById } from "../../services/BackendService";
import { API_PROGRAMACION_PATH } from "../../config";
import PropertyValue from "../../components/PropertyValue";
import InformationLayout from "../../layouts/Informationlayout";
import { Programacion } from "../../types/Programacion";
import ProgramacionModal from "../../components/modals/ProgramacionModal";
import { useAuth } from "../../providers/AuthProvider";

interface ProgramacionSectionProps {
  id: number;
}

export default function ProgramacionSection({ id }: ProgramacionSectionProps) {
  const { token } = useAuth();

  const { data: programacion, refresh } = useService(
    async () =>
      await getEntityById<Programacion>(API_PROGRAMACION_PATH, id, token),
    [id]
  );

  return (
    <InformationLayout
      entityId={id}
      EntityModal={ProgramacionModal}
      refresh={refresh}
    >
      <PropertyValue name="Taller" value={programacion?.taller.nombre} />
      <PropertyValue
        name="Instructor"
        value={programacion?.instructor.nombre}
      />
      <PropertyValue name="Ubicación" value={programacion?.ubicacion.nombre} />
      <PropertyValue name="Fecha de Inicio" value={programacion?.fechaInicio} />
      <PropertyValue name="Fecha de Fin" value={programacion?.fechaFin} />
      <PropertyValue name="Cantidad de Cupos" value={programacion?.cantidad} />
      <PropertyValue name="Colegio" value={programacion?.colegio.nombre} />
      <PropertyValue name="Grado" value={programacion?.grado} />
      <PropertyValue name="Grupo" value={programacion?.grupo} />

      <PropertyValue name="Observaciones" value={programacion?.observacion} />
    </InformationLayout>
  );
}
