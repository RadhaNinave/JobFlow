"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
export default function Applications() {
  const [apps, setApps] = useState<any[]>([]);
  const load = () =>
    fetch("/api/applications?admin=1")
      .then((r) => r.json())
      .then((x) => setApps(x.data || []));
  useEffect(() => {
    load();
  }, []);
  async function change(id: string, status: string) {
    const r = await fetch(`/api/applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const x = await r.json();
    if (!r.ok) toast.error(x.message);
    else {
      toast.success("Application status updated");
      load();
    }
  }
  return (
    <main className="container-page">
      <h1 className="text-3xl font-black">Applications</h1>
      <p className="text-[#667085] mt-2 mb-6">
        Review candidates and update their hiring stage.
      </p>
      <div className="glass overflow-hidden">
        {apps.map((a) => (
          <div
            key={a._id}
            className="p-5 border-b border-[#eaecf0] flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div>
              <h3 className="font-bold">{a.candidate?.name}</h3>
              <p className="text-sm text-[#667085]">
                {a.candidate?.email} • {a.job?.title}
              </p>
            </div>
            <select
              className="input md:w-48"
              value={a.status}
              onChange={(e) => change(a._id, e.target.value)}
            >
              <option>Applied</option>
              <option>Reviewing</option>
              <option>Shortlisted</option>
              <option>Rejected</option>
              <option>Selected</option>
            </select>
          </div>
        ))}
        {apps.length === 0 && (
          <div className="p-10 text-center text-[#667085]">
            No applications yet.
          </div>
        )}
      </div>
    </main>
  );
}
