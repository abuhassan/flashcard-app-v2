"use client";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session) {
    return <p className="text-center text-red-500">Access Denied. Please log in.</p>;
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Welcome, {session.user?.name || "User"}!</h1>
      <p>You are logged in.</p>
    </main>
  );
}
