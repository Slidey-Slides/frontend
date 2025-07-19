import Image from "next/image";
import { Session } from "next-auth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faHome, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import { auth, signIn, signOut } from "../auth";

export const Navbar = async () => {
  const session = await auth();

  if (!session) {
    return <NavbarSignedOut />;
  }

  return <NavbarSignedIn session={session} />;
};

const NavbarSignedOut = () => {
  return (
    <nav className="absolute top-4 left-4 z-10 flex w-[calc(100%-2rem)] items-center justify-between p-4">
      <h2 className="font-bold">HOME</h2>

      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/dashboard" });
        }}
      >
        <button
          className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-white p-4 px-8 font-bold text-black"
          type="submit"
        >
          Sign In
          <span>|</span>
          <FontAwesomeIcon className="w-4" icon={faGoogle} />
        </button>
      </form>
    </nav>
  );
};

const NavbarSignedIn = ({ session }: { session: Session }) => {
  if (!session.user || !session.user.image) {
    return null;
  }

  return (
    <nav className="absolute top-4 left-4 z-10 flex w-[calc(100%-2rem)] items-center justify-between p-4">
      <div className="flex items-center justify-center gap-4 font-bold">
        <div className="h-16 w-16">
          <Image
            src={session.user.image}
            alt={`profile picture`}
            width={64}
            height={64}
          />
        </div>
        <div>Hello {session.user.name!}</div>
      </div>

      <div className="flex gap-4">
        <button
          className="flex h-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-white p-4 px-8 font-bold text-black"
          type="submit"
        >
          <FontAwesomeIcon className="w-4" icon={faHome} />
        </button>

        <button
          className="flex h-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-white p-4 px-8 font-bold text-black"
          type="submit"
        >
          Present
        </button>

        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button
            className="flex h-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-white p-4 px-8 font-bold text-black"
            type="submit"
          >
            <FontAwesomeIcon className="w-4" icon={faRightFromBracket} />
          </button>
        </form>
      </div>
    </nav>
  );
};
