import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";

export default function App() {
  return (
    <>
      <main className="grid lg:grid-cols-[auto_1fr]">
        <Sidebar />
        <div className="box-border p-6">
          <Outlet />
        </div>
      </main>
    </>
  );
}
