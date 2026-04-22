'use client';

import { Suspense } from 'react';
import { LoginForm } from './LoginForm';

export function LoginFormShell() {
  return (
    <Suspense fallback={<div className="card-surface h-64 animate-pulse p-8" />}>
      <LoginForm />
    </Suspense>
  );
}
