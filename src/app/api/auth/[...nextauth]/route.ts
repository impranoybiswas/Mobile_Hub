import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // use JWT-based session
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const db = await getDatabase();
        const usersCollection = db.collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email.toLowerCase(),
        });
        if (!user) throw new Error("User not found");

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) throw new Error("Invalid password");

        // Return user object for JWT
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          photoUrl: user.photoUrl || null,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.photoUrl = user.photoUrl || null;
      }
      return token;
    },
    async session({ session, token }) {
      // Typecast token so TS knows its properties
      const t = token as {
        id: string;
        name: string;
        email: string;
        photoUrl?: string | null;
      };

      if (session.user) {
        session.user.id = t.id;
        session.user.name = t.name;
        session.user.email = t.email;
        session.user.photoUrl = t.photoUrl || null;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
