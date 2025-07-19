import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      emailVerified: null;
      image: string;
    } & DefaultSession["user"];
    sessionToken: string;
    userId: string;
    expires: ISODateString;
  }
}
