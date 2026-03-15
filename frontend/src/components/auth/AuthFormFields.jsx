import React from 'react';
import { Mail, Lock, Phone, User, Eye, EyeOff } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '../ui/form';

/**
 * Reusable Email Input for auth forms
 */
export const EmailInput = ({ label = 'Email Address', icon, ...props }) => (
  <FormItem className="space-y-1.5">
    <FormLabel className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70 ml-1">{label}</FormLabel>
    <div className="relative group">
      <div className="absolute inset-0 bg-primary/5 rounded-xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
      {icon || <Mail className="absolute left-4 top-[0.7rem] h-5 w-5 text-muted-foreground/40 group-focus-within:text-primary transition-colors pointer-events-none" />}
      <FormControl>
        <Input 
          className="h-12 pl-12 bg-white/[0.03] border-white/10 focus:border-primary/50 focus:ring-0 rounded-xl placeholder:text-muted-foreground/20 transition-all shadow-inner" 
          placeholder="Enter your email"
          {...props} 
        />
      </FormControl>
    </div>
    <FormMessage />
  </FormItem>
);

/**
 * Reusable Password Input with toggle
 */
export const PasswordInput = ({ label = 'Password', ...props }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <FormItem className="space-y-1.5">
      <FormLabel className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70 ml-1">{label}</FormLabel>
      <div className="relative group">
        <div className="absolute inset-0 bg-primary/5 rounded-xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
        <Lock className="absolute left-4 top-[0.7rem] h-5 w-5 text-muted-foreground/40 group-focus-within:text-primary transition-colors pointer-events-none" />
        <FormControl>
          <Input 
            type={showPassword ? 'text' : 'password'}
            className="h-12 pl-12 pr-12 bg-white/[0.03] border-white/10 focus:border-primary/50 focus:ring-0 rounded-xl placeholder:text-muted-foreground/20 transition-all shadow-inner" 
            placeholder="••••••••"
            {...props}
          />
        </FormControl>
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-[0.7rem] text-muted-foreground/40 hover:text-primary transition-colors p-1 rounded-lg"
        >
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>
      <FormMessage />
    </FormItem>
  );
};

/**
 * Phone Input
 */
export const PhoneInput = ({ ...props }) => (
  <FormItem>
    <FormLabel>Phone Number</FormLabel>
    <div className="relative">
      <Phone className="absolute left-3 top-[0.6rem] h-5 w-5 text-muted-foreground" />
      <FormControl>
        <Input className="pl-10 bg-background/50" type="tel" {...props} />
      </FormControl>
    </div>
    <FormMessage />
  </FormItem>
);

/**
 * Full Name Input
 */
export const NameInput = ({ ...props }) => (
  <FormItem>
    <FormLabel>Full Name</FormLabel>
    <div className="relative">
      <User className="absolute left-3 top-[0.6rem] h-5 w-5 text-muted-foreground" />
      <FormControl>
        <Input className="pl-10 bg-background/50" {...props} />
      </FormControl>
    </div>
    <FormMessage />
  </FormItem>
);

/**
 * 2FA Code Input (Verifier specific)
 */
export const VerificationCodeInput = ({ ...props }) => (
  <FormItem className="space-y-3 pt-2">
    <div className="flex items-center justify-between px-1">
      <FormLabel className="text-xs font-bold uppercase tracking-widest text-primary ml-1">Secure Authenticator</FormLabel>
      <div className="flex gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/20" />
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/20" />
      </div>
    </div>
    <FormControl>
      <div className="relative group">
        <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
        <Input 
          className="h-16 bg-black/40 border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-2xl font-mono text-center tracking-[0.6em] text-2xl text-primary font-black shadow-2xl transition-all"
          placeholder="000000"
          maxLength={6}
          {...props}
        />
      </div>
    </FormControl>
    <FormDescription className="text-center text-[11px] font-medium text-muted-foreground/50">Enter the 6-digit authentication token</FormDescription>
    <FormMessage />
  </FormItem>
);

