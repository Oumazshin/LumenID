/**
 * server.js
 * LumenID Backend — Entry Point
 *
 * Stack : Node.js + Express + Ethers.js (stub) + IPFS (stub)
 * Routes: /api/auth, /api/users, /api/credentials, /api/admin, /api/did
 */

import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import authRoutes       from './routes/auth.routes.js';
import userRoutes       from './routes/user.routes.js';
import credentialRoutes from './routes/credential.routes.js';
import adminRoutes      from './routes/admin.routes.js';

import * as CredService from './services/credential-service.js';
import * as R           from './utils/response.js';

const app  = express();
const PORT = process.env.PORT || 3001;

// ─── Core Middleware ─────────────────────────────────────────────────────────

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));   // 10 mb for base64 NFT images
app.use(express.urlencoded({ extended: true }));

// Request logger (dev only)
if (process.env.NODE_ENV !== 'production') {
  app.use((req, _res, next) => {
    console.log(`  ${req.method.padEnd(6)} ${req.path}`);
    next();
  });
}

// ─── API Routes ──────────────────────────────────────────────────────────────

app.use('/api/auth',        authRoutes);
app.use('/api/users',       userRoutes);
app.use('/api/credentials', credentialRoutes);
app.use('/api/admin',       adminRoutes);

// DID resolution — top-level shortcut mirroring W3C convention
// e.g. GET /api/did/did:lumen:issuer:lumenid-university
app.get('/api/did/:did', (req, res) => {
  const doc = CredService.getDIDDocument(req.params.did);
  if (!doc) return R.notFound(res, 'DID document not found');
  return R.ok(res, doc);
});

// ─── Health Check ────────────────────────────────────────────────────────────

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'LumenID Backend',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    blockchain: 'stub — not yet integrated',
    ipfs: 'stub — not yet integrated',
  });
});

// ─── 404 Handler ─────────────────────────────────────────────────────────────

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.path}`,
    data: null,
  });
});

// ─── Global Error Handler ────────────────────────────────────────────────────

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error('[Unhandled Error]', err);
  res.status(500).json({ success: false, message: 'Internal server error', data: null });
});

// ─── Start ───────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  const line = '═'.repeat(40);
  console.log(`\n  ╔${line}╗`);
  console.log(`  ║  LumenID Backend · Running              ║`);
  console.log(`  ║  http://localhost:${PORT}                  ║`);
  console.log(`  ║                                          ║`);
  console.log(`  ║  /api/auth        → Auth endpoints       ║`);
  console.log(`  ║  /api/users       → Profile & Vault      ║`);
  console.log(`  ║  /api/credentials → Credential CRUD      ║`);
  console.log(`  ║  /api/admin       → Admin dashboard      ║`);
  console.log(`  ║  /api/did         → DID resolution       ║`);
  console.log(`  ╚${line}╝\n`);
});
