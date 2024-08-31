"use client";

import React from "react";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import Avatar from "../Avatar/Avatar";
import DropDownMenu from "../DropDownMenu/DropDownMenu";

const ProfileDropDownMenu = () => {
  // const {} = useAppSelector(state => state.userData)
  const { data } = useSession();

  const router = useRouter();

  const processUserName = () => {
    if (data?.user?.name) {
      const nameParts = data.user.name.split(" ");
      let count = 0;
      let userString = "";

      for (let i = 0; i < nameParts.length; i++) {
        const text = nameParts[i];
        if (count < 2) {
          userString += text[0]; // Add a space between parts
          count++;
        } else {
          break; // Break out of the loop if count is 2 or more
        }
      }

      return userString;
    }

    return "UN";
  };

  const triggerElement = <Avatar fallBackText={processUserName()} />;
  return (
    <div>
      <DropDownMenu triggerElement={triggerElement}>
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator /> */}
        <DropdownMenuItem
          onClick={async () => {
            await signOut();
            router.push("/");
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropDownMenu>
    </div>
  );
};

export default ProfileDropDownMenu;
