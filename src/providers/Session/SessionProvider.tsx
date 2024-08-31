import { auth } from "@/auth";
import { SessionProvider as NextAuthSession } from "next-auth/react";

export default async function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return <NextAuthSession session={session}>{children}</NextAuthSession>;
}
