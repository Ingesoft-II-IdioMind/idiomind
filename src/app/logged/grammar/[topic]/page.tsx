"use client";

import { ExercisePractice } from "app/components/logged/GrammarExercises";
import { NavExercise } from "app/components/shared/NavDocument";

export default function GrammarTopic({
  params,
}: {
  params: { topic: string };
}) {
  const [language, topic] = decodeURIComponent(params.topic).split("-");

  return (
    <>
      <NavExercise name={topic} />
      <ExercisePractice language={language} topic={topic} />
    </>
  );
}
