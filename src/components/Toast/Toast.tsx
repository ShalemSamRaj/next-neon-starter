"use client";

import { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useToastContext } from "@/context/Toast/ToastContext";

const Toast = () => {
  const { showToast, status, message, clearToast } = useToastContext();

  const toastIcon =
    status === "success"
      ? faCircleCheck
      : status === "error"
      ? faCircleXmark
      : status === "warning"
      ? faCircleExclamation
      : faCircleInfo;

  const toastThemeAccent =
    status === "success"
      ? "border-success"
      : status === "error"
      ? "border-error"
      : status === "warning"
      ? "border-warning"
      : "border-info";

  const toastThemeBackground =
    status === "success"
      ? "bg-success"
      : status === "error"
      ? "bg-error"
      : status === "warning"
      ? "bg-warning"
      : "bg-info";

  const toastColor =
    status === "success"
      ? "text-white"
      : status === "error"
      ? "text-white"
      : status === "warning"
      ? "text-black"
      : "text-black";

  useEffect(() => {
    let timer = setTimeout(() => {
      clearToast();
    }, 10000);
    return () => {
      clearTimeout(timer);
    };
  });

  if (!showToast) {
    return;
  }

  return (
    <div
      className={`${toastThemeBackground} ${toastThemeAccent} ${toastColor} rounded mt-[8px] shadow-xl fixed top-[3px] right-[10px]  p-4 animate-show-me-slowly z-[1002] sm:w-[300px] md:w-[450px] mx-auto`}
    >
      <div className="relative flex justify-around">
        <div className="flex items-center text-xl mr-[8px] w-[85%] ">
          <div className="mr-[16px]">
            <FontAwesomeIcon icon={toastIcon} />
          </div>
          <span className="">{message}</span>
        </div>
        <button className="font-bold text-2xl" onClick={() => clearToast()}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
