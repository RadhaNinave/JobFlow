"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BriefcaseBusiness, Users, FileText, Plus } from "lucide-react";
export default function Admin() {
  const [s, setS] = useState<any>();
  const router = useRouter();
  useEffect(() => {
    fetch("/api/admin/stats").then(async (r) => {
      if (r.status === 401 || r.status === 403) {
        router.push("/login");
        return;
      }
      const x = await r.json();
      setS(x.data);
    });
  }, []);
  if (!s)
    return <main className="container-page">Loading admin workspace…</main>;
  return (
    <main className="container-page">
      <div className="flex justify-between items-end mb-7">
        <div>
          <p className="text-[#635bff] font-bold">ADMIN WORKSPACE</p>
          <h1 className="text-4xl font-black">Hiring overview</h1>
          <p className="text-[#667085] mt-2">
            Manage jobs and candidate applications.
          </p>
        </div>
        <Link href="/admin/jobs/new" className="btn btn-primary">
          <Plus size={17} />
          Post job
        </Link>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <Card icon={<BriefcaseBusiness />} title="Jobs" value={s.jobs} />
        <Card icon={<Users />} title="Candidates" value={s.users} />
        <Card icon={<FileText />} title="Applications" value={s.applications} />
      </div>
      <div className="grid md:grid-cols-2 gap-5 mt-6">
        <Link
          href="/admin/jobs"
          className="glass p-6 hover:-translate-y-1 transition"
        >
          <h2 className="font-black text-xl">Manage jobs</h2>
          <p className="text-[#667085] mt-2">
            Create, edit, close and delete job listings.
          </p>
        </Link>
        <Link
          href="/admin/applications"
          className="glass p-6 hover:-translate-y-1 transition"
        >
          <h2 className="font-black text-xl">Review applications</h2>
          <p className="text-[#667085] mt-2">
            Move candidates through your hiring pipeline.
          </p>
        </Link>
      </div>
    </main>
  );
}
function Card({
  icon,
  title,
  value,
}: {
  icon: any;
  title: string;
  value: number;
}) {
  return (
    <div className="glass p-6">
      <div className="flex justify-between">
        <div>
          <p className="text-[#667085]">{title}</p>
          <p className="text-4xl font-black mt-2">{value}</p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-[#eeecff] text-[#635bff] flex items-center justify-center">
          {icon}
        </div>
      </div>
    </div>
  );
}
