import Link from "next/link";
import styles from "./Grammar.module.scss";
import { useEffect, useState } from "react";

interface ExercisesProps {
  language: string;
}

export const GrammarExercises: React.FC<ExercisesProps> = ({language}) => {
  const sectionsGerman = [
    {
      title: "Substantive (Nomen)",
      exercises: [
        { name: "Arten von Substantiven", level: "A2" },
        { name: "Zählbare und unzählbare Substantive", level: "B1" },
        { name: "Pluralformen", level: "B1" },
        { name: "Possessivpronomen", level: "B1" },
        { name: "Kollektivsubstantive", level: "C1" },
      ],
    },
    {
      title: "Verben",
      exercises: [
        { name: "Verbformen", level: "A2" },
        { name: "Regelmäßige und unregelmäßige Verben", level: "B1" },
        { name: "Modalverben", level: "B1" },
        { name: "Phrasalverben", level: "B1" },
        { name: "Verbkonjugation", level: "C1" },
      ],
    },
    {
      title: "Adjektive",
      exercises: [
        { name: "Arten von Adjektiven", level: "B1" },
        { name: "Komparativ- und Superlativformen", level: "B1" },
        { name: "Reihenfolge der Adjektive", level: "B1" },
        { name: "Demonstrativadjektive", level: "C1" },
      ],
    },
    {
      title: "Adverbien",
      exercises: [
        { name: "Arten von Adverbien", level: "B1" },
        { name: "Adverbposition", level: "B1" },
        { name: "Komparativ- und Superlativadverbien", level: "C1" },
      ],
    },
    {
      title: "Konjunktionen",
      exercises: [
        { name: "Koordinierende Konjunktionen", level: "B1" },
        { name: "Subordinierende Konjunktionen", level: "B1" },
        { name: "Korrelative Konjunktionen", level: "C1" },
      ],
    },
    {
      title: "Präpositionen",
      exercises: [
        { name: "Übliche Präpositionen", level: "B1" },
        { name: "Präpositionen des Ortes", level: "B1" },
        { name: "Präpositionen der Zeit", level: "B1" },
        { name: "Präpositionen der Bewegung", level: "C1" },
      ],
    },
    {
      title: "Pronomen",
      exercises: [
        { name: "Persönliche Pronomen", level: "B1" },
        { name: "Reflexivpronomen", level: "B1" },
        { name: "Possessivpronomen", level: "C1" },
      ],
    },
  ];

  const sectionsEnglish = [
    {
      title: "Nouns",
      exercises: [
        { name: "Types of Nouns", level: "A2" },
        { name: "Countable and Uncountable Nouns", level: "B1" },
        { name: "Plural Forms", level: "B1" },
        { name: "Possessive Nouns", level: "B1" },
        { name: "Collective Nouns", level: "C1" },
      ],
    },
    {
      title: "Verbs",
      exercises: [
        { name: "Verb Tenses", level: "A2" },
        { name: "Regular and Irregular Verbs", level: "B1" },
        { name: "Modal Verbs", level: "B1" },
        { name: "Phrasal Verbs", level: "B1" },
        { name: "Verb Agreement", level: "C1" },
      ],
    },
    {
      title: "Adjectives",
      exercises: [
        { name: "Types of Adjectives", level: "B1" },
        { name: "Comparative and Superlative Forms", level: "B1" },
        { name: "Order of Adjectives", level: "B1" },
        { name: "Demonstrative Adjectives", level: "C1" },
      ],
    },
    {
      title: "Adverbs",
      exercises: [
        { name: "Types of Adverbs", level: "B1" },
        { name: "Adverb Placement", level: "B1" },
        { name: "Comparative and Superlative Adverbs", level: "C1" },
      ],
    },
    {
      title: "Conjunctions",
      exercises: [
        { name: "Coordinating Conjunctions", level: "B1" },
        { name: "Subordinating Conjunctions", level: "B1" },
        { name: "Correlative Conjunctions", level: "C1" },
      ],
    },
    {
      title: "Prepositions",
      exercises: [
        { name: "Common Prepositions", level: "B1" },
        { name: "Prepositions of Place", level: "B1" },
        { name: "Prepositions of Time", level: "B1" },
        { name: "Prepositions of Movement", level: "C1" },
      ],
    },
    {
      title: "Pronouns",
      exercises: [
        { name: "Personal Pronouns", level: "B1" },
        { name: "Reflexive Pronouns", level: "B1" },
        { name: "Possessive Pronouns", level: "C1" },
      ],
    },
  ];

  const sectionsFrench = [
    {
      title: "Noms (Substantifs)",
      exercises: [
        { name: "Types de noms", level: "A2" },
        { name: "Noms comptables et non comptables", level: "B1" },
        { name: "Formes du pluriel", level: "B1" },
        { name: "Pronoms possessifs", level: "B1" },
        { name: "Noms collectifs", level: "C1" },
      ],
    },
    {
      title: "Verbes",
      exercises: [
        { name: "Conjugaison des verbes", level: "A2" },
        { name: "Verbes réguliers et irréguliers", level: "B1" },
        { name: "Verbes modaux", level: "B1" },
        { name: "Verbes pronominaux", level: "B1" },
        { name: "Accord du participe passé", level: "C1" },
      ],
    },
    {
      title: "Adjectifs",
      exercises: [
        { name: "Types d'adjectifs", level: "B1" },
        { name: "Formes comparatives et superlatives", level: "B1" },
        { name: "Position des adjectifs", level: "B1" },
        { name: "Adjectifs démonstratifs", level: "C1" },
      ],
    },
    {
      title: "Adverbes",
      exercises: [
        { name: "Types d'adverbes", level: "B1" },
        { name: "Placement des adverbes", level: "B1" },
        { name: "Adverbes de comparaison et de superlatif", level: "C1" },
      ],
    },
    {
      title: "Conjonctions",
      exercises: [
        { name: "Conjonctions de coordination", level: "B1" },
        { name: "Conjonctions de subordination", level: "B1" },
        { name: "Conjonctions corrélatives", level: "C1" },
      ],
    },
    {
      title: "Prépositions",
      exercises: [
        { name: "Prépositions courantes", level: "B1" },
        { name: "Prépositions de lieu", level: "B1" },
        { name: "Prépositions de temps", level: "B1" },
        { name: "Prépositions de mouvement", level: "C1" },
      ],
    },
    {
      title: "Pronoms",
      exercises: [
        { name: "Pronoms personnels", level: "B1" },
        { name: "Pronoms relatifs", level: "B1" },
        { name: "Pronoms possessifs", level: "C1" },
      ],
    },
  ];

  const sectionsItalian = [
    {
      title: "Sostantivi",
      exercises: [
        { name: "Tipi di sostantivi", level: "A2" },
        { name: "Sostantivi numerabili e non numerabili", level: "B1" },
        { name: "Forme del plurale", level: "B1" },
        { name: "Pronomi possessivi", level: "B1" },
        { name: "Sostantivi collettivi", level: "C1" },
      ],
    },
    {
      title: "Verbi",
      exercises: [
        { name: "Coniugazione dei verbi", level: "A2" },
        { name: "Verbi regolari e irregolari", level: "B1" },
        { name: "Verbi modali", level: "B1" },
        { name: "Verbi riflessivi", level: "B1" },
        { name: "Accordo del participio passato", level: "C1" },
      ],
    },
    {
      title: "Aggettivi",
      exercises: [
        { name: "Tipi di aggettivi", level: "B1" },
        { name: "Forme comparative e superlative", level: "B1" },
        { name: "Posizione degli aggettivi", level: "B1" },
        { name: "Aggettivi dimostrativi", level: "C1" },
      ],
    },
    {
      title: "Avverbi",
      exercises: [
        { name: "Tipi di avverbi", level: "B1" },
        { name: "Posizione degli avverbi", level: "B1" },
        { name: "Avverbi di comparazione e superlativi", level: "C1" },
      ],
    },
    {
      title: "Congiunzioni",
      exercises: [
        { name: "Congiunzioni coordinate", level: "B1" },
        { name: "Congiunzioni subordinative", level: "B1" },
        { name: "Congiunzioni correlative", level: "C1" },
      ],
    },
    {
      title: "Preposizioni",
      exercises: [
        { name: "Preposizioni comuni", level: "B1" },
        { name: "Preposizioni di luogo", level: "B1" },
        { name: "Preposizioni di tempo", level: "B1" },
        { name: "Preposizioni di movimento", level: "C1" },
      ],
    },
    {
      title: "Pronomi",
      exercises: [
        { name: "Pronomi personali", level: "B1" },
        { name: "Pronomi relativi", level: "B1" },
        { name: "Pronomi possessivi", level: "C1" },
      ],
    },
  ];

  const [sections, setSections] = useState(
    language == "English" ? sectionsEnglish : sectionsGerman
  );

  useEffect(() => {
    setSections(language == "English" ? sectionsEnglish : language == "German"? sectionsGerman : language == "French"? sectionsFrench: language == "Italian"? sectionsItalian: []);
  }, [language]);

  return (
    <div className={styles.grammarContainer}>
      {sections.map((section, sectionIndex) => (
        <div key={100+sectionIndex} className={styles.grammarSection}>
          <h2 className={styles.grammarSection__title}>{section.title}</h2>
          {section.exercises.map((exercise, exerciseIndex) => (
            <Link
              key={200+sectionIndex*100+exerciseIndex} // Añade una clave única aquí
              href={`/logged/grammar/${language}-${exercise.name}`}
              className={styles.grammarSection__exercise}
            >
              <div className={styles.grammarSection__exerciseLevel}>
                {exercise.level}
              </div>
              <p className={styles.grammarSection__exerciseName}>
                {exercise.name}
              </p>
              <IconArrowRight />
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}

const IconArrowRight = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
    </svg>
  );
};
