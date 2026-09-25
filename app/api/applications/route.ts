import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Application from "@/models/Application";
import Job from "@/models/Job";
import User from "@/models/User";
import { getSession } from "@/lib/auth";
import { ok, fail } from "@/lib/response";
export async function GET() {
  const s = await getSession();
  if (!s) return fail("Please sign in.", 401);
  await connectDB();
  const q = s.role === "admin" ? {} : { candidate: s.id };
  const apps = await Application.find(q)
    .populate("job", "title company location")
    .populate("candidate", "name email")
    .sort({ createdAt: -1 })
    .lean();
  return ok(apps);
}
export async function POST(req: NextRequest) {
  const s = await getSession();
  if (!s) return fail("Please sign in to apply.", 401);
  if (s.role !== "user") return fail("Admins cannot apply for jobs.", 403);
  const { jobId, coverNote } = await req.json();
  if (!jobId) return fail("Job is required.");
  await connectDB();
  const job = await Job.findOne({ _id: jobId, isOpen: true });
  if (!job) return fail("This job is no longer accepting applications.", 404);
  try {
    const app = await Application.create({
      job: jobId,
      candidate: s.id,
      coverNote,
    });
    return ok(app, 201);
  } catch (e: any) {
    if (e.code === 11000)
      return fail("You have already applied to this job.", 409);
    return fail("Could not submit application.", 400);
  }
}
