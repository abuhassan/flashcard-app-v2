"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/" className="text-lg font-bold">EASA Flashcards</Link>
        <div className="flex space-x-4">
          {session ? (
            <>
              <span>Welcome, {session.user?.name}</span>
              <Button onClick={() => signOut()} variant="destructive">
                Logout
              </Button>
            </>
          ) : (
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
