interface PropertyValueProps {
  name: string;
  value?: string | number;
}

export default function PropertyValue({ name, value }: PropertyValueProps) {
  return (
    <p className="flex gap-4 items-center">
      <span className="font-bold text-lg">{name}:</span>
      <span className="">{value}</span>
    </p>
  );
}
