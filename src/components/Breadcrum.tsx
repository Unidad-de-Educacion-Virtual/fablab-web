import { Breadcrumbs } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export default function BreadCrumb() {
  const { pathname } = useLocation();
  const paths = pathname.split("/");
  paths.shift();

  const breadcrumbNameMap = new Map<string, string>([
    ["talleres", "Taller"],
    ["programaciones", "Programaciones"],
  ]);

  return (
    <Breadcrumbs separator=">">
      {paths.map((path, i) => (
        <span className="hover:underline underline-offset-4">
          <Link to={`/${paths.slice(0, i + 1).join("/")}`}>
            {breadcrumbNameMap.get(path) || path}
          </Link>
        </span>
      ))}
    </Breadcrumbs>
  );
}
