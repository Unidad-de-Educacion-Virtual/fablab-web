import { API_ASISTENTE_PATH, API_INSCRIPCION_PATH } from "../../config";
import { useAuth } from "../../providers/AuthProvider";
import ContentLayout from "../../layouts/ContentLayout";
import {
  createEntity,
  deleteEntity,
  getEntity,
} from "../../services/BackendService";
import { useService } from "../../hooks/useService";
import { Asistente, AsistenteForm } from "../../types/Asistente";
import { Inscripcion } from "../../types/Inscripcion";
import { toast } from "sonner";
import { Sesion } from "../../types/Sesion";

interface AsistentesProps {
  sesion: Sesion;
  refreshSesion: () => void;
}

export default function Asistentes({ sesion, refreshSesion }: AsistentesProps) {
  const { token } = useAuth();
  const { data: inscripciones } = useService(async () => {
    return await getEntity<Inscripcion>(
      API_INSCRIPCION_PATH,
      `programacionId=${sesion.programacion.id}`,
      token
    );
  }, [API_INSCRIPCION_PATH, sesion]);

  const { data: asistentes, refresh: refreshAsistentes } =
    useService(async () => {
      return await getEntity<Asistente>(
        API_ASISTENTE_PATH,
        `sesionId=${sesion.id}`,
        token
      );
    }, [API_ASISTENTE_PATH, sesion]);

  async function toggleAssist(inscripcion: Inscripcion) {
    const participanteId = inscripcion.participante.id;

    const asistente = asistentes?.find(
      (asistente) => asistente.participante.id === participanteId
    );

    try {
      if (asistente) {
        await deleteEntity<Asistente>(API_ASISTENTE_PATH, asistente.id, token);
      } else {
        await createEntity<AsistenteForm, Asistente>(
          API_ASISTENTE_PATH,
          {
            participanteId: participanteId,
            sesionId: sesion.id,
          },
          token
        );
      }
    } catch (error: any) {
      if (error.message) {
        toast.error(`${error}`);
      }
    } finally {
      refreshAsistentes();
      refreshSesion();
    }
  }

  return (
    <ContentLayout title="Asistentes">
      <div className="w-full grid gap-2">
        {inscripciones &&
          inscripciones.map((inscripcion) => {
            const isAsistente =
              asistentes?.find(
                (asistente) =>
                  asistente.participante.id === inscripcion.participante.id
              ) !== undefined;

            return (
              <label
                className={`flex items-center gap-2 p-2 ${
                  isAsistente ? "bg-green-200" : ""
                } rounded-lg hover:cursor-pointer`}
                key={inscripcion.id}
              >
                <input
                  type="checkbox"
                  checked={isAsistente}
                  onChange={() => toggleAssist(inscripcion)}
                />

                {inscripcion.participante.nombre}
              </label>
            );
          })}
      </div>
    </ContentLayout>
  );
}
