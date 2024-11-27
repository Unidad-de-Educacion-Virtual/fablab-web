import SidebarDesktop from "./SidebarDeskop";
import SidebarMobile from "./SidebarMobile";

export default function Sidebar() {
  return (
    <nav className="relative h-fit lg:h-full lg:min-h-screen w-fit bg-red-500 text-white">
      <div className="sticky w-screen lg:w-fit top-0 p-4">
        <SidebarDesktop />
        <SidebarMobile />
      </div>
    </nav>
  );
}
