import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Welcome to EASA Flashcard Generator</h1>
      <p className="mt-2 text-gray-600">Prepare for your exams the smart way!</p>
      <Link href="/login">
        <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Get Started
        </button>
      </Link>
    </main>
  );
}
