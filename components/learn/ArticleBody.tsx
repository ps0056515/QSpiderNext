/** Minimal markdown-ish rendering for seeded article bodies (no extra deps). */
export function ArticleBody({ bodyMd }: { bodyMd: string }) {
  const blocks = bodyMd.trim().split(/\n\n+/);

  return (
    <div className="space-y-4 text-sm leading-relaxed text-slate-300">
      {blocks.map((block, i) => {
        const lines = block.split('\n');
        const first = lines[0] ?? '';
        if (first.startsWith('## ')) {
          return (
            <h3 key={i} className="font-display text-lg font-semibold text-slate-900">
              {first.slice(3).trim()}
            </h3>
          );
        }
        return (
          <p key={i} className="whitespace-pre-wrap">
            {block}
          </p>
        );
      })}
    </div>
  );
}
