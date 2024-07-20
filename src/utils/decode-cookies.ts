import { env } from "@/env";
import { decode } from "next-auth/jwt";

export const decodeCookies = async (token: string) => {
  const session = await decode({
    secret: env.NEXTAUTH_SECRET,
    token,
  });

  return session;
};
