import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.flashcard.create({
    data: {
      question: "What is Ohm's Law?",
      answer: "Ohm's Law states that V = IR.",
      mnemonic: "Very Important Rule (V = IR).",
      difficulty: "Easy",
      userId: "5df6a7f1-c59f-41fc-98bd-9cb68194281c", // Replace with actual user ID
    },
  });

  console.log("✅ Flashcard seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());