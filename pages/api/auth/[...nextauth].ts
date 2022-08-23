import NextAuth, { Profile } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { OAuthUserConfig } from "next-auth/providers";

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbacks: {
        async signIn({ user, account, profile, email, credentials }: any) {
          if (user.id) {
            return true;
          } else {
            return false;
          }
        },
        async redirect({ url, baseUrl }: any) {
          return url;
        },
        async session({ session, user, token }: any) {
          return session;
        },
        async jwt({ token, user, account, profile, isNewUser }: any) {
          return token;
        },
      },
    } as OAuthUserConfig<Profile>),
  ],
});
