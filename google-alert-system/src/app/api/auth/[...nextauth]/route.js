import createApi from "@/lib/axios";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope:
            "openid email profile https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expires_at = account.expires_at;
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },

    async signIn({ user, account }) {
      if (account?.access_token) {
        try {
          const api = createApi(account.access_token);
          await api.post("/auth/create", {
            googleId: account.providerAccountId,
            email: user.email,
            name: user.name,
            image: user.image,
            accessToken: account.access_token,
            refreshToken: account.refresh_token,
          });
        } catch (error) {
          console.error(
            "Error saving user to backend:",
            error.response?.data || error.message
          );
        }
      } else {
        console.warn("No access token found during sign-in.");
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };
