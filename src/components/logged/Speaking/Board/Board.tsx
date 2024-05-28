import { useState, useEffect } from "react";
import styles from "../Board/Board.module.scss";

interface BoardProps {
  sentence: string;
  audio: string;
  correct: string[] | null;
  incorrect: string[] | null;
}

const audioIcon = () => (
  <svg
    width="51"
    height="51"
    viewBox="0 0 51 51"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="51" height="51" rx="10" fill="#0B6EE1" />
    <path
      d="M31.875 17C33.1946 17.9897 34.2656 19.273 35.0033 20.7484C35.741 22.2237 36.125 23.8506 36.125 25.5C36.125 27.1495 35.741 28.7763 35.0033 30.2517C34.2656 31.727 33.1946 33.0103 31.875 34M37.6129 10.625C39.8313 12.4178 41.6207 14.684 42.8499 17.2578C44.0791 19.8316 44.7171 22.6478 44.7171 25.5C44.7171 28.3523 44.0791 31.1684 42.8499 33.7422C41.6207 36.316 39.8313 38.5823 37.6129 40.375M12.75 31.875H8.5C7.93641 31.875 7.39591 31.6511 6.9974 31.2526C6.59888 30.8541 6.375 30.3136 6.375 29.75V21.25C6.375 20.6864 6.59888 20.1459 6.9974 19.7474C7.39591 19.3489 7.93641 19.125 8.5 19.125H12.75L20.1875 9.56247C20.3732 9.20171 20.6819 8.91928 21.0577 8.76622C21.4335 8.61315 21.8516 8.59955 22.2365 8.72786C22.6215 8.85618 22.9478 9.11795 23.1566 9.46587C23.3654 9.81379 23.4429 10.2249 23.375 10.625V40.375C23.4429 40.775 23.3654 41.1861 23.1566 41.5341C22.9478 41.882 22.6215 42.1438 22.2365 42.2721C21.8516 42.4004 21.4335 42.3868 21.0577 42.2337C20.6819 42.0807 20.3732 41.7982 20.1875 41.4375L12.75 31.875Z"
      stroke="white"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const Board = ({ sentence, audio, correct, incorrect }: BoardProps) => {
  const words = sentence.split(" ");
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null
  );

  // Initialize the audio element when the component mounts
  useEffect(() => {
    setAudioElement(new Audio(audio));
  }, [audio]);

  const playAudio = () => {
    if (audioElement) {
      audioElement.play();
    }
  };

  return (
    <>
      <div className={styles.board}>
        <button onClick={playAudio}>{audioIcon()}</button>
        <h2 className={styles.boardText}>
          {words.map((word, index) => {
            let color = "";
            if (correct && correct.includes(word)) {
              color = "#66E482";
            } else if (incorrect && incorrect.includes(word)) {
              color = "#EF6E52";
            }
            return (
              <span key={index} style={{ color: color }}>
                {word + (index !== words.length - 1 ? " " : "")}
              </span>
            );
          })}
        </h2>
      </div>
    </>
  );
};
