import { authOptions } from "@/app/utils/authOptions";
import NextAuth from "next-auth";

const { handlers } = NextAuth(authOptions);

export const { GET, POST } = handlers;
