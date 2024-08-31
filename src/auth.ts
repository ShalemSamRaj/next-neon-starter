import NextAuth from "next-auth";
// import { UserRole } from "@prisma/client";
// import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "@/auth.config";
import { getUserByEmail, getUserById } from "./data/user";
import { db } from "./lib/db/db";
import { v4 as uuidv4 } from "uuid";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  // update,
} = NextAuth({
  pages: {
    signIn: "/signin",
    error: "/error",
  },
  // events: {
  //   async linkAccount({ user }) {
  //     await db.user.update({
  //       where: { id: user.id },
  //       data: { emailVerified: new Date() }
  //     })
  //   }
  // },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      // if (account?.provider !== "credentials") return true;
      //    console.log("Signin Started", user, "account", account);

      const { name, email } = user;
      const existingUser = await getUserByEmail(email!);
      let loginplatform = "native";
      if (account?.provider === "google") {
        loginplatform = "google";
      } else if (account?.provider === "facebook") {
        loginplatform = "facebook";
      } else if (account?.provider === "github") {
        loginplatform = "github";
      } else if (account?.provider === "linkedin") {
        loginplatform = "linkedin";
      } else {
        if (!existingUser?.isverified) return false;
        return true;
      }

      //    console.log("loginplatform", loginplatform);

      if (existingUser) {
        if (
          existingUser.loginplatform !== loginplatform ||
          !existingUser.isverified
        ) {
          //    console.log("User loginPlatform or isVerified");

          const loginPlatformString =
            existingUser.loginplatform === "native"
              ? "email and password"
              : existingUser.loginplatform;

          return `/signin?error=Please use your ${loginPlatformString} account to log in.`;
        }
        return true;
      }

      const password = email + uuidv4();

      await db.user.create({
        data: {
          name: name!,
          email: email!,
          password,
          loginplatform,
          isverified: true,
        },
      });

      //    console.log("user created");

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email!;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.loginplatform = existingUser.loginplatform;
      token.isresetpasswordused = existingUser.isresetpasswordused;
      return token;
    },
  },
  // adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
