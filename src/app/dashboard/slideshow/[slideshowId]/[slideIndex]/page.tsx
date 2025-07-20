import { redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";

import { db } from "@/core/drizzle/db";
import { slideshows } from "@/core/drizzle/schema";
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

  let slideData;
  try {
    slideData = await db
      .select()
      .from(slides)
      .where(
        and(
          eq(slides.slideshowId, slideshowId),
          eq(slides.index, Number(slideIndex)),
        ),
      );
  } catch (e) {
    slideData = [
      {
        version: "6.7.0",
        objects: [
          {
            fontSize: 40,
            fontWeight: "normal",
            fontFamily: "Helvetica",
            fontStyle: "normal",
            lineHeight: 1.16,
            text: "wehweugh a Text",
            charSpacing: 0,
            textAlign: "left",
            styles: [],
            pathStartOffset: 0,
            pathSide: "left",
            pathAlign: "baseline",
            underline: false,
            overline: false,
            linethrough: false,
            textBackgroundColor: "",
            direction: "ltr",
            textDecorationThickness: 66.667,
            type: "IText",
            version: "6.7.0",
            originX: "left",
            originY: "top",
            left: 150,
            top: 99,
            width: 309.082,
            height: 45.2,
            fill: "white",
            stroke: null,
            strokeWidth: 1,
            strokeDashArray: null,
            strokeLineCap: "butt",
            strokeDashOffset: 0,
            strokeLineJoin: "miter",
            strokeUniform: false,
            strokeMiterLimit: 4,
            scaleX: 1,
            scaleY: 1,
            angle: 0,
            flipX: false,
            flipY: false,
            opacity: 1,
            shadow: null,
            visible: true,
            backgroundColor: "",
            fillRule: "nonzero",
            paintFirst: "fill",
            globalCompositeOperation: "source-over",
            skewX: 0,
            skewY: 0,
          },
        ],
      },
    ];
  }

  // console.log(slideData);

  return (
    <>
      {!slideData ? (
        <h2>THIS SLIDE DOES NOT EXIST!</h2>
      ) : (
        <SlideEditor defaultSlideData={slideData} />
      )}
    </>
  );
}
