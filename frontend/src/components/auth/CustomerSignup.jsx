import React from 'react';
import { Link } from 'react-router-dom';
import { UserCircle } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { SignupForm } from './SignupForm';

const footerContent = (
  <>
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t"></div>
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-card px-2 text-muted-foreground">Or</span>
      </div>
    </div>
    <div className="text-center text-sm">
      <span className="text-muted-foreground">Already have an account? </span>
      <Link to="/auth/customer/login" className="text-primary font-semibold hover:underline">
        Sign In
      </Link>
    </div>
  </>
);

export function CustomerSignup() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-500/20">
            <UserCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Create Your Account
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Join LumenID to manage and share your verified credentials
          </p>
        </div>

        <Card className="border border-border/50 bg-card/60 backdrop-blur-xl shadow-xl">
          <CardContent className="pt-6">
            <SignupForm 
              className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 hover:opacity-90 text-white border-0 shadow-lg"
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

