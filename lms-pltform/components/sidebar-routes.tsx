import { BarChart, CompassIcon, Layout, List } from "lucide-react";
import { FC } from "react";
import NavItemSidbar from "./ui/nav-item-sidebar";
import { usePathname } from "next/navigation";

interface SidebarRoutesProps {}

const navRoutes = [
  {
    label: "Dashbord",
    icon: Layout,
    herf: "/dashbord",
  },
  {
    label: "Browse",
    icon: CompassIcon,
    herf: "/search",
  },
];
const TeacherRoutes = [
  {
    label: "Courses",
    icon: List,
    herf: "/teacher/courses",
  },
  {
    label: "Analytics",
    icon: BarChart,
    herf: "/teacher/analytics",
  },
];

const SidebarRoutes: FC<SidebarRoutesProps> = ({}) => {
  const  pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname?.startsWith("/chapter");

  const routes = isTeacherPage? TeacherRoutes: navRoutes;
  return (
    <>
      {routes.map((item) => (
        <NavItemSidbar key={item.herf} icon={item.icon} herf={item.herf} label={item.label} />
      ))}
    </>
  );
};

export default SidebarRoutes;
