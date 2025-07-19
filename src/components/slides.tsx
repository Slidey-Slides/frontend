import Link from "next/link";
import Image, { StaticImageData } from "next/image";

import { eq } from "drizzle-orm";

import { db } from "@/core/drizzle/db";
import { slideshows as slideshowsTable } from "@/core/drizzle/schema";

import rick from "../../public/rick.jpeg";

export const Slides = async ({ id }: { id: string }) => {
  const slideshows = await db
    .select()
    .from(slideshowsTable)
    .where(eq(slideshowsTable.userId, id));

  return (
    <>
      {slideshows.map((slideshow) => (
        <SlidePreview
          key={slideshow.id}
          id={slideshow.id}
          name={slideshow.name}
          preview={rick}
        />
      ))}
    </>
  );
};

const SlidePreview = ({
  id,
  name,
  preview,
}: {
  id: string;
  name: string;
  preview: StaticImageData | string;
}) => {
  return (
    <Link href={`/dashboard/slide/${id}`}>
      <div className="flex flex-col gap-2 rounded-sm bg-neutral-900 p-2">
        <div>
          <Image
            src={preview}
            alt="Slideshow Preview"
            width={177.77777778}
            height={100}
          />
        </div>

        <div className="mx-auto h-[1px] w-full bg-black"></div>

        <h3 className="font-bold">{name}</h3>
      </div>
    </Link>
  );
};
