import { redirect } from "next/navigation";

import { auth } from "@/auth";

export default async function Page({
  params,
}: {
  params: Promise<{ slideId: string }>;
}) {
  const session = await auth();
  if (!session) return redirect("/");

  const { slideId } = await params;
  return <div>My Post: {slideId}</div>;
}
