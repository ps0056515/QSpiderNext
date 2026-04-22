/**
 * Inline-styled loader so it still reads correctly if the main CSS bundle
 * is slow or fails — avoids a blank white flash during navigation.
 */
export function PageLoaderFrame({ label = 'Loading…' }: { label?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.25rem',
        background: 'rgba(6, 9, 18, 0.92)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <img
        src="/page-loader.svg"
        width={112}
        height={112}
        alt=""
        style={{ display: 'block' }}
      />
      <p
        style={{
          margin: 0,
          fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
          fontSize: '0.875rem',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'rgba(165, 180, 252, 0.95)',
        }}
      >
        {label}
      </p>
    </div>
  );
}
