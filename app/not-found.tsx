import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="container-custom flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="eyebrow mb-4">well, this is awkward</p>
      <h1 className="font-display text-6xl text-ink sm:text-8xl">404</h1>
      <p className="mt-5 max-w-md font-medium text-lg text-muted">
        This page doesn&apos;t exist — or it wandered off somewhere. Let&apos;s
        get you back on track.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className="btn-primary">
          <FiArrowLeft className="h-4 w-4" />
          Back home
        </Link>
        <Link href="/projects" className="btn-secondary">
          View projects
        </Link>
      </div>
    </div>
  );
}
