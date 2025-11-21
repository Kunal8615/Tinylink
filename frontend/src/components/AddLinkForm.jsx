import { useState } from "react";

export default function AddLinkForm({ onCreated }) {
  const [code, setCode] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const API = import.meta.env.VITE_API_URL;

  const submit = async (e) => {
    e.preventDefault();
    if (!url.trim()) {
      setError("Destination URL is required.");
      return;
    }

    setError("");
    setLoading(true);

    const res = await fetch(`${API}/api/links`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, url })
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data?.error || "Something went wrong while creating the link.");
      return;
    }

    setCode("");
    setUrl("");
    onCreated(data);
  };

  return (
    <div className="card border-slate-800/80 bg-slate-950/70">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-50 sm:text-lg">
            Create new short link
          </h3>
          <p className="mt-1 text-xs text-slate-400 sm:text-[13px]">
            Optionally choose a custom code or leave it blank to auto-generate.
          </p>
        </div>
        <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-sky-500/10 px-2.5 py-1 text-[11px] font-medium text-sky-300 ring-1 ring-sky-500/30 sm:mt-0">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
          Instant redirect
        </span>
      </div>

      <form onSubmit={submit} className="mt-4 space-y-3">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="flex-1 space-y-1.5">
            <label className="block text-xs font-medium uppercase tracking-wide text-slate-400">
              Destination URL
            </label>
            <input
              type="url"
              placeholder="https://your-long-url.com/path"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full rounded-xl border border-slate-700/80 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 outline-none ring-sky-500/40 transition focus:border-sky-400 focus:ring-2"
            />
          </div>

          <div className="w-full space-y-1.5 md:w-56">
            <label className="block text-xs font-medium uppercase tracking-wide text-slate-400">
              Custom code
            </label>
            <input
              placeholder="my-brand-link"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full rounded-xl border border-slate-700/80 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 outline-none ring-sky-500/40 transition focus:border-sky-400 focus:ring-2"
            />
          </div>
        </div>

        {error && (
          <p className="text-xs font-medium text-rose-400">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-slate-500 sm:text-xs">
            Your links are instantly live and can be managed from the table
            below.
          </p>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-slate-50 shadow-lg shadow-sky-900/40 transition hover:from-sky-400 hover:to-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create short link"}
          </button>
        </div>
      </form>
    </div>
  );
}
