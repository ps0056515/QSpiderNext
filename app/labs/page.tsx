import Link from 'next/link';
import { FlaskConical } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { PageHeader } from '@/components/ui/PageHeader';

export default async function LabsPage() {
  let labs: Awaited<ReturnType<typeof prisma.labOffering.findMany>> = [];
  try {
    labs = await prisma.labOffering.findMany({ orderBy: { title: 'asc' } });
  } catch (err) {
    console.error('[labs] Failed to load lab offerings', err);
  }

  return (
    <>
      <PageHeader
        eyebrow="Labs"
        title="Hands-on environments"
        description="Sandbox and playground offerings. These are stubs until infrastructure is provisioned."
      />
      <section className="pb-24">
        <div className="container-x max-w-2xl space-y-4">
          {labs.length === 0 && (
            <p className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-400">
              No lab records available (database unreachable or empty). Run{' '}
              <code className="font-mono text-slate-300">npm run db:push</code> and{' '}
              <code className="font-mono text-slate-300">npm run db:seed</code>.
            </p>
          )}
          {labs.map((lab) => (
            <div
              key={lab.id}
              className="card-surface flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex gap-3">
                <FlaskConical className="mt-0.5 shrink-0 text-ember-400" size={22} />
                <div>
                  <h2 className="font-display text-lg font-semibold text-slate-900">{lab.title}</h2>
                  <p className="mt-1 text-sm text-slate-400">{lab.description}</p>
                </div>
              </div>
              <span className="shrink-0 rounded-full bg-slate-50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-400 ring-1 ring-slate-200">
                {lab.status.replace('_', ' ')}
              </span>
            </div>
          ))}
          <p className="text-center text-sm text-slate-500">
            <Link href="/courses" className="text-ember-400 hover:underline">
              Back to courses
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
