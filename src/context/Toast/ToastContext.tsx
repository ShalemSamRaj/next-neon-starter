import { ReactNode } from "react";

import { createContext, useContext } from "react";
import { statusTypes } from "./ToastProvider";

interface ToastContextType {
  showToast: boolean;
  clearToast: () => void;
  message: string;
  status: string;
  toast: {
    info: (message?: string) => void;
    success: (message?: string) => void;
    warning: (message?: string) => void;
    error: (message?: string) => void;
  };
}

export const ToastContext = createContext<ToastContextType>(
  {} as ToastContextType
);

export const useToastContext = () => {
  const { showToast, clearToast, message, status, toast } =
    useContext(ToastContext);

  return { showToast, clearToast, message, status, toast };
};

export default ToastContext;
