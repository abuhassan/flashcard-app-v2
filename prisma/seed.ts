import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // 1️⃣ Delete existing data (optional but prevents duplication errors)
  await prisma.flashcard.deleteMany();
  await prisma.user.deleteMany();

  // 2️⃣ Seed Users
  const hashedPassword = await bcrypt.hash("password123", 10);
  
  const adminUser = await prisma.user.create({
    data: {
      id: "admin-user-id", // You can remove this if using auto-generated UUID
      name: "Admin User",
      email: "admin@example.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  const testUser = await prisma.user.create({
    data: {
      id: "test-user-id", // You can remove this if using auto-generated UUID
      name: "Test User",
      email: "test@example.com",
      password: hashedPassword,
      role: "USER",
    },
  });

  console.log("✅ Users seeded successfully!");

  // 3️⃣ Seed Flashcards (Use the IDs of created users)
  await prisma.flashcard.createMany({
    data: [
      {
        question: "What is Ohm's Law?",
        answer: "V = IR",
        difficulty: "Easy",
        userId: adminUser.id, // Use the fetched user ID
      },
      {
        question: "What is the SI unit of capacitance?",
        answer: "Farad (F)",
        difficulty: "Medium",
        userId: testUser.id,
      },
    ],
  });

  console.log("✅ Flashcards seeded successfully!");
}

main()
  .catch((error) => {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });