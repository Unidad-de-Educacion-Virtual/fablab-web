import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

interface SidebarProps {
  icon: string;
  text: string;
  open: boolean;
  url: string;
}

export default function Sidebar({ icon, text, open, url }: SidebarProps) {
  return (
    <li>
      <Link to={url} className="flex gap-2">
        <Icon icon={icon} width="24" height="24" />
        {open ? text : ""}
      </Link>
    </li>
  );
}
