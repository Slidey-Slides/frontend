import { db } from "@/core/drizzle/db";
import { slideshows as slideshowsTable } from "@/core/drizzle/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

export const Slides = async ({ id }: { id: string }) => {
  const slideshows = await db
    .select()
    .from(slideshowsTable)
    .where(eq(slideshowsTable.userId, id));

  return (
    <div>
      {slideshows.map((slideshow) => (
        <div key={slideshow.id}>
          <Link href={`/dashboard/slide/${slideshow.id}`}>
            {slideshow.name}
          </Link>
        </div>
      ))}
    </div>
  );
};
