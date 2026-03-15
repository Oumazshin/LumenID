import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { LoginForm } from './LoginForm';

const restrictedBanner = (
  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 mb-6">
    <p className="text-xs text-emerald-400 text-center flex items-center justify-center gap-2">
      <ShieldCheck className="w-4 h-4" />
      This area is restricted to authorized personnel only.
    </p>
  </div>
);

const footerContent = (
  <div className="relative my-6">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full border-t"></div>
    </div>
    <div className="relative flex justify-center text-xs uppercase">
      <span className="bg-card px-2 text-muted-foreground">Need Access?</span>
    </div>
    <div className="text-center text-sm">
      <span className="text-muted-foreground">Don't have verifier credentials? </span>
      <Link to="/auth/request-access" className="text-primary font-semibold hover:underline">
        Request Access
      </Link>
    </div>
  </div>
);

export function VerifierLogin() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Verifier Portal
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to access the credential verification system
          </p>
        </div>

        <Card className="border border-border/50 bg-card/60 backdrop-blur-xl shadow-xl">
          <CardContent className="pt-6">
            {restrictedBanner}
            <LoginForm 
              role="verifier" 
              has2FA={true}
              className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:opacity-90 text-white border-0 shadow-lg"
              footerContent={footerContent}
            />
          </CardContent>
        </Card>

        <div className="text-center">
          <Link to="/auth/role-selection" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ← Back to role selection
          </Link>
        </div>
      </div>
    </div>
  );
}

