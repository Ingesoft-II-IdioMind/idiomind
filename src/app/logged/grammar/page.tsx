"use client"

import { GrammarLenguage, GrammarExercises } from "app/components/logged/GrammarExercises";
import { useState } from "react";

export default function Grammar() {
  
  const [language, setLanguage] = useState<string>("English");

    return (
      <>
        <h1>Grammar exercises</h1>
        <GrammarLenguage language={language} setLanguage={setLanguage}/>
        <GrammarExercises language={language}/> 
      </>
    );
  }
  