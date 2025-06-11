// import GoogleProvider from "next-auth/providers/google";

// const providers = [
//   GoogleProvider({
//     clientId: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     authorization: {
//       params: {
//         scope: "openid email profile https://www.googleapis.com/auth/calendar.readonly",
//         access_type: "offline",
//         prompt: "consent",
//       },
//     },
//   }),
// ];

// export const authConfig = {
//   providers,
//   callbacks: {
//     async signIn({ account, profile }) {
//       if (!account || !profile) {
//         return false;
//       }
//       return true;
//     },
//     async jwt({ token, account, profile }) {
//       if (account) {
//         token.accessToken = account.access_token;
//         token.refreshToken = account.refresh_token;
//         token.id = profile.sub;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.id;
//         session.accessToken = token.accessToken;
//         session.refreshToken = token.refreshToken;
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/",
//     error: "/error",
//   },
//   session: {
//     strategy: "jwt",
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   debug: process.env.NODE_ENV === "development",
// }; 