import { Outlet } from "react-router";
import { AuthProvider } from "../contexts/AuthContext";
import { ThemeProvider } from "./ThemeProvider";
import { CosmicBackground } from "./CosmicBackground";
import { Toaster } from "./ui/sonner";

export function RootLayout() {
  return (
    <ThemeProvider defaultTheme="dark">
      <CosmicBackground />
      <AuthProvider>
        <Outlet />
      </AuthProvider>
      <Toaster />
    </ThemeProvider>
  );
}