import { ROLE } from "../../config";
import { useAuth } from "../../providers/AuthProvider";
import Item from "./Item";

interface ItemListProps {
  open: boolean;
}

export default function ItemList({ open }: ItemListProps) {
  const { claims } = useAuth();
  return (
    <>
      {claims && [ROLE.ADMIN].includes(claims.rol) && (
        <Item
          icon="material-symbols:home-outline-rounded"
          open={open}
          text="Inicio"
          url="/"
        ></Item>
      )}

      {claims && [ROLE.ADMIN, ROLE.INSTRUCTOR].includes(claims.rol) && (
        <Item
          icon="material-symbols:home-repair-service-outline-rounded"
          open={open}
          text="Talleres"
          url="/talleres"
        ></Item>
      )}

      {claims && [ROLE.ADMIN].includes(claims.rol) && (
        <Item
          icon="ph:chalkboard-teacher"
          open={open}
          text="Instructores"
          url="/instructores"
        ></Item>
      )}

      {claims && [ROLE.ADMIN].includes(claims.rol) && (
        <Item
          icon="f7:building-2"
          open={open}
          text="Ubicaciones"
          url="/ubicaciones"
        ></Item>
      )}

      {claims && [ROLE.ADMIN].includes(claims.rol) && (
        <Item
          icon="material-symbols:id-card-outline-rounded"
          open={open}
          text="Tipos de Documento"
          url="/tipos-documento"
        ></Item>
      )}

      {claims && [ROLE.ADMIN].includes(claims.rol) && (
        <Item
          icon="material-symbols:location-on-outline-rounded"
          open={open}
          text="Municipios"
          url="/municipios"
        ></Item>
      )}

      {claims && [ROLE.ADMIN].includes(claims.rol) && (
        <Item
          icon="material-symbols:school-outline-rounded"
          open={open}
          text="Colegios"
          url="/colegios"
        ></Item>
      )}

      {claims && [ROLE.ADMIN, ROLE.INSTRUCTOR].includes(claims.rol) && (
        <Item
          icon="material-symbols:person-outline-rounded"
          open={open}
          text="Participantes"
          url="/participantes"
        ></Item>
      )}

      {claims && [ROLE.ADMIN].includes(claims.rol) && (
        <Item
          icon="material-symbols:news-outline-rounded"
          open={open}
          text="Inscripciones"
          url="/inscripciones"
        ></Item>
      )}
    </>
  );
}
