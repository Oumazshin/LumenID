/**
 * LumenID Unified Icon System
 * ============================
 * Style Guide:
 * - ViewBox: 0 0 24 24
 * - Stroke weight: 1.5px (primary), 1.25px (secondary details)
 * - Stroke linecap: round | Stroke linejoin: round
 * - Aesthetic: Duotone (fill layer @ 12–20% + stroke layer @ 100%)
 * - All icons use `currentColor` for theme compatibility
 */

import { motion } from "framer-motion";

// ──────────────────────────────────────────────────────────────
// TRUST TRIANGLE: ROLE ICONS
// ──────────────────────────────────────────────────────────────

/**
 * ISSUER ICON — Institutional Authority
 */
export function IssuerIcon({ size = 24, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-label="Issuer — Institutional Authority"
      className={className}
    >
      <path d="M4 10.5V19H20V10.5L12 5.5L4 10.5Z" fill="currentColor" opacity="0.14" />
      <rect x="5" y="10" width="14" height="1.5" rx="0.5" fill="currentColor" opacity="0.25" />
      <path d="M2 10.5L12 5L22 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 10.5H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 10.5V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 10.5V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M2 19H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 12V18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 12V18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 12V18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="5" r="1.5" stroke="currentColor" strokeWidth="1.25" fill="currentColor" fillOpacity="0.3" />
    </svg>
  );
}

/**
 * HOLDER ICON — Sovereign Identity
 */
