import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-mono text-6xl font-bold text-slate-900/20 sm:text-8xl">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-slate-900 sm:text-3xl">Page not found</h1>
      <p className="mt-3 max-w-md text-sm text-slate-400">
        That URL does not exist or was moved. Check the link, or start again from the homepage.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">
          Homepage
        </Link>
        <Link href="/courses" className="btn-secondary">
          Courses
        </Link>
        <Link href="/learning-paths" className="btn-secondary">
          Learning paths
        </Link>
      </div>
    </div>
  );
}
