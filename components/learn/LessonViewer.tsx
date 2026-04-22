'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArticleBody } from '@/components/learn/ArticleBody';

type Question = { id: string; text: string; choices: string[]; correctIndex: number };

type LessonNav = { id: string; title: string }[];

type Props = {
  courseSlug: string;
  lessonId: string;
  title: string;
  contentType: string;
  videoUrl: string | null;
  bodyMd: string | null;
  quizId: string | null;
  questionsJson: string | null;
  nav: LessonNav;
};

export function LessonViewer(props: Props) {
  const router = useRouter();
  const {
    courseSlug,
    lessonId,
    title,
    contentType,
    videoUrl,
    bodyMd,
    quizId,
    questionsJson,
    nav,
  } = props;

  const questions = useMemo(() => {
    if (!questionsJson) return [] as Question[];
    try {
      return JSON.parse(questionsJson) as Question[];
    } catch {
      return [];
    }
  }, [questionsJson]);

  const [answers, setAnswers] = useState<number[]>(() =>
    questions.map(() => -1),
  );

  useEffect(() => {
    setAnswers(questions.map(() => -1));
    setResult(null);
  }, [questions]);
  const [result, setResult] = useState<{
    passed: boolean;
    score: number;
    passPercent: number;
    verifyCode?: string;
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [progressBusy, setProgressBusy] = useState(false);

  const idx = nav.findIndex((l) => l.id === lessonId);
  const prev = idx > 0 ? nav[idx - 1] : null;
  const next = idx >= 0 && idx < nav.length - 1 ? nav[idx + 1] : null;

  async function markComplete() {
    setProgressBusy(true);
    try {
      const r = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId }),
      });
      if (r.ok) router.refresh();
    } finally {
      setProgressBusy(false);
    }
  }

  async function submitQuiz() {
    if (!quizId || questions.length === 0) return;
    if (answers.some((a) => a < 0)) return;
    setSubmitting(true);
    try {
      const r = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quizId, answers }),
      });
      const data = await r.json();
      if (r.ok) {
        setResult({
          passed: data.passed,
          score: data.score,
          passPercent: data.passPercent,
          verifyCode: data.verifyCode,
        });
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">{title}</h1>
      </div>

      {contentType === 'VIDEO' && videoUrl && (
        <div className="aspect-video w-full overflow-hidden rounded-xl border border-slate-200 bg-black shadow-xl">
          <iframe
            title={title}
            src={videoUrl}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {contentType === 'ARTICLE' && bodyMd && (
        <div className="card-surface p-6">
          <ArticleBody bodyMd={bodyMd} />
        </div>
      )}

      {contentType === 'QUIZ' && quizId && questions.length > 0 && (
        <div className="card-surface space-y-6 p-6">
          {!result ? (
            <>
              {questions.map((q, qi) => (
                <fieldset key={q.id} className="space-y-2 border-b border-slate-100 pb-5 last:border-0">
                  <legend className="text-sm font-semibold text-slate-900">
                    {qi + 1}. {q.text}
                  </legend>
                  <div className="mt-2 space-y-2">
                    {q.choices.map((c, ci) => (
                      <label
                        key={ci}
                        className="flex cursor-pointer items-start gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-300 hover:border-ember-500/30"
                      >
                        <input
                          type="radio"
                          name={q.id}
                          checked={answers[qi] === ci}
                          onChange={() => {
                            setAnswers((a) => {
                              const n = [...a];
                              n[qi] = ci;
                              return n;
                            });
                          }}
                          className="mt-1"
                        />
                        <span>{c}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              ))}
              <button
                type="button"
                onClick={submitQuiz}
                disabled={submitting || answers.some((a) => a < 0)}
                className="btn-primary"
              >
                {submitting ? 'Submitting…' : 'Submit answers'}
              </button>
            </>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-slate-300">
                Score: <strong className="text-slate-900">{result.score}%</strong> (pass at{' '}
                {result.passPercent}%)
              </p>
              <p
                className={
                  result.passed ? 'text-sm font-medium text-emerald-400' : 'text-sm text-amber-300'
                }
              >
                {result.passed
                  ? 'Passed — certificate issued to your account.'
                  : 'Not passed yet — review the material and try again.'}
              </p>
              {result.verifyCode && (
                <p className="text-xs text-slate-500">
                  Verification code:{' '}
                  <Link
                    href={`/certificates/${result.verifyCode}`}
                    className="font-mono text-ember-400 hover:underline"
                  >
                    {result.verifyCode}
                  </Link>
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {contentType !== 'QUIZ' && (
        <div>
          <button
            type="button"
            onClick={markComplete}
            disabled={progressBusy}
            className="btn-secondary"
          >
            {progressBusy ? 'Saving…' : 'Mark lesson complete'}
          </button>
        </div>
      )}

      {contentType === 'QUIZ' && result?.passed && (
        <div>
          <button
            type="button"
            onClick={markComplete}
            disabled={progressBusy}
            className="btn-secondary"
          >
            {progressBusy ? 'Saving…' : 'Mark lesson complete'}
          </button>
        </div>
      )}

      <div className="flex flex-wrap justify-between gap-4 border-t border-slate-200 pt-6">
        {prev ? (
          <Link
            href={`/learn/${encodeURIComponent(courseSlug)}/lessons/${prev.id}`}
            className="btn-ghost"
          >
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/learn/${encodeURIComponent(courseSlug)}/lessons/${next.id}`}
            className="btn-primary"
          >
            Next: {next.title} →
          </Link>
        ) : (
          <Link href={`/courses/${encodeURIComponent(courseSlug)}`} className="btn-secondary">
            Back to course
          </Link>
        )}
      </div>
    </div>
  );
}
