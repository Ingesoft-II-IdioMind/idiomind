import { useState } from "react";
import styles from "./Deck.module.scss";
import { useRouter } from 'next/navigation';
import { useCreateDeckMutation, useDeleteDeckMutation, useEditDeckMutation } from "app/redux/features/deckApiSlice";

import { FormError } from "app/components/home/auth/FormError";
import { Button } from "app/components/shared/Button";
import { Modal } from "app/components/shared/Modal";
import { TextField } from "app/components/shared/TextField";
import { Loader } from "app/components/shared/Loader";
import { toast } from "react-toastify";
import { set } from "zod";

interface DeckProps {
  id: string;
  fetchDecks: () => void;
  name:string;
  ultima_Practica: string | null;
  flashcards_count: number;
}

export const Deck = ({id,fetchDecks,name,ultima_Practica,flashcards_count}:DeckProps) => {

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteDeckOpen,  setIsDeleteDeckOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [nameDeck, setNameDeck] = useState<string>("");
  const [deleteDeck2, { isLoading }] = useDeleteDeckMutation();
  const [editDeck2, { isLoading:isLoading2 }] = useEditDeckMutation();
  const [createDeck2, { isLoading:isLoading3 }] = useCreateDeckMutation();
  // console.log(id);

  const handleSvgClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleNameDeckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameDeck(e.target.value);
  }

  const openDeleteDeck = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleteDeckOpen(true);
  };

  const openEditDeck = (e: React.MouseEvent) => {
    setNameDeck(name);
    e.stopPropagation();
    setIsEditOpen(true);
  };

  const deleteDeck = (e: React.MouseEvent) =>{ 
    e.stopPropagation();
    deleteDeck2({id:id})
    .unwrap()
    .then(() => {
      toast.success("Deck deleted successfully");
      setIsDeleteDeckOpen(false);
      fetchDecks();
    })
    .catch((e) => {
      toast.error("Error while deleting deck");
    });
  }

  const editDeck = (e: React.MouseEvent) =>{
    e.stopPropagation();
    editDeck2({ nombre: nameDeck, ultima_Practica:ultima_Practica, id:id})
      .unwrap()
      .then(() => {
        toast.success("Deck edited successfully");
        setIsEditOpen(false);
        setNameDeck("");
        fetchDecks();
      })
      .catch((e) => {
        toast.error(
          e.data.detail ||
            "There was an error while editing the deck, please try again"
        );
      });
  }

  async function duplicateDeck(e: React.MouseEvent) {
    const currentDate = new Date();
    e.stopPropagation();
    createDeck2({ nombre: name, ultima_Practica: currentDate })
      .unwrap()
      .then(() => {
        toast.success("Deck created successfully");
        fetchDecks();
      })
      .catch((e) => {
        toast.error(
          e.data.detail ||
            "There was an error while creating the deck, please try again"
        );
      });
  }

  const handleClick = () => {
    
    router.push(`/logged/decks/${id}`); // Reemplaza '/newPage' con la ruta a la que deseas navegar
    
  };

  return (
    <>
    <div className={styles.deckNav} onClick={handleClick}>
      <h6 className={styles.deckNav__name}>{name}</h6>
      <div className={styles.deckNav__options}>
        <p>{flashcards_count} flashcards</p>
        <svg
         onClick={handleSvgClick}
          width="30"
          height="32"
          viewBox="0 0 9 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="Vector_2"
            d="M4.76459 23.7037C3.64132 23.7037 2.56406 24.1407 1.76979 24.9187C0.975514 25.6966 0.529297 26.7517 0.529297 27.8519C0.529297 28.952 0.975514 30.0071 1.76979 30.785C2.56406 31.563 3.64132 32 4.76459 32C5.88786 32 6.96512 31.563 7.7594 30.785C8.55367 30.0071 8.99988 28.952 8.99988 27.8519C8.99988 26.7517 8.55367 25.6966 7.7594 24.9187C6.96512 24.1407 5.88786 23.7037 4.76459 23.7037ZM4.76459 11.8519C3.64132 11.8519 2.56406 12.2889 1.76979 13.0668C0.975514 13.8447 0.529297 14.8998 0.529297 16C0.529297 17.1002 0.975514 18.1553 1.76979 18.9332C2.56406 19.7111 3.64132 20.1481 4.76459 20.1481C5.88786 20.1481 6.96512 19.7111 7.7594 18.9332C8.55367 18.1553 8.99988 17.1002 8.99988 16C8.99988 14.8998 8.55367 13.8447 7.7594 13.0668C6.96512 12.2889 5.88786 11.8519 4.76459 11.8519ZM8.99988 4.14815C8.99988 3.04799 8.55367 1.99289 7.7594 1.21496C6.96512 0.437036 5.88786 0 4.76459 0C3.64132 0 2.56406 0.437036 1.76979 1.21496C0.975514 1.99289 0.529297 3.04799 0.529297 4.14815C0.529297 5.24831 0.975514 6.3034 1.76979 7.08133C2.56406 7.85926 3.64132 8.2963 4.76459 8.2963C5.88786 8.2963 6.96512 7.85926 7.7594 7.08133C8.55367 6.3034 8.99988 5.24831 8.99988 4.14815Z"
            fill="#E67320"
          />
        </svg>
      </div>
      {isOpen && (
        <ul className={styles.deckNav__dropdown}>
          <li onClick={openDeleteDeck}>Delete deck</li>
          <li onClick={openEditDeck}>Edit Name</li>
          <li onClick={duplicateDeck}>Duplicate</li>
        </ul>
      )}
    </div>
    <Modal
    isOpen={isDeleteDeckOpen}
    onClose={() => {
      setIsDeleteDeckOpen(false);
    }}
    title="Delete Deck"
  >
    <div>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
      </svg>
      <p>
        Are you sure you want to delete your deck?, once you delete it you
        can no longer recover it.
      </p>
    </div>
    <div>
      <Button
        onClick={() => {
          setIsDeleteDeckOpen(false);
        }}
      >
        Cancel
      </Button>
      <Button outlined={true} onClick={deleteDeck}>
        {isLoading? <Loader color="white"></Loader> : "Delete"}
      </Button>
    </div>
  </Modal>
  <Modal
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
        }}
        title="Edit deck"
      >
        <form>
          <TextField label="New deck name">
            <input
              value = {nameDeck}
              type="text"
              placeholder="French deck"
              onChange={handleNameDeckChange}
            />
          </TextField>
        </form>
        <div>
          <Button
            outlined={true}
            onClick={() => {
              setIsEditOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button onClick={editDeck}>
            {isLoading2? <Loader color="white"></Loader> : "Save"}
          </Button>
        </div>
      </Modal>
  </>

    
  );
};
