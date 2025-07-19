import { redirect } from "next/navigation";

import { auth } from "@/auth";

export default async function Page({
  params,
}: {
  params: Promise<{ slideshowId: string; slideId: string }>;
}) {
  const session = await auth();
  if (!session) return redirect("/");

  const { slideshowId, slideId } = await params;
  return (
    <>
      <div>Slideshow ID: {slideshowId}</div>
      <div>Slide ID: {slideId}</div>
    </>
  );
}
