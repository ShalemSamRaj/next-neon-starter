"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import InputWithIconForSignIn from "@/components/RoundedInput/InputWithIconForSignIn";
import SignInSIgnUpSkeleton from "../SignInSIgnUpSkeleton/SignInSIgnUpSkeleton";
import { useToastContext } from "@/context/Toast/ToastContext";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { LoginSchema } from "@/schemas";
import { createError } from "@/lib/utils";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { signIn } from "next-auth/react";

const LoginForm = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { toast } = useToastContext();
  const router = useRouter();

  const searchParams = useSearchParams();
  const errorData = searchParams.get("error");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (errorData) {
      const error = createError(errorData);
      setError(error);
      toast.error(error);
    }
  }, [errorData]);

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const res = await signIn("credentials", {
        callbackUrl: "/",
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (res?.error) {
        const err = createError(res?.error);
        setError(err);
        toast.error(err);
        return;
      }

      setSuccess("Login Successfull");
      toast.success("Login Successfull");
      router.push("/");
    });
  };

  if (isPending) {
    return <SignInSIgnUpSkeleton inputsCount={2} />;
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormControl>
                  <InputWithIconForSignIn
                    field={field}
                    icon={faEnvelope}
                    type="email"
                    placeHolder="Email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormControl>
                  <InputWithIconForSignIn
                    field={field}
                    icon={faLock}
                    type="password"
                    placeHolder="Password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="flex justify-end">
            <Link href={"/forget-password"} className="underline">
              Forget Password?
            </Link>
          </p>
          <FormError message={error} />
          <FormSuccess message={success} />
          <div className="flex justify-center items-center">
            <Button type="submit" className="mt-4 w-full">
              Submit
            </Button>
          </div>
        </form>
      </Form>
      <>{children}</>
    </div>
  );
};

export default LoginForm;
