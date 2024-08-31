import React from "react";

import LoginAndRegister from "./components/LoginAndRegister/LoginAndRegister";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }
  return <LoginAndRegister />;
};

export default SignInPage;
