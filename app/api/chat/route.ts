import { createOpenAI } from '@ai-sdk/openai';
import { convertToModelMessages, streamText, type UIMessage } from 'ai';
import { buildLearnContext, LEARN_ASSISTANT_SYSTEM } from '@/lib/ai-context';

export const maxDuration = 45;

export async function POST(req: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey?.trim()) {
    return new Response(
      'AI is not configured: add OPENAI_API_KEY to .env.local and restart the dev server.',
      { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
    );
  }

  let body: {
    messages?: UIMessage[];
    courseSlug?: string | null;
    pathSlug?: string | null;
  };
  try {
    body = await req.json();
  } catch {
    return new Response('Invalid JSON body', { status: 400 });
  }

  const messages = body.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response('Missing messages', { status: 400 });
  }

  const context = buildLearnContext({
    courseSlug: body.courseSlug ?? undefined,
    pathSlug: body.pathSlug ?? undefined,
  });

  const system = `${LEARN_ASSISTANT_SYSTEM}\n\n### CONTEXT (authoritative for this site)\n${context}`;

  let modelMessages;
  try {
    modelMessages = await convertToModelMessages(messages, {
      ignoreIncompleteToolCalls: true,
    });
  } catch {
    return new Response('Could not parse messages', { status: 400 });
  }

  const openai = createOpenAI({ apiKey });

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system,
    messages: modelMessages,
    maxOutputTokens: 1200,
  });

  return result.toUIMessageStreamResponse();
}
