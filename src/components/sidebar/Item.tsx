import { Link, useLocation } from "react-router-dom";
import Button from "../Button";

interface SidebarProps {
  icon: string;
  text: string;
  open: boolean;
  url: string;
}

export default function Sidebar({ icon, text, open, url }: SidebarProps) {
  const location = useLocation();

  return (
    <li>
      <Link
        to={url}
        className={`flex gap-2 p-2 rounded-xl ${
          location.pathname === url ? "bg-red-800" : ""
        }`}
      >
        <Button
          text={open ? text : ""}
          icon={icon}
          variant="no-background-inverse"
        />
      </Link>
    </li>
  );
}
