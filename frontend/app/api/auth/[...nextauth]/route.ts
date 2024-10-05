import NextAuth, { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: "worldcoin",
      name: "Worldcoin",
      type: "oauth",
      wellKnown: "https://id.worldcoin.org/.well-known/openid-configuration",
      authorization: { 
        params: { scope: "openid" }, // Corrected: removed 'redirect_uri'
      },
      clientId: process.env.WLD_CLIENT_ID,
      clientSecret: process.env.WLD_CLIENT_SECRET,
      idToken: true,
      checks: ["state", "nonce", "pkce"],
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.sub,
          verificationLevel: profile["https://id.worldcoin.org/v1"].verification_level,
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT Callback:", token, user); // Log the incoming token and user
      if (user) {
        token.id = user.id;
        token.verificationLevel = user.verificationLevel;
        console.log("JWT Token after login:", token); 
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session Callback:", session, token); // Log session and token
      session.user.id = token.id;
      session.user.verificationLevel = token.verificationLevel;
      console.log("Session Data:", session); 
      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : `${baseUrl}/twitter`;
    },
  },
  session: {
    strategy: "jwt", 
    maxAge: 24 * 60 * 60, 
  },
  pages: {
    signIn: "/login",
  },
  debug: true,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };