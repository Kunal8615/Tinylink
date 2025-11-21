import { useEffect, useState } from "react";
import AddLinkForm from "../components/AddLinkForm";
import LinkTable from "../components/LinkTable";

export default function Dashboard() {
  const API = import.meta.env.VITE_API_URL;
  const [links, setLinks] = useState([]);

  const loadLinks = async () => {
    const res = await fetch(`${API}/api/links`);
    setLinks(await res.json());
  };

  useEffect(() => {
    loadLinks();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
            TinyLink Dashboard
          </h1>
          <p className="mt-1 max-w-xl text-sm text-slate-400 sm:text-[15px]">
            Create branded short URLs, share them instantly and keep an eye on
            how they&apos;re performing in a clean, minimal interface.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/60 px-3 py-1.5 text-[11px] text-slate-300 sm:text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_3px_rgba(34,197,94,0.45)]" />
          <span className="font-medium">
            {links.length ? `${links.length} active links` : "No links yet"}
          </span>
        </div>
      </div>

      <AddLinkForm onCreated={(l) => setLinks([l, ...links])} />

      <LinkTable
        links={links}
        onDeleted={(code) => setLinks(links.filter((l) => l.code !== code))}
      />
    </div>
  );
}
