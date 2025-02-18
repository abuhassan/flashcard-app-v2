'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  mnemonic?: string;
  difficulty: string;
  tags: { id: string; name: string }[];
}

export default function FlashcardList() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/flashcards')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received');
        }
        setFlashcards(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching flashcards:', error);
        setError('Failed to load flashcards. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading flashcards...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {flashcards.map((flashcard) => (
        <Card key={flashcard.id}>
          <CardHeader>
            <CardTitle>{flashcard.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Answer:</strong> {flashcard.answer}</p>
            {flashcard.mnemonic && <p><strong>Mnemonic:</strong> {flashcard.mnemonic}</p>}
            <p className="mt-2"><strong>Difficulty:</strong> {flashcard.difficulty}</p>
            <div className="mt-2 flex gap-2">
              {flashcard.tags.map(tag => (
                <Badge key={tag.id}>{tag.name}</Badge>
              ))}
            </div>
            <Button variant="outline" className="mt-4">Edit</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
