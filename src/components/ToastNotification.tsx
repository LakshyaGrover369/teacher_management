import { XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";

interface ToastNotificationProps {
  message: string;
  type: "success" | "error" | "info";
  onDismiss: () => void;
  duration?: number;
}

export default function ToastNotification({
  message,
  type,
  onDismiss,
  duration = 5000,
}: ToastNotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  const bgColor = {
    success: "bg-green-50",
    error: "bg-red-50",
    info: "bg-blue-50",
  }[type];

  const textColor = {
    success: "text-green-800",
    error: "text-red-800",
    info: "text-blue-800",
  }[type];

  const iconColor = {
    success: "text-green-400",
    error: "text-red-400",
    info: "text-blue-400",
  }[type];

  return (
    <div className={`rounded-md p-4 ${bgColor} shadow-lg`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {type === "success" && (
            <svg
              className={`h-5 w-5 ${iconColor}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {type === "error" && (
            <svg
              className={`h-5 w-5 ${iconColor}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {type === "info" && (
            <svg
              className={`h-5 w-5 ${iconColor}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <div className="ml-3">
          <p className={`text-sm font-medium ${textColor}`}>{message}</p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              className={`inline-flex rounded-md p-1.5 ${bgColor} hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                type === "success"
                  ? "focus:ring-green-500"
                  : type === "error"
                  ? "focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
              onClick={onDismiss}
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon
                className={`h-5 w-5 ${iconColor}`}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
