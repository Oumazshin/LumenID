/**
 * @typedef {Object} Credential
 * @property {string} id
 * @property {string} type
 * @property {string} issuer
 * @property {string} issuerDID
 * @property {string} recipient
 * @property {string} recipientDID
 * @property {string} issuedDate
 * @property {'active' | 'revoked' | 'pending'} status
 * @property {Object} claims
 * @property {string} claims.fullName
 * @property {string} claims.program
 * @property {string} [claims.major]
 * @property {number} [claims.gpa]
 * @property {string} [claims.honors]
 * @property {string[]} [claims.skills]
 * @property {string} [claims.graduationDate]
 * @property {string} schema
 * @property {string} [hash]
 * @property {Object} [signatures]
 * @property {boolean} [signatures.registrar]
 * @property {boolean} [signatures.dean]
 */

/**
 * @typedef {Object} DIDDocument
 * @property {string} id
 * @property {string} name
 * @property {'institution' | 'student' | 'employer'} type
 * @property {string} [website]
 * @property {string} [location]
 * @property {string} publicKey
 * @property {string} [registrationNumber]
 * @property {string} blockchain
 * @property {boolean} verified
 */

export const mockInstitutionDID = {
  id: 'did:web:excellence.edu.ph',
  name: 'University of Excellence',
  type: 'institution',
  website: 'https://excellence.edu.ph',
  location: 'Manila, Philippines',
  publicKey: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb4',
  registrationNumber: 'CHED-2024-0156',
  blockchain: 'Polkadot',
  verified: true,
};

export const mockStudentDID = {
  id: 'did:lumen:student-xyz789',
  name: 'Jake Lamac',
  type: 'student',
  publicKey: '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199',
  blockchain: 'Polkadot',
  verified: true,
};

export const mockCredentials = [
  {
    id: 'cred-001',
    type: 'UniversityDegreeCredential',
    issuer: 'University of Excellence',
    issuerDID: 'did:web:excellence.edu.ph',
    recipient: 'Jake Lamac',
    recipientDID: 'did:lumen:student-xyz789',
    issuedDate: '2026-02-17',
    status: 'active',
    claims: {
      fullName: 'Jake Lamac',
      program: 'B.S. Computer Science',
      major: 'Computer Science',
      gpa: 3.85,
      honors: 'Cum Laude',
      skills: ['Python', 'Solidity', 'React', 'Blockchain'],
      graduationDate: '2026-05-15',
    },
    schema: 'UniversityDegreeCredential (JSON-LD)',
    hash: '0x7a2b8f3c9d1e6a4b5c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b',
    signatures: {
      registrar: true,
      dean: true,
    },
  },
  {
    id: 'cred-002',
    type: 'MicroCredential',
    issuer: 'University of Excellence',
    issuerDID: 'did:web:excellence.edu.ph',
    recipient: 'Jake Lamac',
    recipientDID: 'did:lumen:student-xyz789',
    issuedDate: '2025-11-20',
    status: 'active',
    claims: {
      fullName: 'Jake Lamac',
      program: 'Cybersecurity Cadet',
      skills: ['Security', 'Penetration Testing'],
    },
    schema: 'MicroCredential (JSON-LD)',
  },
  {
    id: 'cred-003',
    type: 'MicroCredential',
    issuer: 'University of Excellence',
    issuerDID: 'did:web:excellence.edu.ph',
    recipient: 'Jake Lamac',
    recipientDID: 'did:lumen:student-xyz789',
    issuedDate: '2025-12-10',
    status: 'active',
    claims: {
      fullName: 'Jake Lamac',
      program: 'Backend Dev (Level 2)',
      skills: ['Node.js', 'PostgreSQL', 'API Design'],
    },
    schema: 'MicroCredential (JSON-LD)',
  },
];

export const mockPendingCredentials = [
  {
    id: 'cred-pending-001',
    type: 'UniversityDegreeCredential',
    issuer: 'University of Excellence',
    issuerDID: 'did:web:excellence.edu.ph',
    recipient: 'Maria Santos',
    recipientDID: 'did:lumen:student-abc456',
    issuedDate: '2026-02-18',
    status: 'pending',
    claims: {
      fullName: 'Maria Santos',
      program: 'B.S. Information Technology',
      major: 'Information Technology',
      gpa: 3.92,
      honors: 'Magna Cum Laude',
      graduationDate: '2026-05-15',
    },
    schema: 'UniversityDegreeCredential (JSON-LD)',
    hash: '0x9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b',
    signatures: {
      registrar: true,
      dean: false,
    },
  },
];

export const mockIssuanceHistory = [
  ...mockCredentials,
  {
    id: 'cred-004',
    type: 'UniversityDegreeCredential',
    issuer: 'University of Excellence',
    issuerDID: 'did:web:excellence.edu.ph',
    recipient: 'John Doe',
    recipientDID: 'did:lumen:student-def123',
    issuedDate: '2026-01-15',
    status: 'revoked',
    claims: {
      fullName: 'John Doe',
      program: 'B.S. Computer Science',
      gpa: 3.5,
      graduationDate: '2026-05-15',
    },
    schema: 'UniversityDegreeCredential (JSON-LD)',
  },
];
