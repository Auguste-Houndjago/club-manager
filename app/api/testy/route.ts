// app/api/testy/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Connexion explicite
    await prisma.$connect()
    
    // Test de requête
    const result = await prisma.$queryRaw`SELECT 1;`
    
    return NextResponse.json({ 
      success: "Connection successful!", 
      result 
    });
  } catch (error) {
    console.error("Detailed error:", error);
    
    return NextResponse.json(
      { 
        error: "Database connection failed", 
        details: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  } finally {
    // Déconnexion propre
    await prisma.$disconnect()
  }
}