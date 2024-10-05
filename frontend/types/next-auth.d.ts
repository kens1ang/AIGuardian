// import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

// Extending the Session type
declare module "next-auth" {
  interface User {
    id: string;
    verificationLevel: string; // Add the custom verificationLevel field
  }

  interface Session {
    user: {
      id: string;
      verificationLevel: string; // Add the verificationLevel to the session user
    } & DefaultSession["user"];
  }
}

// Extending the JWT type
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    verificationLevel: string; // Add the verificationLevel to the JWT
  }
}
