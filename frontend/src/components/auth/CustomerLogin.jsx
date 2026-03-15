import React from 'react';
import { Link } from 'react-router-dom';
import { UserCircle } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { LoginForm } from './LoginForm';
import { Button } from '../ui/button';

const footerContent = (
  <div className="mt-10 pt-8 border-t border-border/30">
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center text-center gap-1">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">New to LumenID?</span>
        <p className="text-[13px] text-muted-foreground/60">Create your digital credential vault</p>
      </div>
      <Link 
        to="/auth/customer/signup" 
        className="inline-flex items-center gap-2 group text-primary font-bold text-sm bg-primary/5 hover:bg-primary/10 border border-primary/20 px-4 py-2 rounded-full transition-all"
      >
        Sign Up for Access
        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
          <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Link>
    </div>
  </div>
);

export function CustomerLogin() {
  return (
    <div className="flex items-center justify-center py-8 md:py-16">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="relative inline-block mb-6">
            <div className="absolute -inset-4 bg-primary/20 rounded-full blur-2xl opacity-50" />
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center relative shadow-2xl -rotate-3 group-hover:rotate-0 transition-transform duration-500">
              <UserCircle className="w-10 h-10 text-white drop-shadow-lg" />
            </div>
            {/* badge */}
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-lg bg-background border border-border shadow-sm flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            </div>
          </div>
          <h2 className="text-4xl font-black tracking-tighter bg-gradient-to-br from-white via-white to-primary/50 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="mt-3 text-[15px] font-medium text-muted-foreground leading-relaxed max-w-xs mx-auto">
            Securely access your digital credential vault and verified identity.
          </p>
        </div>

        <LoginForm 
          role="customer"
          buttonClassName="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 hover:opacity-90 text-white border-0 shadow-lg"
          footerContent={footerContent}
        />

        <div className="text-center">
          <Button variant="ghost" className="text-muted-foreground hover:text-white transition-all group" asChild>
            <Link to="/auth/role-selection" className="flex items-center gap-2">
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              Switch Login Role
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

