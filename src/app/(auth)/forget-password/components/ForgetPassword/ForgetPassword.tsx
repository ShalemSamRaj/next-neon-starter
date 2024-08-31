"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { useToastContext } from "@/context/Toast/ToastContext";
import { createError } from "@/lib/utils";
import { ForgetPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { forgetPassword } from "@/lib/actions/auth";

const ForgetPassword = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { toast } = useToastContext();
  const router = useRouter();

  const searchParams = useSearchParams();
  const errorData = searchParams.get("error");

  const form = useForm<z.infer<typeof ForgetPasswordSchema>>({
    resolver: zodResolver(ForgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    if (errorData) {
      const error = createError(errorData);
      setError(error);
      toast.error(error);
    }
  }, [errorData]);

  const onSubmit = (values: z.infer<typeof ForgetPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const { data, error } = await forgetPassword(values.email);

      if (error) {
        setError(error);
        toast.error(error);
        return;
      } else {
        setSuccess(data?.message);
        toast.success(data?.message);
      }

      router.push("/");
    });
  };
  return (
    <CardWrapper
      headerLabel="Forget Password"
      backButtonLabel="Wanna Signin?"
      backButtonHref="/signin"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="john.doe@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ForgetPassword;
