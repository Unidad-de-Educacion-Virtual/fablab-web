import { Breadcrumbs } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export default function BreadCrumb() {
  const { pathname } = useLocation();
  const paths = pathname.split("/");
  paths.shift();

  const breadcrumbNameMap = new Map<
    string,
    {
      name: string;
      target?: string;
    }
  >([
    [
      "talleres",
      {
        name: "Taller",
        target: "/talleres",
      },
    ],
    [
      "programaciones",
      {
        name: "Programaciones",
      },
    ],
    [
      "sesiones",
      {
        name: "Sesiones",
      },
    ],
  ]);

  return (
    <Breadcrumbs separator=">">
      {paths.map((path, i) => {
        const urlArr = paths.slice(0, i + 1);
        const pathInfo = breadcrumbNameMap.get(path) || {
          name: path,
          target: `/${urlArr.join("/")}`,
        };

        if (!pathInfo.target) {
          urlArr.pop();
          pathInfo.target = `/${urlArr.join("/")}`;
        }

        return (
          <span className="hover:underline underline-offset-4">
            <Link to={pathInfo.target}>{pathInfo.name}</Link>
          </span>
        );
      })}
    </Breadcrumbs>
  );
}
