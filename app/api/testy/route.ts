import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const testConnection = await prisma.$queryRaw`SELECT 1;`;
    return NextResponse.json({ success: "Connection successful!" });
  } catch (error:any) {
    return NextResponse.json(
      { error: "Database connection failed", details: error.message },
      { status: 500 }
    );
  }
}
