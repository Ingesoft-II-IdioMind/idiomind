import { PracticeFlashcards } from "app/components/logged/Flashcard";

export default function Flashcards({ params }: { params: { id: string } }) {
    return (
      <PracticeFlashcards idDeck={params.id} />
    );
  }
  