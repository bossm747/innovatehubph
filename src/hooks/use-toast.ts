
// This is a wrapper around Radix UI Toast
import { Toast, ToastActionElement, ToastProps } from "@/components/ui/toast";
import {
  useCallback,
  type ReactNode,
} from "react";
import {
  useToast as useToastOriginal,
  toast as toastOriginal,
} from "sonner";

type ToasterToast = ToastProps & {
  id: string;
  title?: ReactNode;
  description?: ReactNode;
  action?: ToastActionElement;
};

// Use a custom hook that conforms to both our toast hook shape and sonner's shape
const useToast = () => {
  const { toast: toastFn, ...rest } = useToastOriginal();

  return {
    ...rest,
    toast: toastFn,
    toasts: [] as ToasterToast[],
  };
};

const toast = toastOriginal;

export { useToast, toast };
