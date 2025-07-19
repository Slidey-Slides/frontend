import { usePathname } from "next/navigation";

export const NavbarButtons = () => {
  const pathname = usePathname();

  console.log(pathname);

  return <div></div>;
};
