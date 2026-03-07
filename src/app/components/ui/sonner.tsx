"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-[#282828] group-[.toaster]:text-white group-[.toaster]:border-gray-700 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-gray-300",
          actionButton: "group-[.toast]:bg-[#1DB954] group-[.toast]:text-black",
          cancelButton: "group-[.toast]:bg-gray-700 group-[.toast]:text-white",
          success: "group-[.toast]:bg-[#1DB954] group-[.toast]:text-black group-[.toast]:border-[#1DB954]",
          error: "group-[.toast]:bg-red-500 group-[.toast]:text-white group-[.toast]:border-red-600",
          warning: "group-[.toast]:bg-yellow-500 group-[.toast]:text-black group-[.toast]:border-yellow-600",
          info: "group-[.toast]:bg-blue-500 group-[.toast]:text-white group-[.toast]:border-blue-600",
        },
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };