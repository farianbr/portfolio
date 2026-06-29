export default function Loading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4" role="status" aria-label="Loading">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-line/20 border-t-accent" />
      <span className="hand text-xl text-muted">just a moment…</span>
    </div>
  );
}
