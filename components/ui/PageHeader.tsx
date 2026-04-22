export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 hero-glow pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern [background-size:52px_52px] opacity-20 pointer-events-none [mask-image:radial-gradient(ellipse_at_top,black_40%,transparent_80%)]" />
      <div className="container-x relative pt-16 pb-10 md:pt-24 md:pb-14">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-eyebrow">{eyebrow}</p>
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
