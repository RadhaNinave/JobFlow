import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight"
            >
              Job<span className="text-blue-400">Flow</span>
            </Link>

            <p className="mt-2 max-w-sm text-sm text-slate-400">
              Find opportunities. Build your future.
            </p>
          </div>

          {/* Developer */}
          <div className="text-left md:text-right">
            <p className="text-sm text-slate-400">
              Designed & developed by
            </p>

            <p className="mt-1 font-semibold text-white">
              Radha Ninave
            </p>

            <div className="mt-3 flex gap-4 md:justify-end">
              <a
                href="https://github.com/RadhaNinave"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-400 transition hover:text-white"
              >
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/radha-parmar-129660170/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-400 transition hover:text-white"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-800 pt-6">
          <p className="text-center text-xs text-slate-500">
            © {new Date().getFullYear()} JobFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}