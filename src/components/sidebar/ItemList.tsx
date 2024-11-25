import Item from "./Item";

interface ItemListProps {
  open: boolean;
}

export default function ItemList({ open }: ItemListProps) {
  return (
    <>
      <Item
        icon="material-symbols:home-outline-rounded"
        open={open}
        text="Inicio"
        url="/"
      ></Item>

      <Item
        icon="material-symbols:home-repair-service-outline-rounded"
        open={open}
        text="Talleres"
        url="/talleres"
      ></Item>

      <Item
        icon="ph:chalkboard-teacher"
        open={open}
        text="Instructores"
        url="/instructores"
      ></Item>

      <Item
        icon="f7:building-2"
        open={open}
        text="Ubicaciones"
        url="/ubicaciones"
      ></Item>

      <Item
        icon="material-symbols:id-card-outline-rounded"
        open={open}
        text="Tipos de Documento"
        url="/tipos-documento"
      ></Item>

      <Item
        icon="material-symbols:location-on-outline-rounded"
        open={open}
        text="Municipios"
        url="/municipios"
      ></Item>

      <Item
        icon="material-symbols:school-outline-rounded"
        open={open}
        text="Colegios"
        url="/colegios"
      ></Item>

      <Item
        icon="material-symbols:person-outline-rounded"
        open={open}
        text="Participantes"
        url="/participantes"
      ></Item>

      <Item
        icon="material-symbols:news-outline-rounded"
        open={open}
        text="Inscripciones"
        url="/inscripciones"
      ></Item>
    </>
  );
}
