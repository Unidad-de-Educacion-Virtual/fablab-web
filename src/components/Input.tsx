import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  label: string;
  name: string;
  registerData: UseFormRegisterReturn;
  type?: "text" | "textarea";
}

export default function Input({
  label,
  name,
  type = "text",
  registerData,
}: InputProps) {
  const inputStyles =
    "peer w-full px-5 py-3 rounded-xl border-2 border-neutral-300 outline outline-0 transition-all focus:border-gray-600 invalid:border-red-500";

  return (
    <div className="relative w-full">
      {type === "textarea" ? (
        <textarea
          {...registerData}
          id={name}
          className={inputStyles}
        ></textarea>
      ) : (
        <input
          {...registerData}
          id={name}
          type={type}
          className={inputStyles}
        ></input>
      )}

      <label
        htmlFor={name}
        className="pointer-events-none absolute block bg-white px-2 left-4 -top-3 text-gray-500 transition-all peer-placeholder-shown:top-3 peer-focus:text-gray-600 peer-focus:-top-3 peer-invalid:text-red-500"
      >
        {label}
      </label>
    </div>
  );
}
