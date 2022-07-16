import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
          return true;
        },
        async redirect({ url, baseUrl }) {
          return url;
        },
        async session({ session, user, token }) {
          return session;
        },
        async jwt({ token, user, account, profile, isNewUser }) {
          return token;
        },
      },
    }),
    // ...add more providers here
  ],
});
