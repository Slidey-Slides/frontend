"use client";

import { usePathname, useRouter } from "next/navigation";

export const NavbarButtons = () => {
  const pathname = usePathname();

  const router = useRouter();

  console.log(pathname.split("/"));

  const slideshowId = pathname.split("/")[3];
  const slideIndex = Number(pathname.split("/")[4]);

  if (pathname.split("/")[2] === "slideshow") {
    return (
      <>
        <button
          className="flex h-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-white p-4 px-8 font-bold text-black"
          type="submit"
          onClick={() => {
            router.push(
              `/dashboard/slideshow/${slideshowId}/${slideIndex > 1 ? slideIndex - 1 : 1}`,
            );
          }}
        >
          prev
        </button>

        <button
          className="flex h-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-white p-4 px-8 font-bold text-black"
          type="submit"
          onClick={() => {
            router.push(
              `/dashboard/slideshow/${slideshowId}/${slideIndex + 1}`,
            );
          }}
        >
          next
        </button>
      </>
    );
  }

  return null;
};
