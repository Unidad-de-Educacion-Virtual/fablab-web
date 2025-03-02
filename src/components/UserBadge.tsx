import { Popover } from "@mui/material";
import ProfileImage from "../assets/images/profile.svg";
import { MouseEvent, useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { useAuth } from "../providers/AuthProvider";

export default function UserBadge() {
  const { claims } = useAuth();
  const [open, setOpen] = useState(false);
  const [anchorElem, setAnchorElem] = useState<HTMLImageElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLImageElement>) => {
    console.log("click");
    setOpen(true);
    setAnchorElem(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorElem(null);
  };

  return (
    <div>
      <Popover
        slotProps={{
          paper: {
            className: "!rounded-xl",
          },
        }}
        open={open}
        anchorEl={anchorElem}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className="p-4 grid gap-4">
          <p className="font-bold text-center">{claims?.rol}</p>
          <hr />
          <Link to={"/logout"}>
            <Button
              text="Cerrar Sesión"
              variant="no-background"
              icon="ic:round-logout"
            />
          </Link>
        </div>
      </Popover>
      <img
        src={ProfileImage}
        className="rounded-full w-12 h-12 hover:cursor-pointer"
        onClick={handleClick}
      ></img>
    </div>
  );
}
