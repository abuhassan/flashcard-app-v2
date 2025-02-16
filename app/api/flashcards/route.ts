import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const flashcards = await prisma.flashcard.findMany();
  return NextResponse.json(flashcards);
}

export async function POST(req: Request) {
  const { question, answer, mnemonic, difficulty, userId } = await req.json();
  const newCard = await prisma.flashcard.create({
    data: { question, answer, mnemonic, difficulty, userId },
  });
  return NextResponse.json(newCard);
}