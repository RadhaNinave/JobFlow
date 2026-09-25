"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Search, MapPin, BriefcaseBusiness } from "lucide-react";
type Job = {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  salary?: string;
  skills: string[];
};
export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [q, setQ] = useState("");
  useEffect(() => {
    fetch("/api/jobs")
      .then((r) => r.json())
      .then((x) => setJobs(x.data || []));
  }, []);
  const filtered = jobs.filter((j) =>
    `${j.title} ${j.company} ${j.location}`
      .toLowerCase()
      .includes(q.toLowerCase()),
  );
  return (
    <main className="container-page">
      <div className="mb-8">
        <p className="text-[#635bff] font-bold">OPPORTUNITIES</p>
        <h1 className="text-4xl font-black mt-1">Find your next role</h1>
        <p className="text-[#667085] mt-2">
          Explore open positions and apply in a few clicks.
        </p>
      </div>
      <div className="relative mb-6">
        {/* <Search className="absolute left-4 top-3.5 text-[#98a2b3]" size={19} /> */}
        <input
          className="input pl-11 left-20"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by role, company or location..."
        />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        {filtered.map((j) => (
          <Link
            key={j._id}
            href={`/jobs/${j._id}`}
            className="glass p-6 hover:-translate-y-1 transition"
          >
            <div className="flex justify-between">
              <div>
                <h2 className="text-xl font-black">{j.title}</h2>
                <p className="font-semibold mt-1">{j.company}</p>
              </div>
              <span className="w-11 h-11 rounded-xl bg-[#101828] text-white flex items-center justify-center">
                <BriefcaseBusiness size={19} />
              </span>
            </div>
            <div className="flex gap-3 text-sm text-[#667085] mt-5">
              <span className="flex gap-1 items-center">
                <MapPin size={15} />
                {j.location}
              </span>
              <span>•</span>
              <span>{j.type}</span>
            </div>
            <p className="text-[#667085] mt-4 line-clamp-2">{j.description}</p>
            <div className="flex gap-2 flex-wrap mt-5">
              {j.skills.slice(0, 4).map((s) => (
                <span className="badge badge-blue" key={s}>
                  {s}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="glass p-12 text-center text-[#667085]">
          No jobs found.
        </div>
      )}
    </main>
  );
}
