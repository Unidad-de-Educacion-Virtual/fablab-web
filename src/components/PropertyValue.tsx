import { Icon } from "@iconify/react/dist/iconify.js";

interface PropertyValueProps {
  name: string;
  value?: string | number;
  icon?: string;
  color?: string;
  className?: string;
}

export default function PropertyValue({
  name,
  value,
  icon,
  color = "",
  className,
}: PropertyValueProps) {
  return (
    <div className={`inline-grid grid-cols-[auto_1fr] gap-2 ${className}`}>
      {icon && <Icon className={color} icon={icon} width="45" height="45" />}
      <div>
        <p className="text-sm">{name}</p>
        <p className="font-bold">{value}</p>
      </div>
    </div>
  );
}
