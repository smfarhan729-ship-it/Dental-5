import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-6 text-2xl font-bold">
        404
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
        Page Not Found
      </h1>
      <p className="text-sm text-slate-400 max-w-md mb-8">
        The requested clinical page or resource could not be found. Please return to the homepage to explore our treatments or book a consultation.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-bold text-sm hover:from-teal-400 hover:to-cyan-400 transition-all shadow-lg shadow-teal-500/20"
      >
        Return to Home
      </Link>
    </div>
  );
}
