import { ReactNode } from "react";

interface ContentLayoutInterface {
  title: ReactNode;
  button?: ReactNode;
  children?: ReactNode;
}

export default function ContentLayout({
  title,
  button,
  children,
}: ContentLayoutInterface) {
  return (
    <section className="max-w-screen-2xl mx-auto w-full">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">{title}</h1>
        {button}
      </div>
      <div className="flex justify-center mt-5">{children}</div>
    </section>
  );
}
