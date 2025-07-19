import Image from "next/image";
import { Session } from "next-auth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import { auth, signIn, signOut } from "../../auth";

export const Navbar = async () => {
  const session = await auth();

  if (!session) {
    return <NavbarSignedOut />;
  }

  return <NavbarSignedIn session={session} />;
};

const NavbarSignedOut = () => {
  return (
    <nav className="w-[calc(100%-2rem)] flex items-center justify-between p-4 absolute top-4 left-4 z-10">
      <h2 className="font-bold">HOME</h2>

      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/dashboard" });
        }}
      >
        <button
          className="p-4 bg-white rounded-xl cursor-pointer text-black font-bold px-8 flex gap-2 items-center justify-center"
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
    <nav className="w-[calc(100%-2rem)] flex items-center justify-between p-4 absolute top-4 left-4 z-10">
      <div className="flex items-center justify-center gap-4 font-bold">
        <div className="w-16 h-16">
          <Image
            src={session.user.image}
            alt={`profile picture`}
            width={64}
            height={64}
          />
        </div>
        <div>Hello {session.user.name!}</div>
      </div>

      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button
          className="p-4 bg-white rounded-xl cursor-pointer text-black font-bold px-8 flex gap-2 items-center justify-center"
          type="submit"
        >
          <FontAwesomeIcon className="w-4" icon={faRightFromBracket} />
        </button>
      </form>
    </nav>
  );
};
