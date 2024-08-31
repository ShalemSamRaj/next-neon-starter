import React from "react";
import { Input } from "../ui/input";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { ControllerRenderProps } from "react-hook-form";
import { LoginSchema } from "@/schemas";

type AuthSchema = typeof LoginSchema;

interface Props {
  icon: IconDefinition;
  // field: ControllerRenderProps<z.infer<AuthSchema>>;
  field: any;
  type?: string;
  placeHolder: string;
  rounded?: boolean;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

type RoundedInputProps = Props & InputProps;

const RoundedInputWithIconForSignIn = ({
  icon,
  field,
  type,
  placeHolder,
  rounded = false,
  ...props
}: RoundedInputProps) => {
  return (
    <div
      className={cn(
        "relative border flex outline-none items-center w-full rounded bg-background",
        rounded && "rounded-full"
      )}
    >
      <div
      // className="absolute top-[50%] -translate-y-[50%] left-[15px] text-shadow"
      >
        <FontAwesomeIcon
          icon={icon}
          size="sm"
          className="ml-4 text-foreground"
        />
        {/* {!field.value && (
                      <span className="ml-2 text-shadow">Email</span>
                    )} */}
      </div>
      <div className={cn("w-[98%] ", rounded && "rounded-full")}>
        <Input
          {...field}
          {...props}
          type={type ? type : "text"}
          placeholder={placeHolder}
          className={cn(
            "placeholder:text-foreground border-0 outline-none focus-visible:ring-0 ",
            rounded && "rounded-full"
          )}
        />
      </div>
    </div>
  );
};

export default RoundedInputWithIconForSignIn;
