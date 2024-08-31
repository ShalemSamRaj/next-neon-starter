"use client";
import { ReactNode, useState, SetStateAction } from "react";

import ToastContext from "./ToastContext";

interface ToastProviderType {
  children: ReactNode;
}

export type statusTypes = "info" | "success" | "warning" | "error";

const ToastProvider = ({ children }: ToastProviderType) => {
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<statusTypes>("info");

  const info = (message: string = "Welcome to WEBDEVPARADISE") => {
    setShowToast(true);
    setMessage(message);
    setStatus("info");
  };

  const success = (message: string = "Success!!") => {
    setShowToast(true);
    setMessage(message);
    setStatus("success");
  };

  const warning = (message: string = "Warning!!") => {
    setShowToast(true);
    setMessage(message);
    setStatus("warning");
  };

  const error = (message: string = "Error!!") => {
    setShowToast(true);
    setMessage(message);
    setStatus("error");
  };

  const clearToast = () => {
    setShowToast(false);
    setMessage("");
    setStatus("info");
  };

  const toastContextValue = {
    showToast,
    clearToast,
    message,
    status,
    toast: {
      info,
      success,
      warning,
      error,
    },
  };

  return (
    <ToastContext.Provider value={toastContextValue}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
