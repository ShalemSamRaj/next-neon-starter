import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SignInSIgnUpSkeleton = ({ inputsCount }: { inputsCount: number }) => {
  return (
    <>
      {Array.from({ length: inputsCount }, (_, index) => index + 1).map(
        (_, i) => {
          return <Skeleton key={i} className="100%] h-[40px] rounded" />;
        }
      )}
      <div className="w-full flex justify-center items-center">
        <Skeleton className="167.425px] h-[40px] rounded" />
      </div>
      <Skeleton className="w-full h-[40px] rounded" />
      {Array.from({ length: 4 }, (_, index) => index + 1).map((_, i) => {
        return (
          <div key={i} className="w-full flex justify-center items-center">
            <Skeleton className="250px] h-[40px] rounded" />
          </div>
        );
      })}
      <div className="w-full flex justify-center items-center mt-4">
        <Skeleton className="250px] h-[40px] rounded" />
      </div>
    </>
  );
};

export default SignInSIgnUpSkeleton;
