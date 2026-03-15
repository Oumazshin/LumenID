import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

import { LoginForm } from './LoginForm';
import { Button } from '../ui/button';

const restrictedBanner = (
  <div className="relative group overflow-hidden rounded-2xl border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-md p-4 mb-8">
    {/* Decorative background pulse */}
    <div className="absolute inset-0 bg-emerald-500/5 animate-pulse" />
    <div className="relative flex items-center gap-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
        <ShieldCheck className="w-5 h-5 text-emerald-400" />
      </div>
      <div className="space-y-0.5">
        <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Security Protocol</p>
        <p className="text-sm font-medium text-emerald-100/80">Authorized access only. Session monitored.</p>
      </div>
    </div>
  </div>
);

const footerContent = (
  <div className="mt-10 pt-8 border-t border-border/30">
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center text-center gap-1">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">New Credential Request</span>
        <p className="text-[13px] text-muted-foreground/60">Missing verifier permissions?</p>
      </div>
      <Link 
        to="/auth/request-access" 
        className="inline-flex items-center gap-2 group text-primary font-bold text-sm bg-primary/5 hover:bg-primary/10 border border-primary/20 px-4 py-2 rounded-full transition-all"
      >
        Request Access Portal
        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
          <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Link>
    </div>
  </div>
);

export function VerifierLogin() {
  return (
    <div className="flex items-center justify-center py-8 md:py-16">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="relative inline-block mb-6">
            <div className="absolute -inset-4 bg-emerald-500/20 rounded-full blur-2xl opacity-50" />
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center relative shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500">
              <ShieldCheck className="w-10 h-10 text-white drop-shadow-lg" />
            </div>
            {/* badge */}
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-lg bg-background border border-border shadow-sm flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>
          <h2 className="text-4xl font-black tracking-tighter bg-gradient-to-br from-white via-white to-emerald-500/50 bg-clip-text text-transparent">
            Verifier Portal
          </h2>
          <p className="mt-3 text-[15px] font-medium text-muted-foreground leading-relaxed max-w-xs mx-auto">
            Gateway to secure credential validation and identity verification.
          </p>
        </div>

        <LoginForm 
          role="verifier" 
          has2FA={true}
          buttonClassName="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:opacity-90 text-white border-0 shadow-lg text-center"
          headerContent={restrictedBanner}
          footerContent={footerContent}
        />

        <div className="text-center">
          <Button variant="ghost" className="text-muted-foreground hover:text-white transition-all group" asChild>
            <Link to="/auth/role-selection" className="flex items-center gap-2">
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              Switch Verification Role
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

