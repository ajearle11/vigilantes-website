import NextAuth from "next-auth";
import { authOptions } from "./src/app/utils/authOptions";

const { auth, signIn, signOut } = NextAuth(authOptions);

export { auth, signIn, signOut };
