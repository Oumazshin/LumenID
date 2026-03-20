/**
 * credential-service.js
 * Credential issuance, retrieval, verification, and revocation logic.
 *
 * Blockchain hook-points are clearly marked with TODO: BLOCKCHAIN
 * IPFS hook-points are marked with TODO: IPFS
 */

import { v4 as uuidv4 } from 'uuid';
import {
  mockCredentials,
  mockDIDDocuments,
  mockShareTokens,
} from '../data/mock-data.js';

// ─────────────────────────────────────────────────────────────────────────────
// READ
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get all credentials for the authenticated user (by userId)
 * Used by: GET /api/credentials
 */
export const getCredentialsByUser = (userId) =>
  mockCredentials.filter((c) => c.recipientUserId === userId);

/**
 * Get a single credential by its ID
 * Used by: GET /api/credentials/:id
 */
export const getCredentialById = (id) =>
  mockCredentials.find((c) => c.id === id) || null;

/**
 * Get credentials for a DID (issuer or recipient)
 * Used by: GET /api/credentials/did/:did
 */
export const getCredentialsByDID = (did) =>
  mockCredentials.filter(
    (c) => c.recipientDID === did || c.issuerDID === did
  );

/**
 * Resolve a DID Document
 * Used by: GET /api/did/:did
 *
 * TODO: BLOCKCHAIN — resolve DID Document from on-chain Registry contract
 *   const contract = new ethers.Contract(REGISTRY_ADDRESS, ABI, provider);
 *   const docURI = await contract.resolveDID(did);
 *   return await fetchFromIPFS(docURI);
 */
export const getDIDDocument = (did) => mockDIDDocuments[did] || null;

/**
 * Get all credentials with status "pending"
 * Used by: GET /api/credentials/submissions/pending (verifier-only)
 */
export const getPendingCredentials = () =>
  mockCredentials.filter((c) => c.status === 'pending');

/**
 * Search credentials by optional filters
 * Used by: GET /api/credentials/search
 */
export const searchCredentials = ({ did, type, issuer, status }) => {
  let results = [...mockCredentials];
  if (did)    results = results.filter((c) => c.recipientDID === did || c.issuerDID === did);
  if (type)   results = results.filter((c) => c.type === type);
  if (issuer) results = results.filter((c) => c.issuer.toLowerCase().includes(issuer.toLowerCase()));
  if (status) results = results.filter((c) => c.status === status);
  return results;
};

// ─────────────────────────────────────────────────────────────────────────────
// WRITE — Issuer actions
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Issue a new credential (Issuer → Student)
 * Used by: POST /api/credentials/issue
 *
 * TODO: IPFS  — upload nftImageFile, get back CID → nftMetadataURI
 * TODO: BLOCKCHAIN — hash credential claims, write hash + CID to Registry contract
 *   const hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(JSON.stringify(claims)));
 *   const tx = await contract.issueCredential(recipientDID, hash, metadataURI);
 *   await tx.wait();
 *   newCredential.blockchainHash = hash;
 *   newCredential.txHash = tx.hash;
 */
export const issueCredential = (credentialData) => {
  const {
    type,
    issuer,
    issuerDID,
    recipient,
    recipientDID,
    recipientUserId,
    claims,
    schema,
    nftImageURI,
  } = credentialData;

  const newCredential = {
    id: `cred-${uuidv4()}`,
    type: type || 'UniversityDegreeCredential',
    issuer: issuer || 'Unknown Issuer',
    issuerDID: issuerDID || 'did:lumen:issuer:unknown',
    recipient: recipient || claims?.fullName || 'Unknown',
    recipientDID: recipientDID || 'did:lumen:student:unknown',
    recipientUserId: recipientUserId || null,
    issuedDate: new Date().toISOString(),
    status: 'pending',  // Student must accept
    claims: claims || {},
    schema: schema || `${type || 'Credential'} (JSON-LD)`,
    blockchainHash: null,   // TODO: BLOCKCHAIN
    nftMetadataURI: null,   // TODO: IPFS
    nftImageURI: nftImageURI || null,
  };

  mockCredentials.push(newCredential);
  return newCredential;
};

// ─────────────────────────────────────────────────────────────────────────────
// WRITE — Student actions
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Student accepts a pending credential → status becomes "active"
 * Used by: POST /api/credentials/:id/accept
 */
export const acceptCredential = (id, userId) => {
  const cred = mockCredentials.find((c) => c.id === id && c.recipientUserId === userId);
  if (!cred) return null;
  if (cred.status !== 'pending') throw new Error('Only pending credentials can be accepted');
  cred.status = 'active';
  cred.acceptedAt = new Date().toISOString();
  return cred;
};

