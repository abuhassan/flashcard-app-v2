import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role: string;
  }

  interface Session {
    user: {
      id: string;
      name: string; // This is the name of the user
      email: string;
      role: string;
    };
  }

  interface JWT {
    id: string;
    role: string;
  }
}