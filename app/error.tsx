'use client';

import { useEffect } from 'react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console without breaking execution
    console.error('App Router Boundary caught error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6 text-2xl font-bold">
        !
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
        Experience Reload
      </h2>
      <p className="text-sm text-slate-400 max-w-md mb-8">
        A temporary display rendering glitch occurred. Click below to refresh the interactive clinical view smoothly.
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-bold text-sm hover:from-teal-400 hover:to-cyan-400 transition-all shadow-lg shadow-teal-500/20"
      >
        Reload Experience
      </button>
    </div>
  );
}
