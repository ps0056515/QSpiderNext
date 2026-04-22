import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Award } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { PageHeader } from '@/components/ui/PageHeader';

export default async function CertificateVerifyPage({
  params,
}: {
  params: { code: string };
}) {
  let cert;
  try {
    cert = await prisma.certificate.findUnique({
      where: { verifyCode: params.code },
      include: { course: true, user: { select: { name: true, email: true } } },
    });
  } catch (err) {
    console.error('[certificates] Lookup failed', err);
    notFound();
  }
  if (!cert) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Certificate"
        title="Verification"
        description="This page confirms a certificate record in the local demo database."
      />
      <section className="pb-24">
        <div className="container-x max-w-lg">
          <div className="card-surface p-8 text-center">
            <Award className="mx-auto text-ember-400" size={40} />
            <h2 className="mt-4 font-display text-xl font-semibold text-slate-900">
              {cert.course.title}
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Issued to{' '}
              <span className="text-slate-200">{cert.user.name ?? cert.user.email}</span>
            </p>
            <p className="mt-4 font-mono text-xs text-slate-500">
              Code: {cert.verifyCode}
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Issued {cert.issuedAt.toLocaleDateString()}
            </p>
            <Link href="/courses" className="mt-8 inline-block btn-secondary text-sm">
              Browse more courses
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
