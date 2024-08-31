"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { useToastContext } from "@/context/Toast/ToastContext";
import { createError } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Error = () => {
  const [error, setError] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const errorData = searchParams.get("error");
  const { toast } = useToastContext();

  useEffect(() => {
    if (errorData) {
      const error = createError(errorData);
      setError(error);
      toast.error(error);
    }
  }, [errorData]);
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonHref="/signin"
      backButtonLabel="Back to login"
    >
      {error && <FormError message={error} />}
    </CardWrapper>
  );
};

export default Error;
