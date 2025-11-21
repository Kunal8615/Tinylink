import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function StatsPage() {
  const { code } = useParams();
  const API = import.meta.env.VITE_API_URL;

  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await fetch(`${API}/api/links/${code}`);
      if (!res.ok) return setData(null);
      setData(await res.json());
    })();
  }, [code]);

  if (!data) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="card max-w-md border-slate-800/80 bg-slate-950/80 text-center">
          <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">
            Link not found
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            We couldn&apos;t find any stats for{" "}
            <span className="font-mono text-slate-200">{code}</span>. The link
            may have been deleted or never existed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="card max-w-xl border-slate-800/80 bg-slate-950/80">
        <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">
          Stats for{" "}
          <span className="inline-flex items-center rounded-full bg-slate-900/80 px-2.5 py-1 text-xs font-semibold text-sky-300 ring-1 ring-sky-500/40">
            {code}
          </span>
        </h2>

        <div className="mt-4 space-y-3 text-sm text-slate-200 sm:text-[15px]">
          <p className="break-all text-slate-300">
            <span className="font-semibold text-slate-100">URL:</span>{" "}
            {data.url}
          </p>
          <p>
            <span className="font-semibold text-slate-100">Clicks:</span>{" "}
            {data.clicks ?? 0}
          </p>
          <p>
            <span className="font-semibold text-slate-100">Created:</span>{" "}
            {new Date(data.createdAt).toLocaleString()}
          </p>
          <p>
            <span className="font-semibold text-slate-100">Last clicked:</span>{" "}
            {data.last_clicked
              ? new Date(data.last_clicked).toLocaleString()
              : "-"}
          </p>
        </div>
      </div>
    </div>
  );
}
