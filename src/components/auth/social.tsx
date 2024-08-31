"use client";

import { signIn } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faGithub,
  faFacebook,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = async (
    provider: "google" | "facebook" | "github" | "linkedin"
  ) => {
    await signIn(provider, {
      callbackUrl: "/",
      redirect: false,
    });
  };

  return (
    <>
      <div className="flex justify-between items-center w-full gap-x-2 mt-4 flex-wrap">
        <Button
          size="lg"
          className="w-[23%] mb-2"
          variant="outline"
          onClick={() => onClick("google")}
        >
          <FontAwesomeIcon className="h-5 w-5" icon={faGoogle} />
        </Button>
        <Button
          size="lg"
          className="w-[23%] mb-2"
          variant="outline"
          onClick={() => onClick("facebook")}
        >
          <FontAwesomeIcon className="h-5 w-5" icon={faFacebook} />
        </Button>
        <Button
          size="lg"
          className="w-[23%] mb-2"
          variant="outline"
          onClick={() => onClick("github")}
        >
          <FontAwesomeIcon className="h-5 w-5" icon={faGithub} />
        </Button>
        <Button
          size="lg"
          className="w-[23%] mb-2"
          variant="outline"
          onClick={() => onClick("linkedin")}
        >
          <FontAwesomeIcon className="h-5 w-5" icon={faLinkedin} />
        </Button>
      </div>
    </>
  );
};
