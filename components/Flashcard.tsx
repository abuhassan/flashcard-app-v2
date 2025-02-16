"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FlashcardProps {
  question: string;
  answer: string;
  mnemonic?: string;
}

export default function Flashcard({ question, answer, mnemonic }: FlashcardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <Card onClick={() => setFlipped(!flipped)} className="cursor-pointer shadow-md">
      <CardHeader>
        <CardTitle>{flipped ? "Answer" : "Question"}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{flipped ? answer : question}</p>
        {flipped && mnemonic && <p className="mt-2 text-sm text-gray-500">{mnemonic}</p>}
      </CardContent>
    </Card>
  );
}