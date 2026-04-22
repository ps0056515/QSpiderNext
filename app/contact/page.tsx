import { Phone, Mail, MessageCircle, MapPin, type LucideIcon } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { ContactForm } from '@/components/ui/ContactForm';
import { OFFLINE_CENTERS } from '@/lib/data';

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact Us"
        title="Let's talk about your next step."
        description="Course enquiry, corporate training, partnerships — we'll route you to the right team."
      />

      <section className="pb-24">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          {/* Left: contact info */}
          <div className="space-y-8">
            <ContactItem
              icon={Phone}
              label="Call us"
              value="+91 96867 00500"
              href="tel:+919686700500"
            />
            <ContactItem
              icon={MessageCircle}
              label="WhatsApp"
              value="+91 96861 11919"
              href="https://wa.me/919686111919"
            />
            <ContactItem
              icon={Mail}
              label="Email"
              value="hello@qspiders-learn.example"
              href="mailto:hello@qspiders-learn.example"
            />

            <div>
              <h3 className="font-display text-sm font-semibold text-slate-900">
                Visit a center
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-400">
                {OFFLINE_CENTERS.slice(0, 4).map((c) => (
                  <li key={c.city} className="flex gap-2">
                    <MapPin size={14} className="mt-0.5 flex-none text-ember-400" />
                    <div>
                      <p className="text-slate-200">{c.city}</p>
                      <p className="text-xs text-slate-500">{c.address}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: form */}
          <ContactForm />
        </div>
      </section>
    </>
  );
}

function ContactItem({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="flex items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:border-ember-500/30 hover:bg-ember-500/[0.04]"
    >
      <div className="grid h-11 w-11 flex-none place-items-center rounded-md bg-ember-500/10 text-ember-400 ring-1 ring-ember-500/20">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.15em] text-slate-500">
          {label}
        </p>
        <p className="mt-0.5 font-display text-base font-semibold text-slate-900">
          {value}
        </p>
      </div>
    </a>
  );
}
