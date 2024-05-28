import styles from "./Flashcard.module.scss";

interface FlashcardProps {
  isFront: boolean;
  front: string;
  back: string;
}

export const Flashcard = ({ isFront, front, back }: FlashcardProps) => {
  return (
    <div className={styles.flashcard__container}>
      <div className={styles.flashcard}>
      <div className={`${styles.flashcard__card} ${isFront ? '' : styles.flashcard__flip}`}>
        {isFront ? (
          <div className={styles.flashcard__front}><p>{front}</p></div>
        ) : (
          <div className={styles.flashcard__back}><p>{back}</p></div>)}
        </div>
        <div className={styles.flashcard__background}></div>
      </div>
    </div>
  );
};
