import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type DropDownMenuProps = {
  triggerElement: React.ReactNode;
  children: React.ReactNode;
};

const DropDownMenu = ({ triggerElement, children }: DropDownMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{triggerElement}</DropdownMenuTrigger>
      <DropdownMenuContent className="z-[10003]">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownMenu;
