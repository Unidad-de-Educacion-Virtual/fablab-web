import Sidebar from "../components/sidebar/Sidebar";
import { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <main className="grid lg:grid-cols-[auto_1fr]">
        <Sidebar />
        <div className="box-border p-6">{children}</div>
      </main>
    </>
  );
}
