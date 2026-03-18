/**
 * Credential Service
 * Handles credential issuance, verification, and management
 */

import { apiClient } from "../lib/api-client";
import { mockCredentials, mockInstitutionDID, mockStudentDID, mockPendingCredentials } from "../data/mockData";

export class CredentialService {
  /**
   * Get credentials for a user by DID
   */
  async getCredentialsByDID(did) {
    // TODO: Replace with real API call when backend is ready
    // return apiClient.get(`/credentials/did/${did}`);

    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const credentials = mockCredentials.filter((c) => c.recipientDID === did);
        resolve({
          success: true,
          data: credentials,
        });
      }, 500);
    });
  }

  /**
   * Get DID document by DID identifier
   */
  async getDIDDocument(did) {
    // TODO: Replace with real API call when backend is ready
    // return apiClient.get(`/did/${did}`);

    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        if (did.includes("student")) {
          resolve({
            success: true,
            data: mockStudentDID,
          });
        } else if (did.includes("excellence.edu")) {
          resolve({
            success: true,
            data: mockInstitutionDID,
          });
        } else {
          resolve({
            success: false,
            error: "DID not found",
          });
        }
      }, 500);
    });
  }

  /**
   * Issue a new credential
   */
  async issueCredential(credentialData) {
    // TODO: Replace with real API call when backend is ready
    // return apiClient.post("/credentials/issue", credentialData);

    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const newCredential = {
          id: `cred-${Date.now()}`,
          type: credentialData.type || "UniversityDegreeCredential",
          issuer: credentialData.issuer || "Unknown Issuer",
          issuerDID: credentialData.issuerDID || "did:web:issuer.example",
          recipient: credentialData.recipient || "Unknown Recipient",
          recipientDID: credentialData.recipientDID || "did:lumen:recipient",
          issuedDate: new Date().toISOString(),
          status: "pending",
          claims: credentialData.claims || {
            fullName: "Unknown",
            program: "Unknown Program",
          },
          schema: credentialData.schema || "UniversityDegreeCredential (JSON-LD)",
        };

        resolve({
          success: true,
          data: newCredential,
          message: "Credential issued successfully",
        });
      }, 1000);
    });
  }

  /**
   * Verify a credential by ID
   */
  async verifyCredential(credentialId) {
    // TODO: Replace with real API call when backend is ready
    // return apiClient.get(`/credentials/verify/${credentialId}`);

    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const credential = mockCredentials.find((c) => c.id === credentialId);
        if (credential) {
          resolve({
            success: true,
            data: {
              valid: credential.status === "active",
              details: `Credential ${credentialId} verified on blockchain`,
            },
          });
        } else {
          resolve({
            success: false,
            error: "Credential not found",
          });
        }
      }, 800);
    });
  }

  /**
   * Revoke a credential
   */
  async revokeCredential(credentialId, reason) {
    // TODO: Replace with real API call when backend is ready
    // return apiClient.post(`/credentials/${credentialId}/revoke`, { reason });

    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: `Credential ${credentialId} revoked`,
        });
      }, 800);
    });
  }

  /**
   * Get pending credential submissions for verification
   */
  async getPendingSubmissions() {
    // TODO: Replace with real API call when backend is ready
    // return apiClient.get("/credentials/submissions/pending");

    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [],
        });
      }, 500);
    });
  }

  /**
   * Search credentials by various criteria
   */
  async searchCredentials(query) {
    // TODO: Replace with real API call when backend is ready
    // return apiClient.get("/credentials/search", query);

    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        let results = [...mockCredentials];

        if (query.did) {
          results = results.filter(
            (c) => c.recipientDID === query.did || c.issuerDID === query.did
          );
        }
        if (query.type) {
          results = results.filter((c) => c.type === query.type);
        }
        if (query.issuer) {
          results = results.filter((c) => c.issuer.toLowerCase().includes(query.issuer.toLowerCase()));
        }
        if (query.status) {
          results = results.filter((c) => c.status === query.status);
        }

        resolve({
          success: true,
          data: results,
        });
      }, 600);
    });
  }
}

export const credentialService = new CredentialService();