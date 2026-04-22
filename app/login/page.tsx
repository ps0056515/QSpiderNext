import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { LoginFormShell } from './LoginFormShell';

export const metadata: Metadata = {
  title: 'Sign in | QSpiders Learn',
  description: 'Access your learner dashboard, enrolled courses, and progress.',
};

export default function LoginPage() {
  return (
    <>
      <PageHeader
        eyebrow="Account"
        title="Sign in to QSpiders Learn"
        description="Use your registered email and password. New here? Start with a free course preview — no account required for browsing."
      />

      <section className="pb-24">
        <div className="container-x max-w-md">
          <LoginFormShell />
        </div>
      </section>
    </>
  );
}
