import React from "react";
import { Input } from "../ui/input";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { RegisterSchema } from "@/schemas";
import { cn } from "@/lib/utils";

type AuthSchema = typeof RegisterSchema;

interface Props {
  icon: IconDefinition;
  // field: ControllerRenderProps<z.infer<AuthSchema>>;
  field: any;
  placeHolder: string;
  isLoading?: boolean;
  type?: string;
  rounded?: boolean;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

type RoundedInputProps = Props & InputProps;

const RoundedInputWithIcon = ({
  icon,
  field,
  type,
  placeHolder,
  isLoading = false,
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
        className="bg-background"
      >
        <FontAwesomeIcon
          icon={icon}
          size="sm"
          className="ml-4 text-foreground bg-background"
        />
        {/* {!field.value && (
                      <span className="ml-2 text-shadow">Email</span>
                    )} */}
      </div>
      <div className={cn("w-[98%]", rounded && "rounded-full")}>
        <Input
          {...props}
          {...field}
          type={type ? type : "text"}
          value={typeof field.value === "string" ? field.value : ""}
          placeholder={placeHolder}
          disabled={isLoading}
          className={cn(
            "placeholder:text-foreground border-0 outline-none focus-visible:ring-0 ",
            rounded && "rounded-full"
          )}
        />
      </div>
    </div>
  );
};

export default RoundedInputWithIcon;
