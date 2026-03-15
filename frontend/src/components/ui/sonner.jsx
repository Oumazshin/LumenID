// Removed Next.js directive for Vite

import { useState } from "react";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  const [theme] = useState("dark");

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      style={{
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
      }}
      {...props}
    />
  );
};

export { Toaster };