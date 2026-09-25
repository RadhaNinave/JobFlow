"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import JobForm from "@/components/JobForm";
export default function EditJob() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState();
  useEffect(() => {
    fetch(`/api/jobs/${id}`)
      .then((r) => r.json())
      .then((x) => setJob(x.data));
  }, [id]);
  return (
    <main className="container-page max-w-3xl">
      <h1 className="text-3xl font-black mb-6">Edit job</h1>
      {job && <JobForm initial={job} id={id} />}
    </main>
  );
}
