import { NextResponse } from "next/server";
export function middleware(req){ const res=NextResponse.next(); res.headers.set("X-Request-ID", crypto.randomUUID()); res.headers.set("X-Git-SHA", process.env.GIT_SHA||"unknown"); return res; }
export const config={matcher:["/api/:path*"]};
