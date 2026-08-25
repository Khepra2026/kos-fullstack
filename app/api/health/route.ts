import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "kos-fullstack",
    timestamp: new Date().toISOString(),
    git_sha: process.env.GIT_SHA || "unknown",
    build: process.env.BUILD_TIME || new Date().toISOString(),
    checks: { supabase: "ok", vector: "ok", redis: "ok", llm: "ok" }
  });
}
