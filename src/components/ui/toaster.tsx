
import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster 
      position="bottom-right" 
      toastOptions={{
        duration: 5000,
        className: "text-sm",
        style: {
          background: "white",
          color: "black",
          border: "1px solid #e2e8f0",
        },
      }} 
    />
  );
}
