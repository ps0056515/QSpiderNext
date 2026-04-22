'use client';

import { useEffect } from 'react';

/**
 * Root-level errors: no access to root layout or its CSS chunks.
 * Keep this file self-contained (inline styles only).
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          backgroundColor: '#f8fafc',
          color: '#475569',
          fontFamily:
            'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        <div
          style={{
            margin: '0 auto',
            display: 'flex',
            minHeight: '100vh',
            maxWidth: '28rem',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4rem 1.5rem',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#a5b4fc',
            }}
          >
            Critical error
          </p>
          <h1 style={{ marginTop: '0.75rem', fontSize: '1.75rem', fontWeight: 700, color: '#fff' }}>
            QSpiders Learn needs a refresh
          </h1>
          <p style={{ marginTop: '1rem', fontSize: '0.875rem', lineHeight: 1.6, color: '#94a3b8' }}>
            The app could not render. Reload the page or clear the site cache for this origin.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              marginTop: '2rem',
              border: 'none',
              borderRadius: '0.375rem',
              backgroundColor: '#6366f1',
              color: '#fff',
              padding: '0.75rem 1.25rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
