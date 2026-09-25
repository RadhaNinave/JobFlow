import Link from "next/link";
import {
  BriefcaseBusiness,
  ArrowRight,
  ShieldCheck,
  Search,
  Users,
} from "lucide-react";
export default function Home() {
  return (
    <main>
      <section className="bg-[#101828] text-white">
        <div className="container-page min-h-[560px] flex items-center">
          <div className="max-w-3xl">
            <span className="badge bg-white/10 text-white mb-5">
              JOBFLOW • SIMPLE. SMART. HUMAN.
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.02]">
              Find work that <span className="text-[#a7a0ff]">fits you.</span>
            </h1>
            <p className="mt-6 text-lg text-slate-300 max-w-2xl">
              A focused job portal where candidates discover opportunities and
              admins manage the hiring pipeline from one clean workspace.
            </p>
            <div className="flex gap-3 mt-8">
              <Link href="/jobs" className="btn btn-primary">
                Explore jobs <ArrowRight size={17} />
              </Link>
              <Link href="/register" className="mt-5 btn bg-white text-[#101828]">
                Create account
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="container-page grid md:grid-cols-3 gap-5">
        <Feature
          icon={<Search />}
          title="Discover"
          text="Search jobs by role, location and employment type."
        />
        <Feature
          icon={<Users />}
          title="Apply"
          text="Apply once and keep your application status in one place."
        />
        <Feature
          icon={<ShieldCheck />}
          title="Managed"
          text="Role-based admin controls keep hiring operations organized."
        />
      </section>
    </main>
  );
}
function Feature({
  icon,
  title,
  text,
}: {
  icon: any;
  title: string;
  text: string;
}) {
  return (
    <div className="glass p-6">
      <div className="w-11 h-11 rounded-xl bg-[#eeecff] text-[#635bff] flex items-center justify-center">
        {icon}
      </div>
      <h3 className="font-bold text-lg mt-5">{title}</h3>
      <p className="text-[#667085] mt-2">{text}</p>
    </div>
  );
}
