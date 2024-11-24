import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface SelectProps {
  label: string;
  name: string;
  children: ReactNode;
}

export default function Select({ label, name, children }: SelectProps) {
  const { register } = useFormContext();

  return (
    <div className="relative w-full">
      <select
        className="peer w-full px-5 py-3 rounded-xl bg-white border-2 border-neutral-300 outline outline-0 transition-all focus:border-gray-600 invalid:border-red-500"
        {...register(name)}
      >
        {children}
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
