import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

// Extend the default session
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      photoUrl?: string | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    photoUrl?: string | null;
  }

  interface JWT {
    id: string;
    name: string;
    email: string;
    photoUrl?: string | null;
  }
}
