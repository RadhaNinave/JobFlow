"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  LayoutDashboard,
  LogOut,
  UserCircle,
  Menu,
  X,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
type Session = { name: string; email: string; role: "user" | "admin" };
export default function Navbar() {
  const [session, setSession] = useState<Session | null>(null);
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const router = useRouter();
  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((x) => setSession(x.data || null))
      .catch(() => {});
  }, [path]);
  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setSession(null);
    toast.success("Signed out successfully");
    router.push("/");
    router.refresh();
  }
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-[#eaecf0]">
      <div className="max-w-[1180px] mx-auto px-5 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-black text-lg">
          <span className="w-9 h-9 rounded-xl bg-[#635bff] text-white flex items-center justify-center">
            <BriefcaseBusiness size={18} />
          </span>
          JobFlow
        </Link>
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
        <nav
          className={`${open ? "flex" : "hidden"} md:flex absolute md:static top-16 left-0 right-0 bg-white md:bg-transparent p-5 md:p-0 flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 border-b md:border-0`}
        >
          <Link href="/jobs">Jobs</Link>
          {session?.role === "user" && (
            <Link href="/dashboard">My Dashboard</Link>
          )}
          {session?.role === "admin" && (
            <>
              <Link href="/admin">Admin Dashboard</Link>
              <Link href="/admin/jobs">Jobs</Link>
              <Link href="/admin/applications">Applications</Link>
            </>
          )}
          {!session ? (
            <>
              <Link href="/login" className="font-semibold">
                Sign in
              </Link>
              <Link href="/register" className="btn btn-primary">
                Get started
              </Link>
            </>
          ) : (
            <button onClick={logout} className="btn btn-soft">
              <LogOut size={16} />
              Sign out
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
