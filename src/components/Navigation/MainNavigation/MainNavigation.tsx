"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { ModeToggle } from "@/components/theme/ToggleTheme";

import { useSession } from "next-auth/react";
import ProfileDropDownMenu from "../ProfileDropDownMenu/ProfileDropDownMenu";

const MainNavigation = ({
  layoutHorixontalPadString,
}: {
  layoutHorixontalPadString: string;
}) => {
  const { data } = useSession();
  //    console.log("Session Data", data);

  return (
    <div
      className={cn(
        "w-full bg-card px-6 py-2 justify-between flex items-center shadow-xl",
        layoutHorixontalPadString
      )}
    >
      <div className="flex-1">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className="cursor-pointer mr-3 text-secondary font-bold">
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink>{"NEON"}</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex-1 flex justify-end ">
        <NavigationMenu>
          <NavigationMenuList>
            {!data?.user && (
              <NavigationMenuItem className="cursor-pointer mr-3">
                <Link href="/signin" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Sign In
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )}

            {data?.user && (
              <NavigationMenuItem className="mr-3">
                <ProfileDropDownMenu />
              </NavigationMenuItem>
            )}
            <NavigationMenuItem className="cursor-pointer">
              <ModeToggle />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default MainNavigation;

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, href, children, ...props }, ref) => {
  return (
    <li className="bg-card shadow-xl">
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={href!}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
