import { auth } from "@/auth";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { ModeToggle } from "@/components/theme/ToggleTheme";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default async function Home() {
  const session = await auth();
  return (
    <div className="min-h-[calc(90vh-56px)] flex justify-center items-center p-4">
      <div>
        <h1 className="font-bold text-secondary text-center mb-4 text-5xl md:text-6xl">
          Home Page
        </h1>

        <div className="w-300">
          {session?.user && <FormSuccess message="You are Logged in" />}
        </div>
      </div>
    </div>
  );
}
