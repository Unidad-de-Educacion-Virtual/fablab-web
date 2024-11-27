import { useState } from "react";
import { Icon } from "@iconify/react";
import ItemList from "./ItemList";
import UserBadge from "../UserBadge";

export default function SidebarDesktop() {
  const [open, setOpen] = useState(localStorage.getItem("menuOpen") === "true");

  function handleClick() {
    localStorage.setItem("menuOpen", `${!open}`);
    setOpen(!open);
  }

  return (
    <div className="hidden lg:grid gap-4">
      <div className="flex justify-between items-center">
        <div
          className="flex w-fit h-12 ml-2 items-center hover:cursor-pointer"
          onClick={handleClick}
        >
          <Icon icon="material-symbols:menu-rounded" width="24" height="24" />
        </div>
        <div className={`inline-block w-fit mr-2 ${!open ? "hidden" : ""}`}>
          <UserBadge />
        </div>
      </div>
      <ul className="flex flex-col gap-2">
        <ItemList open={open} />
      </ul>
    </div>
  );
}
