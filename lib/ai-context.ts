import { COURSES, LEARNING_PATHS } from '@/lib/data';
import { getLearningPathExperience } from '@/lib/learning-path-details';

const MAX_CATALOG_CHARS = 12000;

/** Text “RAG” context from your static curriculum (no vector DB). */
export function buildLearnContext(options: {
  courseSlug?: string | null;
  pathSlug?: string | null;
}): string {
  const blocks: string[] = [];

  if (options.courseSlug) {
    const c = COURSES.find((x) => x.slug === options.courseSlug);
    if (c) {
      blocks.push(
        [
          '### Current course (user is on this page)',
          `- Title: ${c.title}`,
          `- Slug: ${c.slug}`,
          `- Category: ${c.category}`,
          `- Level: ${c.level}`,
          `- Hours: ${c.hours}`,
          `- Instructor: ${c.instructor}`,
          `- Cert prep: ${c.certPrep ? 'yes' : 'no'}`,
          `- Tags: ${c.tags.join(', ')}`,
          `- Description: ${c.description}`,
        ].join('\n'),
      );
    }
  }

  if (options.pathSlug) {
    const summary = LEARNING_PATHS.find((p) => p.slug === options.pathSlug);
    const xp = getLearningPathExperience(options.pathSlug);
    if (summary) {
      blocks.push(
        [
          '### Learning path summary',
          `- Title: ${summary.title}`,
          `- Track: ${summary.track}`,
          `- Courses in track (count): ${summary.courseCount}`,
          `- Total hours (catalog): ${summary.hours}`,
          `- Description: ${summary.description}`,
        ].join('\n'),
      );
    }
    if (xp) {
      const stageText = xp.stages
        .map((s) => {
          const lines = s.courses.map(
            (n) =>
              `  - ${n.title} (${Math.round(n.durationMinutes / 60)}h) — ${n.topics.slice(0, 4).join('; ')}`,
          );
          return [`#### ${s.title}`, s.subtitle ? `_${s.subtitle}_` : '', ...lines].filter(Boolean).join('\n');
        })
        .join('\n\n');
      blocks.push(
        [
          '### Path roadmap (stages & modules)',
          xp.heroDescription,
          '',
          stageText,
          '',
          '### Path FAQs',
          ...xp.faqs.map((f) => `**Q:** ${f.question}\n**A:** ${f.answer}`),
        ].join('\n'),
      );
    }
  }

  if (blocks.length === 0) {
    blocks.push('### Course catalog (abbreviated)\n' + buildCatalogDigest());
  }

  return blocks.join('\n\n---\n\n');
}

function buildCatalogDigest(): string {
  const lines = COURSES.map(
    (c) => `- **${c.title}** (${c.category}, ${c.level}, ${c.hours}h): ${c.description}`,
  );
  let text = lines.join('\n');
  if (text.length > MAX_CATALOG_CHARS) {
    text = text.slice(0, MAX_CATALOG_CHARS) + '\n…(truncated)';
  }
  const paths = LEARNING_PATHS.map(
    (p) => `- **${p.title}** (${p.track}, ${p.courseCount} courses, ${p.hours}h): ${p.description}`,
  ).join('\n');
  return [text, '', '### Learning paths', paths].join('\n');
}

export const LEARN_ASSISTANT_SYSTEM = `You are the **QSpiders Learn** study assistant: clear, accurate, and encouraging.

Rules:
- Use **only** the CONTEXT block below plus general study skills. Do not invent enrollment URLs, prices, guarantees, or schedules.
- If the answer is not in context, say you are not sure and suggest browsing /courses or /contact.
- Keep answers concise unless the user asks for depth. Use short headings and bullet lists when helpful.
- Never claim affiliation with unrelated companies; this is a demo training site scaffold.
`;
