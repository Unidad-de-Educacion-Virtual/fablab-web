import { useState } from "react";
import { Icon } from "@iconify/react";
import ItemList from "./ItemList";

export default function Sidebar() {
  const [open, setOpen] = useState(localStorage.getItem("menuOpen") === "true");

  function handleClick() {
    localStorage.setItem("menuOpen", `${!open}`);
    setOpen(!open);
  }

  return (
    <nav className="relative h-fit lg:h-full lg:min-h-screen w-fit bg-red-500 text-white">
      <div className="sticky w-screen lg:w-fit top-0 p-4 grid lg:grid-rows-[1rem_1fr] gap-10">
        <div
          className="inline-block m-2 hover:cursor-pointer"
          onClick={handleClick}
        >
          <Icon icon="material-symbols:menu-rounded" width="24" height="24" />
        </div>
        <ul className="hidden lg:flex flex-col gap-2">
          <ItemList open={open} />
        </ul>
        <ul className={`${!open ? "hidden" : ""} lg:hidden flex-col gap-2`}>
          <ItemList open={true} />
        </ul>
      </div>
    </nav>
  );
}
