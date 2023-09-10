"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      herf: `/${params.storeId}`,
      label: "Home",
      active: pathname === `/${params.storeId}`,
    },
    {
      herf: `/${params.storeId}/billbords`,
      label: "billbords",
      active: pathname === `/${params.storeId}/billbords`,
    },
    {
      herf: `/${params.storeId}/categorys`,
      label: "Categorys",
      active: pathname === `/${params.storeId}/categorys`,
    },
    {
      herf: `/${params.storeId}/sizes`,
      label: "sizes",
      active: pathname === `/${params.storeId}/sizes`,
    },
    {
      herf: `/${params.storeId}/colors`,
      label: "colors",
      active: pathname === `/${params.storeId}/colors`,
    },
    {
      herf: `/${params.storeId}/products`,
      label: "products",
      active: pathname === `/${params.storeId}/products`,
    },
    {
      herf: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `/${params.storeId}/settings`,
    },
  ];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          href={route.herf}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary first-letter:capitalize",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
          key={route.herf}
        >
          {" "}
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export { MainNav };
