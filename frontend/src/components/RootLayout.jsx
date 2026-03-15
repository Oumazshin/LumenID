import { Outlet } from "react-router";
import { AuthProvider } from "../contexts/AuthContext";
import { ThemeProvider } from "./ThemeProvider";
import { CosmicBackground } from "./CosmicBackground";
import { Toaster } from "./ui/sonner";

export function RootLayout() {
  return (
    <ThemeProvider defaultTheme="system">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-background focus:px-4 focus:py-2 focus:rounded-md focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        Skip to main content
      </a>
      <CosmicBackground />
      <AuthProvider>
        <Outlet />
      </AuthProvider>
      <Toaster />
    </ThemeProvider>
  );
}
