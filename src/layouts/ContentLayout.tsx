import { ReactNode } from "react";

interface ContentLayoutInterface {
  title: ReactNode;
  button: ReactNode;
  children?: ReactNode;
}

export default function ContentLayout({
  title,
  button,
  children,
}: ContentLayoutInterface) {
  return (
    <section>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">{title}</h2>
        {button}
      </div>
      <div className="flex justify-center mt-5">{children}</div>
    </section>
  );
}
