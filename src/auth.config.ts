import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Linkedin from "next-auth/providers/linkedin";
import Facebook from "next-auth/providers/facebook";
import Github from "next-auth/providers/github";

import { getUserByEmail } from "@/data/user";

import type { Provider } from "next-auth/providers";

const providers: Provider[] = [
  Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
  Facebook({
    clientId: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  }),
  Github({
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  }),
  Linkedin({
    clientId: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  }),
  Credentials({
    name: "credentials",
    credentials: {
      // email: { label: "Email", type: "email" },
      // password: { label: "Password", type: "password" },
    },
    async authorize(c) {
      // if (!c || typeof c.email !== "string" || typeof c.password !== "string") {
      //   return null;
      // }

      const { email, password } = c as { email: string; password: string };
      const user = await getUserByEmail(email);

      //    console.log("user in authorize:", user);

      if (!user || !user?.isverified) {
        // throw new Error("Email Not Found");
        return null;
      }

      const isValid = await bcrypt.compare(password, user?.password!);

      if (!isValid) {
        return null;
        // return `/signin?error=${"User not found"}`;
        // throw new Error("Password is infvalid");
      }
      return {
        id: user?.id.toString(),
        name: user?.name,
        email: user?.email,
        isverified: user?.isverified,
        loginplatform: user?.loginplatform,
        isresetpasswordused: user?.isresetpasswordused,
      };
    },
  }),
];

const authConfig = {
  providers,
};

export default authConfig;

// export default {
//   providers: [
//     Google({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     Github({
//       clientId: process.env.GITHUB_CLIENT_ID,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET,
//     }),
//     Credentials({
//       async authorize(credentials) {
//         const validatedFields = LoginSchema.safeParse(credentials);

//         if (validatedFields.success) {
//           const { email, password } = validatedFields.data;

//           const user = await getUserByEmail(email);
//           if (!user || !user.password) return null;

//           const passwordsMatch = await bcrypt.compare(password, user.password);

//           if (passwordsMatch) return user;
//         }

//         return null;
//       },
//     }),
//   ],
// } satisfies NextAuthConfig;
