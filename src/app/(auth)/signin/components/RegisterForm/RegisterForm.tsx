"use client";
import React, { useEffect, useState, useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
// import ImageUpload from "@/components/ImageUpload/ImageUpload";
import {
  faUser,
  faEnvelope,
  faLock,
  faKey,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";

import { RegisterSchema } from "@/schemas";
import InputWithIcon from "@/components/RoundedInput/InputWithIconForSignUp";
import { useToastContext } from "@/context/Toast/ToastContext";
import { register } from "@/lib/actions/auth";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import SignInSIgnUpSkeleton from "../SignInSIgnUpSkeleton/SignInSIgnUpSkeleton";
import { useSearchParams } from "next/navigation";
import { createError } from "@/lib/utils";

const RegisterForm = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { toast } = useToastContext();

  const searchParams = useSearchParams();
  const errorData = searchParams.get("error");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  useEffect(() => {
    if (errorData) {
      const error = createError(errorData);
      setError(error);
      toast.error(error);
    }
  }, [errorData]);

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const data = await register(values);
      if (data.error) {
        setError(data.error);
        toast.error(data.error);
      } else {
        setSuccess(data.data?.message);
        toast.success(data.data?.message);
        form.reset();
      }
    });
  };

  if (isPending) {
    return <SignInSIgnUpSkeleton inputsCount={3} />;
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormControl>
                  <InputWithIcon
                    field={field}
                    icon={faUser}
                    type="text"
                    placeHolder="Name"
                    isLoading={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormControl>
                  <InputWithIcon
                    field={field}
                    icon={faEnvelope}
                    type="email"
                    placeHolder="Email"
                    isLoading={isPending}
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
                  <InputWithIcon
                    field={field}
                    icon={faLock}
                    type="password"
                    placeHolder="Password"
                    isLoading={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={error} />
          <FormSuccess message={success} />
          <div className="flex justify-center items-center">
            <Button type="submit" className="mt-4 w-full" disabled={isPending}>
              Submit
            </Button>
          </div>
        </form>
      </Form>
      <>{children}</>
    </div>
  );
};

export default RegisterForm;
