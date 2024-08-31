"use client";

import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RegisterForm from "../RegisterForm/RegisterForm";

import LoginForm from "../LoginForm/LoginForm";
import { Social } from "@/components/auth/social";

const LoginAndRegister = () => {
  return (
    <div className="w-full flex justify-center min-h-vh-minus-navh mt-4 items-center">
      <Tabs
        defaultValue="sign-in"
        className="sm:w-[90%] md:w-[80%] lg:w-[65%] max-w-[600px]"
      >
        <TabsList className="grid w-[100%] grid-cols-2 bg-primary">
          <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
          <TabsTrigger value="sign-in">Sign In</TabsTrigger>
        </TabsList>
        <TabsContent value="sign-up">
          <Card>
            <CardHeader>
              <CardTitle>Join Us</CardTitle>
              <CardDescription className="text-foreground">
                Join neon db. I found it Awesome. I hope you will too
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <RegisterForm>
                <Social />
              </RegisterForm>
            </CardContent>
            <CardFooter>{/* <Button>Save changes</Button> */}</CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="sign-in">
          <Card>
            <CardHeader>
              <CardTitle>Welcome Back!</CardTitle>
              <CardDescription className="text-foreground">
                We always welcome you to this amazing Community!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <LoginForm>
                <Social />
              </LoginForm>
            </CardContent>
            <CardFooter>{/* <Button>Save password</Button> */}</CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoginAndRegister;
