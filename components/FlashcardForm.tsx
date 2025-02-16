"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function FlashcardForm() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [mnemonic, setMnemonic] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent, onFlashcardAdded: () => void) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch("/api/flashcards", {
      method: "POST",
      body: JSON.stringify({ question, answer, mnemonic, difficulty, userId: "test-user-id" }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      setQuestion("");
      setAnswer("");
      setMnemonic("");
      setDifficulty("Easy");
      onFlashcardAdded(); // Refresh the flashcard list
    } else {
      alert("Failed to add flashcard");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, () => {/* handle flashcard added */})} className="space-y-4 p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold">Add a New Flashcard</h2>
      <Input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Enter question" required />
      <Textarea value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Enter answer" required />
      <Input value={mnemonic} onChange={(e) => setMnemonic(e.target.value)} placeholder="Enter mnemonic (optional)" />
      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        className="border p-2 rounded w-full"
      >
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
      <Button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Flashcard"}
      </Button>
    </form>
  );
}