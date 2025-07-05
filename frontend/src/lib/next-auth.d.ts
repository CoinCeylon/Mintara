/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: number;
      email: string;
      username: string;
      wallet: string;
      createdAt: string;
      updatedAt: string;
    };
    tokenInfo: {
      accessToken: string;
      refreshToken: string;
      accessTokenExpiresIn: number;
      refreshTokenExpiresIn: number;
    };
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      _id: number;
      email: string;
      username: string;
      wallet: string;
      createdAt: string;
      updatedAt: string;
    };
    tokenInfo: {
      accessToken: string;
      refreshToken: string;
      accessTokenExpiresIn: number;
      refreshTokenExpiresIn: number;
    };
  }
}
