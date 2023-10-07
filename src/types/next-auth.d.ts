import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      college: string;
      email: string;
      mobile: string;
      photoUrl: string;
      sid: string;
    };
  }
}