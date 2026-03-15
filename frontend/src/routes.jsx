import { createBrowserRouter, Navigate } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { Layout } from "./components/Layout";
import { LandingPage } from "./components/LandingPage";
import { NotFoundPage } from "./components/NotFoundPage";
import { AccessDeniedPage } from "./components/AccessDeniedPage";

// Authentication
import { RoleSelection } from "./components/auth/RoleSelection";
import { CustomerLogin } from "./components/auth/CustomerLogin";
import { CustomerSignup } from "./components/auth/CustomerSignup";
import { VerifierLogin } from "./components/auth/VerifierLogin";

// Customer Routes
import { ProfileCreation } from "./components/customer/ProfileCreation";
import { CustomerDashboard } from "./components/customer/CustomerDashboard";
import { CustomerProfile } from "./components/customer/CustomerProfile";

// Admin Routes
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { IssuerPortal } from "./components/admin/IssuerPortal";
import { VerifierPortal } from "./components/admin/VerifierPortal";

// Legal
import { Terms } from "./components/Terms";
import { Privacy } from "./components/Privacy";

// Protected Route
import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        Component: Layout,
        children: [
          // Landing Page
          {
            index: true,
            Component: LandingPage,
          },
          
          // Legal Pages (Public)
          {
            path: "terms",
            Component: Terms,
          },
          {
            path: "privacy",
            Component: Privacy,
          },
          
          // Authentication Routes (Public)
          {
            path: "auth/role-selection",
            Component: RoleSelection,
          },
          {
            path: "auth/customer/login",
            Component: CustomerLogin,
          },
          {
            path: "auth/customer/signup",
            Component: CustomerSignup,
          },
          {
            path: "auth/verifier/login",
            Component: VerifierLogin,
          },
          
          // Customer Routes (Protected - Customer Role Only)
          {
            path: "customer/profile-creation",
            element: (
              <ProtectedRoute requiredRole="customer">
                <ProfileCreation />
              </ProtectedRoute>
            ),
          },
          {
            path: "customer/dashboard",
            element: (
              <ProtectedRoute requiredRole="customer">
                <CustomerDashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: "customer/profile",
            element: (
              <ProtectedRoute requiredRole="customer">
                <CustomerProfile />
              </ProtectedRoute>
            ),
          },
          
          // Admin/Verifier Routes (Protected - Verifier Role Only)
          {
            path: "admin/dashboard",
            element: (
              <ProtectedRoute requiredRole="verifier">
                <AdminDashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: "admin/issuer",
            element: (
              <ProtectedRoute requiredRole="verifier">
                <IssuerPortal />
              </ProtectedRoute>
            ),
          },
          {
            path: "admin/verifier",
            element: (
              <ProtectedRoute requiredRole="verifier">
                <VerifierPortal />
              </ProtectedRoute>
            ),
          },
          
          // Access Denied Page
          {
            path: "access-denied",
            Component: AccessDeniedPage,
          },
          
          // 404 Catch All
          {
            path: "*",
            Component: NotFoundPage,
          },
        ],
      },
    ],
  },
]);