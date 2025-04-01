
// This is a wrapper around sonner Toast
import { Toast, ToastActionElement, ToastProps } from "@/components/ui/toast";
import {
  useCallback,
  type ReactNode,
} from "react";
import { toast as toastOriginal } from "sonner";

type ToasterToast = ToastProps & {
  id: string;
  title?: ReactNode;
  description?: ReactNode;
  action?: ToastActionElement;
};

// Custom hook for toast functionality that works with our expected interface
const useToast = () => {
  // Create a simplified interface that maintains compatibility with our app
  return {
    toast: toastOriginal,
    toasts: [] as ToasterToast[],
    dismiss: (toastId?: string) => {
      if (toastId) {
        toastOriginal.dismiss(toastId);
      } else {
        toastOriginal.dismiss();
      }
    },
  };
};

const toast = toastOriginal;

export { useToast, toast };
