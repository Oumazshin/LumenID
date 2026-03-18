/**
 * Authentication Service
 * Handles user authentication, registration, and session management
 */

import { apiClient } from "../lib/api-client";

export class AuthService {
  /**
   * Login a user with email and password
   */
  async login(request) {
    // TODO: Replace with real API call when backend is ready
    // return apiClient.post("/auth/login", request);

    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          id: `user-${Date.now()}`,
          email: request.email,
          role: request.role,
          name: request.email.split("@")[0],
          createdAt: new Date().toISOString(),
        };

        resolve({
          success: true,
          data: mockUser,
          message: "Login successful",
        });
      }, 800);
    });
  }

  /**
   * Login a verifier with 2FA
   */
  async verifierLogin(request) {
    // TODO: Replace with real API call when backend is ready
    // return apiClient.post("/auth/verifier-login", request);

    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!request.twoFactorCode || request.twoFactorCode !== "123456") {
          resolve({
            success: false,
            error: "Invalid 2FA code",
          });
          return;
        }

        const mockUser = {
          id: `verifier-${Date.now()}`,
          email: request.email,
          role: "verifier",
          name: request.email.split("@")[0],
          createdAt: new Date().toISOString(),
        };

        resolve({
          success: true,
          data: mockUser,
          message: "Verifier login successful",
        });
      }, 800);
    });
  }

  /**
   * Register a new customer
   */
  async signup(request) {
    // TODO: Replace with real API call when backend is ready
    // return apiClient.post("/auth/signup", request);

    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          id: `user-${Date.now()}`,
          email: request.email,
          role: "customer",
          name: request.name || request.email.split("@")[0],
          createdAt: new Date().toISOString(),
        };

        resolve({
          success: true,
          data: mockUser,
          message: "Account created successfully",
        });
      }, 800);
    });
  }

  /**
   * Logout the current user
   */
  async logout() {
    // TODO: Replace with real API call when backend is ready
    // return apiClient.post("/auth/logout");

    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "Logged out successfully",
        });
      }, 300);
    });
  }

  /**
   * Get current user session
   */
  async getSession() {
    // TODO: Replace with real API call when backend is ready
    // return apiClient.get("/auth/session");

    // Mock implementation - check sessionStorage
    try {
      const storedAuth = sessionStorage.getItem("auth");
      if (storedAuth) {
        const { user } = JSON.parse(storedAuth);
        return {
          success: true,
          data: user,
        };
      }
    } catch (error) {
      console.error("Failed to parse session:", error);
    }

    return {
      success: true,
      data: null,
    };
  }

  /**
   * Request password reset
   */
  async requestPasswordReset(email) {
    // TODO: Replace with real API call when backend is ready
    // return apiClient.post("/auth/forgot-password", { email });

    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "Password reset email sent",
        });
      }, 800);
    });
  }

  /**
   * Request verifier access
   */
  async requestVerifierAccess(data) {
    // TODO: Replace with real API call when backend is ready
    // return apiClient.post("/auth/request-access", data);

    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "Access request submitted successfully",
        });
      }, 800);
    });
  }
}

export const authService = new AuthService();