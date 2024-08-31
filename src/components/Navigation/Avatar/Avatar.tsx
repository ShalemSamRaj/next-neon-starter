import React from "react";
import {
  Avatar as AvatarComponent,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

interface AvatarProps {
  imageUrl?: string;
  fallBackText: string;
}

const Avatar = ({ imageUrl, fallBackText }: AvatarProps) => {
  return (
    <AvatarComponent className="bg-transparent">
      <AvatarImage src={imageUrl} />
      <AvatarFallback className="text-white">{fallBackText}</AvatarFallback>
    </AvatarComponent>
  );
};

export default Avatar;
