import { HighlightArea } from "@react-pdf-viewer/highlight";
import styles from "./PDFViewer.module.scss";
import { Button } from "app/components/shared/Button";
import { useTranslatebar } from "./SideBarProvider";
import { Modal } from "app/components/shared/Modal";
import { TextField } from "app/components/shared/TextField";
import {
  ChangeEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { FormError } from "app/components/home/auth/FormError";
import { FormSuccess } from "app/components/home/auth/FormSuccess";
import { useTranslateTextMutation } from "app/redux/features/translateApiSlice";
import { toast } from "react-toastify";
import { Loader } from "app/components/shared/Loader";
import { set } from "zod";
import { useCreateFlashcardMutation } from "app/redux/features/flashApiSlice";
import { DeckType } from "../../Deck/MapDecks";
import { useBringDecksMutation } from "app/redux/features/deckApiSlice";

interface NotesTranslatebarProps {
  translateWord: String;
  isClicked: boolean;
  setIsClicked: (value: SetStateAction<boolean>) => void;
}

interface TranslateResponse {
  traduction: String;
  description: String;
  examples: String[];
}

export const TranslateSidebar: React.FC<NotesTranslatebarProps> = ({
  translateWord,
  isClicked,
  setIsClicked,
}) => {
  const { setIsTranslatebarOpen, isTranslatebarOpen } = useTranslatebar();
  const [isCreateFlashcardOpen, setIsCreateFlashcardOpen] = useState(false);
  const [language, setLanguage] = useState("English");
  const [translation, setTranslation] = useState("");
  const [description, setDescription] = useState("");
  const [examples, setExamples] = useState([]);
  const [translateText, { isLoading: isLoading2 }] = useTranslateTextMutation();
  const [sentenceInput, setSentenceInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [newFlashcardFront, setNewFlashcardFront] = useState<string>("");
  const [newFlashcardBack, setNewFlashcardBack] = useState<string>("");
  const [createFlashcard2, { isLoading: isLoading3 }] =
    useCreateFlashcardMutation();
  const [decks, setDecks] = useState<DeckType[]>([]);
  const [bringDecks2, { isLoading }] = useBringDecksMutation();
  const [newFlashcardDeck, setNewFlashcardDeck] = useState<string>("");

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // console.log("isClicked", isClicked);

    if (isClicked) {
      // Código a ejecutar cuando el botón en el componente padre es clickeado
      makeTranslation();
      setIsClicked(false);
    }
  }, [isClicked]);

  const makeTranslation = () => {
    translateText({
      word: translateWord,
      language: language,
      sentence: sentenceInput,
    })
      .unwrap()
      .then((response) => {
        // console.log(response);
        setTranslation(response[0]);
        setDescription(response[1]);
        // console.log(response[1]);
        setExamples(response[2]);
      })
      .catch((e: { data: { detail: any } }) => {
        toast.error(
          e.data.detail ||
            "There was an error while translating, please try again"
        );
      });
  };

  const createFlashcard = () => {
    const currentDate = new Date();
    
    createFlashcard2({
      mazo: newFlashcardDeck,
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
      })
      .catch(() => {
        toast.error(
          "There was an error while creating the flashcard, please try again"
        );
      });
  };

  const fetchDecks = () => {
    bringDecks2(undefined)
      .unwrap()
      .then((response: DeckType[]) => {
        // console.log(response);
        setDecks(response);
        if (response.length > 0){
          setNewFlashcardDeck(response[0].id);
          console.log(newFlashcardDeck);
        } 
      });
  };

  function onClose() {
    setIsTranslatebarOpen(false);
  }

  const handleSentenceInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setSentenceInput(event.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleNewFront = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFlashcardFront(e.target.value);
  };

  const handleNewBack = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFlashcardBack(e.target.value);
  };

  const handleDeckChange = (e: ChangeEvent<HTMLSelectElement>) => {
    // console.log(e.target.value);
    setNewFlashcardDeck(e.target.value);
    // console.log(newFlashcardDeck);
  };

  if (!isTranslatebarOpen) {
    return null;
  }

  return (
    <>
      <div className={styles.translateSidebar}>
        <div className={styles.notesSidebar__titleContent}>
          <h5 className={styles.notesSidebar__title}>Translation</h5>
          <svg
            className={styles.notesSidebar__close}
            onClick={onClose}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
          </svg>
        </div>
        {isLoading2 ? (
          <Loader color="orange" />
        ) : (
          <>
            <div className={styles.translateSidebar__section}>
              <h6 className={styles.translateSidebar__subtitle}>Original</h6>
              <div className={styles.translateSidebar__translatediv}>
                <p>{translateWord}</p>
              </div>
            </div>
            <div className={styles.translateSidebar__section}>
              <h6 className={styles.translateSidebar__subtitle}>
                Translation ({language})
              </h6>
              <div className={styles.translateSidebar__translatediv}>
                <p>{translation}</p>
              </div>
            </div>
            <div className={styles.translateSidebar__section}>
              <h6 className={styles.translateSidebar__subtitle}>
                Include context
              </h6>
              <TextField label="">
                <textarea
                  ref={textareaRef}
                  onBlur={() => {
                    makeTranslation();
                  }}
                  value={sentenceInput}
                  placeholder="Add the sentence in which the word is used to get the translation with context."
                  onChange={handleSentenceInput}
                  style={{ overflow: "hidden" }}
                />
              </TextField>
            </div>

            <div className={styles.translateSidebar__section}>
              <h6 className={styles.translateSidebar__subtitle}>Description</h6>
              <p>{description}</p>
            </div>
            <div className={styles.translateSidebar__section}>
              <h6 className={styles.translateSidebar__subtitle}>
                Example sentences
              </h6>
              <ul className={styles.exampleList}>
                {examples.map((example, index) => (
                  <li key={index} className={styles.exampleListItem}>
                    {example}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.translateSidebar__button}>
              <Button
                onClick={() => {
                  setIsCreateFlashcardOpen(true);
                  fetchDecks();
                  setNewFlashcardBack(translation);
                  setNewFlashcardFront(translateWord.toString());
                }}
              >
                Create flashcard
              </Button>
            </div>
          </>
        )}
      </div>
      <Modal
        isOpen={isCreateFlashcardOpen}
        onClose={() => {
          setIsCreateFlashcardOpen(false);
        }}
        title="Create flashcard"
      >
        {decks.length === 0 ? (
          <form>
            <h6 style={{textAlign: "center"}}>Please create a deck before start creating flashcards</h6>
            <div style={{height: "2rem"}}></div>
            <div style={{width: "100%", alignItems: "center", display: "flex"}}>
            <Button
                outlined={true}
                onClick={() => {
                  setIsCreateFlashcardOpen(false);
                }}
                
              >
                Cancel
              </Button>
              </div>
          </form>
        ) : (
          <>
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
              <TextField label="Deck">
                <select
                  required
                  value={newFlashcardDeck}
                  onChange={(e) => handleDeckChange(e)}
                >
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
                  setIsCreateFlashcardOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button onClick={createFlashcard}>
                {isLoading2 ? <Loader color="white"></Loader> : "Create"}
              </Button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};
