'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage } from 'ai';
import { MessageSquare, Send, Sparkles, X, Loader2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useMemo, useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

function textFromMessage(m: UIMessage): string {
  if (!m.parts?.length) return '';
  return m.parts
    .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
    .map((p) => p.text)
    .join('');
}

export function LearnAssistant() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const { courseSlug, pathSlug } = useMemo(() => {
    const c = pathname.match(/^\/courses\/([^/]+)\/?$/);
    const p = pathname.match(/^\/learning-paths\/([^/]+)\/?$/);
    return {
      courseSlug: c?.[1] ?? null,
      pathSlug: p?.[1] ?? null,
    };
  }, [pathname]);

  const showFab = pathname.startsWith('/courses') || pathname.startsWith('/learning-paths');

  const chatId = useMemo(
    () => `learn-${courseSlug ?? 'catalog'}-${pathSlug ?? 'paths'}`,
    [courseSlug, pathSlug],
  );

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: '/api/chat',
        body: { courseSlug, pathSlug },
      }),
    [courseSlug, pathSlug],
  );

  const { messages, sendMessage, status, stop, error } = useChat({
    id: chatId,
    transport,
  });

  useEffect(() => {
    if (!open || !scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open, status]);

  if (!showFab) return null;

  const busy = status === 'submitted' || status === 'streaming';

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const t = input.trim();
    if (!t || busy) return;
    setInput('');
    await sendMessage({ text: t });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          'fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition',
          'bg-gradient-to-br from-ember-500 to-ember-700 text-white ring-2 ring-slate-300 hover:scale-105 hover:shadow-ember-500/40',
          open && 'pointer-events-none opacity-0',
        )}
        aria-label="Open learn assistant"
      >
        <Sparkles size={24} />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-end sm:justify-end sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="learn-assistant-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-slate-50/70 backdrop-blur-sm"
            aria-label="Close assistant"
            onClick={() => setOpen(false)}
          />
          <div className="relative flex h-[min(560px,85vh)] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-slate-300 bg-slate-100/95 shadow-2xl shadow-black/50 ring-1 ring-slate-200">
            <header className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-ember-500/15 text-ember-700">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <h2 id="learn-assistant-title" className="font-display text-sm font-semibold text-slate-900">
                    Learn assistant
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    {courseSlug
                      ? `Course context · ${courseSlug.replace(/-/g, ' ')}`
                      : pathSlug
                        ? `Path context · ${pathSlug.replace(/-/g, ' ')}`
                        : 'Catalog context'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {busy && (
                  <button
                    type="button"
                    onClick={() => void stop()}
                    className="rounded-md px-2 py-1 text-xs font-medium text-slate-400 hover:bg-slate-100 hover:text-slate-900"
                  >
                    Stop
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </header>

            <div ref={scrollRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-3">
              {messages.length === 0 && (
                <p className="text-sm leading-relaxed text-slate-400">
                  Ask about this course or path, how topics connect, interview prep, or what to study next. Answers
                  use this site&apos;s catalog as context.
                </p>
              )}
              {messages.map((m) => {
                const text = textFromMessage(m);
                return (
                  <div
                    key={m.id}
                    className={cn(
                      'max-w-[92%] rounded-xl px-3 py-2 text-sm leading-relaxed',
                      m.role === 'user'
                        ? 'ml-auto bg-ember-500/15 text-slate-900 ring-1 ring-ember-500/25'
                        : 'mr-auto bg-slate-100 text-slate-700 ring-1 ring-slate-200',
                    )}
                  >
                    {text || (m.role === 'assistant' && busy ? '…' : '\u00a0')}
                  </div>
                );
              })}
              {error && (
                <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
                  {error.message}
                </p>
              )}
            </div>

            <form onSubmit={onSubmit} className="border-t border-slate-200 p-3">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything about this content…"
                  className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-slate-50/80 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-500 focus:border-ember-500/50 focus:outline-none focus:ring-2 focus:ring-ember-500/20"
                  disabled={busy}
                />
                <button
                  type="submit"
                  disabled={busy || !input.trim()}
                  className="inline-flex shrink-0 items-center justify-center rounded-lg bg-ember-500 px-3 py-2 text-white shadow transition hover:bg-ember-400 disabled:opacity-40"
                  aria-label="Send"
                >
                  {busy ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                </button>
              </div>
              <p className="mt-2 text-[10px] text-slate-600">
                Requires <code className="rounded bg-slate-50 px-1 text-slate-400">OPENAI_API_KEY</code> in{' '}
                <code className="rounded bg-slate-50 px-1 text-slate-400">.env.local</code>.
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
