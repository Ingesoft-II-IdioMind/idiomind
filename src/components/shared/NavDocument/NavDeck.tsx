import Link from "next/link";
import styles from "./NavDocument.module.scss";
import { ChangeEvent, SetStateAction, useState } from "react";
import { useDeleteDocumentMutation } from "app/redux/features/docApiSlice";
import { Modal } from "../Modal";
import { Button } from "../Button";
import { FormError } from "app/components/home/auth/FormError";
import { FormSuccess } from "app/components/home/auth/FormSuccess";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useSidebar } from "app/components/logged/Library/PDFViewer/SideBarProvider";
import {
  useBringDecksMutation,
  useBringOneDeckMutation,
} from "app/redux/features/deckApiSlice";
import {
  useCreateFlashcardMutation,
  useDeleteFlashcardMutation,
  useEditFlashcardMutation,
} from "app/redux/features/flashApiSlice";
import { TextField } from "../TextField";
import { Loader } from "../Loader";
import { FlashcardObject } from "app/components/logged/Flashcard/PracticeFlashcards";
import { DeckType } from "app/components/logged/Deck/MapDecks";

export default function NavDeck({
  name,
  id,
  flashcard,
  fetchFlashcards,
}: {
  name: string;
  id: string;
  flashcard: FlashcardObject | undefined;
  fetchFlashcards: () => void;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isCreateFlashcardOpen, setIsCreateFlashcardOpen] = useState(false); 
  const [isEditFlashcardOpen, setIsEditFlashcardOpen] = useState(false);
  const [isDeleteFlashcardOpen, setIsDeleteFlashcardOpen] = useState(false);
  const [isAllFlashcardOpen, setIsAllFlashcardOpen] = useState(false);
  const [newFlashcardFront, setNewFlashcardFront] = useState<string>("");
  const [newFlashcardBack, setNewFlashcardBack] = useState<string>("");
  const [newEditFlashcardFront, setNewEditFlashcardFront] = useState<string>("");
  const [newEditFlashcardBack, setNewEditFlashcardBack] = useState<string>("");
  const [newEditDeck, setNewEditDeck] = useState<string>("");
  const [bringDecks2, { isLoading }] = useBringDecksMutation();
  const [decks, setDecks] = useState<DeckType[]>([]);
  const [createFlashcard2, { isLoading: isLoading2 }] =
    useCreateFlashcardMutation();
  const [deleteFlashcard2, { isLoading: isLoading3 }] =
    useDeleteFlashcardMutation();
  const [editFlashcard2, { isLoading: isLoading4 }] =
    useEditFlashcardMutation();

  const createFlashcard = () => {
    const currentDate = new Date();
    setIsOpen(false);
    createFlashcard2({
      mazo: id,
      frente: newFlashcardFront,
      reverso: newFlashcardBack,
      proxima_Revision: currentDate,
    })
      .unwrap()
      .then(() => {
        setNewFlashcardFront("");
        setNewFlashcardBack("");
        toast.success("Flashcard created successfully");
        setIsCreateFlashcardOpen(false);
        fetchFlashcards();
      })
      .catch(() => {
        toast.error(
          "There was an error while creating the flashcard, please try again"
        );
      });
  };

  const editFlashcard = () => {
    setIsOpen(false);
    editFlashcard2({
      mazo: newEditDeck,
      frente: newEditFlashcardFront,
      reverso: newEditFlashcardBack,
      proxima_Revision: new Date(),
      id: flashcard?.id,
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
    setIsOpen(false);
    deleteFlashcard2({ id: flashcard?.id })
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

  const handleNewFront = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFlashcardFront(e.target.value);
  };

  const handleNewBack = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFlashcardBack(e.target.value);
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

  const fetchDecks = () => {
    bringDecks2(undefined)
      .unwrap()
      .then((response: SetStateAction<DeckType[]>) => {
        console.log(response);
        setDecks(response);
      });
  };

  return (
    <nav className={styles.navDocument}>
      <Link href={"/logged/decks"}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
        </svg>
      </Link>

      <h1 className={styles.navDocument__title}>{name}</h1>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 128 512"
        onClick={() => setIsOpen(!isOpen)}
      >
        <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
      </svg>

      {isOpen && (
        <ul className={styles.dropdownMenu}>
          <li
            onClick={() => {
              setIsCreateFlashcardOpen(true);
            }}
          >
            Create flashcard
          </li>
          {flashcard && (
            <>
              <li
                onClick={() => {
                  setIsEditFlashcardOpen(true);
                  fetchDecks();
                  setNewEditFlashcardFront(flashcard?.frente);
                  setNewEditFlashcardBack(flashcard?.reverso);
                  setNewEditDeck(flashcard?.mazo);
                }}
              >
                Edit flashcard
              </li>
              <li
                onClick={() => {
                  setIsDeleteFlashcardOpen(true);
                }}
              >
                Delete flashcard
              </li>
            </>
          )}
          <li  onClick={() => {
                  router.push('/logged/decks/all');
                }}>All flashcards</li>
        </ul>
      )}
      <Modal
        isOpen={isCreateFlashcardOpen}
        onClose={() => {
          setIsCreateFlashcardOpen(false);
        }}
        title="Create flashcard"
      >
        <form>
          <TextField label="Front side">
            <input
              type="text"
              required={true}
              placeholder="Hola"
              value={newFlashcardFront}
              onChange={handleNewFront}
            />
          </TextField>
          <TextField label="Back side">
            <input
              type="text"
              required={true}
              placeholder="Hello"
              value={newFlashcardBack}
              onChange={handleNewBack}
            />
          </TextField>
        </form>
        <div>
          <Button
            outlined={true}
            onClick={() => {
              setIsCreateFlashcardOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button onClick={createFlashcard}>
            {isLoading2 ? <Loader color="white"></Loader> : "Create"}
          </Button>
        </div>
      </Modal>
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
    </nav>
  );
}
