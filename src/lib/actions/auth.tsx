"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { db } from "@/lib/db/db";
import {
  ForgetPasswordSchema,
  LoginSchema,
  RegisterSchema,
  ResetPasswordSchema,
} from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { AuthError } from "next-auth";
import { signIn } from "next-auth/react";
import Onboarding from "../../../emails/Onboarding";
import { sendEmail } from "../mail";
import ResetPassword from "../../../emails/ResetPassword";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  let data: { message: string } | null = null;
  let error: string = "";
  try {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser && existingUser.isverified) {
      return { error: "Email already in use!" };
    }

    //    console.log(existingUser);

    let user;
    if (existingUser) {
      user = await db.user.update({
        where: {
          email,
        },
        data: {
          name, // Specify the fields you want to update
          email,
          password: hashedPassword,
        },
      });
    } else {
      user = await db.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          loginplatform: "native",
        },
      });
    }

    const payload = { id: user.id };

    if (!process.env.JWT_ACCOUNT_ACTIVATION) {
      throw new Error("secret must be provided to verify token");
    }

    const token = jwt.sign(payload, process.env.JWT_ACCOUNT_ACTIVATION, {
      expiresIn: "10m",
    });

    const from = process.env.MAIL_FROM;
    const to = [email];
    const subject = "Please Verify your Account";
    const text = "Please Verify your Account!";
    const template = Onboarding({
      name: name,
      verifyLink: `${process.env.NEXT_PUBLIC_APP_URL}/verify-account/${token}`,
    });

    const { error } = await sendEmail(subject, from!, to, text, template);

    if (error) {
      throw new Error("Error Sending Welcome Email");
    }

    data = { message: "Confirmation email sent!" };
  } catch (err) {
    if (err instanceof z.ZodError) {
      let zodErr = "";
      const currentError = err.errors[0];
      currentError.path.forEach((p, i) => {
        if (i !== currentError.path.length - 1) {
          zodErr = zodErr + p + ".";
        } else {
          zodErr += p;
        }
      });
      err = zodErr + " : " + currentError.message;
    } else if (err instanceof Error) {
      error = err.message;
    } else {
      error = "Something Went Wrong!";
    }
  } finally {
    return {
      data,
      error,
    };
  }
};

export const verifyAccount = async (token: string) => {
  let data: { message: string } | null = null;
  let error;
  try {
    if (!token) {
      throw new Error("Token is Missing");
    }

    if (!process.env.JWT_ACCOUNT_ACTIVATION) {
      throw new Error("Secret is missing");
    }

    let verified: any;
    try {
      verified = jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION!);
    } catch (error) {
      throw new Error("Token Expired");
    }

    if (!verified) {
      throw new Error("Token Expired");
    }

    const id = verified.id;

    const user = await getUserById(id);
    if (!user) {
      throw new Error("User not found");
    }

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        isverified: true,
      },
    });

    data = { message: "Account Verified Successfully" };
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      let zodErr = "";
      const currentError = err.errors[0];
      currentError.path.forEach((p, i) => {
        if (i !== currentError.path.length - 1) {
          zodErr = zodErr + p + ".";
        } else {
          zodErr += p;
        }
      });
      err = zodErr + " : " + currentError.message;
    } else if (err instanceof Error) {
      error = err.message;
    } else {
      error = "Something Went Wrong!";
    }
  } finally {
    return { data, error };
  }
};

export const forgetPassword = async (email: string) => {
  let data: { message: string } | null = null;
  let error;
  try {
    const validationResult = ForgetPasswordSchema.safeParse({ email });
    if (!validationResult.success) {
      throw validationResult.error;
    }

    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      throw new Error(
        "If we find your account, We will send a Reset Password Link to your registered email. Please check your email."
      );
    }

    if (existingUser.loginplatform !== "native") {
      throw new Error(`Please try ${existingUser.loginplatform} login`);
    }

    const payload = { id: existingUser.id };

    if (!process.env.JWT_FORGET_PASSWORD) {
      throw new Error("secret must be provided to encrypt token");
    }

    const token = jwt.sign(payload, process.env.JWT_FORGET_PASSWORD, {
      expiresIn: "10m",
    });

    await db.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        isresetpasswordused: false,
      },
    });

    const from = process.env.MAIL_FROM;
    const to = [email];
    const subject = "Please Reset your Password";
    const text = "Please Verify your Account!";
    const template = ResetPassword({
      name: existingUser.name,
      resetLink: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${token}`,
    });

    const { error } = await sendEmail(subject, from!, to, text, template);

    if (error) {
      throw new Error("Error Sending Forget Password Email");
    }
    data = { message: "Reset Password Link sent to your email address" };
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      let zodErr = "";
      const currentError = err.errors[0];
      currentError.path.forEach((p, i) => {
        if (i !== currentError.path.length - 1) {
          zodErr = zodErr + p + ".";
        } else {
          zodErr += p;
        }
      });
      err = zodErr + " : " + currentError.message;
    } else if (err instanceof Error) {
      error = err.message;
    } else {
      error = "Something Went Wrong!";
    }
  } finally {
    return { data, error };
  }
};

export const resetPassword = async (
  values: z.infer<typeof ResetPasswordSchema>,
  token: string
) => {
  let data: { message: string } | null = null;
  let error: string | null = null;
  try {
    const validationResult = ResetPasswordSchema.safeParse(values);

    if (!validationResult.success) {
      throw validationResult.error;
    }

    if (!process.env.JWT_FORGET_PASSWORD) {
      throw new Error("secret must be provided to verify token");
    }

    const { password } = values;

    const verified: any = jwt.verify(token, process.env.JWT_FORGET_PASSWORD!);

    let userId;
    if (verified) {
      userId = verified.id;
    } else {
      throw new Error("Invalid token or token expired");
    }

    const existingUser = await getUserById(userId);

    if (!existingUser || !existingUser.isverified) {
      throw new Error(`User not found`);
    }

    if (existingUser?.isresetpasswordused) {
      throw new Error("You Already Reset Your Password");
    }

    if (existingUser.loginplatform !== "native") {
      throw new Error(`Please try ${existingUser.loginplatform} login`);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await db.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        isresetpasswordused: true,
        password: hashedPassword,
      },
    });

    data = { message: "Reset password Successfull" };
  } catch (err) {
    if (err instanceof z.ZodError) {
      let zodErr = "";
      const currentError = err.errors[0];
      currentError.path.forEach((p, i) => {
        if (i !== currentError.path.length - 1) {
          zodErr = zodErr + p + ".";
        } else {
          zodErr += p;
        }
      });
      err = zodErr + " : " + currentError.message;
    } else if (err instanceof Error) {
      error = err.message;
    } else {
      error = "Something Went Wrong!";
    }
  } finally {
    return {
      data,
      error,
    };
  }
};
