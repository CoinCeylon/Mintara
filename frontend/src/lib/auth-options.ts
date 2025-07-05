import { loginAction, refreshAccessToken } from "@/lib/actions";
import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

async function refreshTokenHandler(
  refreshToken: string,
  token: JWT
): Promise<JWT> {
  const response = await refreshAccessToken(refreshToken);
  console.log(response);
  if (response?.status === "success") {
    return { ...token, ...response.data };
  }
  return token;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;
        const response = await loginAction({ email, password });
        if (response?.status === "error") {
          return null;
        }
        const user = response?.data as User;
        return user as User;
      },
    }),
  ],
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };
      const expiresIn = token.tokenInfo.accessTokenExpiresIn;
      console.log(expiresIn);
      const currentTime = new Date().getTime();
      console.log(currentTime);
      if (currentTime < expiresIn) return token;
      return await refreshTokenHandler(token.refreshToken as string, token);
    },

    async session({ token, session }) {
      session.user = token.user;
      session.tokenInfo = token.tokenInfo;
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
};