export function HolderIcon({ size = 24, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-label="Holder — Sovereign Identity"
      className={className}
    >
      <path
        d="M12 2L20.66 7V17L12 22L3.34 17V7L12 2Z"
        fill="currentColor"
        opacity="0.12"
      />
      <circle cx="12" cy="9.5" r="2.5" fill="currentColor" opacity="0.22" />
      <path
        d="M7.5 18.5C7.5 15.46 9.52 13 12 13C14.48 13 16.5 15.46 16.5 18.5"
        fill="currentColor"
        opacity="0.14"
      />
      <path
        d="M12 2L20.66 7V17L12 22L3.34 17V7L12 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M7.5 18.5C7.5 15.46 9.52 13 12 13C14.48 13 16.5 15.46 16.5 18.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * VERIFIER ICON — Instant Validation
 */
export function VerifierIcon({ size = 24, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-label="Verifier — Instant Validation"
      className={className}
    >
      <path
        d="M2 12C5 7 8.5 4.5 12 4.5C15.5 4.5 19 7 22 12C19 17 15.5 19.5 12 19.5C8.5 19.5 5 17 2 12Z"
        fill="currentColor"
        opacity="0.12"
      />
      <circle cx="12" cy="12" r="3.5" fill="currentColor" opacity="0.2" />
      <path
        d="M2 12C5 7 8.5 4.5 12 4.5C15.5 4.5 19 7 22 12C19 17 15.5 19.5 12 19.5C8.5 19.5 5 17 2 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10.5 12L11.5 13L13.5 10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 10L20 10"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
        strokeDasharray="2 3"
        opacity="0.35"
      />
    </svg>
  );
}

// ──────────────────────────────────────────────────────────────
// FUNCTIONAL CONCEPT ICONS
// ──────────────────────────────────────────────────────────────

export function SelectiveDisclosureIcon({ size = 24, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-label="Selective Disclosure Engine"
      className={className}
    >
      <rect x="3" y="4" width="18" height="4" rx="1.5" fill="currentColor" opacity="0.14" />
      <rect x="3" y="10" width="14" height="4" rx="1.5" fill="currentColor" opacity="0.1" />
      <rect x="3" y="16" width="9" height="4" rx="1.5" fill="currentColor" opacity="0.06" />
      <rect x="3" y="4" width="18" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6" cy="6" r="1" fill="currentColor" />
      <path d="M9 6H17" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <rect x="3" y="10" width="14" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6" cy="12" r="1" fill="currentColor" opacity="0.7" />
      <path d="M9 12H14" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity="0.7" />
      <rect x="3" y="16" width="9" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.35" />
      <circle cx="6" cy="18" r="1" fill="currentColor" opacity="0.25" />
      <path d="M9 18H11" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity="0.25" />
      <path d="M20 18C20 17 19.5 16 19 16M20 18C20 19 19.5 20 19 20" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity="0.4" />
      <circle cx="21" cy="12" r="1" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

export function MintCredentialIcon({ size = 24, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-label="Mint Credential"
      className={className}
    >
      <path d="M12 2L4 6V12C4 16.4 7.4 20.5 12 22C16.6 20.5 20 16.4 20 12V6L12 2Z" fill="currentColor" opacity="0.12" />
      <path d="M12 2L4 6V12C4 16.4 7.4 20.5 12 22C16.6 20.5 20 16.4 20 12V6L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 7V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 10L12 7L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ActivityLogsIcon({ size = 24, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-label="Activity Logs"
      className={className}
    >
      <path d="M3 12H5L8 4L16 20L19 12H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LegalStandingIcon({ size = 24, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-label="Legal Standing"
      className={className}
    >
      <path d="M12 3L4 7V12C4 16.97 7.58 21.5 12 22.5C16.42 21.5 20 16.97 20 12V7L12 3Z" fill="currentColor" opacity="0.12" />
      <path d="M12 3L4 7V12C4 16.97 7.58 21.5 12 22.5C16.42 21.5 20 16.97 20 12V7L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 13L12 11L14 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 11V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 17H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function BlockchainAnchorIcon({ size = 24, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-label="Blockchain Anchor"
      className={className}
    >
      <rect x="2" y="9" width="9" height="6" rx="3" fill="currentColor" opacity="0.14" />
      <rect x="13" y="9" width="9" height="6" rx="3" fill="currentColor" opacity="0.14" />
      <rect x="2" y="9" width="9" height="6" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13" y="9" width="9" height="6" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.5 9V7C10.5 5.9 11.17 5 12 5C12.83 5 13.5 5.9 13.5 7V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10.5 15V17C10.5 18.1 11.17 19 12 19C12.83 19 13.5 18.1 13.5 17V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M17.5 12L19 12" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity="0.5" />
      <path d="M5 12L6.5 12" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

export function ZKProofIcon({ size = 24, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-label="Zero-Knowledge Proof"
      className={className}
    >
      <path d="M12 2L4 6V12C4 16.4 7.4 20.5 12 22C16.6 20.5 20 16.4 20 12V6L12 2Z" fill="currentColor" opacity="0.12" />
      <path d="M12 2L4 6V12C4 16.4 7.4 20.5 12 22C16.6 20.5 20 16.4 20 12V6L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 11C8 11 8.75 10 9.5 10C10.25 10 11 11 11 11" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M8 11C8 11 8.75 12 9.5 12C10.25 12 11 11 11 11" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity="0.4" />
      <path d="M13 11C13 11 13.75 10 14.5 10C15.25 10 16 11 16 11" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M13 11C13 11 13.75 12 14.5 12C15.25 12 16 11 16 11" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity="0.4" />
      <circle cx="10.5" cy="16" r="1.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M12 16H15M15 15.3V16.7M14 15.55V16.45" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

export function TrustTriangle({ className = "", size = "md" }) {
  const iconSize = size === "sm" ? 32 : size === "md" ? 48 : 64;
  const roles = [
    {
      Icon: IssuerIcon,
      label: "Issuer",
      sublabel: "Institutional Authority",
      gradient: "from-violet-500 to-fuchsia-500",
      glow: "shadow-violet-500/30",
      ring: "border-violet-500/30",
    },
    {
      Icon: HolderIcon,
      label: "Holder",
      sublabel: "Sovereign Identity",
      gradient: "from-cyan-500 to-blue-500",
      glow: "shadow-cyan-500/30",
      ring: "border-cyan-500/30",
    },
    {
      Icon: VerifierIcon,
      label: "Verifier",
      sublabel: "Instant Validation",
      gradient: "from-emerald-500 to-teal-500",
      glow: "shadow-emerald-500/30",
      ring: "border-emerald-500/30",
    },
  ];

  return (
    <div className={`flex items-center justify-center gap-8 ${className}`}>
      {roles.map(({ Icon, label, sublabel, gradient, glow, ring }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className="flex flex-col items-center gap-3"
        >
          <div
            className={`bg-gradient-to-br ${gradient} rounded-2xl p-3 shadow-lg ${glow} border ${ring} border-opacity-30`}
          >
            <Icon size={iconSize} className="text-white" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold">{label}</p>
            <p className="text-xs text-muted-foreground">{sublabel}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
