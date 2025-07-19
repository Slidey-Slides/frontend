import { redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";

import { db } from "@/core/drizzle/db";
import { slides } from "@/core/drizzle/schema";
import { auth } from "@/auth";
import { SlideEditor } from "@/components/slideEditor";

export default async function Page({
  params,
}: {
  params: Promise<{ slideshowId: string; slideIndex: string }>;
}) {
  const session = await auth();
  if (!session) return redirect("/");

  const { slideshowId, slideIndex } = await params;

  const slideData = (
    await db
      .select()
      .from(slides)
      .where(
        and(
          eq(slides.slideshowId, slideshowId),
          eq(slides.index, Number(slideIndex)),
        ),
      )
  )[0];

  return (
    <>
      {!slideData ? (
        <h2>THIS SLIDE DOES NOT EXIST!</h2>
      ) : (
        <SlideEditor defaultSlideData={slideData.data} />
      )}
    </>
  );
}
