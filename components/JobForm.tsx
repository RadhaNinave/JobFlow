"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export default function JobForm({
  initial,
  id,
}: {
  initial?: any;
  id?: string;
}) {
  const [f, setF] = useState({
    title: initial?.title || "",
    company: initial?.company || "",
    location: initial?.location || "",
    type: initial?.type || "Full-time",
    salary: initial?.salary || "",
    skills: initial?.skills?.join(", ") || "",
    description: initial?.description || "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  function ch(k: string, v: string) {
    setF((x) => ({ ...x, [k]: v }));
  }
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const payload = {
      ...f,
      skills: f.skills
        .split(",")
       .map((x: string) => x.trim())
        .filter(Boolean),
    };
    try {
      const r = await fetch(id ? `/api/jobs/${id}` : "/api/jobs", {
        method: id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const x = await r.json();
      if (!r.ok) throw new Error(x.message);
      toast.success(
        id ? "Job updated successfully" : "Job posted successfully",
      );
      router.push("/admin/jobs");
    } catch (e: any) {
      toast.error(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  return (
    <form onSubmit={submit} className="glass p-7 space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label="Job title"
          value={f.title}
          onChange={(v) => ch("title", v)}
        />
        <Input
          label="Company"
          value={f.company}
          onChange={(v) => ch("company", v)}
        />
        <Input
          label="Location"
          value={f.location}
          onChange={(v) => ch("location", v)}
        />
        <label>
          <span className="label">Employment type</span>
          <select
            className="input"
            value={f.type}
            onChange={(e) => ch("type", e.target.value)}
          >
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Internship</option>
          </select>
        </label>
        <Input
          label="Salary"
          value={f.salary}
          onChange={(v) => ch("salary", v)}
          placeholder="₹8–12 LPA"
        />
        <Input
          label="Skills (comma separated)"
          value={f.skills}
          onChange={(v) => ch("skills", v)}
          placeholder="React, Node.js, MongoDB"
        />
      </div>
      <label>
        <span className="label">Description</span>
        <textarea
          className="input min-h-40"
          required
          value={f.description}
          onChange={(e) => ch("description", e.target.value)}
        />
      </label>
      <button disabled={loading} className="btn btn-primary w-full">
        {loading ? "Saving…" : id ? "Save changes" : "Publish job"}
      </button>
    </form>
  );
}
function Input({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label>
      <span className="label">{label}</span>
      <input
        className="input"
        required
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
