'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/ui/PageHeader';

export default function NewTrainerCoursePage() {
  const router = useRouter();
  const [slug, setSlug] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('General');
  const [level, setLevel] = useState('Beginner');
  const [hours, setHours] = useState(40);
  const [description, setDescription] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const r = await fetch('/api/trainer/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: slug.trim(),
          title: title.trim(),
          category,
          level,
          hours,
          description: description.trim(),
        }),
      });
      const data = await r.json();
      if (!r.ok) {
        setError(data.error ?? 'Failed');
        return;
      }
      router.push('/trainer');
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Trainer"
        title="New course (draft)"
        description="Creates a DRAFT shell. Add modules and lessons via future authoring tools or Prisma seed."
      />
      <section className="pb-24">
        <div className="container-x max-w-lg">
          <form onSubmit={onSubmit} className="card-surface space-y-4 p-6">
            {error && (
              <p className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                {error}
              </p>
            )}
            <div>
              <label className="text-xs font-semibold text-slate-400">URL slug</label>
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                placeholder="e.g. my-awesome-course"
                className="mt-1 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mt-1 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold text-slate-400">Category</label>
                <input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400">Level</label>
                <input
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400">Hours</label>
              <input
                type="number"
                min={1}
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="mt-1 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="mt-1 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900"
              />
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={busy} className="btn-primary">
                {busy ? 'Creating…' : 'Create draft'}
              </button>
              <Link href="/trainer" className="btn-secondary">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
