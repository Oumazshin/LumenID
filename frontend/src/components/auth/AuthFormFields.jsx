import React from 'react';
import { Mail, Lock, Phone, User, Eye, EyeOff } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '../ui/form';

/**
 * Reusable Email Input for auth forms
 */
export const EmailInput = ({ label = 'Email Address', icon, ...props }) => (
  <FormItem>
    <FormLabel>{label}</FormLabel>
    <div className="relative">
      {icon || <Mail className="absolute left-3 top-[0.6rem] h-5 w-5 text-muted-foreground" />}
      <FormControl>
        <Input className="pl-10 bg-background/50" {...props} />
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
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <div className="relative">
        <Lock className="absolute left-3 top-[0.6rem] h-5 w-5 text-muted-foreground" />
        <FormControl>
          <Input 
            type={showPassword ? 'text' : 'password'}
            className="pl-10 pr-10 bg-background/50" 
            {...props}
          />
        </FormControl>
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[0.6rem] text-muted-foreground hover:text-foreground transition-colors p-1 -m-1 rounded-sm hover:bg-accent"
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
  <FormItem>
    <FormLabel>2FA Code</FormLabel>
    <FormControl>
      <Input 
        className="bg-background/50 font-mono text-center tracking-widest text-lg"
        maxLength={6}
        {...props}
      />
    </FormControl>
    <FormDescription>Enter 6-digit code from authenticator app</FormDescription>
    <FormMessage />
  </FormItem>
);

