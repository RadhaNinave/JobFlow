"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const r = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const x = await r.json();
      if (!r.ok) throw new Error(x.message);
      toast.success("Welcome back!");
      router.push(x.data.role === "admin" ? "/admin" : "/dashboard");
      router.refresh();
    } catch (e: any) {
      toast.error(e.message || "Unable to sign in");
    } finally {
      setLoading(false);
    }
  }
  return (
    <AuthShell title="Welcome back" subtitle="Sign in to continue to JobFlow.">
      <form onSubmit={submit} className="space-y-4">
        <Field label="Email">
          <input
            className="input"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </Field>
        <Field label="Password">
          <input
            className="input"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </Field>
        <button disabled={loading} className="mt-5 btn btn-primary w-full">
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
      <p className="text-center text-sm text-[#667085] mt-5">
        New here?{" "}
        <Link className="text-[#635bff] font-bold" href="/register">
          Create account
        </Link>
      </p>
    </AuthShell>
  );
}
export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label>
      <span className="label">{label}</span>
      {children}
    </label>
  );
}
function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-[calc(100vh-64px)] flex items-center justify-center p-5">
      <div className="glass w-full max-w-md p-8">
        <div className="w-12 h-12 rounded-2xl bg-[#eeecff] text-[#635bff] flex items-center justify-center mb-6">
          ↗
        </div>
        <h1 className="text-3xl font-black">{title}</h1>
        <p className="text-[#667085] mt-2 mb-7">{subtitle}</p>
        {children}
      </div>
    </main>
  );
}
