import { MisionImage } from "./MisionImage";
import styles from "./AboutUs.module.scss";
import { VisionImage } from "./VisionImage";

export const AboutUsContent = () => {
  return (
    <>
      <section className={styles.aboutBlock}>
        <VisionImage />
        <div className={styles.aboutVision}>
          <h2>Vision:</h2>
          <p>
            By 2027 Idiomind will become a benchmark in language learning, being recognized for being a platform with a unique experience that integrates real-time translation, creation of flashcards, notes and exercises to strengthen linguistic skills.
          </p>
        </div>
      </section>

      <section className={`${styles.aboutBlock} ${styles.reverse}`}>
        <MisionImage />
        <div className={styles.aboutMision}>
          <h2>Mision:</h2>
          <p>
          At Idiomind we strive to simplify language learning by allowing our users to translate documents in real time with context, create notes, flashcards and have access to a wide variety of grammar and phonics exercises, everything in one integrated platform.
          </p>
        </div>
      </section>
    </>
  );
};
