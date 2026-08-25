import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "kos-fullstack",
    timestamp: new Date().toISOString(),
    git_sha: process.env.GIT_SHA || "unknown"
  });
}
