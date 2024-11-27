import { useState } from "react";
import { Icon } from "@iconify/react";
import ItemList from "./ItemList";
import UserBadge from "../UserBadge";

export default function SidebarMobile() {
  const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <div className="grid lg:hidden gap-4">
      <div className="flex justify-between items-center">
        <div
          className="flex w-fit h-12 ml-2 items-center hover:cursor-pointer"
          onClick={handleClick}
        >
          <Icon icon="material-symbols:menu-rounded" width="24" height="24" />
        </div>
        <div className="inline-block w-fit mr-2">
          <UserBadge />
        </div>
      </div>
      <ul className={`flex-col gap-2 ${!open ? "hidden" : ""}`}>
        <ItemList open={true} />
      </ul>
    </div>
  );
}
