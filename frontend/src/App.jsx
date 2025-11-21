import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import StatsPage from "./components/StatsPage.jsx";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen text-slate-50">
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-8 md:px-6 lg:px-8">
          <header className="mb-8 flex flex-col gap-4 border-b border-slate-800/80 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <Link to="/" className="inline-flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-2xl bg-sky-500/10 ring-1 ring-sky-500/40">
                  <span className="text-lg font-semibold text-sky-400">T</span>
                </span>
                <div className="text-left">
                  <p className="text-base font-semibold tracking-tight sm:text-lg">
                    TinyLink
                  </p>
                  <p className="text-xs text-slate-400 sm:text-[13px]">
                    Clean, fast & trackable short URLs
                  </p>
                </div>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 sm:text-sm">
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300 sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_3px_rgba(34,197,94,0.45)]" />
                Live
              </span>
              <span className="hidden h-4 w-px bg-slate-700/70 sm:block" />
              <span className="hidden sm:inline">
                Simple dashboard to create & manage short links.
              </span>
            </div>
          </header>

          <main className="flex-1 pb-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/code/:code" element={<StatsPage />} />
            </Routes>
          </main>

          <footer className="mt-auto border-t border-slate-800/70 pt-4 text-xs text-slate-500 sm:text-[13px]">
            <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
              <p>© {new Date().getFullYear()} TinyLink. All rights reserved.</p>
              <p className="text-[11px] sm:text-xs">
                Built with React, Vite & a minimal API backend.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </BrowserRouter>
  );
}
