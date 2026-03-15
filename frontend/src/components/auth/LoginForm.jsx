import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '../ui/form';
import { EmailInput, PasswordInput, VerificationCodeInput } from './AuthFormFields';
import { useAuthForm } from '../../hooks/useAuthForm';

// Schema
const loginSchema = z.object({
  email: z.string().email('Invalid email').min(1),
  password: z.string().min(8, 'Password must be at least 8 characters'),
}).refine((data) => data.password.length >= 8, {
  message: 'Password too short',
  path: ['password']
});

const verifierSchema = loginSchema.extend({
  verificationCode: z.string().regex(/^\d{6}$/, 'Must be 6 digits')
});

export const LoginForm = ({ role = 'customer', buttonClassName = '', has2FA = false, headerContent, footerContent }) => {
  const schema = has2FA ? verifierSchema : loginSchema;
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '', ...(has2FA && { verificationCode: '' }) }
  });
  const { handleSubmit, isLoading } = useAuthForm({ 
    redirect: role === 'verifier' ? '/admin/dashboard' : '/customer/dashboard', 
    role 
  });

  return (
    <Card className={`border border-border/50 bg-card/60 backdrop-blur-xl shadow-xl`}>
      <CardContent className="pt-6">
        {headerContent}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => <EmailInput {...field} />}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => <PasswordInput {...field} />}
              />
              {has2FA && (
                <FormField
                  control={form.control}
                  name="verificationCode"
                  render={({ field }) => <VerificationCodeInput {...field} />}
                />
              )}
            </div>
            <Button type="submit" className={`w-full ${buttonClassName}`} disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </Form>
        {footerContent}
      </CardContent>
    </Card>
  );
};

