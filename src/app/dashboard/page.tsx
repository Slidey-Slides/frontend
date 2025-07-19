import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Slides } from "@/components/slides";

export default async function Dashboard() {
  const session = await auth();

  if (!session) return redirect("/");

  return (
    <div className="mt-30">
      <Slides id={session.userId} />
    </div>
  );
}
