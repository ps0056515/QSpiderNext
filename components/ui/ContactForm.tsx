'use client';

import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="card-surface p-8 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
          <CheckCircle2 size={22} />
        </div>
        <h3 className="mt-4 font-display text-lg font-semibold text-slate-900">
          Thanks — we'll be in touch.
        </h3>
        <p className="mt-2 text-sm text-slate-400">
          A counsellor will reach out within one working day.
        </p>
      </div>
    );
  }

  return (
    <form
      className="card-surface space-y-4 p-6 sm:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        // Replace with actual API call
        setSubmitted(true);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" name="name" required />
        <Field label="Email" type="email" name="email" required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone" name="phone" required />
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-400">
            Area of interest
          </label>
          <select className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 focus:border-ember-500/50 focus:outline-none focus:ring-2 focus:ring-ember-500/20">
            <option className="bg-slate-100">Software Testing</option>
            <option className="bg-slate-100">Full Stack Development</option>
            <option className="bg-slate-100">DevOps & Cloud</option>
            <option className="bg-slate-100">Data Science & AI</option>
            <option className="bg-slate-100">Placement Preparation</option>
            <option className="bg-slate-100">Corporate Training</option>
          </select>
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate-400">
          Message
        </label>
        <textarea
          rows={4}
          placeholder="Tell us briefly what you're looking for…"
          className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-500 focus:border-ember-500/50 focus:outline-none focus:ring-2 focus:ring-ember-500/20"
        />
      </div>
      <button type="submit" className="btn-primary w-full sm:w-auto">
        Request a Call Back
        <Send size={14} />
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-slate-400">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-500 focus:border-ember-500/50 focus:outline-none focus:ring-2 focus:ring-ember-500/20"
      />
    </div>
  );
}
