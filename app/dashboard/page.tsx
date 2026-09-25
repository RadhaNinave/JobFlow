"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
export default function Dashboard() {
  const [data, setData] = useState<any[]>([]);
  const [user, setUser] = useState<any>();
  const router = useRouter();
  useEffect(() => {
    Promise.all([fetch("/api/auth/me"), fetch("/api/applications")]).then(
      async ([u, a]) => {
        const uj = await u.json();
        const aj = await a.json();
        if (!uj.data) {
          router.push("/login");
          return;
        }
        if (uj.data.role === "admin") {
          router.push("/admin");
          return;
        }
        setUser(uj.data);
        setData(aj.data || []);
      },
    );
  }, []);
  return (
    <main className="container-page">
      <div className="mb-7">
        <p className="text-[#635bff] font-bold">CANDIDATE SPACE</p>
        <h1 className="text-4xl font-black">
          Hello, {user?.name?.split(" ")[0] || "there"} 👋
        </h1>
        <p className="text-[#667085] mt-2">
          Track your applications and keep moving forward.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-4 mb-7">
        <Stat title="Applications" value={data.length} />
        <Stat
          title="In review"
          value={
            data.filter(
              (x) => x.status === "Reviewing" || x.status === "Shortlisted",
            ).length
          }
        />
        <Stat
          title="Selected"
          value={data.filter((x) => x.status === "Selected").length}
        />
      </div>
      <div className="glass overflow-hidden">
        <div className="p-6 border-b border-[#eaecf0]">
          <h2 className="font-black text-xl">My applications</h2>
        </div>
        {data.map((a) => (
          <div
            key={a._id}
            className="p-5 border-b border-[#f2f4f7] flex items-center justify-between gap-4"
          >
            <div>
              <h3 className="font-bold">{a.job?.title}</h3>
              <p className="text-sm text-[#667085]">
                {a.job?.company} • {a.job?.location}
              </p>
            </div>
            <span
              className={`badge ${a.status === "Rejected" ? "badge-red" : a.status === "Selected" ? "badge-green" : a.status === "Shortlisted" ? "badge-blue" : "badge-yellow"}`}
            >
              {a.status}
            </span>
          </div>
        ))}
        {data.length === 0 && (
          <div className="p-10 text-center text-[#667085]">
            You haven't applied to any jobs yet.{" "}
            <a className="text-[#635bff] font-bold" href="/jobs">
              Browse jobs
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
function Stat({ title, value }: { title: string; value: number }) {
  return (
    <div className="glass p-5">
      <p className="text-[#667085] text-sm">{title}</p>
      <p className="text-3xl font-black mt-2">{value}</p>
    </div>
  );
}
