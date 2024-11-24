import { Icon } from "@iconify/react/dist/iconify.js";

interface ButtonProps {
  text: string;
  icon?: string;
  type?: "button" | "reset" | "submit";
  className?: string;
  variant?: "default" | "light" | "no-background" | "no-background-inverse";
  onClick?: () => void;
}

export default function Button({
  text,
  icon,
  type = "button",
  variant = "default",
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex w-fit h-fit items-center rounded-xl gap-2 transition font-bold  active:scale-95 ${
        variant === "no-background"
          ? " text-red-500  hover:text-red-600 active:text-red-700"
          : ""
      } ${variant === "no-background-inverse" ? " text-white" : ""} ${
        variant === "light"
          ? "px-4 py-3 text-red-500 bg-red-50 hover:text-red-600 hover:bg-red-100 active:text-red-700"
          : ""
      } ${
        variant === "default"
          ? "px-4 py-3 bg-red-500 text-white hover:bg-red-600 active:bg-red-700"
          : ""
      }
      
`}
    >
      {icon ? <Icon icon={icon} width="24" height="24" /> : ""}
      {text}
    </button>
  );
}
