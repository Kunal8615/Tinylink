import { Link } from "react-router-dom";

export default function LinkTable({ links, onDeleted }) {
  const API = import.meta.env.VITE_API_URL;
  const BASE = import.meta.env.VITE_BASE_URL;

  const del = async (code) => {
    if (!confirm(`Delete ${code}?`)) return;

    const res = await fetch(`${API}/api/links/${code}`, {
      method: "DELETE"
    });

    if (res.ok) {
      onDeleted(code);
    }
  };

  return (
    <div className="card mt-2 border-slate-800/80 bg-slate-950/70">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-50 sm:text-lg">
            All short links
          </h3>
          <p className="mt-1 text-xs text-slate-400 sm:text-[13px]">
            Click any code to view detailed stats, or copy the short URL to
            share.
          </p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-2.5 py-1 text-[11px] text-slate-300 ring-1 ring-slate-700/80 sm:text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
          Track clicks in real time
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-800/80 bg-slate-950/80">
        <div className="max-h-[420px] overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-200">
            <thead className="sticky top-0 bg-slate-950/95 text-xs uppercase tracking-wide text-slate-400 backdrop-blur">
              <tr>
                <th className="px-3 py-3 font-medium sm:px-4">Code</th>
                <th className="hidden px-3 py-3 font-medium sm:table-cell sm:px-4">
                  Destination
                </th>
                <th className="px-3 py-3 font-medium sm:px-4">Clicks</th>
                <th className="px-3 py-3 font-medium sm:px-4">Short URL</th>
                <th className="px-3 py-3 text-right font-medium sm:px-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {!links.length && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-sm text-slate-400"
                  >
                    No links yet. Create your first short link above.
                  </td>
                </tr>
              )}

              {links.map((l) => (
                <tr
                  key={l._id}
                  className="border-t border-slate-800/80 hover:bg-slate-900/50"
                >
                  <td className="px-3 py-3 text-sm font-medium text-slate-50 sm:px-4">
                    <Link
                      to={`/code/${l.code}`}
                      className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-2.5 py-1 text-xs font-semibold text-sky-300 ring-1 ring-sky-500/40 hover:bg-sky-500/10"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                      {l.code}
                    </Link>
                  </td>
                  <td className="hidden max-w-xs truncate px-3 py-3 text-xs text-slate-300 sm:table-cell sm:px-4">
                    {l.url}
                  </td>
                  <td className="px-3 py-3 text-sm text-slate-200 sm:px-4">
                    {l.clicks ?? 0}
                  </td>
                  <td className="px-3 py-3 text-xs text-slate-300 sm:px-4">
                    <div className="flex flex-col gap-1">
                      <span className="truncate font-mono text-[11px] sm:text-xs">
                        {`${BASE}/${l.code}`}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-right text-xs sm:px-4 sm:text-sm">
                    <div className="flex flex-wrap justify-end gap-1.5">
                      <button
                        type="button"
                        className="inline-flex items-center rounded-lg border border-slate-700/80 bg-slate-900/80 px-2 py-1 text-[11px] font-medium text-slate-100 transition hover:border-sky-500/60 hover:bg-sky-500/10 sm:px-3 sm:text-xs"
                        onClick={() => {
                          navigator.clipboard.writeText(`${BASE}/${l.code}`);
                        }}
                      >
                        Copy
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center rounded-lg border border-rose-700/80 bg-rose-900/60 px-2 py-1 text-[11px] font-medium text-rose-50 transition hover:bg-rose-600/80 sm:px-3 sm:text-xs"
                        onClick={() => del(l.code)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
