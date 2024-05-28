"use client";

import { Button } from "app/components/shared/Button";
import { Flashcard } from "./Flashcard";
import styles from "./Flashcard.module.scss";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useBringDeckFlashcardsMutation,
  useBringFlashcardsMutation,
  useCreateFlashcardMutation,
  useEditFlashcardMutation,
} from "app/redux/features/flashApiSlice";
import { NavDeck } from "app/components/shared/NavDocument";
import { useBringOneDeckMutation } from "app/redux/features/deckApiSlice";
import { Loader } from "app/components/shared/Loader";

export interface FlashcardObject {
  id: string;
  frente: string;
  reverso: string;
  mazo: string;
  nombre_mazo: string,
}

export default function PracticeFlashcards({ idDeck }: { idDeck: string }) {
  const [isFront, setIsFront] = useState(true);
  const [deckName, setDeckName] = useState("");
  
  const [flashcardsToReview, setFlashcardsToReview] = useState<
    FlashcardObject[]
  >([]);
  const [currentFlashcard, setCurrentFlashcard] = useState<FlashcardObject>();
  const [bringDeckFlashcards2, { isLoading }] =
    useBringDeckFlashcardsMutation();
  const [editFlashcard2, { isLoading: isLoading4 }] =
    useEditFlashcardMutation();
  const [bringOneDeck2, { isLoading: isLoading2 }] = useBringOneDeckMutation();

  useEffect(() => {
    fetchDeckName();
    fetchFlashcards();
  }, []);

  const fetchFlashcards = () => {
    bringDeckFlashcards2({ id: idDeck })
      .unwrap()
      .then((response) => {
        if (response != undefined) {
          console.log(response);
          const currentDate = new Date();
          // Filtra las flashcards cuya fecha de revisión es menor a la fecha actual
          const flashcardsReview = response.filter((flashcards2: any) => {
            const reviewDate = new Date(flashcards2.proxima_Revision);
            return reviewDate < currentDate;
          });
          setCurrentFlashcard(flashcardsReview[0]);
          setFlashcardsToReview(flashcardsReview);
        }
        // Obtiene la fecha actual
      })
      .catch((e) => {
        toast.error(
          "There was an error while loading the flashcards, please try again"
        );
      });
  };

  const fetchDeckName = () => {
    bringOneDeck2({ id: idDeck })
      .unwrap()
      .then((response) => {
        console.log(response);
        setDeckName(response.nombre);
      })
      .catch((e) => {
        toast.error(
          "There was an error while loading the deck name, please try again"
        );
      });
  };

  const correctAnswer = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    editFlashcard2({
      mazo: currentFlashcard?.mazo,
      frente: currentFlashcard?.frente,
      reverso: currentFlashcard?.reverso,
      proxima_Revision: currentDate,
      id: currentFlashcard?.id,
    })
      .unwrap()
    setIsFront(true);
    const newFlashcards = flashcardsToReview.slice(1);
    setFlashcardsToReview(newFlashcards);
    // console.log(flashcardsToReview);
    if (flashcardsToReview.length > 0) {
      setCurrentFlashcard(newFlashcards[0]);
    } else {
      setCurrentFlashcard(undefined);
    }
    // });
  };

  const wrongAnswer = () => {
    setIsFront(true);
    const newFlashcards = [...flashcardsToReview];
    const firstFlashcard = newFlashcards.shift();
    if (firstFlashcard) {
      newFlashcards.push(firstFlashcard); // Pone la primera flashcard al final
    }
    setFlashcardsToReview(newFlashcards);
    // console.log(flashcardsToReview);
    if (flashcardsToReview.length > 0) {
      setCurrentFlashcard(newFlashcards[0]);
    } else {
      setCurrentFlashcard(undefined);
    }
  };

  return (
    <>
      <NavDeck
        id={idDeck}
        name={deckName}
        flashcard={currentFlashcard}
        fetchFlashcards={fetchFlashcards}
      />
      <div className={styles.flashcard__section}>
        {isLoading ? (
          <Loader color="orange" />
        ) : (
          <>
            {flashcardsToReview.length > 0 ? (
              <>
                {currentFlashcard && (
                  <Flashcard
                    isFront={isFront}
                    front={currentFlashcard.frente || ""}
                    back={currentFlashcard.reverso || ""}
                  />
                )}
                <p className={styles.flashcard__infoBanner}>
                  {flashcardsToReview.length} flashcards left to practice{" "}
                </p>
                <div className={styles.flashcard__buttons}>
                  {isFront ? (
                    <>
                      <Button onClick={() => setIsFront(false)}>
                        Show answer
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className={styles.svgButton} onClick={wrongAnswer}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path d="M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2H464c26.5 0 48-21.5 48-48c0-18.5-10.5-34.6-25.9-42.6C497 236.6 504 223.1 504 208c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48H294.5c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7V192v48 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 384H96c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H32C14.3 96 0 110.3 0 128V352c0 17.7 14.3 32 32 32z" />
                        </svg>
                      </div>
                      <div
                        className={styles.svgButton}
                        onClick={() => setIsFront(true)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path d="M125.7 160H176c17.7 0 32 14.3 32 32s-14.3 32-32 32H48c-17.7 0-32-14.3-32-32V64c0-17.7 14.3-32 32-32s32 14.3 32 32v51.2L97.6 97.6c87.5-87.5 229.3-87.5 316.8 0s87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3s-163.8-62.5-226.3 0L125.7 160z" />
                        </svg>
                      </div>
                      <div className={styles.svgButton} onClick={correctAnswer}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
                        </svg>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className={styles.flashcard__container}>
                <div className={styles.flashcard}>
                  <div className={styles.flashcard__card}>
                    <div className={styles.flashcard__finished}>
                      <p>
                        Congratulations you have practiced all your flashcards
                      </p>
                    </div>
                  </div>
                  <div
                    className={`${styles.flashcard__background} ${styles.background__finished}`}
                  ></div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
