"use client";

import { Button } from "app/components/shared/Button";
import { Flashcard } from "./Flashcard";
import styles from "./Flashcard.module.scss";
import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useBringFlashcardsMutation,
  useDeleteFlashcardMutation,
  useEditFlashcardMutation,
} from "app/redux/features/flashApiSlice";
import {
  useBringDecksMutation,
  useBringOneDeckMutation,
} from "app/redux/features/deckApiSlice";
import { Loader } from "app/components/shared/Loader";
import { FlashcardObject } from "./PracticeFlashcards";
import { Modal } from "app/components/shared/Modal";
import { TextField } from "app/components/shared/TextField";
import { set } from "zod";
import { DeckType } from "../Deck/MapDecks";

export default function AllFlashcards() {
  const [bringFlashcards2, { isLoading: isLoading2 }] =
    useBringFlashcardsMutation();
  const [deleteFlashcard2, { isLoading: isLoading3 }] =
    useDeleteFlashcardMutation();
  const [editFlashcard2, { isLoading: isLoading4 }] =
    useEditFlashcardMutation();
  const [newEditFlashcardFront, setNewEditFlashcardFront] =
    useState<string>("");
  const [newEditFlashcardBack, setNewEditFlashcardBack] = useState<string>("");
  const [newEditDeck, setNewEditDeck] = useState<string>("");
  const [flashcards, setFlashcards] = useState<FlashcardObject[]>([]);
  const [isEditFlashcardOpen, setIsEditFlashcardOpen] = useState(false);
  const [isDeleteFlashcardOpen, setIsDeleteFlashcardOpen] = useState(false);
  const [flashcardSelected, setFlashcardSelected] = useState<FlashcardObject>();
  const [decks, setDecks] = useState<DeckType[]>([]);
  const [bringDecks2, { isLoading }] = useBringDecksMutation();

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = () => {
    bringFlashcards2(undefined)
      .unwrap()
      .then((response) => {
        console.log(response);
        if (response != undefined) {
          setFlashcards(response);
        }
      })
      .catch((e) => {
        toast.error(
          "There was an error while loading the flashcards, please try again"
        );
      });
  };

  const fetchDecks = () => {
    bringDecks2(undefined)
      .unwrap()
      .then((response: SetStateAction<DeckType[]>) => {
        setDecks(response);
      });
  };

  const handleNewEditFront = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEditFlashcardFront(e.target.value);
  };

  const handleNewEditBack = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEditFlashcardBack(e.target.value);
  };

  function handleDeckChange(e: ChangeEvent<HTMLSelectElement>): void {
    setNewEditDeck(e.target.value);
    console.log(newEditDeck);
  }

  const editSelectedFlashcard = (flashcardId: String) => {
    const selectedFlashcard = flashcards.find(
      (flashcard2) => flashcard2.id === flashcardId
    );

    if (selectedFlashcard) {
      setFlashcardSelected(selectedFlashcard);
      setNewEditFlashcardFront(selectedFlashcard.frente || "");
      setNewEditFlashcardBack(selectedFlashcard.reverso || "");
      setNewEditDeck(selectedFlashcard.mazo || "");
      setIsEditFlashcardOpen(true);
      fetchDecks();
    }
  };

  const editFlashcard = () => {
    editFlashcard2({
      mazo: newEditDeck,
      frente: newEditFlashcardFront,
      reverso: newEditFlashcardBack,
      proxima_Revision: new Date(),
      id: flashcardSelected?.id,
    })
      .unwrap()
      .then(() => {
        toast.success("Flashcard updated successfully");
        setIsEditFlashcardOpen(false);
        fetchFlashcards();
      })
      .catch(() => {
        toast.error(
          "There was an error while editing the flashcard, please try again"
        );
      });
  };

  const deleteFlashcard = () => {
    deleteFlashcard2({ id: flashcardSelected?.id })
      .unwrap()
      .then((response) => {
        console.log(response);
        toast.success("Flashcard deleted successfully");
        setIsDeleteFlashcardOpen(false);
        fetchFlashcards();
      })
      .catch((e) => {
        toast.error(
          "There was an error while deleting the flashcard, please try again"
        );
      });
  };

  return (
    <>
      <div className={styles.tableFlashcards}>
        <table>
          <thead>
            <tr>
              <th>Front</th>
              <th>Back</th>
              <th>Deck</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {flashcards.map((flashcard) => (
              <tr key={flashcard.id}>
                <td>{flashcard.frente}</td>
                <td>{flashcard.reverso}</td>
                <td>{flashcard.nombre_mazo}</td>
                <td>
                  <svg
                    onClick={() => {
                      setFlashcardSelected(
                        flashcards.find(
                          (flashcard2) => flashcard2.id === flashcard.id
                        )
                      );
                      setIsDeleteFlashcardOpen(true);
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                  </svg>
                </td>
                <td>
                  <svg
                    onClick={() => {
                      editSelectedFlashcard(flashcard.id);
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3-32-32H96z" />
                  </svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={isEditFlashcardOpen}
        onClose={() => {
          setIsEditFlashcardOpen(false);
        }}
        title="Edit flashcard"
      >
        <form>
          <TextField label="Front side">
            <input
              type="text"
              placeholder="Hola"
              value={newEditFlashcardFront}
              onChange={handleNewEditFront}
            />
          </TextField>
          <TextField label="Back side">
            <input
              type="text"
              placeholder="Hello"
              value={newEditFlashcardBack}
              onChange={handleNewEditBack}
            />
          </TextField>
          <TextField label="Deck">
            <select value={newEditDeck} onChange={(e) => handleDeckChange(e)}>
              {decks.map((deck) => (
                <option key={deck.id} value={deck.id}>
                  {deck.nombre}
                </option>
              ))}
            </select>
          </TextField>
        </form>
        <div>
          <Button
            outlined={true}
            onClick={() => {
              setIsEditFlashcardOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button onClick={editFlashcard}>
            {isLoading4 ? <Loader color="white"></Loader> : "Save"}
          </Button>
        </div>
      </Modal>
      <Modal
        isOpen={isDeleteFlashcardOpen}
        onClose={() => {
          setIsDeleteFlashcardOpen(false);
        }}
        title="Delete flashcard"
      >
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
          </svg>
          <p>
            Are you sure you want to delete this flashcard?, once you delete it
            you can no longer recover it.
          </p>
        </div>
        <div>
          <Button
            onClick={() => {
              setIsDeleteFlashcardOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button outlined={true} onClick={deleteFlashcard}>
            {isLoading3 ? <Loader color="white"></Loader> : "Delete"}
          </Button>
        </div>
      </Modal>
    </>
  );
}
