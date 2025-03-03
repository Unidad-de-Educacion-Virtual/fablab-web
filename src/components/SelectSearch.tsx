import React from "react";
import { ReactNode, useState } from "react";
import { useFormContext } from "react-hook-form";

interface SelectSearchProps {
  label: string;
  name: string;
  children: ReactNode;
}

export default function SelectSearch({ label, name, children }: SelectSearchProps) {
  const { register } = useFormContext();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredChildren = React.Children.toArray(children).filter((child: any) =>
    child.props.children.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full px-5 py-3 mb-2 rounded-xl bg-white border-2 border-neutral-300 outline outline-0 transition-all focus:border-gray-600"
      />
      <select
        className="peer w-full px-5 py-3 rounded-xl bg-white border-2 border-neutral-300 outline outline-0 transition-all focus:border-gray-600 invalid:border-red-500"
        {...register(name)}
      >
        {filteredChildren}
      </select>

      <label
        htmlFor={name}
        className="pointer-events-none absolute block bg-white px-2 left-4 -top-3 text-gray-500 transition-all peer-placeholder-shown:top-3 peer-focus:text-gray-600 peer-focus:-top-3 peer-invalid:text-red-500"
      >
        {label}
      </label>
    </div>
  );
}