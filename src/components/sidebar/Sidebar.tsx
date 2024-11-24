import { useState } from "react";
import { Icon } from "@iconify/react";
import Item from "./Item";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <nav className="min-h-screen max-w-fit p-4 grid grid-rows-[1rem_1fr] gap-10 bg-red-500 text-white">
      <div className="inline-block hover:cursor-pointer" onClick={handleClick}>
        <Icon icon="material-symbols:menu-rounded" width="24" height="24" />
      </div>
      <ul className="flex flex-col gap-4">
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
          url="talleres"
        ></Item>

        <Item
          icon="ph:chalkboard-teacher"
          open={open}
          text="Instructores"
          url="instructores"
        ></Item>

        <Item
          icon="f7:building-2"
          open={open}
          text="Ubicaciones"
          url="ubicaciones"
        ></Item>

        <Item
          icon="material-symbols:id-card-outline-rounded"
          open={open}
          text="Tipos de Documento"
          url="tipos-documento"
        ></Item>

        <Item
          icon="material-symbols:location-on-outline-rounded"
          open={open}
          text="Municipios"
          url="municipios"
        ></Item>

        <Item
          icon="material-symbols:school-outline-rounded"
          open={open}
          text="Colegios"
          url="colegios"
        ></Item>

        <Item
          icon="material-symbols:person-outline-rounded"
          open={open}
          text="Participantes"
          url="participantes"
        ></Item>

        <Item
          icon="material-symbols:news-outline-rounded"
          open={open}
          text="Inscripciones"
          url="inscripciones"
        ></Item>
      </ul>
    </nav>
  );
}
