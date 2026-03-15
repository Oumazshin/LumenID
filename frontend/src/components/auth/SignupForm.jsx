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
import { NameInput, EmailInput, PhoneInput, PasswordInput } from './AuthFormFields';
import { useAuthForm } from '../../hooks/useAuthForm';
import { Checkbox } from '../ui/checkbox';
import { Link } from 'react-router-dom';

// Schema for signup
const signupSchema = z.object({
  fullName: z.string().min(2, 'Name too short'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Phone too short'),
  password: z.string().min(8, 'Password at least 8 chars'),
  confirmPassword: z.string(),
  terms: z.boolean()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
}).refine((data) => data.terms, {
  message: 'You must agree to terms',
  path: ['terms']
});

export const SignupForm = ({ className = '', footerContent }) => {
  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      terms: false
    }
  });
  const { handleSubmit, isLoading } = useAuthForm({ redirect: '/customer/profile-creation', role: 'customer' });

  return (
    <Card className={`border border-border/50 bg-card/60 backdrop-blur-xl shadow-xl ${className}`}>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fullName"
                render={() => <NameInput control={form.control} />}
              />
              <FormField
                control={form.control}
                name="phone"
                render={() => <PhoneInput control={form.control} />}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={() => <EmailInput control={form.control} />}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="password"
                render={() => <PasswordInput control={form.control} label="Password" />}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={() => <PasswordInput control={form.control} label="Confirm Password" />}
              />
            </div>
            <div className="flex items-start">
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-normal">
                        Agree to{' '}
                        <Link to="/terms" className="text-primary hover:underline">
                          Terms
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" className="text-primary hover:underline">
                          Privacy
                        </Link>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Account'}
            </Button>
          </form>
        </Form>
        {footerContent}
      </CardContent>
    </Card>
  );
};

