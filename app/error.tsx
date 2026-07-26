'use client';

import { useEffect } from 'react';
import { FiRefreshCw } from 'react-icons/fi';

export default function Error({
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
    <div className="container-custom flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="eyebrow mb-4">oops</p>
      <h1 className="font-display text-4xl text-ink sm:text-5xl">
        Something broke
      </h1>
      <p className="mt-5 max-w-md font-medium text-lg text-muted">
        An unexpected error crept in. Try again — and if it keeps happening,
        please reach out.
      </p>
      <button onClick={reset} className="btn-primary mt-8">
        <FiRefreshCw className="h-4 w-4" />
        Try again
      </button>
    </div>
  );
}
