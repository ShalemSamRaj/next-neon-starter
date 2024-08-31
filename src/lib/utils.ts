import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createError = (errorData: string) => {
  let error: string = "Something went wrong";
  switch (errorData) {
    case "CredentialsSignin":
      error = "Invalid email or password.";
      break;
    case "OAuthSignin":
      error = "OAuth sign-in failed. Please try again.";
      break;
    case "OAuthCallback":
      error = "OAuth callback failed. Please try again.";
      break;
    case "OAuthCreateAccount":
      error = "Failed to create an account with this provider.";
      break;
    case "EmailCreateAccount":
      error = "Failed to create an account with this email.";
      break;
    case "EmailSignin":
      error = "Failed to send sign-in email. Please try again.";
      break;
    case "Callback":
      error = "An error occurred during authentication callback.";
      break;
    case "OAuthAccountNotLinked":
      error =
        "Account already exists with a different sign-in method. Please use the originally used method.";
      break;
    case "SessionRequired":
      error = "You must be signed in to view this page.";
      break;
    case "Verification":
      error = "Email verification failed. Please try again.";
      break;
    case "AccessDenied":
      error = "You do not have permission to access this resource.";
      break;
    case "Configuration":
      error =
        "Authentication is not configured correctly. Please contact support.";
      break;
    default:
      error = errorData;
      break;
  }
  return error;
};
