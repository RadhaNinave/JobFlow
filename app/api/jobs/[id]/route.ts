import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Job from "@/models/Job";
import { getSession } from "@/lib/auth";
import { ok, fail } from "@/lib/response";
export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();
  const { id } = await params;
  const job = await Job.findById(id).lean();
  if (!job) return fail("Job not found.", 404);
  return ok(job);
}
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const s = await getSession();
  if (s?.role !== "admin") return fail("Admin access required.", 403);
  await connectDB();
  const { id } = await params;
  const job = await Job.findByIdAndUpdate(id, await req.json(), {
    new: true,
    runValidators: true,
  });
  if (!job) return fail("Job not found.", 404);
  return ok(job);
}
export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const s = await getSession();
  if (s?.role !== "admin") return fail("Admin access required.", 403);
  await connectDB();
  const { id } = await params;
  const job = await Job.findByIdAndDelete(id);
  if (!job) return fail("Job not found.", 404);
  return ok({ message: "Job deleted" });
}
