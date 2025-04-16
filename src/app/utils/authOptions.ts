import { Account, Profile, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    Credentials({
      name: "Anonymous",
      credentials: {},
      async authorize() {
        return {
          id: crypto.randomUUID(),
          name: "Guest",
          role: "anon",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt" as const, // ✅ tells TS it's the literal 'jwt'
    maxAge: 5 * 60,
  },

  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWT;
      user?: User;
      account?: Account | null;
      profile?: Profile;
      trigger?: "signIn" | "signUp" | "update";
      isNewUser?: boolean;
    //   session?: any;
    }): Promise<JWT> {
      if (user) {
        token.id = (user as User & {id?: string, role?: string}).id;
        token.role = (user as User & {id?: string, role?: string}).role;
      }
      return token;
    },

    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
        } as typeof session.user & { id: string; role: string },
      };
    },
  },

  secret: process.env.AUTH_SECRET,
};
