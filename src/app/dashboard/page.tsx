import { redirect } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { auth } from "@/auth";
import { Slides } from "@/components/slides";

export default async function Dashboard() {
  const session = await auth();

  if (!session) return redirect("/");

  return (
    <div className="flex h-[calc(100lvh-8rem)] flex-col gap-4 space-y-8">
      <div className="w-full space-y-4">
        <h2 className="text-4xl font-bold">Create Project</h2>

        <div className="flex h-[100px] w-[177px] items-center justify-center bg-neutral-900">
          <FontAwesomeIcon icon={faPlus} className="w-8" />
        </div>
      </div>

      <div className="w-full space-y-4">
        <h2 className="text-4xl font-bold">Recent Projects</h2>

        <div className="flex h-full gap-4">
          <Slides id={session.userId} />
        </div>
      </div>
    </div>
  );
}