/**
 * Student rejects a pending credential → status becomes "rejected"
 * Used by: POST /api/credentials/:id/reject
 */
export const rejectCredential = (id, userId, reason) => {
  const cred = mockCredentials.find((c) => c.id === id && c.recipientUserId === userId);
  if (!cred) return null;
  if (cred.status !== 'pending') throw new Error('Only pending credentials can be rejected');
  cred.status = 'rejected';
  cred.rejectionReason = reason || 'No reason provided';
  cred.rejectedAt = new Date().toISOString();
  return cred;
};

/**
 * Student requests a credential from the issuer
 * Used by: POST /api/credentials/request
 */
export const requestCredential = (requestData, userId) => {
  // TODO: store request + notify issuer
  console.log('[Credential Request]', { userId, ...requestData });
  return { requestId: `req-${uuidv4()}`, status: 'submitted' };
};

// ─────────────────────────────────────────────────────────────────────────────
// WRITE — Verifier (Issuer) actions
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Revoke an issued credential → status becomes "revoked"
 * Used by: POST /api/credentials/:id/revoke
 *
 * TODO: BLOCKCHAIN — add credential ID to on-chain Revocation List
 *   const tx = await contract.revokeCredential(credentialId, reason);
 *   await tx.wait();
 */
export const revokeCredential = (id, reason) => {
  const cred = mockCredentials.find((c) => c.id === id);
  if (!cred) return null;
  cred.status = 'revoked';
  cred.revocationReason = reason || 'Revoked by issuer';
  cred.revokedAt = new Date().toISOString();
  return cred;
};

// ─────────────────────────────────────────────────────────────────────────────
// VERIFICATION  (public — no auth required)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Cryptographic verification of a credential
 * Used by: GET /api/credentials/verify/:id
 *
 * TODO: BLOCKCHAIN — re-hash credential claims and compare against on-chain hash
 *   const onChainHash = await contract.getCredentialHash(credentialId);
 *   const currentHash = ethers.utils.keccak256(...);
 *   const tamperProof  = onChainHash === currentHash;
 */
export const verifyCredential = (id) => {
  const cred = mockCredentials.find((c) => c.id === id);

  if (!cred) {
    return { valid: false, reason: 'Credential not found' };
  }

  if (cred.status === 'revoked') {
    return {
      valid: false,
      reason: 'Credential has been revoked',
      revokedAt: cred.revokedAt,
      revocationReason: cred.revocationReason,
    };
  }

  if (cred.status !== 'active') {
    return { valid: false, reason: `Credential status is "${cred.status}"` };
  }

  // Mock: credential is "verified" if it has a blockchainHash
  const tamperProof = Boolean(cred.blockchainHash);

  return {
    valid: true,
    tamperProof,
    credentialId: cred.id,
    issuer: cred.issuer,
    issuerDID: cred.issuerDID,
    recipient: cred.recipient,
    issuedDate: cred.issuedDate,
    blockchainHash: cred.blockchainHash,
    verifiedAt: new Date().toISOString(),
    // TODO: BLOCKCHAIN — include on-chain block number and txHash
  };
};

// ─────────────────────────────────────────────────────────────────────────────
// SELECTIVE DISCLOSURE — Share tokens  (Student → Verifier)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Create a time-bounded share token for selected credentials
 * Used by: POST /api/credentials/share
 * Returns a token the student gives to the verifier (as QR or link)
 */
export const createShareToken = (credentialIds, userId, ttlMinutes = 60) => {
  const token = uuidv4();
  const expiresAt = new Date(Date.now() + ttlMinutes * 60 * 1000).toISOString();

  mockShareTokens.set(token, { credentialIds, userId, expiresAt, ttlMinutes });

  return {
    token,
    shareURL: `/verify?token=${token}`,
    expiresAt,
    credentialCount: credentialIds.length,
  };
};

/**
 * Resolve a share token to its credentials
 * Used by: GET /api/credentials/shared/:token  (public)
 */
export const resolveShareToken = (token) => {
  const entry = mockShareTokens.get(token);

  if (!entry) return { valid: false, reason: 'Invalid or expired share link' };

  if (new Date(entry.expiresAt) < new Date()) {
    mockShareTokens.delete(token);
    return { valid: false, reason: 'Share link has expired' };
  }

  const credentials = entry.credentialIds
    .map((id) => mockCredentials.find((c) => c.id === id && c.status === 'active'))
    .filter(Boolean);

  return {
    valid: true,
    expiresAt: entry.expiresAt,
    credentials,
  };
};
