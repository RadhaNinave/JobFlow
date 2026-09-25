import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Application from "@/models/Application";
import { getSession } from "@/lib/auth";
import { ok, fail } from "@/lib/response";
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const s = await getSession();
  if (s?.role !== "admin") return fail("Admin access required.", 403);
  await connectDB();
  const { id } = await params;
  const { status } = await req.json();
  if (
    !["Applied", "Reviewing", "Shortlisted", "Rejected", "Selected"].includes(
      status,
    )
  )
    return fail("Invalid application status.");
  const app = await Application.findByIdAndUpdate(
    id,
    { status },
    { new: true },
  );
  if (!app) return fail("Application not found.", 404);
  return ok(app);
}
