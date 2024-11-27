import { useFormContext } from "react-hook-form";

interface InputProps {
  name: string;
  label: string;
  type?: "text" | "textarea" | "date" | "time" | "number" | "password";
}

export default function Input({ label, name, type = "text" }: InputProps) {
  const { register, getFieldState } = useFormContext();
  const { invalid } = getFieldState(name);

  return (
    <div className="relative w-full">
      {type === "textarea" ? (
        <textarea
          {...register(name)}
          id={name}
          className={`peer w-full px-5 py-3 rounded-xl border-2 border-neutral-300 outline outline-0 transition-all focus:border-gray-600 ${
            invalid ? "border-red-500" : ""
          }`}
        ></textarea>
      ) : (
        <input
          {...register(name, {
            valueAsNumber: type === "number",
          })}
          id={name}
          type={type}
          className={`peer w-full px-5 py-3 rounded-xl border-2 border-neutral-300 outline outline-0 transition-all focus:border-gray-600 ${
            invalid ? "border-red-500" : ""
          }`}
        ></input>
      )}

      <p>{invalid && "invalid"}</p>

      <label
        htmlFor={name}
        className={`pointer-events-none absolute block bg-white px-2 left-4 -top-3 text-gray-500 transition-all peer-placeholder-shown:top-3 peer-focus:text-gray-600 peer-focus:-top-3 ${
          invalid ? "text-red-500" : ""
        }`}
      >
        {label}
      </label>
    </div>
  );
}
